import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  if (!user) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-cold-blue/20 bg-cold-light p-10 shadow-lg shadow-cold-blue/5">
        <div className="mb-10 flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-cold-blue">Your Profile</h1>
          <p className="text-gray-600">Welcome back, {user.name}! Manage your details and logout when needed.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>
            <p className="text-gray-500">Name</p>
            <p className="mb-4 text-lg font-semibold text-cold-blue">{user.name}</p>
            <p className="text-gray-500">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4">Security</h2>
            <p className="mb-4 text-gray-600">Your profile is stored locally for demo purposes. A real app would verify login credentials on a server.</p>
            <button
              onClick={handleLogout}
              className="rounded-full bg-cold-blue px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
