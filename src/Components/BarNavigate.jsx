// BottomNavbar.jsx
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';



export default function BarNavigate() {
  const { AddToCart, setAddToCart, favorites, toggleCart } = useAppContext();

  const navItems = [
    { to: '/', icon: <Home className="w-6 h-6" />, label: 'Home' },
    { to: '/search', icon: <Search className="w-6 h-6" />, label: 'Search' },
    { to: '/favorites', icon: <Heart className="w-6 h-6" />, label: 'Favorites', showCount: favorites.length },
    { to: '/cart', icon: <ShoppingCart className="w-6 h-6" />, label: 'Cart', showCount: AddToCart.length },
    { to: '/profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];


  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 rounded-t-3xl px-6 py-2 flex justify-between items-center md:hidden">
      {navItems.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
    </div>
  );
}

function NavItem({ to, icon, label, showCount }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex flex-col items-center gap-1 text-xs font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-black'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-2 rounded-full relative transition-colors ${isActive ? 'bg-black' : 'bg-transparent'
              }`}
          >
            {icon}
            {showCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 text-[10px] bg-black text-white rounded-full p-1 px-2">
                {showCount}
              </span>
            )}
          </div>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
