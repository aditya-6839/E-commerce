import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../Components/RelatedProducts'

export default function Product() {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(shopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId)
    if (foundProduct) {
      setProductData(foundProduct)
      setImage(foundProduct.image[0])
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Product data */}
      <div className="flex flex-col sm:flex-row gap-8">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)}
                className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded-md border hover:scale-105 transition-transform duration-300`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              src={image}
              alt=""
              className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="font-semibold text-3xl sm:text-4xl">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(4).fill(0).map((_, i) => <img key={i} src={assets.star_icon} className="w-4 sm:w-5" alt="" />)}
            <img src={assets.star_dull_icon} className="w-4 sm:w-5" alt="" />
            <p className="pl-2 text-sm text-gray-500">(122 Reviews)</p>
          </div>

          <p className="mt-4 text-3xl font-semibold">{currency} {productData.price}</p>
          <p className="mt-4 text-gray-600 sm:w-4/5">
            Experience premium comfort and style with our {productData.name}. Crafted from high-quality materials, this product combines durability and elegance for everyday wear. Perfect for casual outings or special occasions.
          </p>

          {/* Size Selector */}
          <div className="flex flex-col gap-2 mt-6">
            <p className="font-medium text-gray-700">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded-md transition-all ${
                    item === size ? 'border-2 border-orange-500 bg-orange-50' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm rounded-md hover:bg-gray-800 transition-colors mt-4"
          >
            ADD TO CART
          </button>

          {/* Info */}
          <hr className="mt-6 border-gray-300" />
          <div className="text-sm text-gray-500 mt-4 flex flex-col gap-1">
            <p>100% Authentic Product</p>
            <p>Cash on delivery available.</p>
            <p>Easy returns and exchanges within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Tabs */}
      <div className="mt-16 border-t pt-6">
        <div className="flex border-b border-gray-300">
          <button className="px-6 py-3 text-sm font-medium border-b-2 border-black">Description</button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-black transition-colors">Reviews (122)</button>
        </div>
        <div className="mt-4 text-gray-600 text-sm space-y-4">
          <p>
            This {productData.name} is designed for both style and comfort. Its premium fabric ensures durability while maintaining a soft feel against the skin. Perfect for daily wear, office, or outings, it adapts effortlessly to your lifestyle.
          </p>
          <p>
            Crafted with attention to detail, each piece undergoes strict quality checks. Enjoy a versatile wardrobe addition that blends seamlessly with any outfit, offering both function and fashion.
          </p>
          <p>
            Customer reviews praise its fit, quality, and overall design. Highly recommended for those seeking a combination of elegance and practicality in their daily wear collection.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  )
}
