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
    <div className="min-h-screen flex flex-col bg-[#111827] font-sans text-white">
      {/* Sticky Search Header */}
      <div className="bg-[#1f2937] shadow-md p-6 sticky top-0 z-10 border-b border-gray-700">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Ask a question about your dossiers..."
            className="w-full sm:w-2/3 border border-gray-500 rounded-lg p-3 text-sm bg-[#111827] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2563eb] hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-sm font-semibold transition duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Search Results */}
      <div className="w-11/12 max-w-[1600px] mx-auto p-8 space-y-8">
        {queryHistory.length === 0 && (
          <div className="text-center text-gray-400 mt-20 text-md">
            Enter a query to begin your dossier search.
          </div>
        )}

        {queryHistory.map((result, index) => (
          <div
            key={index}
            className="bg-[#1f2937] p-8 rounded-xl shadow-md border border-gray-700 space-y-6"
          >
            {/* Query */}
            <div className="text-lg font-semibold text-[#60a5fa] mb-2">
              🔎 Query: <span className="text-white">{result.query_text}</span>
            </div>

            {/* AI Answer - Fully formatted */}
            <div className="bg-[#111827] border text-md border-gray-700 p-6 rounded-lg text-gray-300 leading-relaxed whitespace-pre-line">
              {result.answer.split("\n").map((line, idx) => {
                // Handle Main Headers (** ... **)
                if (line.startsWith("**") && line.endsWith("**")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl text-[#60a5fa] font-bold mb-4"
                    >
                      {line.replace(/\*\*/g, "").trim()}
                    </h3>
                  );
                }

                // Handle Subsection Headers (e.g. 2.3.S ...)
                if (/^\d+(\.\d+)*\s/.test(line)) {
                  return (
                    <h4
                      key={idx}
                      className="text-lg text-[#93c5fd] font-semibold mb-2"
                    >
                      {line.trim()}
                    </h4>
                  );
                }

                // Handle Bullets (* ...)
                if (line.startsWith("* ")) {
                  return (
                    <p
                      key={idx}
                      className="ml-4 text-white before:content-['•'] before:mr-2"
                    >
                      {line.substring(2).trim()}
                    </p>
                  );
                }

                // Handle Sub-bullets (+ ...)
                if (line.startsWith("+ ")) {
                  const content = line.substring(2).trim();
                  const keyValue = content.split(/:(.+)/); // smart split

                  if (keyValue.length >= 2) {
                    return (
                      <div key={idx} className="ml-10 flex gap-2 mb-1">
                        <span className="font-semibold text-[#60a5fa]">
                          {keyValue[0].trim()}:
                        </span>
                        <span className="text-gray-300">
                          {keyValue[1].trim()}
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <p
                        key={idx}
                        className="ml-10 text-gray-300 before:content-['→'] before:mr-2"
                      >
                        {content}
                      </p>
                    );
                  }
                }

                // Handle empty lines
                if (line.trim() === "") {
                  return <br key={idx} />;
                }

                // Default plain text
                return (
                  <p key={idx} className="text-gray-400 mb-1">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Source Documents */}
            {result.sources.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-[#60a5fa] mb-4">
                  📑 Source Documents ({result.sources.length})
                </h4>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-md border-collapse rounded-lg shadow-sm">
                    <thead className="bg-[#374151] text-white">
                      <tr>
                        <th className="px-4 py-3 text-left">Document ID</th>
                        <th className="px-4 py-3 text-left">Title</th>
                        <th className="px-4 py-3 text-left">Department</th>
                        <th className="px-4 py-3 text-left">Excerpt</th>
                        <th className="px-4 py-3 text-left">Relevance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.sources.map((source, sourceIndex) => (
                        <tr key={sourceIndex} className="hover:bg-[#2d3748]">
                          <td className="px-4 py-3">{source.document_id}</td>
                          <td className="px-4 py-3 font-semibold text-[#60a5fa]">
                            {source.title || "No Title"}
                          </td>
                          <td className="px-4 py-3">
                            {source.department || "—"}
                          </td>
                          <td className="px-4 py-3 truncate max-w-md">
                            {source.excerpt}
                          </td>
                          <td className="px-4 py-3">
                            <span className="bg-[#60a5fa] text-black px-3 py-1 rounded-full text-xs font-semibold">
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
