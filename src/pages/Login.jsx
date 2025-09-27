import { useState } from "react";
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      // 1. Store the token
      localStorage.setItem('token', res.data.token);

      // 2. Safely store the user's name if it exists in the response
      if (res.data.user && res.data.user.name) {
        localStorage.setItem('userName', res.data.user.name);
      }

      alert("Login successful!");

      // 3. Navigate and force a reload to ensure the whole app recognizes the login
      // This is the simplest way to make sure the Navbar updates.
      // window.location.href = '/submit-report';
      window.location.href = '/';

    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "Invalid credentials."));
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email Address"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold hover:cursor-pointer">
            Login
          </button>
        </form>
         <p className="text-center text-sm">
          New here? <Link to="/signup" className="font-medium text-blue-600 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}