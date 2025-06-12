import axios from "axios";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string; dosId: string } }
) => {
  const { id, dosId } = params;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/document/${dosId}/logs`
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
