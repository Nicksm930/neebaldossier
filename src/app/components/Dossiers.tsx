import { Pencil, Trash2, RefreshCcw } from "lucide-react"; // For action icons

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
  ai_status: "PENDING" | "APPROVED" | "REJECTED"; // <-- Status fixed here
  auditor_status: "PENDING" | "APPROVED" | "REJECTED"; // <-- Status fixed here
}

const Dossiers = ({ dossiers }: { dossiers: DocumentResponseByUser[] }) => {
  const getStatusBadge = (status: "PENDING" | "APPROVED" | "REJECTED") => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
                  {dossier.ai_status}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(
                    dossier.auditor_status
                  )}`}
                >
                  {dossier.auditor_status}
                </span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    dossier.isWorkFlow_created
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {dossier.isWorkFlow_created ? "Created" : "Not Created"}
                </span>
              </td>
              <td className="py-4 px-6 flex items-center gap-3">
                <button
                  title="Edit"
                  className="text-indigo-500 hover:text-indigo-700"
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
