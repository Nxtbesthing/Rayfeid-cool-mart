import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PaymentAccount, useCart } from '../CartContext'

const paymentAccounts: PaymentAccount[] = [
  {
    bank: 'Access Bank',
    accountNumber: '0014456302',
    accountName: 'Hilda Neyol Buenyen'
  },
  {
    bank: 'Opay',
    accountNumber: '8034748216',
    accountName: 'Hilda Neyol Buenyen'
  }
]

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, clearCart, setLastOrder } = useCart()
  const [selectedAccount, setSelectedAccount] = useState<PaymentAccount>(paymentAccounts[0])

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  )
  const tax = useMemo(() => subtotal * 0.1, [subtotal])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">Proceed to Checkout</h2>

        <div className="mb-10 rounded-3xl border border-cold-blue/20 bg-cold-light p-6 shadow-sm">
          <h3 className="text-2xl font-semibold mb-4">Payment Instructions</h3>
          <p className="mb-4 text-gray-700">
            Please choose one of the accounts below and send payment for your frozen food cold room order.
            After payment, contact us with your reference so we can confirm and process your installation or system delivery.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {paymentAccounts.map(account => (
              <button
                type="button"
                key={account.accountNumber}
                onClick={() => setSelectedAccount(account)}
                className={`rounded-2xl border p-5 text-left shadow-sm transition ${selectedAccount.accountNumber === account.accountNumber ? 'border-cold-blue bg-cold-blue/10' : 'border-gray-200 bg-white hover:border-cold-blue/60'}`}
              >
                <p className="text-sm text-gray-500">Bank</p>
                <p className="text-lg font-semibold text-cold-blue">{account.bank}</p>
                <p className="mt-3 text-sm text-gray-500">Account Number</p>
                <p className="text-lg font-medium">{account.accountNumber}</p>
                <p className="mt-3 text-sm text-gray-500">Account Name</p>
                <p className="text-lg font-medium">{account.accountName}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-cold-blue/5 p-6">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          {cartItems.length > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} total</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is empty. Add items before proceeding to payment.</p>
          )}

          {cartItems.length > 0 && (
            <div className="mt-8 text-right">
              <button
                type="button"
                onClick={() => {
                  const order = {
                    id: `ORD${Date.now()}`,
                    date: new Date().toLocaleDateString(),
                    items: cartItems,
                    subtotal,
                    tax,
                    total,
                    paymentAccount: selectedAccount
                  }
                  setLastOrder(order)
                  clearCart()
                  navigate('/receipt')
                }}
                className="inline-flex items-center rounded-full bg-cold-blue px-6 py-3 text-white font-semibold hover:bg-cyan-600 transition"
              >
                Confirm Payment & View Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
