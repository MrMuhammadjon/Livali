import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAppContext } from '../../Context/AppContext';
import { Link } from 'react-router-dom';

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

  console.log(items);
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4">
      {items.map(product => (
        <Link to={`products/${product.id}`} key={product.id} className='max-w-64'>
          <div className='group'>
            <img className='rounded-lg bg-gray-200 h-50' src={product.thumbnail} alt="img1" />
          </div>
          <p className='text-sm mt-2'>{product.title}</p>
          <p className='text-xl'>${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default RenderProducts;
