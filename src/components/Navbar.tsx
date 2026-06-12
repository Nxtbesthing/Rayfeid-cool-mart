import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItemCount } = useCart()

  return (
    <nav className="bg-cold-dark text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-cold-blue">
            ❄️ Rayfield Cool Mart
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-cold-blue transition">Home</Link>
            <Link to="/services" className="hover:text-cold-blue transition">Services</Link>
            <Link to="/products" className="hover:text-cold-blue transition">Products</Link>
            <Link to="/booking" className="hover:text-cold-blue transition">Booking</Link>
            <Link to="/about" className="hover:text-cold-blue transition">About</Link>
            <Link to="/contact" className="hover:text-cold-blue transition">Contact</Link>
            <Link to="/cart" className="relative hover:text-cold-blue transition">
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
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
            <Link to="/" className="block hover:text-cold-blue">Home</Link>
            <Link to="/services" className="block hover:text-cold-blue">Services</Link>
            <Link to="/products" className="block hover:text-cold-blue">Products</Link>
            <Link to="/booking" className="block hover:text-cold-blue">Booking</Link>
            <Link to="/about" className="block hover:text-cold-blue">About</Link>
            <Link to="/contact" className="block hover:text-cold-blue">Contact</Link>
            <Link to="/cart" className="relative block hover:text-cold-blue">
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
