import axios from "axios";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ dosId: number }> } // ✅ No Promise
) => {
  const { dosId } = await params;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/documents/${dosId}`
  );
  const data = res.data;

  console.log("Data in Handler", data);

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 200,
  });
};
