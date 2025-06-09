import DossierPage from "@/app/components/DossierPage";
import axios from "axios";

type DossierViewPageProps = {
  id: string;
  dosId: number;
};

export default async function DossierViewPage({
  params,
}: {
  params: Promise<DossierViewPageProps> // ✅ No Promise
}) {
  const { id, dosId } =await params;

  console.log("baseUrl", process.env.BASE_URL); // Will work fine

  const response = await axios.get(
    `${process.env.BASE_URL}/user/${id}/dossiers/${dosId}/api`
  );

  const data = response.data;

  const modules = data.checks; // data.checks will be modules

  return <DossierPage data={data} modules={modules} />;
}
