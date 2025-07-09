import React, { useState } from "react";
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

    // ✅ VALIDATSIYA: Ism uzunligi
    if (form.name.trim().length < 3) {
      alert("Ismingiz kamida 3 ta belgidan iborat bo'lishi kerak.");
      return;
    }

    // ✅ VALIDATSIYA: Telefon raqam faqat raqam va 9-15 belgidan iborat
    if (!/^\d{9,15}$/.test(form.phone)) {
      alert("Telefon raqam faqat raqamlardan iborat bo'lishi va 9-15 ta raqam bo'lishi kerak.");
      return;
    }

    try {
      await dispatch(registerUser(form)).unwrap();
      navigate('/');
    } catch (err) {
      console.error("Ro'yxatdan o'tishda xatolik:", err);
    }
  };

  return (
    <div className="flex flex-col gap-2 max-w-md mx-auto p-4 justify-center">
      <h2 className="text-2xl font-bold text-center mb-4">Ro'yxatdan o'tish</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Ismingiz"
          value={form.name}
          className="border border-black py-2 px-4 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Telefon raqam"
          value={form.phone}
          className="border border-black py-2 px-4 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="border border-black py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
