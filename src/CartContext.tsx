import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface CartItem extends Product {
  quantity: number
}

export interface PaymentAccount {
  bank: string
  accountNumber: string
  accountName: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
  paymentAccount: PaymentAccount
}

interface CartContextValue {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  cartItemCount: number
  lastOrder: Order | null
  setLastOrder: (order: Order) => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id)
      if (existing) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const cartItemCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems]
  )

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartItemCount, lastOrder, setLastOrder }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
