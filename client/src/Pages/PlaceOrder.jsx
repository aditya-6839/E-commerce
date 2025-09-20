import React, { useContext, useState } from 'react'
import Title from '../Components/Title'
import CartTotal from '../Components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { shopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(shopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message, { position: "top-center", autoClose: 2000 })
          }
          break
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/place/stripe', orderData, { headers: { Authorization: `Bearer ${token}` } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message, { position: "top-center", autoClose: 2000 })
          }
          break
        default:
          break
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message, { position: "top-center", autoClose: 2000 })
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* ---------------- Left Side ---------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <Title text1="DELIVERY" text2=" INFORMATION" className='text-xl sm:text-2xl mb-2'/>
        
        {/* Name */}
        <div className='flex gap-3'>
          <input
            name='firstName'
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder='First Name'
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <input
            name='lastName'
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder='Last Name'
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
        </div>

        {/* Email */}
        <input
          name='email'
          value={formData.email}
          onChange={onChangeHandler}
          placeholder='Email Address'
          type="email"
          required
          className='h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
        />

        {/* Street */}
        <input
          name='street'
          value={formData.street}
          onChange={onChangeHandler}
          placeholder='Street'
          required
          className='h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
        />

        {/* City / State */}
        <div className='flex gap-3'>
          <input
            name='city'
            value={formData.city}
            onChange={onChangeHandler}
            placeholder='City'
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <input
            name='state'
            value={formData.state}
            onChange={onChangeHandler}
            placeholder='State'
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
        </div>

        {/* Zipcode / Country */}
        <div className='flex gap-3'>
          <input
            name='zipcode'
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder='Zipcode'
            type="number"
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
          <input
            name='country'
            value={formData.country}
            onChange={onChangeHandler}
            placeholder='Country'
            required
            className='flex-1 h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
          />
        </div>

        {/* Phone */}
        <input
          name='phone'
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder='Phone Number'
          type="number"
          required
          className='h-12 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400'
        />
      </div>

      {/* ---------------- Right Side ---------------- */}
      <div className='flex flex-col w-full sm:max-w-[400px] mt-6 sm:mt-0'>
        <CartTotal />

        {/* Payment Method */}
        <div className='mt-8'>
          <Title text1="PAYMENT" text2=" METHOD" className='text-xl sm:text-2xl mb-2'/>
          <div className='flex flex-col lg:flex-row gap-3 mt-3'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-3 rounded-lg cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5' src={assets.stripe_logo} alt="stripe" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-3 rounded-lg cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-700 text-sm font-medium'>CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className='w-full text-end mt-6'>
            <button type='submit' className='bg-black text-white px-16 py-3 rounded-lg text-sm cursor-pointer hover:bg-gray-800 transition-colors'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
