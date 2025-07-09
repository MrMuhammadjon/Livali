import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductNotFound = () => {

    const navigate = useNavigate()

  return (
    <div className="bg-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <header className="w-full max-w-md mb-8">
        <h1 className="text-2xl font-bold text-black">STORE</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-md">
        {/* Illustration */}
        <div className="w-40 h-40 mb-6 flex items-center justify-center">
          <svg 
            className="w-full h-full text-gray-400" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            <path d="M12 12v.01" />
          </svg>
        </div>

        {/* Title */}
        <p className="text-2xl font-bold text-black mb-2 text-center">
          Product Not Found
        </p>

        {/* Description */}
        <p className="text-gray-700 mb-8 text-center">
          We couldn't find the product you're looking for. It might be unavailable or removed.
        </p>

        {/* Action Buttons */}
        <div className="w-full flex flex-col space-y-3">
          <button onClick={()=> navigate('/')} className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium">
            Continue Shopping
          </button>
          <button className="w-full border border-black text-black py-3 px-4 rounded-lg font-medium">
            Search Again
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mt-8 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center">
          Need help? <span className="underline">Contact support</span>
        </p>
      </footer>
    </div>
  );
};

export default ProductNotFound;