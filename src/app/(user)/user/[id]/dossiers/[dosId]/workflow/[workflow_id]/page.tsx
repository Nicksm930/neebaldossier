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
    <div>
      <WorkFlowView data={data} />
    </div>
  );
}
