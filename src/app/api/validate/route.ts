import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// For Next.js 15 API route
export const runtime = "nodejs";

// Initialize Gemini with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Define fixed module prompts
const modulePrompts = {
  module1: `You are an expert auditor for Module 1 (Administrative and Product Information). Evaluate completeness of application forms, administrative documents, drug product details, and labeling. Validate based on ICH guidelines.`,
  module2: `You are an expert auditor for Module 2 (Summaries). Review the Quality, Nonclinical, and Clinical Summaries ensuring they comply with ICH CTD format standards.`,
  module3: `You are an expert auditor for Module 3 (Quality - CMC). Validate information about manufacturing, controls, and quality specifications of drug substances and drug products.`,
  module4: `You are an expert auditor for Module 4 (Nonclinical Study Reports). Review pharmacology, pharmacokinetics, and toxicology studies for completeness and regulatory compliance.`,
  module5: `You are an expert auditor for Module 5 (Clinical Study Reports). Review clinical trial reports, statistical analyses, and outcomes ensuring compliance with GCP and ICH E3 guidelines.`,
} as const;

// Type to restrict moduleName
type ModuleName = keyof typeof modulePrompts;

export async function POST(request: Request) {
  try {
    // Parse incoming request
    const body = await request.json() as {
      moduleName: ModuleName;
      moduleText: string;
    };
    const { moduleName, moduleText } = body;

    // Validate module name
    if (!modulePrompts[moduleName]) {
      return NextResponse.json({ error: "Invalid module name." }, { status: 400 });
    }

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Build the prompt
    const prompt = `${modulePrompts[moduleName]}

Text:
${moduleText}

Respond in JSON format:
{
  "status": "Pass" or "Fail",
  "report": "Detailed explanation."
}
`;

    // Send prompt to Gemini
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // Get raw response text
    const response = result.response;
    const rawText = await response.text();

    // 🧹 Clean the code block artifacts
    const cleanText = rawText
      .replace(/^```json\s*/i, '')  // Remove starting ```json
      .replace(/^```\s*/i, '')      // Remove starting ```
      .replace(/```$/, '');         // Remove ending ```

    console.log("Cleaned Text:", cleanText);

    // Parse cleaned text to JSON
    const parsed = JSON.parse(cleanText || "{}");

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    return NextResponse.json({ error: "Failed to generate or parse Gemini response." }, { status: 500 });
  }
}
