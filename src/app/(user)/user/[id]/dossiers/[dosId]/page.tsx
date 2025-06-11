import DossierPage from "@/app/components/DossierPage";
import axios from "axios";

type DossierViewPageProps = {
  id: string;
  dosId: number;
};

export default async function DossierViewPage({
  params,
  searchParams
}: {
  params: Promise<DossierViewPageProps>;
  searchParams: Promise<{ "user-role": string }>; // ✅ No Promise
}) {
  const { id, dosId } = await params;
   const query = await searchParams;
   const userRole = query["user-role"];

  console.log("baseUrl", process.env.BASE_URL); // Will work fine

  const response = await axios.get(
    `${process.env.BASE_URL}/user/${id}/dossiers/${dosId}/api`
  );

  const data = response.data;

  console.log("data", data);

  const modules = data.module_summaries; // data.checks will be modules
  console.log("module", modules);

  return <DossierPage data={data} modules={modules} userRole={userRole}/>;
}
