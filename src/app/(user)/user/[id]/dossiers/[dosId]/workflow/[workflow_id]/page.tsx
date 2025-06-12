import WorkFlowView from "@/app/components/WorkFlowView";
import axios from "axios";

type WorkflowDetailsPageProps = {
  workflow_id: string;
  id: string;
  dosId: string;
};

export default async function WorkflowDetailsPage({
  params,
}: {
  params: Promise<WorkflowDetailsPageProps>;
}) {
  const { workflow_id, id, dosId } = await params;

  const response = await axios.get(
    `${process.env.BASE_URL}/user/${id}/dossiers/${dosId}/workflow/${workflow_id}/api`
  );

  const data = response.data;
  console.log("Actual Data", data);

  return (
    <div className="min-h-screen bg-[#111827] py-10 px-4">
      <div className="max-w-15xl mx-auto bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700">
        <h1 className="text-3xl font-bold text-[#2563eb] mb-6">
          Workflow Review Details
        </h1>

        <WorkFlowView data={data} />
      </div>
    </div>
  );
}
