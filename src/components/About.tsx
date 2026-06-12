export default function About() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">About Rayfield Cool Mart</h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Rayfield Cool Mart is a leading provider of premium cold room solutions for businesses across various industries. 
            With over a decade of experience, we've been committed to delivering high-quality, reliable cooling solutions 
            that meet the specific needs of our clients.
          </p>

          <h3 className="text-2xl font-semibold text-cold-dark">Our Mission</h3>
          <p>
            To provide innovative, cost-effective cold room solutions that help businesses maintain product quality, 
            ensure food safety, and maximize operational efficiency.
          </p>

          <h3 className="text-2xl font-semibold text-cold-dark">Why Choose Us?</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Expert technicians with years of experience</li>
            <li>Custom solutions tailored to your specific needs</li>
            <li>High-quality materials and components</li>
            <li>Competitive pricing and flexible payment options</li>
            <li>Comprehensive after-sales support and maintenance</li>
            <li>24/7 emergency support for urgent issues</li>
          </ul>

          <h3 className="text-2xl font-semibold text-cold-dark">Our Track Record</h3>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">500+</p>
              <p className="text-gray-600">Installations</p>
            </div>
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">1000+</p>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">10+</p>
              <p className="text-gray-600">Years Experience</p>
            </div>
          </div>

          <p>
            Contact us today to learn more about how Rayfield Cool Mart can help your business stay cool and competitive.
          </p>
        </div>
      </div>
    </section>
  )
}
