"use client";

type SingleModuleReport = {
  moduleName: string;   // e.g., "Module 1 - Administrative Information"
  status: string;
  report: string;
};

export default function DossierMultiModuleReportViewer({ reports }: { reports: SingleModuleReport[] }) {
  
  const formatReport = (text: string) => {
    const boldFormatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const bulletFormatted = boldFormatted.replace(/\* (.*?)\n/g, "<li>$1</li>");
    const headingFormatted = bulletFormatted.replace(/\n\n(.*?):\n\n/g, "<h3>$1</h3>");
    return headingFormatted.replace(/\n/g, "<br />");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md space-y-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">
        Complete Dossier Validation Report
      </h1>

      {reports.map((module, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-blue-700">{module.moduleName}</h2>
            <span
              className={`inline-block px-4 py-2 rounded-full text-white text-sm font-semibold ${
                module.status === "Pass" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {module.status}
            </span>
          </div>

          <div
            className="prose prose-blue max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: formatReport(module.report) }}
          ></div>

          <div className="mt-6 text-sm text-gray-500 italic">
            * This review is based on the provided text. Document verification is recommended for regulatory compliance.
          </div>
        </div>
      ))}
    </div>
  );
}
