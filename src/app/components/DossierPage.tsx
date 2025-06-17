"use client";
/* eslint-disable */

import { useState } from "react";
import axios from "axios";
import DiffMatchPatch from "diff-match-patch";
import { useRouter } from "next/navigation";

interface DossierPageProps {
  data: { id: number};
  modules: Record<string, string>;
  userRole: string;
  userId: number;
}

interface LogObject {
  module: string;
  user_role: string;
  user_id: number;
  text_added: string;
  text_deleted: string;
  timestamp: string;
}

export default function DossierPage({
  data,
  modules,
  userRole,
  userId,
}: DossierPageProps) {
  const router = useRouter();
  const [editableModules, setEditableModules] = useState(modules);
  const [originalModules, setOriginalModules] = useState(modules);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogObject[]>([]);

  const dmp = new DiffMatchPatch();

  const roleToModule: Record<string, string> = {
    ADMIN: "ALL",
    ADMINISTRATIVE: "module1",
    SUMMARY: "module2",
    QUALITY: "module3",
    NONCLINICAL: "module4",
    CLINICAL: "module5",
  };

  const allowedModule = roleToModule[userRole] || "NONE";

  const isModuleEditable = (moduleKey: string) => {
    if (allowedModule === "ALL") return true;
    return allowedModule === moduleKey;
  };

  const handleChange = (moduleKey: string, value: string) => {
    setEditableModules((prev) => ({ ...prev, [moduleKey]: value }));
  };

  const generateLogObject = (
    moduleKey: string,
    inserted: string,
    deleted: string,
    timestamp: string
  ): LogObject => {
    return {
      module: moduleKey,
      user_role: userRole,
      user_id: userId,
      text_added: inserted,
      text_deleted: deleted,
      timestamp,
    };
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const modulesSnapshot = { ...editableModules };
      const newLogs: LogObject[] = [];

      Object.entries(modulesSnapshot).forEach(([moduleKey, newValue]) => {
        const previousValue = originalModules[moduleKey] || "";
        const diffs: [number, string][] = dmp.diff_main(
          previousValue,
          newValue
        );
        dmp.diff_cleanupSemantic(diffs);

        const inserted = diffs
          .filter(([op]) => op === 1)
          .map(([_, text]) => text)
          .join("");
        const deleted = diffs
          .filter(([op]) => op === -1)
          .map(([_, text]) => text)
          .join("");

        const timestamp = new Date().toISOString();

        if (inserted.length > 0 || deleted.length > 0) {
          newLogs.push(
            generateLogObject(moduleKey, inserted, deleted, timestamp)
          );
        }
      });

      const allLogs = [...logs, ...newLogs];
      setLogs(allLogs);

      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${data.id}`,
        {
          updated_modules: modulesSnapshot,
          embedding_id: String(data.id),
          logs: allLogs, // Send array of structured objects
        }
      );

      setOriginalModules(modulesSnapshot);
      alert("Modules updated successfully");
      router.push(`/user/${userId}/dossiers?user-role=${userRole}`);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-15/16 max-w-[2000px] mx-auto p-8 space-y-10 font-sans text-white">
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-[#2563eb]">Editable Modules</h2>

        {Object.entries(editableModules).map(([key, content]) => (
          <div
            key={key}
            className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700 space-y-4"
          >
            <h3 className="text-xl font-semibold text-[#60a5fa] capitalize">
              {key}
            </h3>
            <textarea
              className={`w-full h-60 p-4 rounded-lg border text-white bg-[#111827] resize-none transition font-medium leading-relaxed ${
                isModuleEditable(key)
                  ? "border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  : "border-gray-800 bg-[#1f2937] text-gray-500 cursor-not-allowed"
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
          className={`mt-6 w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
