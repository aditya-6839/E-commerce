import React, { useState, useContext, useEffect } from 'react'
import { shopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'

export default function Collection() {
  const { products, search, showSearch } = useContext(shopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProduct, setFilterProduct] = useState([])

  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = [...products]
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    productsCopy = sortProducts(productsCopy)
    setFilterProduct(productsCopy)
  }

  const sortProducts = (productArray) => {
    let sortedArray = [...productArray]
    switch (sortType) {
      case 'low-high':
        sortedArray.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sortedArray.sort((a, b) => b.price - a.price)
        break
      case 'relavent':
        sortedArray.sort((a, b) => products.findIndex(p => p._id === a._id) - products.findIndex(p => p._id === b._id))
        break
      default:
        break
    }
    return sortedArray
  }

  useEffect(() => {
    applyFilter()
  }, [category, subCategory, products, search, showSearch])

  useEffect(() => {
    setFilterProduct(prev => sortProducts(prev))
  }, [sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-10 pt-10">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center justify-between sm:justify-start cursor-pointer gap-2 font-medium select-none"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="toggle"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 rounded-lg p-4 mt-4 shadow-sm transition-all duration-300 ${
            showFilter ? 'block' : 'hidden sm:block'
          }`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Men', 'Women', 'Kids'].map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-[#06858e] transition-colors">
                <input type="checkbox" className="w-4 h-4" value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Category Filter */}
        <div
          className={`border border-gray-300 rounded-lg p-4 mt-4 shadow-sm transition-all duration-300 ${
            showFilter ? 'block' : 'hidden sm:block'
          }`}
        >
          <p className="mb-3 text-sm font-semibold text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Topwear', 'Bottomwear', 'Winterwear'].map(sub => (
              <label key={sub} className="flex items-center gap-2 cursor-pointer hover:text-[#06858e] transition-colors">
                <input type="checkbox" className="w-4 h-4" value={sub} onChange={toggleSubCategory} />
                {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products & Sort */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <Title text1="ALL" text2=" COLLECTIONS" />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 text-xs sm:text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
          >
            <option value="relavent">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct.map(item => (
            <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  )
}
