interface DocumentResponseByUser {
  id: number;
  title: string;
  description?: string;
  file_type: string;
  file_size: number;
  department?: string;
  created_at: string;
  owner_id: number;
  file_path: string;
}

const Dossiers = ({ dossiers }: { dossiers: DocumentResponseByUser[] }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {dossiers.map((dossier) => (
        <div
          key={dossier.id}
          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
          <h3 className="text-xl font-bold text-blue-700">{dossier.title}</h3>
          <p className="text-gray-600">
            Department: {dossier.department || "N/A"}
          </p>
          <p className="text-gray-500 text-sm">
            Uploaded on: {new Date(dossier.created_at).toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-sm">
            File Size: {(dossier.file_size / 1024).toFixed(2)} KB
          </p>
          <p className="text-gray-500 text-sm">
            File Type: {dossier.file_type}
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/${dossier.file_path}`}
            className="text-indigo-500 hover:underline mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download File
          </a>
        </div>
      ))}
    </div>
  );
};

export default Dossiers;
