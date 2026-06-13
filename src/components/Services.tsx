export default function Services() {
  const services = [
    {
      icon: '❄️',
      title: 'Ice Blocks',
      description: 'Custom planning for cold rooms optimized for frozen produce, poultry, and seafood.'
    },
    {
      icon: '📦',
      title: 'Freezer Components',
      description: 'High-quality refrigeration parts for reliable frozen food preservation.'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Fast delivery of cold rooms and refrigeration units.'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Emergency support for critical frozen food storage and temperature control issues.'
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
