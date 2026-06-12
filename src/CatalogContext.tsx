import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Product } from './CartContext'

interface CatalogContextValue {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: number) => void
}

const CATALOG_STORAGE_KEY = 'rayfield-cool-mart-catalog'

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'Small Cold Room (2x2m)',
    price: 5000,
    image: '❄️',
    description: 'Compact cold room perfect for fish and chicken storage.'
  },
  {
    id: 2,
    name: 'Medium Cold Room (4x4m)',
    price: 12000,
    image: '🧊',
    description: 'Ideal for medium frozen food operations and bulk inventory.'
  },
  {
    id: 3,
    name: 'Large Cold Room (6x6m)',
    price: 25000,
    image: '❄️',
    description: 'Commercial-grade solution for large frozen food storage.'
  },
  {
    id: 4,
    name: 'Industrial Freezer Unit',
    price: 8500,
    image: '🧊',
    description: 'High-capacity freezer for long-term frozen inventory.'
  },
  {
    id: 5,
    name: 'Modular Cold Room System',
    price: 15000,
    image: '❄️',
    description: 'Customizable modular cold room design for frozen goods.'
  },
  {
    id: 6,
    name: 'Walk-in Cooler Unit',
    price: 18000,
    image: '🚪',
    description: 'Easy access walk-in cooler for frozen food handling.'
  },
]

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return defaultProducts
    const stored = window.localStorage.getItem(CATALOG_STORAGE_KEY)
    return stored ? JSON.parse(stored) : defaultProducts
  })

  useEffect(() => {
    window.localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    setProducts(prev => [...prev, { ...product, id: nextId }])
  }

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => (p.id === product.id ? product : p)))
  }

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  return (
    <CatalogContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </CatalogContext.Provider>
  )
}

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider')
  }
  return context
}
