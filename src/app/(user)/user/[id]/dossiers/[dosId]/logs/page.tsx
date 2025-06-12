import LogViewer from "@/app/components/LogViewer";

export default async function Logs({
  params,
}: {
  params: { id: string; dosId: string };
}) {
  const { id, dosId } = params;

  const response = await fetch(
    `${process.env.BASE_URL}/user/${id}/dossiers/${dosId}/logs/api`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const logs = await response.json();
  console.log("Logs", logs.logs);

  return (
    <div className="w-11/12 max-w-[1600px] mx-auto p-8 space-y-10 text-white font-sans">
      {/* Logs Header */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700 space-y-4">
        <h2 className="text-3xl font-bold text-[#2563eb] mb-2">
          Change History Logs
        </h2>
        <p className="text-lg text-gray-300">
          This section displays all audit trail logs for the dossier. Each entry
          records who made what change, when, and where.
        </p>
        <p className="text-sm text-gray-400">Dossier ID: {dosId}</p>
      </div>

      {/* Logs Help Box */}
      <div className="bg-[#1b2533] p-6 rounded-lg shadow border border-gray-700">
        <h3 className="text-xl font-semibold text-[#60a5fa] mb-2">
          📝 How Logs Help You
        </h3>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
          <li>
            🔎{" "}
            <span className="font-semibold text-white">Full Traceability:</span>{" "}
            See exactly what changed, who changed it, and when.
          </li>
          <li>
            📝{" "}
            <span className="font-semibold text-white">Content Details:</span>{" "}
            View inserted and deleted text for each module update.
          </li>
          <li>
            👥{" "}
            <span className="font-semibold text-white">
              Collaborative Visibility:
            </span>{" "}
            Understand multi-user contributions across modules.
          </li>
          <li>
            🧾{" "}
            <span className="font-semibold text-white">
              Regulatory Compliance:
            </span>{" "}
            Maintain full audit trails for inspections and AI analysis.
          </li>
          <li>
            ⚠️{" "}
            <span className="font-semibold text-white">
              Error Identification:
            </span>{" "}
            Quickly catch and rollback incorrect edits.
          </li>
        </ul>
      </div>

      {/* Actual Logs */}
      <div className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700">
        <LogViewer logs={logs.logs.reverse()} />
      </div>
    </div>
  );
}
