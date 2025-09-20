import React, { useState, useEffect } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/admin_assets/assets'

export default function Orders({ token }) {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, 
        { orderId, status: event.target.value }, 
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (response.data.success) fetchAllOrders()
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  const statusColors = {
    "Order Placed": "bg-yellow-100 text-yellow-800",
    "Packing": "bg-orange-100 text-orange-800",
    "Shipped": "bg-blue-100 text-blue-800",
    "Out for delivery": "bg-purple-100 text-purple-800",
    "Delivered": "bg-green-100 text-green-800"
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">All Orders</h3>
      <div className="flex flex-col gap-4">
        {orders.length === 0 && (
          <p className="text-gray-500 text-center py-6">No orders found.</p>
        )}
        {orders.map((order, index) => (
          <div key={index} className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            {/* Icon */}
            <img className="w-12 h-12 object-contain" src={assets.parcel_icon} alt="parcel" />

            {/* Order Items & Address */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-wrap gap-1 text-gray-700">
                {order.items.map((item, idx) => (
                  <span key={idx} className="text-sm">
                    {item.name} x {item.quantity} ({item.size}){idx < order.items.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
              <p className="font-medium mt-2">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-gray-500 text-sm">
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-gray-500 text-sm">Phone: {order.address.phone}</p>
            </div>

            {/* Payment & Details */}
            <div className="flex flex-col gap-1 min-w-[120px] text-sm">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: <span className={order.payment ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                {order.payment ? "Done" : "Pending"}
              </span></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <div className="min-w-[80px] font-semibold text-gray-800 text-lg">Rs.{' '}{order.amount}</div>

            {/* Status Dropdown */}
            <div className="min-w-[180px]">
              <select 
                onChange={(e) => statusHandler(e, order._id)} 
                value={order.status} 
                className={`w-full p-2 rounded-lg border border-gray-300 font-semibold ${statusColors[order.status]}`}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
