// LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  console.log(user);
  
  
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded hover:opacity-90"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
