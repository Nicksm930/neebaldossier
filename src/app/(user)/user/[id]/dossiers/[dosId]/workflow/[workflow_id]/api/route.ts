import axios from "axios";

export const GET = async (
  _request: Request,
  { params }: { params: { workflow_id: string } }
) => {
  const { workflow_id } = params;

  try {
    // Call your actual backend server through ngrok
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/workflow/${workflow_id}`
    );

    const data = res.data;

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error calling backend", error);

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
};
