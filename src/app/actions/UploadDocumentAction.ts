"use server";


export async function uploadDocumentAction(formData: FormData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/documents/`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Note: Don't set Content-Type manually! Let browser set multipart boundaries automatically
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_USER_TOKEN}`, // 🚨 Set your auth token here
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to upload document");
    }

    const data = await response.json();
    console.log("Document uploaded successfully", data);
    return data;
  } catch (error) {
    console.error("Error uploading document:", error);
    throw error;
  }
}
