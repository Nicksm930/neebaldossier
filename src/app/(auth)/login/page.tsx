"use client";

import Login from "@/app/components/Login";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.id) {
        redirect(`/user/${userData.id}?user-role=${userData.user_role}`);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-[#2563eb] drop-shadow-lg">
          Neebal Dossier System
        </h1>
        <p className="mt-3 text-gray-300 text-lg font-medium">
          Secure Regulatory Document Management
        </p>
      </div>

      {/* Login Form Container */}
      <div className="w-full max-w-md bg-[#1f2937] shadow-xl rounded-2xl p-8 border border-gray-700">
        <div className="text-white">
          <Login />
        </div>

        <p className="text-sm text-gray-400 mt-6 text-center">
          © 2025 Neebal Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
}
