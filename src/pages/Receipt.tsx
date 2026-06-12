import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function Receipt() {
  const { lastOrder } = useCart()

  const downloadReceipt = () => {
    if (!lastOrder) return

    const receiptText = [
      'Rayfield Cool Mart',
      'Payment Receipt',
      `Order ID: ${lastOrder.id}`,
      `Date: ${lastOrder.date}`,
      '\nPayment Account:',
      `Bank: ${lastOrder.paymentAccount.bank}`,
      `Account Number: ${lastOrder.paymentAccount.accountNumber}`,
      `Account Name: ${lastOrder.paymentAccount.accountName}`,
      '\nOrder Summary:',
      ...lastOrder.items.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`),
      '\nSubtotal: $' + lastOrder.subtotal.toFixed(2),
      'Tax: $' + lastOrder.tax.toFixed(2),
      'Total: $' + lastOrder.total.toFixed(2),
      '\nThank you for your payment!'
    ].join('\n')

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receipt-${lastOrder.id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (!lastOrder) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">No Receipt Found</h2>
          <p className="text-gray-600 mb-6">It looks like you haven't completed a payment yet.</p>
          <Link to="/products" className="inline-flex rounded-full bg-cold-blue px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition">
            Continue Shopping
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-cold-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-cold-blue/20 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-4xl font-bold">Frozen Food Cold Room Receipt</h2>
              <p className="text-gray-600">Order {lastOrder.id} • {lastOrder.date}</p>
            </div>
            <div className="rounded-3xl bg-cold-blue/10 px-5 py-3 text-cold-blue font-semibold">
              Paid ${lastOrder.total.toFixed(2)}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 bg-cold-light p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Account</h3>
              <p className="text-gray-500">Bank</p>
              <p className="font-semibold text-cold-blue">{lastOrder.paymentAccount.bank}</p>
              <p className="mt-4 text-gray-500">Account Number</p>
              <p className="font-semibold">{lastOrder.paymentAccount.accountNumber}</p>
              <p className="mt-4 text-gray-500">Account Name</p>
              <p className="font-semibold">{lastOrder.paymentAccount.accountName}</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-cold-light p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3">
                {lastOrder.items.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500 text-sm">Qty {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2 border-t border-gray-200 pt-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${lastOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${lastOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-cold-blue">
                  <span>Total</span>
                  <span>${lastOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex gap-3 flex-wrap">
              <Link to="/products" className="inline-flex rounded-full bg-cold-blue px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition">
                Continue Browsing
              </Link>
              <button
                type="button"
                onClick={downloadReceipt}
                className="inline-flex rounded-full bg-cold-dark px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
              >
                Download Receipt
              </button>
            </div>
            <p className="text-gray-600">Thank you for your payment. We will confirm your frozen food cold room setup shortly.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
