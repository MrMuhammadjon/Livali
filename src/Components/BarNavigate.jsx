// BottomNavbar.jsx
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';

export default function BarNavigate() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50 rounded-t-3xl px-6 py-3 flex justify-between items-center md:hidden">
      <NavItem icon={<Home className="w-6 h-6" />} label="Home" active />
      <NavItem icon={<Search className="w-6 h-6" />} />
      <NavItem icon={<Heart className="w-6 h-6" />} />
      <NavItem icon={<ShoppingCart className="w-6 h-6" />} />
      <NavItem icon={<User className="w-6 h-6" />} />
    </div>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${active ? 'text-white' : 'text-black'}`}>
      <div className={`p-2 rounded-full ${active ? 'bg-black' : ''}`}>
        {icon}
      </div>
      {label && active && <span className="text-xs font-semibold">{label}</span>}
    </div>
  );
}
