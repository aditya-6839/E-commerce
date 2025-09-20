import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

export default function List({ token }) {
  const [list, setList] = useState([])
  const currency = "Rs. "

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`)
      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message, { position: "top-center", autoClose: 2000 })
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center", autoClose: 2000 })
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        toast.success(response.data.message, { position: "top-center", autoClose: 2000 })
        fetchList()
      } else {
        toast.error(response.data.message, { position: "top-center", autoClose: 2000 })
      }
    } catch (error) {
      toast.error(error.message, { position: "top-center", autoClose: 2000 })
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <p className='text-xl font-semibold mb-4'>All Products</p>
      <div className='flex flex-col gap-3'>
        
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 rounded-lg font-medium text-gray-700'>
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className='text-center'>Action</span>
        </div>

        {/* Product Items */}
        {list.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all bg-white'>
            <img className='w-14 h-14 object-cover rounded-md' src={item.image[0]} alt={item.name} />
            <p className='truncate'>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className='text-red-500 hover:text-red-700 font-bold text-right md:text-center transition-colors'
            >
              Delete
            </button>
          </div>
        ))}

        {list.length === 0 && <p className='text-gray-500 text-center py-4'>No products found.</p>}
      </div>
    </div>
  )
}
