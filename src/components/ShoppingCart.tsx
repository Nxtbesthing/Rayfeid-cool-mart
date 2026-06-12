export default function ShoppingCart() {
  const cartItems = [
    { id: 1, name: 'Small Cold Room (2x2m)', price: 5000, quantity: 1 },
    { id: 2, name: 'Installation Service', price: 1500, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Shopping Cart</h2>

        <div className="space-y-4 mb-8">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-cold-blue">${item.price}</p>
                  <button className="text-red-500 text-sm hover:text-red-700">Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">Your cart is empty</p>
          )}
        </div>

        <div className="bg-cold-light p-6 rounded-lg">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t pt-2">
              <span>Total:</span>
              <span className="text-cold-blue">${total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-cold-blue text-white py-3 rounded font-semibold hover:bg-cyan-600 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  )
}
