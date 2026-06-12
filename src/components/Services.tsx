export default function Services() {
  const services = [
    {
      icon: '🛠️',
      title: 'Installation',
      description: 'Professional cold room installation with expert technicians'
    },
    {
      icon: '🔧',
      title: 'Maintenance',
      description: 'Regular maintenance and repair services to keep your system running'
    },
    {
      icon: '❄️',
      title: 'Consultation',
      description: 'Expert consultation for cold room design and specifications'
    },
    {
      icon: '📦',
      title: 'Spare Parts',
      description: 'Genuine spare parts and components available'
    },
    {
      icon: '🚚',
      title: 'Delivery',
      description: 'Fast and reliable delivery of products'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for emergencies'
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
