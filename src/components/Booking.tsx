import { useMemo, useState } from 'react'
import { useCatalog } from '../CatalogContext'
import { WHATSAPP_PHONE } from '../config/contacts'

type BookingItem = { id: number; name: string; price: number; quantity: number }

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'bulk-order',
    category: '1',
    notes: '',
    items: [] as BookingItem[],
  })

  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingBooking, setPendingBooking] = useState<any | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const booking = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      service: formData.service,
      category: formData.category,
      notes: formData.notes,
      items: formData.items || [],
      subtotal: (formData.items || []).reduce((s: number, it: any) => s + (it.price || 0) * (it.quantity || 0), 0),
      createdAt: new Date().toISOString(),
    }

    setPendingBooking(booking)
    setShowConfirm(true)
  }

  const confirmAndSend = async () => {
    if (!pendingBooking) return
    setSubmitting(true)
    try {
      // Try server-side submission
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingBooking),
      })

      if (!res.ok) throw new Error(`Server responded ${res.status}`)

      // On success, open WhatsApp with the same message and reset
      const PHONE = WHATSAPP_PHONE
      const lines: string[] = []
      lines.push('Bulk order booking request')
      lines.push('Name: ' + (pendingBooking.name || '-'))
      lines.push('Email: ' + (pendingBooking.email || '-'))
      lines.push('Phone: ' + (pendingBooking.phone || '-'))
      lines.push('Category: ' + (pendingBooking.category === '1' ? 'Frozen Fish (Page 1)' : pendingBooking.category === '2' ? 'Meats (Page 2)' : 'Sea Foods (Page 3)'))
      lines.push('Date: ' + (pendingBooking.date || '-'))
      lines.push('Time: ' + (pendingBooking.time || '-'))
      if (pendingBooking.items && pendingBooking.items.length > 0) {
        lines.push('\nItems:')
        pendingBooking.items.forEach((it: any) => {
          lines.push(`- ${it.name} x${it.quantity} — ₦${it.price}`)
        })
        lines.push('\nEstimated total: ₦' + (pendingBooking.subtotal || 0))
      }
      if (pendingBooking.notes) lines.push('\nNotes: ' + pendingBooking.notes)

      const message = encodeURIComponent(lines.join('\n'))
      const waUrl = `https://wa.me/${PHONE}?text=${message}`
      if (typeof window !== 'undefined') window.open(waUrl, '_blank')

      // Reset
      setFormData(prev => ({ ...prev, name: '', email: '', phone: '', date: '', time: '', notes: '', items: [] }))
      setPendingBooking(null)
      setShowConfirm(false)
    } catch (err) {
      console.error('Server submission failed', err)
      // Fallback: save locally, then open WhatsApp so user can send
      try {
        const KEY = 'rayfield-bulk-bookings'
        const stored = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(KEY) || '[]') : []
        stored.push(pendingBooking)
        if (typeof window !== 'undefined') window.localStorage.setItem(KEY, JSON.stringify(stored))
      } catch (err2) {
        console.error('Fallback local save failed', err2)
      }

      alert('Server submission failed — saved locally. Redirecting to WhatsApp to finish submission.')
      const PHONE = WHATSAPP_PHONE
      const message = encodeURIComponent('Bulk order request: ' + (pendingBooking?.notes || ''))
      const waUrl = `https://wa.me/${PHONE}?text=${message}`
      if (typeof window !== 'undefined') window.open(waUrl, '_blank')

      setFormData(prev => ({ ...prev, name: '', email: '', phone: '', date: '', time: '', notes: '', items: [] }))
      setPendingBooking(null)
      setShowConfirm(false)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const { products } = useCatalog()

  const suggestions = useMemo(
    () => products.filter(p => String(p.page) === formData.category).slice(0, 15),
    [products, formData.category]
  )

  const subtotal = useMemo(() => {
    const items = (formData.items || []) as BookingItem[]
    return items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0)
  }, [formData.items])

  const addSuggestion = (product: { id: number; name: string; price: number }) => {
    setFormData((prev) => {
      const existing = (prev.items as BookingItem[]).find((i) => i.id === product.id)
      if (existing) {
        return {
          ...prev,
          items: (prev.items as BookingItem[]).map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)),
        }
      }
      return {
        ...prev,
        items: [...(prev.items as BookingItem[]), { id: product.id, name: product.name, price: product.price, quantity: 1 }],
      }
    })
  }

  const increaseQty = (id: number) =>
    setFormData((prev) => ({
      ...prev,
      items: (prev.items as BookingItem[]).map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
    }))

  const decreaseQty = (id: number) =>
    setFormData((prev) => ({
      ...prev,
      items: (prev.items as BookingItem[]).map((i) => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i)),
    }))

  const removeItem = (id: number) =>
    setFormData((prev) => ({ ...prev, items: (prev.items as BookingItem[]).filter((i) => i.id !== id) }))

  return (
    <section className="py-16 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Book Bulk Order</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-cold-light p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            >
              <option value="bulk-order">Bulk Order</option>
              <option value="installation">Installation</option>
              <option value="maintenance">Maintenance</option>
            </select>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
            >
              <option value="1">Frozen Fish (Page 1)</option>
              <option value="2">Meats (Page 2)</option>
              <option value="3">Sea Foods (Page 3)</option>
            </select>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Suggested items from selected category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map(s => (
                  <div key={s.id} className="flex justify-between items-center bg-white p-2 border rounded">
                    <div className="text-sm">
                      {s.name} — ₦{s.price}
                    </div>
                    <button type="button" onClick={() => addSuggestion(s)} className="ml-2 text-sm text-cold-blue">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.items && formData.items.length > 0 && (
            <div className="mt-4 bg-white p-3 rounded border">
              <h4 className="font-semibold mb-2">Selected items</h4>
              <div className="space-y-2">
                {(formData.items as BookingItem[]).map((it) => (
                  <div key={it.id} className="flex items-center justify-between">
                    <div className="text-sm">
                      {it.name} — ₦{it.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => decreaseQty(it.id)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                      <div className="px-2">{it.quantity}</div>
                      <button type="button" onClick={() => increaseQty(it.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                      <button type="button" onClick={() => removeItem(it.id)} className="ml-2 text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {subtotal > 0 && (
            <div className="mt-3 text-right text-lg font-semibold">
              Estimated total: ₦{subtotal.toLocaleString()}
            </div>
          )}

          <textarea
            name="notes"
            placeholder="Tell us about your frozen food storage requirements..."
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-cold-blue"
          />

          <button
            type="submit"
            className="w-full bg-cold-blue text-white py-3 rounded font-semibold hover:bg-cyan-600 transition"
          >
            Book Bulk Order
          </button>

          {showConfirm && pendingBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="w-full max-w-lg bg-white rounded p-6">
                <h3 className="text-xl font-semibold mb-4">Confirm bulk order booking</h3>
                <div className="text-sm mb-4">
                  <div><strong>Name:</strong> {pendingBooking.name || '-'}</div>
                  <div><strong>Phone:</strong> {pendingBooking.phone || '-'}</div>
                  <div><strong>Category:</strong> {pendingBooking.category === '1' ? 'Frozen Fish (Page 1)' : pendingBooking.category === '2' ? 'Meats (Page 2)' : 'Sea Foods (Page 3)'}</div>
                  <div className="mt-2"><strong>Items:</strong></div>
                  <div className="ml-4">
                    {(pendingBooking.items || []).map((it: any) => (
                      <div key={it.id}>{it.name} x{it.quantity} — ₦{it.price}</div>
                    ))}
                  </div>
                  <div className="mt-2"><strong>Estimated total:</strong> ₦{pendingBooking.subtotal?.toLocaleString?.() ?? pendingBooking.subtotal}</div>
                  {pendingBooking.notes && <div className="mt-2"><strong>Notes:</strong> {pendingBooking.notes}</div>}
                </div>

                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => { setShowConfirm(false); setPendingBooking(null) }} className="px-4 py-2 border rounded">Cancel</button>
                  <button type="button" onClick={confirmAndSend} disabled={submitting} className="px-4 py-2 bg-cold-blue text-white rounded">
                    {submitting ? 'Sending...' : 'Confirm & Send'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
