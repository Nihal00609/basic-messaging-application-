import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user))
      alert("Login successful.");
      navigate("/users");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col py-12 px-6">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login</h2>
      <form onSubmit={handleLogin} className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm rounded-md p-4 shadow-lg space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
        Don`t have an account? <Link to="/register" className="text-rose-500">Register</Link>
      </form>
    </div>
  );
};

export default LoginForm;