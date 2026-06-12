import { FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields to login.')
      return
    }

    auth.login({ name: name.trim(), email: email.trim() })
    navigate(from, { replace: true })
  }

  return (
    <section className="min-h-screen bg-cold-light py-16">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-cold-blue/20 bg-white p-10 shadow-xl shadow-cold-blue/5">
        <h1 className="text-4xl font-bold text-cold-blue mb-4">Welcome Back</h1>
        <p className="mb-6 text-gray-600">Log in with your details to access Rayfield Cool Mart.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-cold-light px-4 py-3 outline-none focus:border-cold-blue focus:ring-2 focus:ring-cold-blue/20"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-cold-light px-4 py-3 outline-none focus:border-cold-blue focus:ring-2 focus:ring-cold-blue/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 bg-cold-light px-4 py-3 outline-none focus:border-cold-blue focus:ring-2 focus:ring-cold-blue/20"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-cold-blue px-6 py-3 text-white font-semibold transition hover:bg-cyan-600"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here? Create an account by entering your details above.
        </p>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link to="/" className="font-semibold text-cold-blue hover:text-cyan-600">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
