import AiSearch from "@/app/components/AiSearch";

export default async function AISearchPage() {
  return (
    <div className="w-11/12 max-w-[1600px] mx-auto p-8 space-y-12 text-white font-sans">
      {/* AI Hero Section */}
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] p-10 rounded-xl shadow-md border border-gray-700 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-[#2563eb] leading-snug">
          🚀 AI-Powered Dossier Search
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
          Instantly search, analyze, and retrieve critical insights from your
          dossier submissions. Our intelligent AI engine seamlessly navigates
          through regulatory data, clinical studies, and technical modules to
          bring you accurate answers with blazing speed.
        </p>
        <p className="text-[#60a5fa] font-medium text-base">
          ✨ Simply ask your query and let Neebal AI handle the complexity.
        </p>
      </div>

      {/* AI Search Component */}
      <div className="bg-[#1f2937] p-10 rounded-xl shadow-md border border-gray-700">
        <h2 className="text-2xl font-bold text-[#60a5fa] mb-6">
          🔍 Start your intelligent dossier search
        </h2>
        <AiSearch />
      </div>
    </div>
  );
}
