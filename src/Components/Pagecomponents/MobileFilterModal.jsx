// MobileFilterModal.jsx
import React, { useState, useEffect } from 'react';

const MobileFilterModal = ({ isOpen, onClose }) => {
  const [sort, setSort] = useState("Relevance");
  const [gender, setGender] = useState("Man");
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(19);
  const [category, setCategory] = useState("footwear");

  const sizes = ["37", "38", "39", "40", "41"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden flex justify-center items-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-xl">✕</button>
        </div>

        {/* Sort By */}
        <div>
          <p className="font-medium mb-1">Sort By</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["Relevance", "Price: Low - High", "Price: High - Low"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSort(opt)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  sort === opt ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="font-medium mb-1">Price</p>
          <input
            type="range"
            min="0"
            max="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
          <p className="text-sm">Up to ${price}</p>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <p className="font-medium mb-1">Sort by category size</p>
          <div className="flex flex-wrap gap-2">
            {["shirt", "footwear", "shoes", "jacket"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  category === cat ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="mb-4">
          <p className="font-medium mb-1">Select a gender</p>
          <div className="flex gap-2">
            {["Man", "Woman"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  gender === g ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <p className="font-medium mb-1">Footwear / {gender}</p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-full text-sm ${
                  selectedSize === size ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Filters */}
        <button className="w-full bg-black text-white py-2 rounded-xl font-medium mt-4">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default MobileFilterModal;
