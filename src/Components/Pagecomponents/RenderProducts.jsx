import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../features/products/ProductsAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAppContext } from '../../Context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';

const RenderProducts = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(state => state.products);
  const { DarkMode, favorites, toggleFavorite, active, debouncedSearchTerm } = useAppContext();
  const navigate = useNavigate();

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
      <div className="w-full h-50 bg-gray-200"></div>
      <div className="space-y-3 p-2">
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

  const filteredProducts = items
    .filter(product =>
      active === "all" ? true : product.category === active
    ).filter(product =>
      (product.title?.toLowerCase() || "").includes((debouncedSearchTerm || "").toLowerCase())
    );




  if (status === 'failed') return <p className="text-center text-red-500">Xatolik yuz berdi!</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4 p-4">
      {filteredProducts.map(product => {
        const isFavorite = favorites.some(fav => fav.id === product.id);

        return (
          <div data-aos="fade-up" onClick={() => navigate(`products/${product.id}`)} key={product.id} className='max-w-64 relative'>
            <div className='group bg-gray-200 rounded-2xl'>
              <img className='rounded-lg bg-gray-200 h-48 w-full object-cover' src={product.thumbnail} alt={product.title} />
            </div>
            <div className='absolute right-0 top-0 z-50'>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product);
                }}
                className='bg-white rounded-full p-2 m-2 shadow-lg hover:bg-gray-100 transition-all hover:scale-110'
              >
                <HeartIcon
                  className={`h-6 w-6 ${isFavorite
                    ? 'text-red-500'
                    : DarkMode
                      ? 'text-gray-800'
                      : 'text-gray-500'
                    }`}
                />
              </button>
            </div>
            <p className='text-sm mt-2'>{product.title}</p>
            <p className='text-xl'>${product.price}</p>
          </div>
        );
      })}
    </div>
  );
};


export default RenderProducts;
