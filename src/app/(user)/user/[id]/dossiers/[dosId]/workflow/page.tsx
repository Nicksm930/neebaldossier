"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface WorkflowCheck {
  status: "PASS" | "FAIL" | "NEED REVIEW";
  report: string | Record<string, any>;
  comments: string[] | string;
}

interface WorkflowResponse {
  workflow_id: number;
  document_id: number;
  checks: Record<string, WorkflowCheck>;
}

export default function WorkflowPage({
  params,
}: {
  params: Promise<{ dosId: string }>;
}) {
  const { dosId } = use(params);
  const [workflowData, setWorkflowData] = useState<WorkflowResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/workflow`,
          { doc_id: dosId }
        );
        setWorkflowData(response.data);
      } catch (error) {
        console.error("Failed to fetch workflow:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkflow();
  }, [dosId]);

  if (loading) {
    return (
      <div className="p-8 text-center font-semibold text-lg animate-pulse">
        Loading Workflow...
      </div>
    );
  }

  if (!workflowData) {
    return (
      <div className="p-8 text-center text-red-500 font-semibold">
        Failed to load workflow data.
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PASS":
        return "bg-green-100 text-green-800";
      case "FAIL":
        return "bg-red-100 text-red-800";
      case "NEED REVIEW":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PASS":
        return (
          <CheckCircle className="text-green-600 w-5 h-5 inline-block mr-2" />
        );
      case "FAIL":
        return <XCircle className="text-red-600 w-5 h-5 inline-block mr-2" />;
      case "NEED REVIEW":
        return (
          <AlertTriangle className="text-yellow-500 w-5 h-5 inline-block mr-2" />
        );
      default:
        return null;
    }
  };

  // 🔥 FIX IS HERE
  const renderReport = (report: string | Record<string, any>) => {
    if (!report) return null;

    if (typeof report === "string") {
      return (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{report}</ReactMarkdown>
        </div>
      );
    }

    if (typeof report === "object") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
          {Object.entries(report).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="font-semibold capitalize text-indigo-600 mb-2">
                {key.replace(/_/g, " ")}
              </span>
              {typeof value === "object" && value !== null ? (
                <div className="bg-gray-50 p-3 rounded mt-2">
                  {renderReport(value)}
                </div>
              ) : (
                <div className="prose prose-sm max-w-none mt-2">
                  <ReactMarkdown>{String(value)}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  const renderComments = (comments: string[] | string) => {
    if (!comments || (Array.isArray(comments) && comments.length === 0))
      return null;

    if (typeof comments === "string") {
      return (
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{comments}</ReactMarkdown>
        </div>
      );
    }

    return (
      <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
        {comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-10 space-y-10 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Workflow Info */}
      <div className="bg-white shadow-lg hover:shadow-xl rounded-2xl p-8 transition duration-300">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">
          Dossier Workflow Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
          <div>
            <strong>Workflow ID:</strong> {workflowData.workflow_id}
          </div>
          <div>
            <strong>Document ID:</strong> {workflowData.document_id}
          </div>
        </div>
      </div>

      {/* Module Reviews */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-indigo-700">Module Reviews</h2>
        {Object.entries(workflowData.checks).map(([key, check]) => (
          <div
            key={key}
            className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.01]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold capitalize text-gray-800">
                {key.replace(/_/g, " ")}
              </h3>
              <span
                className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(
                  check.status
                )}`}
              >
                {getStatusIcon(check.status)}
                {check.status}
              </span>
            </div>
            <div className="space-y-5">
              <div>
                <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                  Report:
                </h4>
                {renderReport(check.report)}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-indigo-600 mt-4">
                  Comments:
                </h4>
                {renderComments(check.comments)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
