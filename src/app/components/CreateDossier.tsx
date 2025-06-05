"use client";

import { useState } from "react";

export default function CreateDossier() {
  const [mode, setMode] = useState<"upload" | "form">("upload");
  const [formData, setFormData] = useState({
    dossierTitle: "",
    productName: "",
    companyName: "",
    region: "",
    modules: {
      module1: "",
      module2: "",
      module3: "",
      module4: "",
      module5: "",
    },
  });

  const [fullDossierFile, setFullDossierFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, module: string) => {
    setFormData({
      ...formData,
      modules: {
        ...formData.modules,
        [module]: e.target.value,
      },
    });
  };

  const handleFullFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        alert("Only PDF files are allowed.");
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB for full dossier
        alert("File size should be less than 50MB.");
        return;
      }
      setFullDossierFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "upload" && !fullDossierFile) {
      alert("Please upload your complete dossier PDF.");
      return;
    }
    if (mode === "form") {
      // Check if all modules are filled
      for (let key in formData.modules) {
        if (!formData.modules[key as keyof typeof formData.modules]) {
          alert(`Please fill in ${key} information.`);
          return;
        }
      }
    }

    // Send data to server here
    console.log("Form Mode:", mode);
    console.log("Form Data:", formData);
    if (fullDossierFile) {
      console.log("Full Dossier File:", fullDossierFile);
    }
    alert("Dossier Created Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Create New Dossier</h1>

      {/* Mode Switch */}
      <div className="flex justify-center mb-8">
        <button
          type="button"
          className={`px-6 py-2 rounded-l-lg ${mode === "upload" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setMode("upload")}
        >
          Upload Full Dossier
        </button>
        <button
          type="button"
          className={`px-6 py-2 rounded-r-lg ${mode === "form" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          onClick={() => setMode("form")}
        >
          Create via Form
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Dossier Title</label>
          <input
            type="text"
            name="dossierTitle"
            value={formData.dossierTitle}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter Dossier Title"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter Product Name"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="Enter Company Name"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Region / Country</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-3 rounded-lg"
            placeholder="e.g., US, EU, India"
          />
        </div>

        {/* Conditional Rendering */}
        {mode === "upload" ? (
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Upload Complete Dossier (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFullFileChange}
              className="w-full border border-gray-300 p-2 rounded-lg"
              required
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {[
              { label: "Module 1: Administrative and Product Information", name: "module1" },
              { label: "Module 2: Summaries", name: "module2" },
              { label: "Module 3: Quality", name: "module3" },
              { label: "Module 4: Nonclinical Study Reports", name: "module4" },
              { label: "Module 5: Clinical Study Reports", name: "module5" },
            ].map((mod) => (
              <div key={mod.name}>
                <label className="block mb-2 font-semibold text-gray-700">{mod.label}</label>
                <textarea
                  name={mod.name}
                  value={formData.modules[mod.name as keyof typeof formData.modules]}
                  onChange={(e) => handleModuleChange(e, mod.name)}
                  required
                  className="w-full border border-gray-300 p-3 rounded-lg min-h-[150px]"
                  placeholder={`Enter ${mod.label} details...`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Create Dossier
        </button>
      </form>
    </div>
  );
}
