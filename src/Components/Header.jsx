import React, { useState } from 'react'
import { FiSearch, FiMic, FiBell } from "react-icons/fi";
import { useAppContext } from '../Context/AppContext';

const Header = () => {
    const { setDarkMode, DarkMode } = useAppContext();

    return (
        <>
            <div className={`w-full px-4 pt-4 ${DarkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-all duration-300`}>
                {/* Top section */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-black">Livali</h1>
                    <button className='flex items-center justify-center h-full ' onClick={() => setDarkMode(!DarkMode)}>
                        dar
                    </button>
                    <FiBell size={24} />
                </div>

            </div>
        </>
    )
}

export default Header

