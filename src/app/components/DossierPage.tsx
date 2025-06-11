"use client";
/* eslint-disable */

import { useState } from "react";
import axios from "axios";

interface DossierPageProps {
  data: {
    id: number;
  };
  modules: Record<string, string>;
  userRole: string;
}

export default function DossierPage({
  data,
  modules,
  userRole,
}: DossierPageProps) {
  const [editableModules, setEditableModules] = useState(modules);
  const [loading, setLoading] = useState(false);

  // Updated role to module mapping
  const roleToModule: Record<string, string> = {
    ADMIN: "ALL", // full access
    ADMINISTRATIVE: "module1",
    SUMMARY: "module2",
    QUALITY: "module3",
    NONCLINICAL: "module4",
    CLINICAL: "module5",
  };

  // Get which module the role can edit
  const allowedModule = roleToModule[userRole] || "NONE";

  // To decide if current module is editable
  const isModuleEditable = (moduleKey: string) => {
    if (allowedModule === "ALL") return true;
    return allowedModule === moduleKey;
  };

  const handleChange = (moduleKey: string, value: string) => {
    setEditableModules((prev) => ({
      ...prev,
      [moduleKey]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${data.id}`,
        {
          updated_modules: editableModules,
          embedding_id: String(data.id),
        }
      );

      alert("Modules updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Dossier Info */}
      <div className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Dossier Details
        </h2>
        <div className="text-lg text-gray-700">
          <div>
            <strong>Document ID:</strong> {data.id}
          </div>
          <div>
            <strong>User Role:</strong> {userRole}
          </div>
        </div>
      </div>

      {/* Editable Modules */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-indigo-700">Editable Modules</h2>

        {Object.entries(editableModules).map(([key, content]) => (
          <div
            key={key}
            className="bg-white p-8 rounded-xl shadow-md space-y-4"
          >
            <h3 className="text-xl font-semibold text-indigo-600 capitalize">
              {key}
            </h3>
            <textarea
              className={`w-full h-60 p-4 border rounded-lg ${
                isModuleEditable(key)
                  ? "border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              value={content}
              onChange={(e) => handleChange(key, e.target.value)}
              disabled={!isModuleEditable(key)}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={loading}
          className={`mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
