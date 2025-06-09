"use client";
import { Pencil, Trash2, RefreshCcw } from "lucide-react"; // For action icons
import { useRouter } from "next/navigation";

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
    | "REJECTED"; // <-- AI status full list
  auditor_status: "PENDING" | "APPROVED" | "REJECTED"; // <-- Auditor status
}

const Dossiers = ({
  dossiers,
  userId,
}: {
  dossiers: DocumentResponseByUser[];
  userId: number;
}) => {
  const router = useRouter();
  // Updated badge function
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
    router.push(`/user/${userId}/dossiers/${dossierId}`);
  };

  console.log(dossiers);

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
              className={`border-b border-gray-200 hover:bg-gray-50 ${
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
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                    dossier.ai_status
                  )}`}
                >
                  {dossier.ai_status.replace("_", " ")}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                    dossier.auditor_status
                  )}`}
                >
                  {dossier.auditor_status.replace("_", " ")}
                </span>
              </td>
              <td className="py-4 px-6">
                <button
                  disabled={!dossier.isWorkFlow_created} // Example: disable if workflow not created
                  onClick={() => {
                    dossier.isWorkFlow_created
                      ? workflowViewer(Number(dossier.id))
                      : workflowHandler(Number(dossier.id));
                  }}
                  className={`inline-block px-3 py-3 rounded-full text-xs font-bold ${
                    dossier.isWorkFlow_created
                      ? "bg-green-300 text-black"
                      : "bg-yellow-300 text-black"
                  } ${
                    !dossier.isWorkFlow_created
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >{dossier.isWorkFlow_created ? 'View Workflow' : 'Create Workflow'}</button>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dossiers;
