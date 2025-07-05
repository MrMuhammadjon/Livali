import React, { useState } from 'react'
import { FiSearch, FiMic, FiBell } from "react-icons/fi";
const Header = () => {

  const [active, setActive] = useState("All");
  const categories = ["All", "Tshirts", "Jeans", "Shoes", "Accessories", "Jackets", "Dresses", "Skirts", "Shorts"];

  return (
    <>
      <div className="w-full p-4 bg-white">
        {/* Top section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-black">Livali</h1>
          <FiBell size={24} />
        </div>

        {/* Search bar */}
        <form action="">
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 mb-4">
            <FiSearch className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search for clothes..."
              className="bg-transparent outline-none flex-1 text-sm placeholder-gray-400"
            />
            <FiMic className="text-gray-400" size={18} />
          </div>
        </form>

        {/* Category filter */}
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1 rounded-xl border text-sm font-medium transition-all whitespace-nowrap ${active === cat
                ? "bg-black text-white"
                : "bg-white text-black border-black"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </>

  )
}

export default Header
