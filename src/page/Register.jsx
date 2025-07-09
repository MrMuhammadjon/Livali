import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap(); // ✅ Faqat 1 marta dispatch
      navigate('/'); // ✅ Faqat muvaffaqiyatli bo‘lsa
    } catch (err) {
      console.error("Ro'yxatdan o'tishda xatolik:", err);
    }
  };



  return (
    <div className="flex flex-col gap-2 p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <input
          type="text"
          placeholder="Ismingiz"
          value={form.name}
          className="border border-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon raqam"
          value={form.phone}
          className="border"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit" className="flex-1 bg-black text-white" disabled={loading}>
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      </form>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  );
};

export default Register;
