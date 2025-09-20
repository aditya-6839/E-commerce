import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

export default function Add({ token }) {
  const [loading, setLoading] = useState(false)

  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onImageChange = (e, index) => {
    const file = e.target.files[0]
    setImages(prev => {
      const newArr = [...prev]
      newArr[index] = file
      return newArr
    })
  }

  const toggleSize = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      images.forEach((img, idx) => img && formData.append(`image${idx + 1}`, img))

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        toast.success(response.data.message || "Product added successfully!")
        setName("")
        setDescription("")
        setPrice("")
        setImages([null, null, null, null])
        setSizes([])
        setBestseller(false)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <div>
        <p className="mb-2 font-semibold text-gray-700">Upload Images</p>
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <label key={idx} className="relative group cursor-pointer w-24 h-24 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition">
              <img className="object-cover w-full h-full" src={img ? URL.createObjectURL(img) : assets.upload_area} alt="" />
              <input type="file" hidden onChange={(e) => onImageChange(e, idx)} />
              {!img && <span className="absolute text-gray-400 group-hover:text-gray-600">+</span>}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Product Name</p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
          placeholder="Enter product name" required />
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Product Description</p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
          placeholder="Enter description" rows={4} required />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <p className="mb-2 font-semibold text-gray-700">Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-2 font-semibold text-gray-700">Sub-category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40">
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winter</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-semibold text-gray-700">Price</p>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
            placeholder="Eg. 2500" />
        </div>
      </div>

      <div>
        <p className="mb-2 font-semibold text-gray-700">Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {["S","M","L","XL","XXL"].map(size => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 rounded-lg border cursor-pointer transition ${
                sizes.includes(size) ? "bg-pink-100 border-pink-300" : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(prev => !prev)} />
        <label htmlFor="bestseller" className="cursor-pointer font-medium text-gray-700">Add to Bestseller</label>
      </div>

      <button type="submit" disabled={loading}
        className={`w-full py-3 text-white rounded-lg font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  )
}
