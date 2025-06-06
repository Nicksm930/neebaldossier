import Dossiers from "@/app/components/Dossiers";
import axios from "axios";

export default async function DossierPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${id}`
  );
  const dossiersData = response.data;
  console.log("Response", response.data);

  return (
    <>
      <div>Hello User {id}, View all your Dossiers below:</div>
      <Dossiers dossiers={dossiersData} />
    </>
  );
}
