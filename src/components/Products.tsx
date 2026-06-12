import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCatalog } from '../CatalogContext'
import { Product as CartProduct, useCart } from '../CartContext'

interface Product extends CartProduct {}

export default function Products() {
  const { products } = useCatalog()
  const { cartItemCount, addToCart } = useCart()
  const [addedProductName, setAddedProductName] = useState<string | null>(null)

  useEffect(() => {
    if (!addedProductName) return
    const timer = window.setTimeout(() => setAddedProductName(null), 1800)
    return () => window.clearTimeout(timer)
  }, [addedProductName])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    setAddedProductName(product.name)
  }

  return (
    <section className="relative py-16 bg-cold-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-4xl font-bold text-center mb-0">Frozen Food Cold Room Solutions</h2>
          <p className="max-w-2xl text-center text-gray-600">
            Choose from cold room systems purpose-built for fish, chicken, seafood, and frozen inventory storage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="text-6xl text-center py-8 bg-gradient-to-r from-cold-blue to-cyan-500">
                {product.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-cold-blue">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-cold-blue text-white px-4 py-2 rounded hover:bg-cyan-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/cart" className="bg-cold-dark text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
            View Cart ({cartItemCount} items)
          </Link>
        </div>
      </div>

      {addedProductName && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-green-200 bg-white/95 px-5 py-4 shadow-2xl shadow-green-500/10 backdrop-blur-md transition-all duration-300">
          <p className="text-sm font-medium text-green-700">
            {addedProductName} added to cart
          </p>
        </div>
      )}
    </section>
  )
}
