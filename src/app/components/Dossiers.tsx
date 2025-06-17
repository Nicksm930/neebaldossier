"use client";
import axios from "axios";
import { Pencil, Trash2, RefreshCcw, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
/* eslint-disable */
/* Interfaces */
interface DocumentResponseByUser {
  id: number;
  title: string;
  description?: string;
  file_type: string;
  file_size: number;
  department?: string;
  created_at: string;
  owner_id: number;
  file_path: string;
  isWorkFlow_created: boolean;
  isLogAvailable:boolean;
  ai_status:
    | "PENDING"
    | "IN_PROGRESS"
    | "NEEDS_REVIEW"
    | "APPROVED"
    | "REJECTED";
  auditor_status: "PENDING" | "APPROVED" | "REJECTED";
}

type User = {
  id: number;
  username: string;
  email: string;
  user_role: string;
};

const Dossiers = ({
  dossiers,
  userId,
  userRole,
  users,
}: {
  dossiers: DocumentResponseByUser[];
  userId: number;
  userRole: string;
  users: User[];
}) => {
  const router = useRouter();

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedDossierId, setSelectedDossierId] = useState<number | null>(
    null
  );
  const [assignedUsers, setAssignedUsers] = useState<{
    [key: number]: number[];
  }>({});

  const getStatusBadge = (
    status: "PENDING" | "IN_PROGRESS" | "NEEDS_REVIEW" | "APPROVED" | "REJECTED"
  ) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "NEEDS_REVIEW":
        return "bg-orange-100 text-orange-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-300 text-gray-900";
    }
  };

  const workflowHandler = async (dossierId: number) => {
    router.push(`/user/${userId}/dossiers/${dossierId}/workflow?user-role=${userRole}`);
  };

  const workflowViewer = async (dossierId: number) => {
    router.push(
      `/user/${userId}/dossiers/${dossierId}/workflow/${dossierId}?user-role=${userRole}`
    );
  };

  const editHandler = async (dossierId: number) => {
    router.push(`/user/${userId}/dossiers/${dossierId}?user-role=${userRole}`);
  };

  const openAssignModal = (dossierId: number) => {
    setSelectedDossierId(dossierId);
    setShowAssignModal(true);
  };

  const logHandler = (dossierId: number) => {
    router.push(
      `/user/${userId}/dossiers/${dossierId}/logs?user-role=${userRole}`
    );
  };

  const handleAssignUser = async (userIdToAssign: number) => {
    if (selectedDossierId === null) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${selectedDossierId}/assign_user`,
        { user_id: userIdToAssign, admin_id: userId }
      );
      setAssignedUsers((prev) => ({
        ...prev,
        [selectedDossierId]: [
          ...(prev[selectedDossierId] || []),
          userIdToAssign,
        ],
      }));
    } catch (err) {
      console.error("Failed to assign user", err);
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <table className="min-w-full bg-[#1f2937] rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <thead className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white uppercase text-md leading-normal">
          <tr>
            {[
              "Title",
              "Department",
              "File Size",
              "File Type",
              "Uploaded On",
              "Logs",
              "AI Status",
              "Auditor Status",
              "Workflow Status",
              "Actions",
            ].map((header) => (
              <th key={header} className="py-4 px-6 text-left font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-300 text-md font-medium">
          {dossiers.map((dossier, index) => (
            <tr
              key={dossier.id}
              className={`transition duration-300 hover:bg-[#2c3e50] ${
                index % 2 === 0 ? "bg-[#222C3C]" : "bg-[#1B2533]"
              }`}
            >
              <td className="py-4 px-6">{dossier.title}</td>
              <td className="py-4 px-6">{dossier.department || "N/A"}</td>
              <td className="py-4 px-6">
                {(dossier.file_size / 1024).toFixed(2)} KB
              </td>
              <td className="py-4 px-6">{dossier.file_type}</td>
              <td className="py-4 px-6">
                {new Date(dossier.created_at).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => logHandler(dossier.id)}
                  className="px-4 py-2 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold rounded-lg transition"
                >
                  {dossier.isLogAvailable ? 'New Logs' : 'Logs'}
                </button>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(
                    dossier.ai_status
                  )}`}
                >
                  {dossier.ai_status.replace("_", " ")}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getStatusBadge(
                    dossier.auditor_status
                  )}`}
                >
                  {dossier.auditor_status.replace("_", " ")}
                </span>
              </td>
              <td className="py-4 px-6">
                <button
                  onClick={() => {
                    dossier.isWorkFlow_created
                      ? workflowViewer(dossier.id)
                      : workflowHandler(dossier.id);
                  }}
                  className={`px-4 py-2 rounded-full font-bold ${
                    dossier.isWorkFlow_created
                      ? "bg-green-300 text-black"
                      : "bg-yellow-300 text-black"
                  } transition`}
                >
                  {dossier.isWorkFlow_created
                    ? "View Workflow"
                    : "Create Workflow"}
                </button>
              </td>
              <td className="py-10 px-6 flex items-center gap-3">
                <button
                  title="Edit"
                  className="text-blue-400 hover:text-blue-500 transition"
                  onClick={() => editHandler(dossier.id)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  title="Delete"
                  className="text-red-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  title="Refresh"
                  className="text-green-400 hover:text-green-500 transition"
                >
                  <RefreshCcw size={18} />
                </button>
                <button
                  title="Assign User"
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  onClick={() => openAssignModal(dossier.id)}
                >
                  <UserPlus size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* BEAUTIFIED MODAL */}
      {showAssignModal && selectedDossierId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1f2937] rounded-lg p-6 w-[500px] shadow-2xl border border-gray-600 text-white relative">
            <h3 className="text-2xl font-bold text-[#6175a0] mb-4">
              Assign User
            </h3>

            <ul className="divide-y divide-gray-700">
              {users
                .filter((user) => user.user_role !== "ADMIN")
                .map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div>
                      <div className="font-semibold">{user.username}</div>
                      <div className="text-sm text-gray-400">
                        {user.user_role}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>

                    <button
                      disabled={assignedUsers[selectedDossierId]?.includes(
                        user.id
                      )}
                      className={`px-4 py-2 rounded font-semibold transition ${
                        assignedUsers[selectedDossierId]?.includes(user.id)
                          ? "bg-green-300 text-black"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                      onClick={() => handleAssignUser(user.id)}
                    >
                      {assignedUsers[selectedDossierId]?.includes(user.id)
                        ? "Assigned"
                        : "Assign"}
                    </button>
                  </li>
                ))}
            </ul>

            <button
              onClick={() => setShowAssignModal(false)}
              className="absolute top-2 right-4 text-lg text-red-400"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dossiers;
