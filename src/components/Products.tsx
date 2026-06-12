import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function Products() {
  const [cart, setCart] = useState<Product[]>([])

  const products: Product[] = [
    {
      id: 1,
      name: 'Small Cold Room (2x2m)',
      price: 5000,
      image: '❄️',
      description: 'Compact cold room perfect for small businesses'
    },
    {
      id: 2,
      name: 'Medium Cold Room (4x4m)',
      price: 12000,
      image: '❄️',
      description: 'Ideal for medium-sized operations'
    },
    {
      id: 3,
      name: 'Large Cold Room (6x6m)',
      price: 25000,
      image: '❄️',
      description: 'Commercial-grade solution for large operations'
    },
    {
      id: 4,
      name: 'Industrial Freezer Unit',
      price: 8500,
      image: '🧊',
      description: 'High-capacity freezer for bulk storage'
    },
    {
      id: 5,
      name: 'Modular Cold Room System',
      price: 15000,
      image: '❄️',
      description: 'Customizable modular cold room design'
    },
    {
      id: 6,
      name: 'Walk-in Cooler Unit',
      price: 18000,
      image: '🚪',
      description: 'Easy access walk-in cooler solution'
    },
  ]

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product])
    alert(`${product.name} added to cart!`)
  }

  return (
    <section className="py-16 bg-cold-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Products</h2>
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
            View Cart ({cart.length} items)
          </Link>
        </div>
      </div>
    </section>
  )
}
