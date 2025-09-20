import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-2xl shadow-md overflow-hidden min-h-[70vh]">
      
      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center px-8 py-12 sm:px-12 h-full">
        {/* Tagline */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[2px] bg-gray-600"></div>
          <p className="text-gray-600 font-medium tracking-wide text-sm md:text-base">
            OUR BEST SELLERS
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
          Latest <span className="text-[#06858e]">Arrivals</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6 text-base sm:text-lg max-w-md">
          Discover our new collection with premium quality outfits designed for your style.  
          Upgrade your wardrobe with our trendiest picks.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate('/collection')}
          className="px-6 py-3 bg-[#06858e] text-white rounded-xl font-medium text-sm md:text-base shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Explore More →
        </button>
      </div>

      {/* Right Side Image */}
      <div className="w-full sm:w-1/2 h-full">
        <img
          src={assets.hero_img}
          alt="Latest Arrivals"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}
