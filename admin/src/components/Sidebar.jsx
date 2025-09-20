import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

export default function Sidebar() {
  const links = [
    { to: '/add', label: 'Add Items', icon: assets.add_icon },
    { to: '/list', label: 'List Items', icon: assets.order_icon },
    { to: '/orders', label: 'Orders', icon: assets.order_icon },
  ]

  return (
    <div className='w-[18%] min-h-screen border-r border-gray-200 bg-white shadow-sm'>
      <div className='flex flex-col gap-3 pt-6 px-4'>
        {links.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-l-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gray-100 text-black font-semibold shadow-inner'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`
            }
          >
            <img className='w-5 h-5' src={link.icon} alt={link.label} />
            <p className='hidden md:block'>{link.label}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
