import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Product } from './CartContext'

interface CatalogContextValue {
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (product: Product) => void
  deleteProduct: (productId: number) => void
}

const CATALOG_STORAGE_KEY = 'rayfield-cool-mart-catalog-v2'

const defaultProducts: Product[] = [
  {
    id: 1,
    page: 1,
    name: 'Horse Mackerel',
    price: 4800,
    image: 'horse-mackerel',
    description: 'Fresh frozen horse mackerel, ideal for cold room storage and seafood menus.'
  },
  {
    id: 2,
    page: 1,
    name: 'Herring (Shawa)',
    price: 3500,
    image: 'herring-shawa',
    description: 'Premium frozen herring ready for preservation in your cold room.'
  },
  {
    id: 3,
    page: 1,
    name: 'Titus',
    price: 7500,
    image: 'titus',
    description: 'High-quality frozen titus for dependable shelf life and flavor retention.'
  },
  {
    id: 4,
    page: 1,
    name: 'Kanfale',
    price: 3700,
    image: 'kanfale',
    description: 'Tender frozen kanfale, prepared for safe cold storage.'
  },
  {
    id: 5,
    page: 1,
    name: 'Dentex',
    price: 4600,
    image: 'dentex',
    description: 'Frozen dentex packaged for ideal frozen fish inventory management.'
  },
  {
    id: 6,
    page: 1,
    name: 'Tilapia',
    price: 4600,
    image: 'tilapia',
    description: 'Frozen tilapia fillets, ready for your refrigerated cold room system.'
  },
  {
    id: 7,
    page: 1,
    name: 'Rock Fish',
    price: 3600,
    image: 'rock-fish',
    description: 'Frozen rock fish with stable quality for long-term cold storage.'
  },
  {
    id: 8,
    page: 1,
    name: 'Bonito',
    price: 4100,
    image: 'bonito',
    description: 'Frozen bonito, suitable for seafood supply and cold room inventory.'
  },
  {
    id: 9,
    page: 1,
    name: 'Mullet',
    price: 3500,
    image: 'mullet',
    description: 'Classic frozen mullet for efficient cold storage and shipping.'
  },
  {
    id: 10,
    page: 1,
    name: 'Croaker',
    price: 5500,
    image: 'croaker',
    description: 'Fresh frozen croaker, perfect for your seafood cold room needs.'
  },
  {
    id: 11,
    page: 1,
    name: 'Bream',
    price: 5200,
    image: 'bream',
    description: 'Frozen bream with excellent frozen storage compatibility.'
  },
  {
    id: 12,
    page: 1,
    name: 'Hake',
    price: 5200,
    image: 'hake',
    description: 'Premium frozen hake ready for controlled cold room preservation.'
  },
  {
    id: 13,
    page: 2,
    name: 'Chicken',
    price: 4600,
    image: 'https://source.unsplash.com/640x480/?chicken-meat',
    description: 'Frozen chicken priced per kg, perfect for meat cold room storage.'
  },
  {
    id: 14,
    page: 2,
    name: 'Cow Tail',
    price: 4600,
    image: 'https://source.unsplash.com/640x480/?cow-tail',
    description: 'Frozen cow tail ready for long-term storage in your meat cold room.'
  },
  {
    id: 15,
    page: 2,
    name: 'Beef',
    price: 4600,
    image: 'beef',
    description: 'Premium frozen beef for optimized cold room inventory management.'
  },
  {
    id: 16,
    page: 2,
    name: 'Beef Entrecôte',
    price: 4600,
    image: 'beef-entrecote',
    description: 'Frozen beef entrecôte with excellent quality for cold storage and retail.'
  },
  {
    id: 17,
    page: 2,
    name: 'Minced Beef',
    price: 550,
    image: 'minced-beef',
    description: 'Frozen minced beef for flexible meal preparation and cold room preservation.'
  },
  {
    id: 18,
    page: 2,
    name: 'Cow Spleen',
    price: 4600,
    image: 'https://source.unsplash.com/640x480/?cow-spleen',
    description: 'Frozen cow spleen for specialty meat inventory and chilled storage.'
  },
  {
    id: 19,
    page: 2,
    name: 'Clean Shaki',
    price: 500,
    image: 'https://source.unsplash.com/640x480/?clean-shaki',
    description: 'Fresh frozen clean shaki ready for safe storage in your cold room.'
  },
  {
    id: 20,
    page: 2,
    name: 'Liver/Kidney',
    price: 4500,
    image: 'https://source.unsplash.com/640x480/?liver-kidney',
    description: 'Frozen liver and kidney combo for durable cold storage and quick preparation.'
  },
  {
    id: 21,
    page: 2,
    name: 'Goat Meat',
    price: 550,
    image: 'https://source.unsplash.com/640x480/?goat-meat',
    description: 'Frozen goat meat priced for bulk cold room storage and easy order fulfillment.'
  },
  {
    id: 22,
    page: 2,
    name: 'Cow Leg',
    price: 4100,
    image: 'https://source.unsplash.com/640x480/?cow-leg',
    description: 'Frozen cow leg intended for stable cold room preservation and strong inventory control.'
  },
  {
    id: 23,
    page: 3,
    name: 'Shrimps 13,000/kg',
    price: 13000,
    image: 'https://source.unsplash.com/640x480/?shrimp',
    description: 'Premium frozen shrimps sold by the kilogram for seafood cold storage.'
  },
  {
    id: 24,
    page: 3,
    name: 'Shrimps 8,000 / 500g',
    price: 8000,
    image: 'https://source.unsplash.com/640x480/?shrimp-500g',
    description: 'Frozen shrimps portioned in 500g packs for smaller cold room servings.'
  },
  {
    id: 25,
    page: 3,
    name: 'Shrimps 4,500 / 250g',
    price: 4500,
    image: 'https://source.unsplash.com/640x480/?shrimp-250g',
    description: 'Frozen shrimps in 250g packs for retail cold storage and quick preparation.'
  },
  {
    id: 26,
    page: 3,
    name: 'Shelly Scallop',
    price: 4300,
    image: 'https://source.unsplash.com/640x480/?scallop',
    description: 'Frozen shelly scallop for premium seafood cold room merchandising.'
  },
  {
    id: 27,
    page: 3,
    name: 'Chicken Gizzard',
    price: 5100,
    image: 'https://source.unsplash.com/640x480/?chicken-gizzard',
    description: 'Frozen chicken gizzard for specialty meat cold storage and processing.'
  },
  {
    id: 28,
    page: 3,
    name: 'Sausage (Chicken)',
    price: 3600,
    image: 'https://source.unsplash.com/640x480/?chicken-sausage',
    description: 'Frozen chicken sausage ready for refrigerated storage and retail sale.'
  },
  {
    id: 29,
    page: 3,
    name: 'Sausage (Beef)',
    price: 3600,
    image: 'beef-sausage',
    description: 'Frozen beef sausage for cold room inventory and convenient order fulfillment.'
  },
  {
    id: 30,
    page: 3,
    name: 'Crayfish',
    price: 5100,
    image: 'https://source.unsplash.com/640x480/?crayfish',
    description: 'Frozen crayfish supplied for seafood cold room handling and preservation.'
  },
  {
    id: 31,
    page: 3,
    name: 'Catfish',
    price: 5100,
    image: 'https://source.unsplash.com/640x480/?catfish',
    description: 'Frozen catfish for reliable cold room storage and seafood wholesale.'
  },
  {
    id: 32,
    page: 3,
    name: 'Prawns 24,100/kg',
    price: 24100,
    image: 'https://source.unsplash.com/640x480/?prawns',
    description: 'Premium prawns sold by kilogram for high-end frozen seafood inventory.'
  },
  {
    id: 33,
    page: 3,
    name: 'Prawns 13,100 / 500g',
    price: 13100,
    image: 'https://source.unsplash.com/640x480/?prawns-500g',
    description: 'Frozen prawns portioned into 500g packs for cold room stocking.'
  },
  {
    id: 34,
    page: 3,
    name: 'Mini Sausage',
    price: 2600,
    image: 'https://source.unsplash.com/640x480/?mini-sausage',
    description: 'Frozen mini sausages ideal for small batch cold storage and quick service.'
  },
  {
    id: 35,
    page: 3,
    name: 'Crabs 9,000/kg',
    price: 9000,
    image: 'https://source.unsplash.com/640x480/?crabs',
    description: 'Premium frozen crabs sold by kilogram for seafood cold room supply.'
  },
  {
    id: 36,
    page: 3,
    name: 'Crabs 5,000 / 500g',
    price: 5000,
    image: 'https://source.unsplash.com/640x480/?crabs-500g',
    description: 'Frozen crab portions in 500g packs for retail cold storage.'
  },
  {
    id: 37,
    page: 3,
    name: 'Calamari 27,000/kg',
    price: 27000,
    image: 'https://source.unsplash.com/640x480/?calamari,seafood',
    description: 'High-grade frozen calamari sold by kilogram for premium storage.'
  },
  {
    id: 38,
    page: 3,
    name: 'Calamari 12,000 / 500g',
    price: 12000,
    image: 'https://source.unsplash.com/640x480/?calamari,seafood',
    description: 'Frozen calamari in 500g packs for seafood retail cold rooms.'
  },
]

const imageUrlPattern = /^(https?:\/\/|data:image\/)/
const isValidImageUrl = (image: unknown): image is string => typeof image === 'string' && imageUrlPattern.test(image)

// Resolve local image files to their built URLs so products use actual assets when available
const localImageModules = import.meta.glob('./assets/images/fish/*.{png,jpg,jpeg,svg}', { eager: true }) as Record<string, { default: string }>
const localImages: Record<string, string> = Object.fromEntries(
  Object.entries(localImageModules).map(([path, module]) => {
    const name = path.split('/').pop()?.replace(/\.[^.]+$/, '').toLowerCase() ?? path
    return [name, (module as any).default]
  })
)

const defaultImageMap: Record<string, string> = {}
defaultProducts.forEach(product => {
  const imgField = product.image
  const resolved = typeof imgField === 'string' && !imageUrlPattern.test(imgField) ? (localImages[String(imgField).toLowerCase()] ?? imgField) : imgField
  defaultImageMap[product.name] = resolved
})

function migrateStoredProducts(stored: unknown): Product[] | null {
  if (!Array.isArray(stored)) return null

  return stored.map(item => {
    if (!item || typeof item !== 'object') return item as Product

    const product = item as Product
    const image = isValidImageUrl(product.image)
      ? product.image
      : defaultImageMap[product.name] ?? product.image

    return {
      ...product,
      page: product.page ?? 1,
      image,
    }
  })
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === 'undefined') return defaultProducts
    const stored = window.localStorage.getItem(CATALOG_STORAGE_KEY)
    if (!stored) {
      return defaultProducts.map(p => ({ ...p, image: defaultImageMap[p.name] ?? p.image }))
    }

    try {
      const parsed = JSON.parse(stored)
      const migrated = migrateStoredProducts(parsed)
      return migrated ?? defaultProducts
    } catch {
      return defaultProducts
    }
  })

  useEffect(() => {
    window.localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    setProducts(prev => [...prev, { ...product, id: nextId, page: product.page ?? 1 }])
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
