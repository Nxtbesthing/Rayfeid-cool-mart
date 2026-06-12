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
    name: 'Horse Mackerel',
    price: 4800,
    image: '🐟',
    description: 'Fresh frozen horse mackerel, ideal for cold room storage and seafood menus.'
  },
  {
    id: 2,
    name: 'Herring (Shawa)',
    price: 3500,
    image: '🐠',
    description: 'Premium frozen herring ready for preservation in your cold room.'
  },
  {
    id: 3,
    name: 'Titus',
    price: 7500,
    image: '🐟',
    description: 'High-quality frozen titus for dependable shelf life and flavor retention.'
  },
  {
    id: 4,
    name: 'Kanfale',
    price: 3700,
    image: '🐠',
    description: 'Tender frozen kanfale, prepared for safe cold storage.'
  },
  {
    id: 5,
    name: 'Dentex',
    price: 4600,
    image: '🐟',
    description: 'Frozen dentex packaged for ideal frozen fish inventory management.'
  },
  {
    id: 6,
    name: 'Tilapia',
    price: 4600,
    image: '🐟',
    description: 'Frozen tilapia fillets, ready for your refrigerated cold room system.'
  },
  {
    id: 7,
    name: 'Rock Fish',
    price: 3600,
    image: '🐟',
    description: 'Frozen rock fish with stable quality for long-term cold storage.'
  },
  {
    id: 8,
    name: 'Bonito',
    price: 4100,
    image: '🐠',
    description: 'Frozen bonito, suitable for seafood supply and cold room inventory.'
  },
  {
    id: 9,
    name: 'Mullet',
    price: 3500,
    image: '🐟',
    description: 'Classic frozen mullet for efficient cold storage and shipping.'
  },
  {
    id: 10,
    name: 'Croaker',
    price: 5500,
    image: '🐠',
    description: 'Fresh frozen croaker, perfect for your seafood cold room needs.'
  },
  {
    id: 11,
    name: 'Bream',
    price: 5200,
    image: '🐟',
    description: 'Frozen bream with excellent frozen storage compatibility.'
  },
  {
    id: 12,
    name: 'Hake',
    price: 5200,
    image: '🐠',
    description: 'Premium frozen hake ready for controlled cold room preservation.'
  },
  {
    id: 13,
    name: 'Chicken',
    price: 4600,
    image: '🐔',
    description: 'Frozen chicken priced per kg, perfect for meat cold room storage.'
  },
  {
    id: 14,
    name: 'Cow Tail',
    price: 4600,
    image: '🐄',
    description: 'Frozen cow tail ready for long-term storage in your meat cold room.'
  },
  {
    id: 15,
    name: 'Beef',
    price: 4600,
    image: '🥩',
    description: 'Premium frozen beef for optimized cold room inventory management.'
  },
  {
    id: 16,
    name: 'Beef Entrecôte',
    price: 4600,
    image: '🥩',
    description: 'Frozen beef entrecôte with excellent quality for cold storage and retail.'
  },
  {
    id: 17,
    name: 'Minced Beef',
    price: 550,
    image: '🥩',
    description: 'Frozen minced beef for flexible meal preparation and cold room preservation.'
  },
  {
    id: 18,
    name: 'Cow Spleen',
    price: 4600,
    image: '🐄',
    description: 'Frozen cow spleen for specialty meat inventory and chilled storage.'
  },
  {
    id: 19,
    name: 'Clean Shaki',
    price: 500,
    image: '🍖',
    description: 'Fresh frozen clean shaki ready for safe storage in your cold room.'
  },
  {
    id: 20,
    name: 'Liver/Kidney',
    price: 4500,
    image: '🍖',
    description: 'Frozen liver and kidney combo for durable cold storage and quick preparation.'
  },
  {
    id: 21,
    name: 'Goat Meat',
    price: 550,
    image: '🐐',
    description: 'Frozen goat meat priced for bulk cold room storage and easy order fulfillment.'
  },
  {
    id: 22,
    name: 'Cow Leg',
    price: 4100,
    image: '🐄',
    description: 'Frozen cow leg intended for stable cold room preservation and strong inventory control.'
  },
  {
    id: 23,
    name: 'Shrimps 13,000/kg',
    price: 13000,
    image: '🦐',
    description: 'Premium frozen shrimps sold by the kilogram for seafood cold storage.'
  },
  {
    id: 24,
    name: 'Shrimps 8,000 / 500g',
    price: 8000,
    image: '🦐',
    description: 'Frozen shrimps portioned in 500g packs for smaller cold room servings.'
  },
  {
    id: 25,
    name: 'Shrimps 4,500 / 250g',
    price: 4500,
    image: '🦐',
    description: 'Frozen shrimps in 250g packs for retail cold storage and quick preparation.'
  },
  {
    id: 26,
    name: 'Shelly Scallop',
    price: 4300,
    image: '🦪',
    description: 'Frozen shelly scallop for premium seafood cold room merchandising.'
  },
  {
    id: 27,
    name: 'Chicken Gizzard',
    price: 5100,
    image: '🍗',
    description: 'Frozen chicken gizzard for specialty meat cold storage and processing.'
  },
  {
    id: 28,
    name: 'Sausage (Chicken)',
    price: 3600,
    image: '🌭',
    description: 'Frozen chicken sausage ready for refrigerated storage and retail sale.'
  },
  {
    id: 29,
    name: 'Sausage (Beef)',
    price: 3600,
    image: '🌭',
    description: 'Frozen beef sausage for cold room inventory and convenient order fulfillment.'
  },
  {
    id: 30,
    name: 'Crayfish',
    price: 5100,
    image: '🦞',
    description: 'Frozen crayfish supplied for seafood cold room handling and preservation.'
  },
  {
    id: 31,
    name: 'Catfish',
    price: 5100,
    image: '🐟',
    description: 'Frozen catfish for reliable cold room storage and seafood wholesale.'
  },
  {
    id: 32,
    name: 'Prawns 24,100/kg',
    price: 24100,
    image: '🦐',
    description: 'Premium prawns sold by kilogram for high-end frozen seafood inventory.'
  },
  {
    id: 33,
    name: 'Prawns 13,100 / 500g',
    price: 13100,
    image: '🦐',
    description: 'Frozen prawns portioned into 500g packs for cold room stocking.'
  },
  {
    id: 34,
    name: 'Mini Sausage',
    price: 2600,
    image: '🌭',
    description: 'Frozen mini sausages ideal for small batch cold storage and quick service.'
  },
  {
    id: 35,
    name: 'Crabs 9,000/kg',
    price: 9000,
    image: '🦀',
    description: 'Premium frozen crabs sold by kilogram for seafood cold room supply.'
  },
  {
    id: 36,
    name: 'Crabs 5,000 / 500g',
    price: 5000,
    image: '🦀',
    description: 'Frozen crab portions in 500g packs for retail cold storage.'
  },
  {
    id: 37,
    name: 'Calamari 27,000/kg',
    price: 27000,
    image: '🦑',
    description: 'High-grade frozen calamari sold by kilogram for premium storage.'
  },
  {
    id: 38,
    name: 'Calamari 12,000 / 500g',
    price: 12000,
    image: '🦑',
    description: 'Frozen calamari in 500g packs for seafood retail cold rooms.'
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
