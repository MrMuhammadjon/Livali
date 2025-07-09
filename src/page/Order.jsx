import React from 'react'

const Order = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">🚧 Coming Soon</h1>
          <p className="text-gray-600 mb-6">
            Saytimiz hozirda ishlab chiqilmoqda. Tez orada ishga tushadi. Yangiliklardan birinchilardan bo‘lib xabardor bo‘lish uchun obuna bo‘ling.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Emailingiz"
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Obuna bo'lish
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Order
