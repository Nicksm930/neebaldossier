import AiSearch from "@/app/components/AiSearch";

export default async function AISearchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 flex flex-col items-center font-sans">
      {/* Hero Section */}
      <div className="max-w-3xl text-center mb-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 leading-snug">
          🚀 AI-Powered Dossier Search
        </h1>
        <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
          Instantly search, analyze, and retrieve critical insights from your
          dossier documents. Our intelligent engine navigates through regulatory
          data, clinical studies, and product summaries to provide you with
          fast, accurate, and reliable information — at your fingertips.
        </p>
        <p className="text-blue-500 font-medium mt-3 text-sm">
          ✨ Ask your question and let Dossier AI find the answers.
        </p>
      </div>

      {/* AI Search Component */}
      <div className="w-full max-w-4xl">
        <AiSearch />
      </div>
    </div>
  );
}
