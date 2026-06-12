import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'

export default function FloatingCart() {
  const { cartItemCount } = useCart()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated || cartItemCount === 0) {
    return null
  }

  return (
    <Link
      to="/cart"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-3 rounded-full bg-cold-blue px-4 py-3 text-white shadow-2xl shadow-cold-blue/20 transition hover:bg-cyan-600"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-lg font-semibold text-white">
        🛒
      </span>
      <div className="flex flex-col text-left text-sm">
        <span className="font-semibold">Cart</span>
        <span className="text-xs text-cold-blue/80">{cartItemCount} item{cartItemCount > 1 ? 's' : ''}</span>
      </div>
    </Link>
  )
}
