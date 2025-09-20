import React from 'react'

export default function Newsletter() {
  const onSubmitHandler = (event) => {
    event.preventDefault()
    // You can add API call or toast notification here
  }

  return (
    <div className="text-center bg-white rounded-2xl shadow-lg px-6 py-12 max-w-3xl mx-auto">
      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
        Subscribe now & get <span className="text-[#06858e]">20% off</span>
      </p>
      <p className="text-gray-500 mt-3 mb-6">
        Join our newsletter for the latest updates and exclusive deals.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 w-full sm:w-3/4 mx-auto"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full sm:flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#06858e] transition"
        />
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-[#06f7f7] to-[#06858e] text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}
