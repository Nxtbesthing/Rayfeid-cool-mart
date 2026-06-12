import WhatsAppButton from './WhatsAppButton'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cold-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold text-cold-blue mb-4">Rayfield Cool Mart</h3>
            <p className="text-gray-400">
              Specialized frozen food cold room solutions for fish, chicken, and bulk freeze storage.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-cold-blue mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-cold-blue transition">Home</a></li>
              <li><a href="/services" className="hover:text-cold-blue transition">Services</a></li>
              <li><a href="/products" className="hover:text-cold-blue transition">Products</a></li>
              <li><a href="/contact" className="hover:text-cold-blue transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-cold-blue mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@rayfieldcoolmart.com</li>
              <li>📍 123 Cool Street, RC 12345</li>
              <li>� WhatsApp: 08034748216</li>
              <li>🕒 Frozen storage support 24/7</li>
            </ul>
            <div className="mt-6">
              <WhatsAppButton label="Chat on WhatsApp" />
            </div>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="text-center text-gray-400">
          <p>&copy; {currentYear} Rayfield Cool Mart. All rights reserved.</p>
          <p className="mt-2 text-sm">Dedicated to keeping your frozen food inventory perfectly chilled.</p>
        </div>
      </div>
    </footer>
  )
}
