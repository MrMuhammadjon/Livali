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

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // 👈 Foydalanuvchini olish

  const menuItems = [
    { icon: <FaBoxOpen />, label: "My Orders" },
    { icon: <FaUser />, label: "My Details" },
    { icon: <FaMapMarkerAlt />, label: "Address Book" },
    { icon: <FaCreditCard />, label: "Payment Methods" },
    { icon: <FiBell />, label: "Notifications" },
    { icon: <FaQuestionCircle />, label: "FAQs" },
    { icon: <FaHeadphones />, label: "Help Center" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="mx-auto bg-gray-100 min-h-screen p-4 text-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm rounded-md mb-2">
        <button>&larr;</button>
        <h2 className="font-semibold text-lg">
          {user?.name ? user.name : "Account"}
        </h2>
        <FiBell />
      </div>

      {/* Menu items */}
      <div className="space-y-2">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-md flex items-center justify-between px-4 py-3 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <FiChevronRight className="text-gray-400" />
          </div>
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
  );
};

export default Profile;
