import { useMemo, useState } from 'react'
import { useCatalog } from '../CatalogContext'
import { formatNaira } from '../utils/formatNaira'

const initialForm = {
  name: '',
  price: '',
  image: '',
  description: '',
}

export default function CatalogManagement() {
  const { products, addProduct, updateProduct, deleteProduct } = useCatalog()
  const [formData, setFormData] = useState(initialForm)
  const [editingProductId, setEditingProductId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  const productCount = useMemo(() => products.length, [products])

  const resetForm = () => {
    setFormData(initialForm)
    setEditingProductId(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.name.trim() || !formData.price.trim() || !formData.description.trim()) {
      setMessage('Please complete the catalog fields.')
      return
    }

    const product = {
      name: formData.name.trim(),
      price: Number(formData.price),
      image: formData.image.trim() || '❄️',
      description: formData.description.trim(),
    }

    if (editingProductId !== null) {
      updateProduct({ ...product, id: editingProductId })
      setMessage('Product updated successfully.')
    } else {
      addProduct(product)
      setMessage('New product added to the catalog.')
    }

    resetForm()
  }

  const handleEdit = (productId: number) => {
    const product = products.find(item => item.id === productId)
    if (!product) return
    setFormData({
      name: product.name,
      price: String(product.price),
      image: product.image,
      description: product.description,
    })
    setEditingProductId(product.id)
    setMessage('Editing product details. Save to apply changes.')
  }

  return (
    <section className="py-16 bg-cold-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl bg-white p-10 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-cold-blue">Catalog Management</h1>
              <p className="text-gray-600">Manage your frozen food cold room product catalog from one place.</p>
            </div>
            <div className="rounded-full bg-cold-blue/10 px-5 py-3 text-cold-blue font-semibold">
              {productCount} products
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-4 text-green-800">
            {message}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Add or Edit Product</h2>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-cold-blue focus:outline-none"
            />

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              min="0"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-cold-blue focus:outline-none"
            />

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Icon or emoji (optional)"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-cold-blue focus:outline-none"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              rows={4}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:border-cold-blue focus:outline-none"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="rounded-full bg-cold-blue px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition">
                {editingProductId !== null ? 'Save Changes' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-gray-200 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
              >
                Reset Form
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Current Catalog</h2>
              <div className="space-y-4">
                {products.map(product => (
                  <div key={product.id} className="rounded-3xl border border-gray-200 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">#{product.id}</p>
                        <h3 className="text-xl font-semibold text-cold-blue">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-cold-blue">{formatNaira(product.price)}</p>
                        <p className="text-sm">{product.image}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="rounded-full border border-cold-blue px-4 py-2 text-cold-blue hover:bg-cold-blue/10 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-full border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
