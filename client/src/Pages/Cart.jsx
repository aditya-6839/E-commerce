import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../Context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../Components/CartTotal'

export default function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(shopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let tempData = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData)
    }
  }, [cartItems, products])

  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="text-2xl sm:text-3xl font-semibold mb-6">
        <Title text1={"YOUR"} text2={" CART"} />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id)
          return (
            <div
              key={index}
              className="grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 py-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
            >
              {/* Product Info */}
              <div className="flex items-start gap-4 sm:gap-6">
                <img
                  className="w-16 sm:w-20 rounded-md object-cover"
                  src={productData.image[0]}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-sm sm:text-lg font-medium text-gray-800">{productData.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-gray-700">{currency} {productData.price}</p>
                    <p className="px-2 py-1 border border-gray-300 rounded-xl bg-gray-50 text-xs sm:text-sm">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity Input */}
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === 0
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className="border border-gray-300 rounded-xl text-center px-2 py-1 w-16 sm:w-20 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              {/* Remove Button */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                alt="Remove"
                className="w-5 sm:w-6 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
          )
        })}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-12">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-right">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm sm:text-base my-6 px-6 sm:px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
