import React, { useState, useEffect } from 'react'
import { FiSearch, FiMic, FiBell } from "react-icons/fi";
import { useAppContext } from '../../Context/AppContext';


const HomeHeadComponents = () => {
    const { setActive, active, DarkMode, searcgquery, setSearchQuery } = useAppContext();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories([{ slug: "all", name: "All" }, ...data]));
    }, []);


    
    return (
        <div className='w-full p-4 pt-0 flex flex-col gap-2'>
            <form action="">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 mb-4">
                    <FiSearch className="text-gray-400 mr-2" size={18} />
                    <input
                        type="text"
                        placeholder="Search for clothes..."
                        className="bg-transparent outline-none flex-1 px-2 py-1 text-sm placeholder-gray-400"
                        value={searcgquery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiMic className="text-gray-400" size={18} />
                </div>
            </form>

            {/* Category filter */}
            <div className="flex gap-3 overflow-x-auto scrollbar-none">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        onClick={() => setActive(cat.slug)}
                        className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all whitespace-nowrap
      ${active === cat.slug
                                ? DarkMode
                                    ? "bg-white text-black border-white"
                                    : "bg-black text-white border-black"
                                : DarkMode
                                    ? "bg-black text-white border-white"
                                    : "bg-white text-black border-black"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default HomeHeadComponents
