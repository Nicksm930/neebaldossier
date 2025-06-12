export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-[#2563eb] mb-4">
          Welcome to Neebal Dossier Creator
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Your trusted companion for creating comprehensive and compliant
          dossiers for pharmaceutical product submissions.
        </p>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-white mb-4">
          What is a Dossier?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          A dossier is a collection of documents submitted to regulatory
          authorities for the approval of pharmaceutical products. It includes
          critical information about the drug’s safety, efficacy, quality, and
          manufacturing process.
        </p>
      </section>

      {/* Purpose */}
      <section className="bg-[#1f2937] py-8 px-6 rounded-lg max-w-5xl mx-auto shadow">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Purpose of a Dossier in Pharma
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Regulatory approval for marketing and distribution.</li>
          <li>
            Ensures product safety, efficacy, and quality standards are met.
          </li>
          <li>Facilitates international market access.</li>
          <li>
            Demonstrates compliance with local and global regulatory
            requirements.
          </li>
        </ul>
      </section>

      {/* Types of Dossiers */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Types of Dossiers
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#1f2937] shadow rounded-lg">
            <h3 className="text-2xl font-bold text-[#60a5fa]">
              CTD (Common Technical Document)
            </h3>
            <p className="text-gray-300 mt-2">
              Standard format accepted by many regulatory authorities globally
              (e.g., USFDA, EMA). Consists of 5 Modules covering administrative
              information, quality, preclinical, and clinical data.
            </p>
          </div>
          <div className="p-6 bg-[#1f2937] shadow rounded-lg">
            <h3 className="text-2xl font-bold text-[#60a5fa]">
              eCTD (Electronic Common Technical Document)
            </h3>
            <p className="text-gray-300 mt-2">
              Electronic version of the CTD that enables efficient submission,
              review, and archiving of documents. Structured XML backbone with
              module folders and metadata.
            </p>
          </div>
        </div>
      </section>

      {/* Steps to Create a Dossier */}
      <section className="bg-[#1f2937] py-8 px-6 max-w-5xl mx-auto rounded-lg shadow">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Steps to Create a Dossier
        </h2>
        <ol className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Collect and organize product data.</li>
          <li>Prepare administrative documents (Module 1).</li>
          <li>Compile Quality data (Module 3).</li>
          <li>
            Include preclinical and clinical study reports (Modules 4 & 5).
          </li>
          <li>Ensure compliance with local regulatory guidelines.</li>
          <li>Review, format, and validate the dossier for submission.</li>
        </ol>
      </section>

      {/* Document Formats */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Document Formats
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Documents must be submitted in standardized formats such as PDF/A for
          eCTD submissions. Proper bookmarks, hyperlinks, and metadata must be
          added. The documents should be:
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
          <li>Searchable PDFs with proper formatting.</li>
          <li>Hyperlinked Table of Contents (TOC).</li>
          <li>Compliance with ICH and local regulatory agency guidelines.</li>
        </ul>
      </section>

      {/* Modules Overview */}
      <section className="bg-[#1f2937] py-8 px-6 rounded-lg max-w-5xl mx-auto shadow">
        <h2 className="text-3xl font-semibold text-white mb-4">
          Dossier Modules
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#111827] rounded-lg shadow">
            <h3 className="text-xl font-bold text-[#60a5fa]">Module 1</h3>
            <p className="text-gray-300 mt-2">
              Administrative information specific to the region.
            </p>
          </div>
          <div className="p-6 bg-[#111827] rounded-lg shadow">
            <h3 className="text-xl font-bold text-[#60a5fa]">Module 2</h3>
            <p className="text-gray-300 mt-2">
              Summary of the Quality, Preclinical, and Clinical information.
            </p>
          </div>
          <div className="p-6 bg-[#111827] rounded-lg shadow">
            <h3 className="text-xl font-bold text-[#60a5fa]">Module 3</h3>
            <p className="text-gray-300 mt-2">
              Quality documentation including manufacturing details.
            </p>
          </div>
          <div className="p-6 bg-[#111827] rounded-lg shadow">
            <h3 className="text-xl font-bold text-[#60a5fa]">Module 4</h3>
            <p className="text-gray-300 mt-2">
              Nonclinical study reports (pharmacology, toxicology).
            </p>
          </div>
          <div className="p-6 bg-[#111827] rounded-lg shadow">
            <h3 className="text-xl font-bold text-[#60a5fa]">Module 5</h3>
            <p className="text-gray-300 mt-2">
              Clinical study reports demonstrating safety and efficacy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
