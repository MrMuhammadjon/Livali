import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAppContext } from '../../Context/AppContext';

const RenderProducts = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);
  const { DarkMode } = useAppContext();

  // Init AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch products
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const ProductSkeleton = () => (
    <div className="animate-pulse rounded-xl shadow-lg overflow-hidden w-full max-w-sm bg-white">
      <div className="w-full h-64 bg-gray-200"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-center">
            <ProductSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (status === 'failed') return <p className="text-center text-red-500">Xatolik yuz berdi!</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4">
      {items.map(product => (
        <div key={product.id} className="flex items-center justify-center" data-aos="zoom-out-up">
          <div className="rounded-xl shadow-lg overflow-hidden w-full max-w-sm bg-white">
            <div className="w-full h-40 flex items-center justify-center">
              <img
                src={product.thumbnail}
                alt="Product"
                className="hover:scale-110 transition-transform duration-300 rounded-lg"
              />
            </div>

            <div className="px-2 py-4">
              <div className="">
                <h2 className={`font-thing text-[12px] ${DarkMode ? 'text-white' : 'text-black'}`}>
                  {product.title}
                </h2>
                <p className={`text-sm mt-1 ${DarkMode ? 'text-gray-500' : 'text-black'}`}>
                  {product.brand}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className={`text-sm font-thing ${DarkMode ? 'text-white' : 'text-black'}`}>
                  ${product.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RenderProducts;
