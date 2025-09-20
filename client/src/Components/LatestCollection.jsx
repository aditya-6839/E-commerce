import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

export default function LatestCollection() {
  const { products } = useContext(shopContext)
  const [latestProduct, setLatestProduct] = useState([])

  useEffect(() => {
    setLatestProduct(products.slice(0, 10))
  }, [products])

  return (
    <section className="my-16 px-4 sm:px-8">
      {/* Section Header */}
      <div className="text-center mb-10">
        <Title text1="LATEST" text2=" COLLECTION" />
        <p className="max-w-2xl mx-auto text-gray-500 text-sm sm:text-base">
          Discover our newest arrivals crafted for style and comfort. Explore what’s trending now!
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProduct.map((item) => (
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
