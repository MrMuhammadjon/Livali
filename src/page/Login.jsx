import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ phone, password })).unwrap();
      navigate('/');
    } catch (err) {
      console.error("Login xatoligi:", err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br">
      <div className="bg-white py-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Kirish</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-[90%] m-auto">
          <input
            type='text'
            placeholder="📱 Telefon raqamingiz"
            value={phone}
            minLength={9}
            className="border border-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type='password'
            placeholder="🔒 Parolingiz"
            value={password}
            minLength={4}
            className="border border-black px-4 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-sm hover:bg-white border-2 border-black hover:text-black transition-all disabled:opacity-60"
          >
            {loading ? "⏳ Tekshirilmoqda..." : "Kirish"}
          </button>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="border border-black text-black py-2 rounded-sm hover:bg-black hover:text-white transition-all"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>

        {user && <p className="text-green-600 text-center mt-4">✅ Xush kelibsiz, {user.name}!</p>}
        {error && <p className="text-red-500 text-center mt-4">❌ {error}</p>}
      </div>
    </div>
  );
};

export default Login;
