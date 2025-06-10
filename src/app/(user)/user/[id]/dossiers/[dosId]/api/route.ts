import axios from "axios";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ id: string; dosId: number }> } // ✅ No Promise
) => {
  const { id, dosId } = await params;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/documents/${dosId}`,
    {
      params: {
        user_id: id,
      },
    }
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
