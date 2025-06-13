import CreateDossier from "@/app/components/CreateDossier";
import { redirect } from "next/navigation";
/* eslint-disable */

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ "user-role": string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const userRole = query["user-role"];
  console.log(userRole);

  if (userRole && userRole != "ADMIN") {
    redirect(`/user/${id}/dossiers?user-role=${userRole}`);
  }

  return (
    <div className="space-y-10 mx-auto">
      {/* Welcome Section */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700">
        <h2 className="text-4xl font-bold text-[#2563eb] mb-4">
          Welcome to your Dossier Dashboard {userRole ? ` - ${userRole}` : ""}
        </h2>
        <p className="text-gray-300 text-lg">
          Here you can manage your dossiers, check your profile, and streamline
          your regulatory submissions.
        </p>
      </div>

      {/* Dossier Creation Section */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg border border-gray-700 mx-auto">
        <h3 className="text-2xl font-semibold text-white mb-6 border-b border-gray-600 pb-4">
          Create New Dossier
        </h3>
        {userRole && userRole === "ADMIN" ? (
          <CreateDossier userId={id} />
        ) : (
          <div className="text-red-400 font-semibold text-lg">
            User Not Registered
          </div>
        )}
      </div>
    </div>
  );
}
