import DossierPage from "@/app/components/DossierPage";
import axios from "axios";

type DossierViewPageProps = {
  id: string;
  dosId: number;
};

export default async function DossierViewPage({
  params,
  searchParams,
}: {
  params: Promise<DossierViewPageProps>;
  searchParams: Promise<{ "user-role": string }>;
}) {
  const { id, dosId } = await params;
  const query = await searchParams;
  const userRole = query["user-role"];

  console.log("baseUrl", process.env.BASE_URL);

  const response = await axios.get(
    `${process.env.BASE_URL}/user/${id}/dossiers/${dosId}/api`
  );

  const data = response.data;
  const modules = data.module_summaries;

  return (
    <div className="w-12/12 max-w-[2000px] mx-auto p-8 space-y-8">
      {/* Informative Page Header */}
      <div className="bg-[#1f2937] p-6 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-3xl font-bold text-[#2563eb] mb-3">
          Dossier Details
        </h2>
        <p className="text-gray-300 text-lg">
          You are now viewing the complete dossier data along with all submitted
          modules for review, editing and AI processing.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Role: <span className="font-semibold text-[#60a5fa]">{userRole}</span>{" "}
          | Dossier ID: {dosId}
        </p>
      </div>

      {/* CTD Explanation */}
      <div className="bg-[#1f2937] p-3 rounded-xl border border-gray-700 shadow-lg space-y-1">
        <h3 className="text-xl font-bold text-[#2563eb] mb-2">
          About CTD Modules
        </h3>
        <p className="text-gray-300 text-lg">
          The Common Technical Document (CTD) is a globally harmonized format
          for regulatory submissions of pharmaceutical products.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
          <li>
            <span className="text-[#60a5fa] font-semibold">Module 1:</span>{" "}
            Administrative and Product Information (region specific)
          </li>
          <li>
            <span className="text-[#60a5fa] font-semibold">Module 2:</span>{" "}
            Summaries and Overviews of all technical data
          </li>
          <li>
            <span className="text-[#60a5fa] font-semibold">Module 3:</span>{" "}
            Quality (Chemistry, Manufacturing, Controls)
          </li>
          <li>
            <span className="text-[#60a5fa] font-semibold">Module 4:</span>{" "}
            Nonclinical Study Reports (Toxicology, Pharmacology)
          </li>
          <li>
            <span className="text-[#60a5fa] font-semibold">Module 5:</span>{" "}
            Clinical Study Reports (Human clinical trial data)
          </li>
        </ul>
        <p className="text-gray-400 text-sm">
          This structure enables efficient review, global submission
          harmonization, and AI-powered document processing in this platform.
        </p>
      </div>

      {/* Dossier Page Component Rendering */}
      <DossierPage data={data} modules={modules} userRole={userRole} userId={Number(id)} />
    </div>
  );
}
