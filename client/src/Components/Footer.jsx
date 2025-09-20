import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-10 text-gray-700">
        
        {/* Logo & Description */}
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#06f7f7] to-[#06858e] bg-clip-text text-transparent tracking-wide mb-5">
            Outflair
          </h3>
          <p className="text-gray-600 max-w-md">
            Outflair is your go-to destination for the latest fashion trends and timeless wardrobe essentials. We deliver high-quality clothing and accessories that elevate your style and bring confidence to every look.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <Link to="/" className="hover:text-[#06858e] transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#06858e] transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#06858e] transition-colors">Delivery</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#06858e] transition-colors">Product Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-987-654-3210</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-200">
        <p className="py-5 text-sm text-center text-gray-500">
          &copy; 2025 Outflair - All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
