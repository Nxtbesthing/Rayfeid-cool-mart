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
import FloatingCart from './components/FloatingCart'
import { CartProvider } from './CartContext'
import { CatalogProvider } from './CatalogContext'
import { AuthProvider, RequireAdmin, RequireAuth } from './AuthContext'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CatalogManagement from './pages/CatalogManagement'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <FloatingCart />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<RequireAuth />}>
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
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<RequireAdmin />}>
                <Route path="/admin" element={<CatalogManagement />} />
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  )
}

export default App
