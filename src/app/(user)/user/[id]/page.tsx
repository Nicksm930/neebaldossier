import CreateDossier from "@/app/components/CreateDossier";

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-md mb-10">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome to your Dossier Dashboard
        </h2>
        <p className="text-gray-700 text-lg">
          Here you can manage your dossiers, check your profile, and streamline
          your regulatory submissions.
        </p>
      </div>

      {/* Dossier Creation Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">
          Create New Dossier
        </h3>
        <CreateDossier userId={id} />
      </div>
    </div>
  );
}
