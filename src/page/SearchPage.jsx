import React, { useState } from 'react';
import { FiSearch, FiMic } from "react-icons/fi";
import { Sliders } from 'lucide-react';
import MobileFilterModal from '../Components/Pagecomponents/MobileFilterModal';
import { useAppContext } from '../Context/AppContext';

const SearchPage = () => {
 
  const {showFilters, setShowFilters} = useAppContext();

  return (
    <>
      <div className='w-full p-4 pt-0 flex flex-col gap-2'>
        <form onSubmit={(e) => e.preventDefault()} className='flex gap-4'>
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 mb-4 flex-1">
            <FiSearch className="text-gray-400 mr-2" size={18} />
            <input
              type="search"
              name="query"
              placeholder="Search for clothes..."
              className="bg-transparent outline-none flex-1 px-2 py-1 text-sm placeholder-gray-400"
            />
            <FiMic className="text-gray-400" size={18} />
          </div>
          <div className="h-full w-auto flex items-center justify-center">
            <button
              type="button"
              aria-label="Open Filters"
              onClick={() => setShowFilters(true)}
              className="bg-black w-full h-full rounded-xl flex items-center justify-center p-2 cursor-pointer"
            >
              <Sliders className='text-2xl text-white' />
            </button>
          </div>
        </form>
      </div>
      <MobileFilterModal isOpen={showFilters} onClose={() => setShowFilters(false)} />
    </>
  );
};

export default SearchPage;
