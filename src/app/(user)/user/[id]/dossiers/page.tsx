"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 🆕 Import useRouter

// Dummy Data (Replace this with your fetched DB data)
const dummyDossiers = [
  {
    id: "1",
    title: "Paracetamol Dossier",
    productName: "Paracetamol 500mg",
    companyName: "Pharma Corp",
    region: "EU",
    createdAt: "2025-06-04",
    aiReviewStatus: "Pending",
    auditorReviewStatus: "Approved",
    aiRegulatoryReport: "This is the AI-generated regulatory report for Paracetamol.",
    aiClinicalReport: "This is the AI-generated clinical report for Paracetamol.",
  },
  {
    id: "2",
    title: "Amoxicillin Dossier",
    productName: "Amoxicillin 250mg",
    companyName: "HealthCare Inc.",
    region: "US",
    createdAt: "2025-05-28",
    aiReviewStatus: "Approved",
    auditorReviewStatus: "Pending",
    aiRegulatoryReport: "This is the AI-generated regulatory report for Amoxicillin.",
    aiClinicalReport: "This is the AI-generated clinical report for Amoxicillin.",
  },
  // ... add other dossiers here
];

export default function DossierPage() {
  const [dossiers, setDossiers] = useState(dummyDossiers);
  const router = useRouter(); // 🆕 Initialize router
  const userId = 1; // You can make this dynamic later if needed

  const handleEdit = (id: string) => {
    alert(`Edit dossier with id: ${id}`);
    // Navigate to Edit Page or Open Modal
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this dossier?")) {
      setDossiers((prev) => prev.filter((dossier) => dossier.id !== id));
    }
  };

  const handleViewReports = (dossier: any) => {
    router.push(`/user/${userId}/dossiers/${dossier.id}`); // 🆕 Navigate instead of opening modal
  };

  return (
    <div className="max-w-9xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">All Dossiers</h1>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Region</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Created Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">AI Review</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Auditor Review</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">AI Generated Reports</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dossiers.map((dossier) => (
              <tr key={dossier.id}>
                <td className="px-6 py-4 whitespace-nowrap">{dossier.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dossier.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dossier.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dossier.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{dossier.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={dossier.aiReviewStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={dossier.auditorReviewStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleViewReports(dossier)}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    View
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button
                    onClick={() => handleEdit(dossier.id)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dossier.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dossiers.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No Dossiers found.
          </div>
        )}
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  let color = "gray";
  if (status === "Approved") color = "green";
  else if (status === "Rejected") color = "red";
  else if (status === "Pending") color = "yellow";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-${color}-100 text-${color}-800`}
    >
      {status}
    </span>
  );
}
