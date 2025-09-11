import { useState } from "react";
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Signup successful! Please proceed to login.");
      navigate('/login');
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "An unknown error occurred."));
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
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
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-semibold">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}