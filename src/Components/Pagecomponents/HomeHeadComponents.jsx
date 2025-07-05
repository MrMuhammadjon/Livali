import React, { useState }  from 'react'
import { FiSearch, FiMic, FiBell } from "react-icons/fi";
import { useAppContext } from '../../Context/AppContext';


const HomeHeadComponents = () => {
    const [active, setActive] = useState("All");
    const categories = ["All", "Tshirts", "Jeans", "Shoes", "Accessories", "Jackets", "Dresses", "Skirts", "Shorts"];
    const { setDarkMode, DarkMode } = useAppContext();
    return (
        <div className='w-full p-4 pt-0 flex flex-col gap-2'>
            <form action="">
                <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 mb-4">
                    <FiSearch className="text-gray-400 mr-2" size={18} />
                    <input
                        type="text"
                        placeholder="Search for clothes..."
                        className="bg-transparent outline-none flex-1 px-2 py-1 text-sm placeholder-gray-400"
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
                        className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all whitespace-nowrap
                                   ${active === cat
                                ? DarkMode
                                    ? "bg-white text-black border-white"
                                    : "bg-black text-white border-black"
                                : DarkMode
                                    ? "bg-black text-white border-white"
                                    : "bg-white text-black border-black"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default HomeHeadComponents
