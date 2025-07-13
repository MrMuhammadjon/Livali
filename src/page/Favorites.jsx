import React from 'react';
import { useAppContext } from '../Context/AppContext';
import ProductNotFound from '../Components/Pagecomponents/ProductNotFound';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { favorites, toggleFavorite } = useAppContext();

  const handleRemove = (id) => {
    const item = favorites.find(fav => fav.id === id);
    if (item) toggleFavorite(item);
  };

  if (favorites.length === 0) {
    return ProductNotFound();
  }

  const navate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Sevimlilar</h2>
        <span className="text-sm bg-black text-white px-2 py-1 rounded-full">
          {favorites.length} items
        </span>
      </div>

      <div className="space-y-3">
        {favorites.map((item) => (
          <div onClick={()=> navate(`/products/${item.id}`)}
            key={item.id}
            className="group relative flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 rounded-md object-cover border border-gray-100"
              />
              {item.discount && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{item.discount}%
                </span>
              )}
            </div>

            <div className="ml-4 flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{item.title}</h3>
              <div className="flex items-center mt-1">
                <span className="font-medium text-gray-900">${item.price}</span>
                {item.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice}</span>
                )}
              </div>
              {item.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-black' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({item.reviewCount})</span>
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item.id);
              }
              }
              className="absolute top-3 right-3 p-1 rounded-full bg-white bg-opacity-80 group-hover:bg-gray-100 transition-colors duration-200"
              aria-label="Remove"
            >
              <svg
                className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
