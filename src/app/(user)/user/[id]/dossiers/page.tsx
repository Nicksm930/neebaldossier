import Dossiers from "@/app/components/Dossiers";
import axios from "axios";

export default async function DossierPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ "user-role": string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const userRole = query["user-role"];
  console.log("UserRole=>>> ", userRole);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/documents/user/${id}?user_role=${userRole}`
  );
  const dossiersData = response.data;
  console.log("Response", response.data);

  const userResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`
  );
  console.log("User Response", userResponse.data);

  return (
    <>
      <div>Hello User {id}, View all your Dossiers below:</div>
      <Dossiers
        dossiers={dossiersData}
        userId={Number(id)}
        userRole={userRole}
        users={userResponse.data}
      />
    </>
  );
}
