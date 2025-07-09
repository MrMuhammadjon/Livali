// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");

  const { loading, error, user } = useSelector((state) => state.auth);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ phone })).unwrap(); // faqat telefon raqam bilan login
      navigate('/');
    } catch (err) {
      console.error("Login xatoligi:", err);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold text-center">Kirish</h1>
      </div>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 p-4">
        <input
          type="text"
          placeholder="Telefon raqamingiz"
          value={phone}
          className="border px-2 py-2"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="border bg-black text-white p-2 rounded-md" disabled={loading}>
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
        <button onClick={() => navigate('/register')} className="border bg-white text-black p-2 rounded-md">
          Register
        </button>
        {user && <p>Xush kelibsiz, {user.name}!</p>}
        {error && <p className="text-red-500">Xatolik: {error}</p>}
      </form>
    </>
  );
};

export default Login;
