"use client";

import { useState } from "react";
import axios from "axios";

type Source = {
  document_id: string;
  title: string;
  department?: string;
  excerpt: string;
  relevance: number;
};

type QueryResult = {
  query_text: string;
  answer: string;
  sources: Source[];
};

const AiSearch = () => {
  const [query, setQuery] = useState("");
  const [queryHistory, setQueryHistory] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/rag/query/`,
        { query_text: query }
      );

      const result: QueryResult = {
        query_text: query,
        answer: response.data.answer,
        sources: response.data.sources || [],
      };

      setQueryHistory((prev) => [result, ...prev]);
      setQuery("");
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Sticky Search Input */}
      <div className="bg-white shadow-md p-6 sticky top-0 z-10 border-b border-gray-200">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Ask a question about your dossiers..."
            className="w-full sm:w-2/3 border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-sm font-medium transition duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Search Results History */}
      <div className="max-w-6xl mx-auto p-6">
        {queryHistory.length === 0 && (
          <div className="text-center text-gray-400 mt-20 text-md">
            Enter a query to begin your dossier search.
          </div>
        )}

        {queryHistory.map((result, index) => (
          <div
            key={index}
            className="p-6 mb-8 bg-white rounded-xl shadow-md border border-gray-200"
          >
            {/* Query */}
            <h2 className="text-lg font-bold text-blue-700 mb-4 border-b pb-2">
              🔎 Query:{" "}
              <span className="text-gray-800">{result.query_text}</span>
            </h2>

            {/* Answer - Split by newlines and numbered lists */}
            <div className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-md border mb-6 whitespace-pre-line">
              {result.answer.split("\n").map((line, idx) => (
                <p key={idx} className="mb-2">
                  {line.startsWith("1.") || line.startsWith("2.") ? (
                    <span className="font-medium text-blue-700">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </p>
              ))}
            </div>

            {/* Source Documents */}
            {result.sources.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-blue-600 mb-4">
                  📑 Source Documents ({result.sources.length})
                </h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border-collapse border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-blue-100 text-blue-800 text-left">
                      <tr>
                        <th className="px-4 py-2 border">Document ID</th>
                        <th className="px-4 py-2 border">Title</th>
                        <th className="px-4 py-2 border">Department</th>
                        <th className="px-4 py-2 border">Excerpt</th>
                        <th className="px-4 py-2 border">Relevance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.sources.map((source, sourceIndex) => (
                        <tr
                          key={sourceIndex}
                          className="hover:bg-gray-50 text-gray-700 border-t"
                        >
                          <td className="px-4 py-2 border">
                            {source.document_id}
                          </td>
                          <td className="px-4 py-2 border font-semibold text-blue-700">
                            {source.title || "No Title"}
                          </td>
                          <td className="px-4 py-2 border">
                            {source.department && source.department !== "None"
                              ? source.department
                              : "—"}
                          </td>
                          <td className="px-4 py-2 border truncate max-w-md">
                            {source.excerpt}
                          </td>
                          <td className="px-4 py-2 border">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {(source.relevance * 100).toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiSearch;
