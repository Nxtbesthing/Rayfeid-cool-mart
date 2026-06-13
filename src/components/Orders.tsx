import { formatNaira } from '../utils/formatCurrency'

export default function Orders() {
  const orders = [
    {
      id: 'ORD001',
      date: '2024-06-01',
      status: 'Completed',
      total: 6500,
      items: 'Small fish and poultry cold room + installation'
    },
    {
      id: 'ORD002',
      date: '2024-06-05',
      status: 'In Progress',
      total: 18000,
      items: 'Medium frozen food cold room + maintenance service'
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">My Orders</h2>

        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order.id} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Order ID</p>
                    <p className="font-semibold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className={`font-semibold ${order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total</p>
                    <p className="font-semibold text-cold-blue text-lg">{formatNaira(order.total)}</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-3">{order.items}</p>
                <button className="mt-3 text-cold-blue hover:text-cyan-600 font-semibold">View Details</button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No frozen food cold room orders yet</p>
          )}
        </div>
      </div>
    </section>
  )
}
