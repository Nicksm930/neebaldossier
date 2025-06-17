"use client";

import React from "react";

/* ✅ Reusable Components */

// Problem Card
interface ProblemCardProps {
  icon: string;
  title: string;
  description: string;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 bg-[#111827] rounded-lg shadow text-left">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#60a5fa]">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
};

// Solution Card
interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="p-6 bg-[#111827] rounded-lg shadow text-left">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#60a5fa]">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
};

// Module Block
interface ModuleBlockProps {
  number: string;
  name: string;
  desc: string;
}

const ModuleBlock: React.FC<ModuleBlockProps> = ({ number, name, desc }) => {
  return (
    <div className="bg-[#111827] p-4 rounded-lg shadow hover:scale-105 transition">
      <div className="text-3xl font-bold text-[#60a5fa] mb-2">
        Module {number}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
};

// Comparison Card
interface ComparisonCardProps {
  mode: "Traditional" | "AI-Powered";
  points: string[];
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ mode, points }) => {
  const color = mode === "AI-Powered" ? "text-[#22c55e]" : "text-red-400";
  return (
    <div className="p-6 bg-[#111827] rounded-lg shadow">
      <h3 className={`text-2xl font-bold mb-4 ${color}`}>{mode}</h3>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        {points.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

/* ✅ Main Home Component */

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Real-World Problems */}
      <section className="bg-[#1f2937] py-12 px-6 text-center shadow rounded-lg">
        <h1 className="text-4xl font-extrabold text-[#22d3ee] mb-6">
          Real-World Challenges in Pharma Dossier Management
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <ProblemCard
            icon="📂"
            title="Fragmented Data"
            description="Scattered data across departments & systems makes compilation time-consuming."
          />
          <ProblemCard
            icon="🕰️"
            title="Long Review Cycles"
            description="Weeks or months needed for dossier preparation & regulatory submission."
          />
          <ProblemCard
            icon="🚫"
            title="Compliance Risks"
            description="Manual errors lead to rejections, delays, and costly regulatory penalties."
          />
          <ProblemCard
            icon="🌎"
            title="Multiple Global Standards"
            description="ICH, USFDA, EMA, PMDA — every region has unique requirements."
          />
          <ProblemCard
            icon="🔍"
            title="Poor Governance"
            description="Lack of version control, audit trails & ownership tracking."
          />
          <ProblemCard
            icon="💸"
            title="High Costs"
            description="Heavy reliance on external consultants drives up operational costs."
          />
        </div>
      </section>

      {/* What is Dossier */}
      <section className="py-16 bg-[#1f2937] text-center shadow rounded-lg">
        <h2 className="text-4xl font-extrabold text-[#22c55e] mb-8">
          What is a Pharmaceutical Dossier?
        </h2>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-12">
          A Dossier is a set of scientific documents submitted to regulatory
          bodies to obtain marketing approval of pharmaceutical products. The
          ICH defines its global structure: The Common Technical Document (CTD).
        </p>

        <div className="grid grid-cols-5 gap-4 justify-center">
          <ModuleBlock
            number="1"
            name="Administrative"
            desc="Application details per region."
          />
          <ModuleBlock
            number="2"
            name="Summaries"
            desc="Executive overview of data."
          />
          <ModuleBlock
            number="3"
            name="Quality"
            desc="Manufacturing, stability & formulation."
          />
          <ModuleBlock
            number="4"
            name="Nonclinical"
            desc="Animal study data & toxicity."
          />
          <ModuleBlock
            number="5"
            name="Clinical"
            desc="Human clinical trials & safety."
          />
        </div>

        <p className="mt-12 text-lg text-gray-300">
          ✅ Our AI engine maps unstructured data into this CTD format within
          minutes.
        </p>
      </section>

      {/* AI Solution */}
      <section className="text-center py-16">
        <h2 className="text-4xl font-extrabold text-[#2563eb] mb-6">
          Introducing AI-Powered Dossier Creator & Compliance Auditor
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
          Automate data extraction, validate compliance, detect missing
          documents, and generate submission-ready dossiers across global
          markets.
        </p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <SolutionCard
            icon="🤖"
            title="AI Document Extraction"
            description="Extracts key data from SmPCs, EPARs, research papers, clinical studies."
          />
          <SolutionCard
            icon="🔎"
            title="AI Compliance Auditor"
            description="Validates every module against ICH, FDA, EMA, PMDA, CDSCO guidelines."
          />
          <SolutionCard
            icon="⚡"
            title="Instant Dossier Review"
            description="Reduces entire review cycle from months to minutes."
          />
          <SolutionCard
            icon="🌐"
            title="Multi-Region Support"
            description="Auto-generates region-specific dossiers & variations."
          />
          <SolutionCard
            icon="📊"
            title="Governance & Logs"
            description="Full version control, user logs & change tracking."
          />
          <SolutionCard
            icon="💡"
            title="AI Contextual Search"
            description="Deep search across entire dossier knowledge graph using semantic AI."
          />
        </div>
      </section>

      {/* AI Engine Architecture */}
      <section className="bg-[#1f2937] py-16 px-8 rounded-lg shadow max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#ffbb33] mb-8 text-center">
          How Our AI Engine Works Under The Hood
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-bold text-[#60a5fa]">Our AI Stack</h3>
            <ul className="list-disc text-gray-300 text-lg ml-5 space-y-3">
              <li>
                <b>Gemini AI (Google):</b> Advanced LLM powering contextual
                understanding & prompt completions
              </li>
              <li>
                <b>RAG (Retrieval Augmented Generation):</b> High-precision
                context injection from domain-specific knowledge base
              </li>
              <li>
                <b>ChromaDB (Vector DB):</b> Fast similarity search & embedding
                storage
              </li>
              <li>
                <b>LangChain:</b> Agent orchestration, chunking, parsing, and
                retrieval pipelines
              </li>
              <li>
                <b>Hugging Face Models:</b> Specialized pharma models for
                scientific text extraction
              </li>
              <li>
                <b>Image OCR / Text Extraction:</b> Scans unstructured PDFs,
                images & handwritten data
              </li>
              <li>
                <b>Custom Prompt Engineering:</b> Role-based dynamic prompts for
                CTD modules
              </li>
            </ul>
          </div>

          <div className="bg-[#111827] p-6 rounded-lg shadow text-gray-300 text-lg space-y-4">
            <h3 className="text-2xl font-bold text-[#22c55e]">
              AI Workflow Pipeline
            </h3>
            <ol className="list-decimal ml-5 space-y-3">
              <li>Document Upload (PDF, Image, Text)</li>
              <li>OCR + Text Preprocessing</li>
              <li>Chunking & Embedding Generation (OpenAI / Hugging Face)</li>
              <li>Vector Storage in ChromaDB</li>
              <li>Prompt Engine triggers Gemini AI with RAG</li>
              <li>AI fills CTD modules</li>
              <li>Compliance Validator checks ICH/FDA standards</li>
              <li>Audit Logs + Governance metadata updated</li>
              <li>Final Dossier auto-generated</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-[#1f2937] py-16 px-8 rounded-lg shadow max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Traditional vs AI-Powered Dossier Management
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <ComparisonCard
            mode="Traditional"
            points={[
              "Manual Data Entry",
              "Weeks of Review Time",
              "High Error Rates",
              "Multiple Disconnected Tools",
              "Limited Traceability",
            ]}
          />
          <ComparisonCard
            mode="AI-Powered"
            points={[
              "Automated Data Extraction",
              "Real-Time Compliance Validation",
              "Near-Zero Human Error",
              "Single Unified Platform",
              "Complete Audit Trail",
            ]}
          />
        </div>
      </section>
      {/* AI Architecture Diagram Section */}
      <section className="bg-[#111827] py-16 px-8 rounded-lg shadow max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-[#fb923c] mb-8 text-center">
          AI-Powered Dossier Architecture
        </h2>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div className="space-y-6 text-gray-300 text-lg">
              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">Document Ingestion</h3>
                <p>PDFs, Images, Clinical Studies, SmPCs uploaded by users.</p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">
                  OCR + Text Extraction
                </h3>
                <p>
                  Optical character recognition (OCR) applied on scanned
                  content.
                </p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">
                  Embedding Generator
                </h3>
                <p>
                  Using OpenAI & Hugging Face to create dense vector embeddings.
                </p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">
                  ChromaDB (Vector Store)
                </h3>
                <p>Stores embeddings for high-speed similarity search.</p>
              </div>
            </div>

            <div className="space-y-6 text-gray-300 text-lg">
              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">
                  LangChain Orchestration
                </h3>
                <p>Dynamic RAG pipeline, retrieval agents, and chain logic.</p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">Gemini AI (LLM)</h3>
                <p>AI model generates CTD module content and summaries.</p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">
                  Compliance Validator
                </h3>
                <p>
                  Automatic ICH, FDA, EMA, CDSCO compliance checks on AI output.
                </p>
              </div>

              <div className="p-4 bg-[#1f2937] rounded-lg shadow">
                <h3 className="font-bold text-[#60a5fa]">Audit Logging</h3>
                <p>
                  Tracks every AI interaction, user change, and workflow state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo CTA */}
      <section className="py-16 text-center">
        <h2 className="text-4xl font-extrabold text-[#22c55e] mb-4">
          Live AI Dossier Demo in Action
        </h2>
        <p className="text-gray-300 text-lg">
          Upload SmPC, EPAR, Clinical Studies → Our AI engine automatically
          builds the full CTD dossier within minutes.
        </p>
        <button className="mt-8 px-8 py-4 bg-[#2563eb] rounded-full text-white font-bold hover:bg-[#1d4ed8] transition">
          Request Live Demo
        </button>
      </section>
    </div>
  );
};

export default Home;
