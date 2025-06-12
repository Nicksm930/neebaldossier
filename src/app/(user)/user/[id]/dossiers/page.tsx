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
  const currentUser = userResponse.data.filter((user: { id: string }) => {
    return user.id == id;
  });
  console.log("CurrentUser", currentUser);

  return (
    <div className="space-y-10">
      {/* Welcome & Page Info Section */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700">
        <h2 className="text-4xl font-bold text-[#2563eb] mb-4">
          Dossier Management
        </h2>
        <p className="text-gray-300 text-2xl">
          Welcome,{" "}
          <span className="font-semibold uppercase">
            {currentUser[0].username}
          </span>
          !
        </p>
        <p className="text-gray-400 mt-2 text-xl">
          This section displays all your previously submitted dossiers. You can
          review, track, and manage your regulatory dossier submissions here.
        </p>
        <p className="text-gray-400 mt-4 text-xl">
          Your role:{" "}
          <span className="font-semibold text-[#60a5fa]">{userRole}</span>
        </p>
      </div>

      {/* Dossier List Section */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-6 border-b border-gray-600 pb-4">
          All Dossiers
        </h3>
        <Dossiers
          dossiers={dossiersData}
          userId={Number(id)}
          userRole={userRole}
          users={userResponse.data}
        />
      </div>
    </div>
  );
}
