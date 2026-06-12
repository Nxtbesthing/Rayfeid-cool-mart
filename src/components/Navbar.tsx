import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItemCount } = useCart()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className="bg-cold-dark text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-cold-blue">
            ❄️ Rayfield Cool Mart
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/" className="hover:text-cold-blue transition">Home</Link>
                <Link to="/services" className="hover:text-cold-blue transition">Cold Room Services</Link>
                <Link to="/products" className="hover:text-cold-blue transition">Frozen Rooms</Link>
                <Link to="/booking" className="hover:text-cold-blue transition">Seafood & Poultry Booking</Link>
                <Link to="/about" className="hover:text-cold-blue transition">Frozen Food Story</Link>
                <Link to="/contact" className="hover:text-cold-blue transition">Contact</Link>
                <Link to="/cart" className="relative hover:text-cold-blue transition">
                  🛒 Cold Room Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="hover:text-cold-blue transition">Admin</Link>
                )}
                <Link to="/profile" className="hover:text-cold-blue transition">{user?.name}</Link>
                <button onClick={handleLogout} className="rounded-full bg-cold-blue px-4 py-2 text-sm font-semibold hover:bg-cyan-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="rounded-full bg-cold-blue px-4 py-2 text-sm font-semibold hover:bg-cyan-600 transition">
                Login
              </Link>
            )}
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-cold-blue px-4 py-2 rounded"
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {isAuthenticated ? (
              <>
                <Link to="/" className="block hover:text-cold-blue">Home</Link>
                <Link to="/services" className="block hover:text-cold-blue">Cold Room Services</Link>
                <Link to="/products" className="block hover:text-cold-blue">Frozen Rooms</Link>
                <Link to="/booking" className="block hover:text-cold-blue">Seafood & Poultry Booking</Link>
                <Link to="/about" className="block hover:text-cold-blue">Frozen Food Story</Link>
                <Link to="/contact" className="block hover:text-cold-blue">Contact</Link>
                <Link to="/cart" className="relative block hover:text-cold-blue">
                  🛒 Cold Room Cart
                  {cartItemCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="block hover:text-cold-blue">Admin Dashboard</Link>
                )}
                <Link to="/profile" className="block hover:text-cold-blue">Profile</Link>
                <button onClick={handleLogout} className="w-full rounded-full bg-cold-blue px-4 py-2 text-sm font-semibold hover:bg-cyan-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="block rounded-full bg-cold-blue px-4 py-2 text-sm font-semibold text-center hover:bg-cyan-600 transition">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
