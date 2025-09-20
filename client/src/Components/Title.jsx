import React from 'react'

export default function Title({ text1, text2 }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <p className="text-gray-700 text-lg sm:text-xl tracking-wide">
        {text1}{' '}
        <span className="text-gray-900 font-semibold">
          {text2}
        </span>
      </p>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-300 to-transparent"></div>
    </div>
  )
}
