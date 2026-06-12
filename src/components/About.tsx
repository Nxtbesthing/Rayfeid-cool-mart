export default function About() {
  return (
    <section className="relative py-16 bg-white">
      <div className="ice-cube top-8 right-10" />
      <div className="ice-cube-small left-6 top-28" />
      <div className="ice-cube-small right-24 bottom-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-bold mb-8">About Rayfield Cool Mart</h2>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Rayfield Cool Mart specializes in cold room solutions built for frozen food storage. Our systems are designed
            specifically to protect fisheries, poultry suppliers, and food distributors who need reliable storage for fish,
            chicken, meat, and other frozen goods.
          </p>

          <h3 className="text-2xl font-semibold text-cold-dark">Why Our Cold Rooms?</h3>
          <p>
            We deliver cold rooms that maintain consistent low temperatures, preserve freshness, and prevent spoilage for
            frozen foods. Our designs are tailored for the unique demands of fish, chicken, and bulk frozen inventory.
          </p>

          <h3 className="text-2xl font-semibold text-cold-dark">What We Offer</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Custom cold room layouts for frozen food storage</li>
            <li>Fast, reliable cooling systems for fish and poultry</li>
            <li>Durable insulation and hygienic interior finishes</li>
            <li>Secure temperature control for long-term freshness</li>
            <li>Easy access and efficient organization for frozen inventory</li>
            <li>Complete installation and maintenance support</li>
          </ul>

          <h3 className="text-2xl font-semibold text-cold-dark">Designed for Frozen Food Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">Fish</p>
              <p className="text-gray-600">Cold rooms optimized for seafood preservation</p>
            </div>
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">Chicken</p>
              <p className="text-gray-600">Safe storage for poultry and frozen poultry products</p>
            </div>
            <div className="text-center p-4 bg-cold-light rounded">
              <p className="text-3xl font-bold text-cold-blue">Frozen Goods</p>
              <p className="text-gray-600">Flexible cold rooms for any frozen inventory</p>
            </div>
          </div>

          <p>
            Get in touch with Rayfield Cool Mart for a cold room that keeps your frozen foods perfectly chilled from delivery
            to dispatch.
          </p>
        </div>
      </div>
    </section>
  )
}
