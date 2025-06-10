// src/app/(user)/user/[id]/dossiers/[dosId]/workflow/[workflow_id]/api/route.ts

import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  _request: NextRequest,

  { params }: { params: Promise<{ workflow_id: string }> }
) {
  const { workflow_id } = await params;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workflow/${workflow_id}`
    );

  
    return new Response(JSON.stringify(res.data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Backend error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch workflow data" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
