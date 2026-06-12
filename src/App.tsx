import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Products from './components/Products'
import Booking from './components/Booking'
import ShoppingCart from './components/ShoppingCart'
import Orders from './components/Orders'
import Checkout from './pages/Checkout'
import Receipt from './pages/Receipt'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { CartProvider } from './CartContext'
import './App.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<><Hero /><Services /><Products /></>} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
