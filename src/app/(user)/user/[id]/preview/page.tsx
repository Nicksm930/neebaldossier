"use client";

import { useEffect, useState } from "react";

interface ModuleSummaries {
  module1: string;
  module2: string;
  module3: string;
  module4: string;
  module5: string;
  raw_output?: string;
}

interface Dossier {
  id: number;
  title: string;
  product_name: string;
  company_name: string;
  region: string;
  department: string;
  file_type: string;
  file_size: number;
  file_path: string;
  created_at: string;
  updated_at: string;
  owner_id: number;
  version: number;
  module_summaries: ModuleSummaries;
}

const PreviewPage = () => {
  const [dossier, setDossier] = useState<Dossier | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("dossierData");
    if (savedData) {
      setDossier(JSON.parse(savedData));
    }
  }, []);

  if (!dossier) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  const moduleSummaries: Record<string, string> = (() => {
    try {
      if (dossier?.module_summaries?.raw_output) {
        return JSON.parse(dossier.module_summaries.raw_output);
      }
      return dossier?.module_summaries || {};
    } catch (e) {
      console.error("Failed to parse module_summaries", e);
      return {};
    }
  })();

  return (
    <div className="w-11/12 max-w-[1600px] mx-auto p-8 font-sans text-white space-y-12">
      <h1 className="text-4xl font-bold text-center text-[#2563eb] mb-8">
        📄 Dossier Preview
      </h1>

      {/* General Information */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700">
        <h2 className="text-2xl font-semibold text-[#60a5fa] mb-6">
          General Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem label="Title" value={dossier.title} />
          <InfoItem label="Product Name" value={dossier.product_name} />
          <InfoItem label="Company Name" value={dossier.company_name} />
          <InfoItem label="Region" value={dossier.region} />
          <InfoItem label="Department" value={dossier.department} />
          <InfoItem
            label="File Type"
            value={(dossier.file_type || "").toUpperCase()}
          />
          <InfoItem
            label="File Size"
            value={`${(dossier.file_size / 1024).toFixed(2)} KB`}
          />
          <InfoItem
            label="Uploaded At"
            value={new Date(dossier.created_at).toLocaleString()}
          />
        </div>
      </div>

      {/* Module Summaries */}
      <div>
        <h2 className="text-2xl font-semibold text-[#60a5fa] mb-6">
          📚 Module Summaries
        </h2>
        <div className="space-y-6">
          {Object.entries(moduleSummaries).map(([module, summary]) => (
            <div
              key={module}
              className="bg-[#1f2937] p-6 rounded-xl shadow-md border border-gray-700 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-[#2563eb] mb-4 capitalize">
                {module.replace(/module/, "Module ")}
              </h3>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                {summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-[#374151] rounded-lg p-4 flex flex-col border border-gray-600">
    <span className="text-sm font-medium text-gray-400">{label}</span>
    <span className="text-lg font-semibold text-white mt-1">{value}</span>
  </div>
);

export default PreviewPage;
