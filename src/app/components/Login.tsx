"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`, // 🔥 replace your actual API endpoint
        formData
      );

      console.log("Login Success", response.data);

      if (response.data.error) {
        throw new Error();
      }
      // Example: store user data (optional)
      localStorage.setItem("user", JSON.stringify(response.data));

      // Example: redirect to user dashboard
      router.push(
        `/user/${response.data.id}?user-role=${response.data.user_role}`
      );
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-2 bg-white shadow-lg p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
