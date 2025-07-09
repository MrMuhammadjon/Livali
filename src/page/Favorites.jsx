import React from 'react';
import { useAppContext } from '../Context/AppContext';

const Favorites = () => {
  const { favorites, toggleFavorite } = useAppContext();

  const handleRemove = (id) => {
    const item = favorites.find(fav => fav.id === id);
    if (item) toggleFavorite(item); // context orqali olib tashlaymiz
  };

  if (favorites.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Hech narsa sevimlilarda yo'q.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sevimlilar</h2>
      <div className="space-y-4">
        {favorites.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <div className="flex items-center">
              <img src={item.thumbnail} alt={item.title} className="w-16 h-16 rounded-md object-cover" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-500">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
