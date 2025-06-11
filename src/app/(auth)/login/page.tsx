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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-2">
        <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow-lg">
          Neebal Dossier System
        </h1>
        <p className="mt-3 text-gray-600 text-lg font-medium">
          Secure Regulatory Document Management
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
        <Login />

        <p className="text-sm text-gray-500 mt-6 text-center">
          © 2025 Neebal Technologies. All rights reserved.
        </p>
      </div>
    </div>
  );
}
