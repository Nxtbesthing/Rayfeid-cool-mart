import { useState } from 'react'
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, DELIVERY_DISPLAY } from '../config/contacts'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you! Your message has been sent. We will contact you soon about your frozen food cold room needs.')
    console.log('Contact form data:', formData)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>

            <div>
              <h4 className="font-semibold text-cold-blue mb-2">📍 Address</h4>
              <p className="text-gray-600">123 Cool Street, Refrigeration City, RC 12345</p>
            </div>

            <div>
              <h4 className="font-semibold text-cold-blue mb-2">📞 Phone</h4>
              <p className="text-gray-600">{DELIVERY_DISPLAY}</p>
            </div>

            <div>
              <h4 className="font-semibold text-cold-blue mb-2">📧 Email</h4>
              <p className="text-gray-600">info@rayfieldcoolmart.com</p>
              <p className="text-gray-600">support@rayfieldcoolmart.com</p>
            </div>

            <div>
              <h4 className="font-semibold text-cold-blue mb-2">📱 WhatsApp</h4>
              <p className="text-gray-600">Chat with us directly for order support and payment verification.</p>
              <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noreferrer" className="text-cold-blue font-semibold hover:text-cyan-400 transition">
                {WHATSAPP_DISPLAY}
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-cold-blue mb-2">�🕒 Business Hours</h4>
              <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-gray-600">Sunday: Closed (Emergency Support for frozen storage: 24/7)</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />

            <textarea
              name="message"
              placeholder="Tell us about your frozen food storage needs..."
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />

            <button
              type="submit"
              className="w-full bg-cold-blue text-white py-3 rounded font-semibold hover:bg-cyan-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
