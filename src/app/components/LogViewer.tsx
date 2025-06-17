"use client";
/* eslint-disable */
import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export interface LogEntry {
  timestamp: string;
  module: string;
  user_role: string;
  user_id: number;
  text_added: string;
  text_deleted: string;
}

interface LogViewerProps {
  logs: LogEntry[];
}

const COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#ef4444",
  "#a855f7",
  "#f472b6",
];

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
  const [selectedUser, setSelectedUser] = useState<number | "ALL">("ALL");
  const [selectedModule, setSelectedModule] = useState<string | "ALL">("ALL");
  const [timeGranularity, setTimeGranularity] = useState<
    "hour" | "day" | "overall"
  >("day");

  const users = Array.from(new Set(logs.map((log) => log.user_id)));
  const modules = Array.from(new Set(logs.map((log) => log.module)));

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const userMatch = selectedUser === "ALL" || log.user_id === selectedUser;
      const moduleMatch =
        selectedModule === "ALL" || log.module === selectedModule;
      return userMatch && moduleMatch;
    });
  }, [logs, selectedUser, selectedModule]);

  const timeMap: Record<string, number> = {};
  filteredLogs.forEach((log) => {
    const dateObj = new Date(log.timestamp);
    let timeKey = "";

    if (timeGranularity === "hour") {
      timeKey = dateObj.toISOString().slice(0, 13);
    } else if (timeGranularity === "day") {
      timeKey = dateObj.toISOString().split("T")[0];
    } else {
      timeKey = "Overall";
    }
    timeMap[timeKey] = (timeMap[timeKey] || 0) + 1;
  });

  const timeData = Object.entries(timeMap).map(([time, count]) => ({
    time,
    count,
  }));

  const summaryStats = {
    totalChanges: logs.length,
    uniqueUsers: users.length,
    uniqueModules: modules.length,
    uniqueRoles: new Set(logs.map((log) => log.user_role)).size,
  };

  const moduleMap: Record<string, number> = {};
  logs.forEach(
    (log) => (moduleMap[log.module] = (moduleMap[log.module] || 0) + 1)
  );
  const moduleData = Object.entries(moduleMap).map(([module, count]) => ({
    module,
    count,
  }));

  const roleMap: Record<string, number> = {};
  logs.forEach(
    (log) => (roleMap[log.user_role] = (roleMap[log.user_role] || 0) + 1)
  );
  const roleData = Object.entries(roleMap).map(([role, count]) => ({
    role,
    count,
  }));

  const userMap: Record<number, number> = {};
  logs.forEach(
    (log) => (userMap[log.user_id] = (userMap[log.user_id] || 0) + 1)
  );
  const userData = Object.entries(userMap).map(([userId, count]) => ({
    userId: parseInt(userId),
    count,
  }));

  let insertCount = 0,
    deleteCount = 0;
  logs.forEach((log) => {
    if (log.text_added) insertCount++;
    if (log.text_deleted) deleteCount++;
  });

  const insertDeleteData = [
    { name: "Inserted", value: insertCount },
    { name: "Deleted", value: deleteCount },
  ];

  return (
    <div className="space-y-10 font-sans">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {Object.entries(summaryStats).map(([key, value], index) => (
          <div
            key={index}
            className="bg-[#1f2937] p-4 rounded-xl shadow-md border border-gray-700"
          >
            <h3 className="text-xl text-[#60a5fa]">
              {key.replace(/([A-Z])/g, " $1")}
            </h3>
            <p className="text-2xl text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-5 bg-[#1f2937] p-5 rounded-lg border border-gray-700">
        <div className="flex flex-col text-white">
          <label>User</label>
          <select
            className="bg-[#374151] p-2 rounded"
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(
                e.target.value === "ALL" ? "ALL" : parseInt(e.target.value)
              )
            }
          >
            <option value="ALL">All Users</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col text-white">
          <label>Module</label>
          <select
            className="bg-[#374151] p-2 rounded"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="ALL">All Modules</option>
            {modules.map((module) => (
              <option key={module} value={module}>
                {module}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col text-white">
          <label>Time Group</label>
          <select
            className="bg-[#374151] p-2 rounded"
            value={timeGranularity}
            onChange={(e) => setTimeGranularity(e.target.value as any)}
          >
            <option value="hour">Hourly</option>
            <option value="day">Daily</option>
            <option value="overall">Overall</option>
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700">
        <h3 className="text-2xl mb-5 text-[#60a5fa]">Activity Timeline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" stroke="#fff">
              <Label
                value="Time"
                offset={-5}
                position="insideBottom"
                fill="#fff"
              />
            </XAxis>
            <YAxis stroke="#fff">
              <Label
                value="Changes"
                angle={-90}
                position="insideLeft"
                fill="#fff"
              />
            </YAxis>
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#60a5fa"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-2xl mb-5 text-[#60a5fa]">Module Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moduleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="module" stroke="#fff">
                <Label
                  value="Module"
                  offset={-5}
                  position="insideBottom"
                  fill="#fff"
                />
              </XAxis>
              <YAxis stroke="#fff">
                <Label
                  value="Changes"
                  angle={-90}
                  position="insideLeft"
                  fill="#fff"
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-2xl mb-5 text-[#60a5fa]">Role Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" stroke="#fff">
                <Label
                  value="User Role"
                  offset={-5}
                  position="insideBottom"
                  fill="#fff"
                />
              </XAxis>
              <YAxis stroke="#fff">
                <Label
                  value="Changes"
                  angle={-90}
                  position="insideLeft"
                  fill="#fff"
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="count" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700">
          <h3 className="text-2xl mb-5 text-[#60a5fa]">User Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userId" stroke="#fff">
                <Label
                  value="User ID"
                  offset={-5}
                  position="insideBottom"
                  fill="#fff"
                />
              </XAxis>
              <YAxis stroke="#fff">
                <Label
                  value="Changes"
                  angle={-90}
                  position="insideLeft"
                  fill="#fff"
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="count" fill="#fbbf24" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700 flex justify-center items-center">
          <h3 className="absolute text-2xl text-[#60a5fa] mb-5">
            Insert vs Delete
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={insertDeleteData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {insertDeleteData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Log Table */}
      <h2 className="text-3xl font-bold mb-6 text-[#2563eb]">
        📝 Dossier Change Logs
      </h2>
      {filteredLogs.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No logs available for this selection.
        </div>
      ) : (
        <div className="space-y-6">
          {filteredLogs.map((log, index) => (
            <div
              key={index}
              className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4 space-x-3">
                <div className="text-xl text-white">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(
                    log.user_role
                  )}`}
                >
                  {log.user_role}
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
              {log.text_added && (
                <div className="mb-3">
                  <span className="font-semibold text-green-300 text-lg">
                    Inserted:
                  </span>{" "}
                  <span className="inline-block bg-green-200 text-green-900 p-2 rounded-md break-words max-w-full">
                    {log.text_added}
                  </span>
                </div>
              )}
              {log.text_deleted && (
                <div>
                  <span className="font-semibold text-red-300 text-lg">
                    Deleted:
                  </span>{" "}
                  <span className="inline-block bg-red-200 text-red-900 p-2 rounded-md break-words max-w-full">
                    {log.text_deleted}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
