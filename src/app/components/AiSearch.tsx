"use client";

import { useState } from "react";
import axios from "axios";

type Source = {
  document_id: string;
  title: string;
  chunk_index: number;
  excerpt: string;
  relevance: number;
  author?: string;
  company?: string;
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

      // Add new query to the TOP of the history
      setQueryHistory((prev) => [result, ...prev]);
      setQuery(""); // clear input after search
    } catch (error) {
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseAnswerText = (text: string) => {
    const regex = /(\*\*(.*?)\*\*|\*(.*?)\*)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>
        );
      }

      if (match[2]) {
        parts.push(
          <div
            key={match.index}
            className="text-sm font-bold text-blue-700 mb-1 mt-3"
          >
            {match[2]}
          </div>
        );
      } else if (match[3]) {
        parts.push(
          <span key={match.index} className="text-blue-500 font-semibold">
            {match[3]}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return parts;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Sticky Search Input */}
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search across all dossier documents..."
            className="w-full sm:w-2/3 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-blue-700 hover:to-blue-600 transition duration-300"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Search Results History */}
      <div className="max-w-5xl mx-auto p-4">
        {queryHistory.length === 0 && (
          <div className="text-center text-gray-400 mt-8 text-sm">
            Enter a query to begin your search.
          </div>
        )}

        {queryHistory.map((result, index) => (
          <div
            key={index}
            className="p-4 my-6 bg-white rounded-lg shadow border border-gray-200"
          >
            <h2 className="text-lg font-bold text-blue-700 mb-2">
              🔎 Query: {result.query_text}
            </h2>

            <div className="text-gray-700 text-sm leading-snug mb-4 whitespace-pre-line">
              {parseAnswerText(result.answer)}
            </div>

            {result.sources.length > 0 && (
              <div>
                <h4 className="text-md font-semibold text-blue-600 mb-2 mt-3">
                  📑 Source Documents
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  {result.sources.map((source, sourceIndex) => (
                    <div
                      key={sourceIndex}
                      className="p-4 bg-white border border-gray-100 rounded-md shadow-sm hover:shadow-md transition text-sm leading-snug"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-semibold text-blue-800 text-base">
                          {source.title !== "Unknown" ? (
                            <span>{source.title}</span>
                          ) : (
                            <span className="text-gray-500 italic">
                              No Title Available
                            </span>
                          )}
                        </h5>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                          Relevance: {(source.relevance * 100).toFixed(2)}%
                        </span>
                      </div>

                      <div className="text-gray-600 mb-2">{source.excerpt}</div>

                      <table className="table-auto text-xs text-gray-700 w-full">
                        <tbody>
                          {source.document_id !== "Unknown" && (
                            <tr>
                              <td className="font-semibold pr-2 text-gray-500">
                                Document ID:
                              </td>
                              <td>{source.document_id}</td>
                            </tr>
                          )}
                          <tr>
                            <td className="font-semibold pr-2 text-gray-500">
                              Chunk Index:
                            </td>
                            <td>{source.chunk_index}</td>
                          </tr>
                          {source.author && (
                            <tr>
                              <td className="font-semibold pr-2 text-gray-500">
                                Author:
                              </td>
                              <td>{source.author}</td>
                            </tr>
                          )}
                          {source.company && (
                            <tr>
                              <td className="font-semibold pr-2 text-gray-500">
                                Company:
                              </td>
                              <td>{source.company}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  ))}
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
