"use client";
/* eslint-disable */
import React from "react";

// Define props interface
interface LogViewerProps {
  logs: string[];
}

// Helper function
const getBetween = (
  str: string,
  startToken: string,
  endToken: string
): string | null => {
  const start = str.indexOf(startToken);
  if (start === -1) return null;
  const end = str.indexOf(endToken, start + startToken.length);
  if (end === -1) return null;
  return str.substring(start + startToken.length, end);
};

// Parse logs into structured objects
function parseLogEntry(log: string): {
  timestamp: string | null;
  module: string | null;
  role: string | null;
  inserted: string | null;
  deleted: string | null;
} | null {
  try {
    const timestamp = getBetween(log, "[", "]");
    const module = getBetween(log, "--> [", "] changed by");
    const role = getBetween(log, "changed by [", "] - Inserted");
    const inserted = getBetween(log, "Inserted: [", "], Deleted");
    const deleted = getBetween(log, "Deleted: [", "]");
    return { timestamp, module, role, inserted, deleted };
  } catch (err) {
    console.error("Failed to parse log:", log, err);
    return null;
  }
}

// Role badge colors
function getRoleColor(role: string) {
  switch (role) {
    case "ADMIN":
      return "bg-red-500 text-white";
    case "ADMINISTRATIVE":
      return "bg-blue-500 text-white";
    case "SUMMARY":
      return "bg-yellow-400 text-black";
    case "QUALITY":
      return "bg-green-500 text-white";
    case "NONCLINICAL":
      return "bg-purple-500 text-white";
    case "CLINICAL":
      return "bg-pink-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export default function LogViewer({ logs }: LogViewerProps) {
  const parsedLogs = logs
    .map(parseLogEntry)
    .filter((entry) => entry !== null) as {
    timestamp: string;
    module: string;
    role: string;
    inserted: string;
    deleted: string;
  }[];

  return (
    <div className="space-y-8 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-[#2563eb]">
        📝 Dossier Change Logs
      </h2>

      {parsedLogs.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No logs available for this dossier.
        </div>
      ) : (
        <div className="space-y-6">
          {parsedLogs.map((log, index) => (
            <div
              key={index}
              className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4 space-x-3">
                <div className="text-xl text-white">
                  {log.timestamp
                    ? new Date(log.timestamp).toLocaleString()
                    : "Unknown time"}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                    log.role
                  )}`}
                >
                  {log.role}
                </div>
              </div>

              <div className="mb-3">
                <span className="font-semibold text-[#60a5fa] text-lg">
                  Module:
                </span>{" "}
                <span className="bg-[#374151] text-white px-5 py-2 rounded-lg">
                  {log.module}
                </span>
              </div>

              <div className="mb-3">
                <span className="font-semibold text-green-300 text-lg">
                  Recent Changes:
                </span>{" "}
                <span className="inline-block bg-green-200 text-green-900 p-2 rounded-md break-words max-w-full">
                  {log.inserted || "-"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-red-300 text-lg">
                  Deleted:
                </span>{" "}
                <span className="inline-block bg-red-200 text-red-900 p-2 rounded-md break-words max-w-full">
                  {log.deleted || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
