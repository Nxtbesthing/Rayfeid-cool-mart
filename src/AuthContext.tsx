import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

type User = {
  name: string
  email: string
}

interface AuthContextValue {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AUTH_STORAGE_KEY = 'rayfield-cool-mart-auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = (newUser: User) => setUser(newUser)
  const logout = () => setUser(null)

  // Auto-logout after inactivity (5 minutes)
  useEffect(() => {
    const INACTIVITY_MS = 5 * 60 * 1000 // 5 minutes
    let timeoutId: number | undefined

    function clearExisting() {
      if (typeof timeoutId !== 'undefined') {
        window.clearTimeout(timeoutId)
        timeoutId = undefined
      }
    }

    function scheduleLogout() {
      clearExisting()
      if (!user) return
      timeoutId = window.setTimeout(() => {
        setUser(null)
      }, INACTIVITY_MS)
    }

    function resetTimer() {
      scheduleLogout()
      try {
        // update a shared timestamp so other tabs can sync activity
        window.localStorage.setItem(AUTH_STORAGE_KEY + ':lastActivity', Date.now().toString())
      } catch (e) {}
    }

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'] as const
    events.forEach(evt => window.addEventListener(evt, resetTimer, { passive: true }))

    // listen for storage events to sync logout/login across tabs
    function onStorage(e: StorageEvent) {
      if (e.key === AUTH_STORAGE_KEY && e.newValue === null) {
        // logged out in another tab
        setUser(null)
      }
      if (e.key === AUTH_STORAGE_KEY && e.newValue) {
        try {
          const other = JSON.parse(e.newValue) as User
          setUser(other)
        } catch (err) {}
      }
      if (e.key === AUTH_STORAGE_KEY + ':lastActivity') {
        // another tab had activity — reset our timer
        scheduleLogout()
      }
    }

    window.addEventListener('storage', onStorage)

    // start/stop timer based on `user`
    scheduleLogout()

    return () => {
      clearExisting()
      events.forEach(evt => window.removeEventListener(evt, resetTimer))
      window.removeEventListener('storage', onStorage)
    }
  }, [user])

  const isAdmin = Boolean(user?.email.toLowerCase().includes('admin'))

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function RequireAuth() {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

export function RequireAdmin() {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!auth.isAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
