"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
/* eslint-disable */
export default function CreateDossier({
  userId,
  userRole,
}: {
  userId: string;
  userRole: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<"upload" | "form">("upload");
  const [formData, setFormData] = useState({
    dossierTitle: "",
    productName: "",
    companyName: "",
    region: "",
    owner_id: userId,
    module_summaries: {
      module1: "",
      module2: "",
      module3: "",
      module4: "",
      module5: "",
    },
  });

  const [fullDossierFile, setFullDossierFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    module: string
  ) => {
    setFormData({
      ...formData,
      module_summaries: {
        ...formData.module_summaries,
        [module]: e.target.value,
      },
    });
  };

  const handleFullFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PDF, DOC, DOCX, or TXT files are allowed.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        alert("File size should be less than 50MB.");
        return;
      }
      setFullDossierFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("title", formData.dossierTitle);
    formPayload.append("product_name", formData.productName);
    formPayload.append("company_name", formData.companyName);
    formPayload.append("region", formData.region);
    formPayload.append("owner_id", String(formData.owner_id));
    formPayload.append("department", "Regulatory Affairs");

    if (mode === "upload") {
      if (!fullDossierFile) {
        alert("Please upload your complete dossier file.");
        return;
      }
      formPayload.append("file", fullDossierFile);
    } else {
      formPayload.append(
        "module_summaries",
        JSON.stringify(formData.module_summaries)
      );
    }

    try {
      setIsUploading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/documents`,
        formPayload,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      localStorage.setItem("dossierData", JSON.stringify(response.data));
      alert("Dossier Created Successfully!");
      router.push(`/user/${userId}/preview?user-role=${userRole}`);
    } catch (error) {
      console.error("error", error);
      alert("Something went wrong!");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-[#1f2937] text-white shadow-lg rounded-lg relative border border-gray-700">
      <h1 className="text-3xl font-bold text-[#2563eb] mb-8 text-center">
        Create New Dossier
      </h1>

      {isUploading && (
        <div className="w-full bg-gray-700 h-2 rounded overflow-hidden mb-6">
          <div
            className="bg-[#2563eb] h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* Mode Switch */}
      <div className="flex justify-center mb-8">
        <button
          type="button"
          className={`px-6 py-2 rounded-l-lg font-semibold ${
            mode === "upload"
              ? "bg-[#2563eb] text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setMode("upload")}
        >
          Upload Full Dossier
        </button>
        <button
          type="button"
          className={`px-6 py-2 rounded-r-lg font-semibold ${
            mode === "form"
              ? "bg-[#2563eb] text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setMode("form")}
        >
          Create via Form
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        {[
          {
            label: "Dossier Title",
            name: "dossierTitle",
            placeholder: "Enter Dossier Title",
          },
          {
            label: "Product Name",
            name: "productName",
            placeholder: "Enter Product Name",
          },
          {
            label: "Company Name",
            name: "companyName",
            placeholder: "Enter Company Name",
          },
          {
            label: "Region / Country",
            name: "region",
            placeholder: "e.g., US, EU, India",
          },
        ].map((field) => (
          <div key={field.name}>
            <label className="block mb-2 font-semibold text-white">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={(formData as any)[field.name]}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-600 bg-[#111827] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        {/* Conditional Upload OR Form Mode */}
        {mode === "upload" ? (
          <div>
            <label className="block mb-2 font-semibold text-white">
              Upload Complete Dossier (PDF, DOC, DOCX, TXT)
            </label>
            <input
              type="file"
              accept=".pdf, .doc, .docx, .txt"
              onChange={handleFullFileChange}
              className="w-full border border-gray-600 bg-[#111827] text-white p-2 rounded-lg"
              required
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                label: "Module 1: Administrative and Product Information",
                name: "module1",
              },
              { label: "Module 2: Summaries", name: "module2" },
              { label: "Module 3: Quality", name: "module3" },
              { label: "Module 4: Nonclinical Study Reports", name: "module4" },
              { label: "Module 5: Clinical Study Reports", name: "module5" },
            ].map((mod) => (
              <div key={mod.name}>
                <label className="block mb-2 font-semibold text-white">
                  {mod.label}
                </label>
                <textarea
                  name={mod.name}
                  value={
                    formData.module_summaries[
                      mod.name as keyof typeof formData.module_summaries
                    ]
                  }
                  onChange={(e) => handleModuleChange(e, mod.name)}
                  className="w-full border border-gray-600 bg-[#111827] text-white p-3 rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                  placeholder={`Enter ${mod.label} details...`}
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Create Dossier
        </button>
      </form>
    </div>
  );
}
