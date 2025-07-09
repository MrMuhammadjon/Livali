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
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-center p-4">
        Ro'yxatdan o'tish
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4">
        <input
          type="text"
          placeholder="Ismingiz"
          value={form.name}
          className="border border-black py-2 px-4"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon raqam"
          value={form.phone}
          className="border border-black px-2 py-2"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button type="submit" className="border bg-black text-white p-2 rounded-md" disabled={loading}>
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
      <button onClick={() => navigate('/login')} className="border bg-white text-black rounded-md p-2">Login</button>
      </form>
    </div>
  );
};

export default Register;
