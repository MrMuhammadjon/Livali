// BottomNavbar.jsx
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', icon: <Home className="w-6 h-6" />, label: 'Home' },
  { to: '/search', icon: <Search className="w-6 h-6" />, label: 'Search' },
  { to: '/favorites', icon: <Heart className="w-6 h-6" />, label: 'Favorites' },
  { to: '/cart', icon: <ShoppingCart className="w-6 h-6" />, label: 'Cart' },
  { to: '/profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
];

export default function BarNavigate() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 rounded-t-3xl px-6 py-3 flex justify-between items-center md:hidden">
      {navItems.map((item) => (
        <NavItem key={item.to} {...item} />
      ))}
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 text-xs font-medium transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-black'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-2 rounded-full transition-colors ${
              isActive ? 'bg-black' : 'bg-transparent'
            }`}
          >
            {icon}
          </div>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}
