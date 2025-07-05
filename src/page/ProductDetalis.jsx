import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetalis = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setThumbnail(res.data.thumbnail);
        setLoading(false);
      })
      .catch(err => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl w-full px-6 py-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          {/* Skeleton Loader - Images */}
          <div className="flex gap-4 animate-pulse">
            <div className="flex flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-24 h-24 bg-slate-300 rounded border border-gray-200"
                />
              ))}
            </div>
            <div className="w-[400px] h-[400px] bg-slate-300 rounded border border-gray-200" />
          </div>

          {/* Skeleton Loader - Info */}
          <div className="flex-1 space-y-4 animate-pulse">
            <div className="h-8 bg-slate-300 rounded w-1/2" />
            <div className="h-4 bg-slate-300 rounded w-1/3" />
            <div className="h-6 bg-slate-300 rounded w-1/4" />
            <div className="h-20 bg-slate-300 rounded w-full" />
            <div className="h-10 bg-slate-300 rounded w-full" />
            <div className="h-10 bg-slate-300 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-10 text-red-500">Mahsulot topilmadi</div>;
  }

  return (
    <div className="max-w-6xl w-full px-6 py-8 mx-auto">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-600 mb-6">
        <span>Home</span> / <span>Products</span> / <span>{product.category}</span> / <span className="text-indigo-500">{product.title}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16">
        {/* Image Section */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            {product.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setThumbnail(img)}
                className="border border-gray-300 rounded overflow-hidden cursor-pointer max-w-24"
              >
                <img src={img} alt={`Thumb ${i}`} className="object-cover" />
              </div>
            ))}
          </div>
          <div className="border border-gray-300 rounded overflow-hidden max-w-[400px] max-h-[400px]">
            <img
              src={thumbnail || product.thumbnail}
              alt="Main"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 text-sm">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5).fill('').map((_, i) => (
              i < Math.floor(product.rating) ? (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="#615fff">
                  <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                </svg>
              ) : (
                <svg key={i} width="14" height="13" viewBox="0 0 18 17" fill="#ddd">
                  <path d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z" />
                </svg>
              )
            ))}
            <span className="ml-2 text-base">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-gray-500/70 line-through">Old Price: ${product.price + 20}</p>
            <p className="text-2xl font-medium text-black">Price: ${product.price}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          {/* Description */}
          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description?.split(".").filter(Boolean).map((desc, i) => (
              <li key={i}>{desc.trim()}</li>
            ))}
          </ul>

          {/* Buttons */}
          <div className="flex items-center mt-10 gap-4 text-base">
            <button className="w-full py-3.5 font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
              Add to Cart
            </button>
            <button className="w-full py-3.5 font-medium bg-black text-white hover:bg-white hover:text-black border transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetalis;
