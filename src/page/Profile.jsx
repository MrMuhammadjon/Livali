// src/pages/Profile.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiChevronRight, FiBell } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";
import {
  FaBoxOpen,
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaQuestionCircle,
  FaHeadphones,
} from "react-icons/fa";
import { logout } from "../features/auth/authSlice";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // 👈 Foydalanuvchini olish

  const menuItems = [
    {
      icon: <FaBoxOpen />,
      label: "My Orders",
      navigate: '/my-orders'
    },
    {
      icon: <FaUser />,
      label: "Edit profile",
      navigate: '/set-profile'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Address Book",
      navigate: '/address-book'
    },
    {
      icon: <FaCreditCard />,
      label: "Payment Methods",
      navigate: '/payment-methods'
    },
    {
      icon: <RxAvatar />,
      label: "Notifications",
      navigate: '/notifications'
    },
    {
      icon: <FaQuestionCircle />,
      label: "FAQs",
      navigate: '/faq'
    },
    {
      icon: <FaHeadphones />,
      label: "Help Center",
      navigate: '/help'
    },
  ];


  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
    <Outlet />      
    <div className="mx-auto bg-gray-100 min-h-screen p-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-md mb-2">
        <h2 className="font-semibold text-lg">
          {user?.name ? user.name : "Account"}
        </h2>
        <RxAvatar className="text-3xl" />
      </div>

      {/* Menu items */}
      <div className="space-y-2">
        {menuItems.map((item, idx) => (
          <button
            onClick={() => navigate(`/profile${item.navigate}`)}
            key={idx}
            className="w-full bg-white rounded-md flex items-center justify-between px-4 py-3 shadow-sm hover:-translate-y-1 tansform duration-200 hover:bg-gray-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 text-sm font-medium px-4 py-3 w-full bg-white rounded-md shadow-sm"
        >
          <BiLogOut />
          Logout
        </button>
      </div>
    </div>
    </>
  );
};

export default Profile;
