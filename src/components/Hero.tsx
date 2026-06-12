import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-cold-dark to-cold-blue text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Rayfield Cool Mart</h1>
          <p className="text-xl mb-8 text-gray-200">
            Premium cold room solutions built for frozen food storage — fish, chicken, and bulk frozen inventory.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="bg-cold-blue hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition">
              Explore Cold Room Systems
            </Link>
            <Link to="/booking" className="bg-white hover:bg-gray-200 text-cold-dark px-8 py-3 rounded-lg font-semibold transition">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
