import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCatalog } from '../CatalogContext'
import { Product as CartProduct, useCart } from '../CartContext'
import { formatNaira } from '../utils/formatCurrency'

const fallbackImagesByPage: Record<number, string> = {
  1: new URL('../assets/images/fish-fallback.svg', import.meta.url).href,
  2: new URL('../assets/images/meat-fallback.svg', import.meta.url).href,
  3: new URL('../assets/images/seafood-fallback.svg', import.meta.url).href,
}
const genericFallbackImage = new URL('../assets/images/image-fallback.svg', import.meta.url).href

const localImageModules = import.meta.globEager('../assets/images/**/*.{png,jpg,jpeg,svg}') as Record<string, { default: string }>
const localImages = Object.fromEntries(
  Object.entries(localImageModules).map(([path, module]) => {
    const name = path.split('/').pop()?.replace(/\.(png|jpe?g|svg)$/i, '') ?? path
    return [name.toLowerCase(), module.default]
  })
)

function resolveProductImage(product: Product, pageFallback: string) {
  if (typeof product.image === 'string' && product.image.startsWith('http')) {
    return product.image
  }

  const slug = String(product.image).trim().toLowerCase()
  const directMatch = localImages[slug]
  const nameBasedMatch = localImages[slugify(product.name)]

  return directMatch ?? nameBasedMatch ?? pageFallback
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

interface Product extends CartProduct {}

export default function Products() {
  const { products } = useCatalog()
  const { cartItemCount, cartItems, addToCart, decrementFromCart } = useCart()
  const [addedProductName, setAddedProductName] = useState<string | null>(null)
  const { page } = useParams<{ page?: string }>()

  const pageSize = 15
  const pageTitles = ['Frozen Fish', 'Meats', 'Sea Foods']
  const totalPages = pageTitles.length
  const activePage = Math.min(Math.max(Number(page) || 1, 1), totalPages)
  const pageTitle = pageTitles[activePage - 1] || `Page ${activePage}`

  const pageProducts = useMemo(
    () => products.filter(product => product.page === activePage),
    [products, activePage]
  )

  const pageSlots = useMemo(
    () => Array.from({ length: pageSize }, (_, index) => pageProducts[index] ?? null),
    [pageProducts]
  )

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
          <h2 className="text-4xl font-bold text-center mb-0">{pageTitle}</h2>
          <p className="max-w-2xl text-center text-gray-600">
            Select a frozen storage solution or item for this category. Empty slots are labeled "Yet to be added."
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageSlots.map((product, slotIndex) => {
            if (!product) {
              return (
                <div key={`placeholder-${slotIndex}`} className="rounded-lg border-2 border-dashed border-cold-blue/30 bg-white/80 p-8 flex flex-col items-center justify-center text-center text-gray-500 shadow-sm">
                  <div className="mb-4 text-6xl">🧊</div>
                  <h3 className="text-xl font-semibold mb-2">Slot {slotIndex + 1}</h3>
                  <p className="text-gray-500">Yet to be added</p>
                  <p className="mt-3 text-sm text-gray-400">Fill this space with a new product from the admin catalog.</p>
                </div>
              )
            }

            const quantity = cartItems.find(item => item.id === product.id)?.quantity ?? 0
            const pageFallback = fallbackImagesByPage[product.page ?? 1] ?? genericFallbackImage
            const imageSrc = typeof product.image === 'string' && product.image.startsWith('http') ? product.image : pageFallback

            return (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="relative h-64 overflow-hidden bg-slate-100">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={event => {
                      const img = event.currentTarget
                      if (img.src !== pageFallback) img.src = pageFallback
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 rounded-full border border-cold-blue/20 bg-cold-light p-2">
                      <button
                        type="button"
                        onClick={() => decrementFromCart(product.id)}
                        disabled={quantity === 0}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-cold-blue shadow-sm transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center font-semibold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-cold-blue shadow-sm transition hover:bg-cyan-50"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-2xl font-bold text-cold-blue">{formatNaira(product.price)}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full rounded-full bg-cold-blue px-4 py-3 text-white font-semibold hover:bg-cyan-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="text-center mt-12">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/80 px-5 py-3 shadow-lg shadow-cold-blue/10 backdrop-blur-sm text-sm text-gray-700">
            <span>Page {activePage} of {totalPages}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cold-blue" />
            <span>Add more products on later pages via admin catalog management.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1
              return (
                <Link
                  key={pageNumber}
                  to={`/products/page/${pageNumber}`}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pageNumber === activePage ? 'bg-cold-blue text-white' : 'bg-white text-cold-dark hover:bg-cold-light'}`}
                >
                  Page {pageNumber}
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-8">
            <Link to="/cart" className="bg-cold-dark text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
              View Cart ({cartItemCount} items)
            </Link>
          </div>
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
