"use client";
import axios from "axios";
import { Pencil, Trash2, RefreshCcw, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        return "bg-gray-100 text-gray-800";
    }
  };

  const workflowHandler = async (dossierId: number) => {
    router.push(`/user/${userId}/dossiers/${dossierId}/workflow`);
  };

  const workflowViewer = async (dossierId: number) => {
    router.push(`/user/${userId}/dossiers/${dossierId}/workflow/${dossierId}`);
  };

  const editHandler = async (dossierId: number) => {
    router.push(`/user/${userId}/dossiers/${dossierId}?user-role=${userRole}`);
  };

  const openAssignModal = (dossierId: number) => {
    setSelectedDossierId(dossierId);
    setShowAssignModal(true);
  };

  const handleAssignUser = async (userIdToAssign: number) => {
    if (selectedDossierId === null) return;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/documents/${selectedDossierId}/assign_user`,
        {
          user_id: userIdToAssign,
          admin_id: userId
        }
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
      <table className="min-w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-sm leading-normal">
          <tr>
            <th className="py-4 px-6 text-left font-bold">Title</th>
            <th className="py-4 px-6 text-left font-bold">Department</th>
            <th className="py-4 px-6 text-left font-bold">File Size</th>
            <th className="py-4 px-6 text-left font-bold">File Type</th>
            <th className="py-4 px-6 text-left font-bold">Uploaded On</th>
            <th className="py-4 px-6 text-left font-bold">AI Status</th>
            <th className="py-4 px-6 text-left font-bold">Auditor Status</th>
            <th className="py-4 px-6 text-left font-bold">Workflow Status</th>
            <th className="py-4 px-6 text-left font-bold">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700 text-sm font-medium">
          {dossiers.map((dossier, index) => (
            <tr
              key={dossier.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
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
                <span
                  className={`inline-block px-3 py-1 rounded-full text-md font-bold ${getStatusBadge(
                    dossier.ai_status
                  )}`}
                >
                  {dossier.ai_status.replace("_", " ")}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-md font-bold ${getStatusBadge(
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
                  className={`inline-block px-3 py-3 rounded-full text-md font-bold ${
                    dossier.isWorkFlow_created
                      ? "bg-green-300 text-black"
                      : "bg-yellow-300 text-black"
                  }`}
                >
                  {dossier.isWorkFlow_created
                    ? "View Workflow"
                    : "Create Workflow"}
                </button>
              </td>

              <td className="py-4 px-6 flex items-center gap-3">
                <button
                  title="Edit"
                  className="text-indigo-500 hover:text-indigo-700"
                  onClick={() => editHandler(dossier.id)}
                >
                  <Pencil size={18} />
                </button>

                <button
                  title="Delete"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>

                <button
                  title="Refresh"
                  className="text-green-500 hover:text-green-700"
                >
                  <RefreshCcw size={18} />
                </button>

                <button
                  title="Assign User"
                  className="text-yellow-500 hover:text-yellow-700"
                  onClick={() => openAssignModal(dossier.id)}
                >
                  <UserPlus size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign User Modal */}
      {showAssignModal && selectedDossierId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px] shadow-xl relative">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">
              Assign User
            </h3>

            <ul className="divide-y divide-gray-200">
              {users
                .filter((user) => user.user_role !== "ADMIN")
                .map((user) => (
                  <li
                    key={user.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div>
                      <div className="font-semibold">{user.username}</div>
                      <div className="text-sm text-gray-500">
                        {user.user_role}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>

                    <button
                      disabled={assignedUsers[selectedDossierId]?.includes(
                        user.id
                      )}
                      className={`px-4 py-2 rounded font-semibold ${
                        assignedUsers[selectedDossierId]?.includes(user.id)
                          ? "bg-green-300 text-black"
                          : "bg-blue-500 text-white"
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
              className="absolute top-2 right-4 text-lg text-red-500"
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
