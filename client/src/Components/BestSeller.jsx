import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

export default function BestSeller() {
  const { products } = useContext(shopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller)
    setBestSeller(bestProducts.slice(0, 5))
  }, [products])

  return (
    <section className="my-16 px-4 sm:px-8 bg-gray-50 py-10 rounded-2xl">
      {/* Section Header */}
      <div className="text-center mb-10">
        <Title text1="BEST" text2=" SELLERS" />
        <p className="max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
          Check out our top-rated and most popular items loved by our customers!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  )
}
