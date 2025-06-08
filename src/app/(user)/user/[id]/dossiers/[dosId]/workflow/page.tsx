"use client";

import { use, useEffect, useState } from "react";
import axios from "axios";

interface WorkflowCheck {
  id: number;
  status: "PASSED" | "FAILED" | "WARNING" | "ERROR";
  result?: string;
  error?: string;
}

interface WorkflowResponse {
  workflow_id: number;
  document_id: number;
  checks?: Record<string, WorkflowCheck>;
  decision: {
    status: string;
    reason: string;
  };
}

export default function WorkflowPage({
  params,
}: {
  params: Promise<{ dosId: string }>;
}) {
  const { dosId } = use(params); // 👈 Use React.use() to unwrap params safely

  const [workflowData, setWorkflowData] = useState<WorkflowResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWorkflow() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/workflow/${dosId}`
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
      <div className="p-8 text-center font-semibold text-lg">
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

  console.log("Workflow Data", workflowData);

  return <div className="p-8">hello {dosId}</div>;
}
