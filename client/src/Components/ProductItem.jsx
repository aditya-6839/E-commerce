import React, { useContext } from 'react'
import { shopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

export default function ProductItem({ id, image, name, price }) {
  const { currency } = useContext(shopContext)

  return (
    <Link
      to={`/product/${id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out text-gray-800"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={image[0]}
          alt={name}
        />
        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-600 mb-1 truncate">{name}</p>
        <p className="text-lg font-semibold text-gray-900">
          {currency} {price}
        </p>
      </div>
    </Link>
  )
}
