import axios from "axios";
/* eslint-disable */

export const GET = async (
  _request: Request,
  {params}: { params: Promise<{ dosId: string }> }
) => {
  const { dosId } = await params;

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/document/${dosId}/logs`
    );

    let data = res.data;

    // Ensure response is always at least an empty object
    if (!data || typeof data !== "object") {
      data = { logs: [] }; // default fallback
    }

    console.log("Data in Handler", data);

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Error fetching logs:", err);

    // Even on error — send back safe empty JSON so frontend stays happy
    return new Response(JSON.stringify({ logs: [] }), {
      headers: { "Content-Type": "application/json" },
      status: 200, // ✅ Don't propagate failure unless absolutely needed
    });
  }
};
