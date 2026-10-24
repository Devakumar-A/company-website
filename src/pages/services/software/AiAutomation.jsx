import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Document and email processing",
  "Chat assistants and search over your own content",
  "Workflow automation connected to your existing tools",
  "Review steps so people stay in control",
  "Guidance on data privacy and access",
];

const FAQS = [
  {
    q: "How long does a typical AI & Automation project take?",
    a: "Most pilots and workflow automation integrations run between 3 to 8 weeks, depending on existing data quality and tool integration complexity.",
  },
  {
    q: "How does pricing work for custom AI projects?",
    a: "We work on scoped milestone-based project pricing agreed in advance, so you have full budget predictability before work starts.",
  },
  {
    q: "Who owns the code, pipelines, and models?",
    a: "You retain full intellectual property and ownership of all custom code, configurations, and integration pipelines delivered upon project completion.",
  },
  {
    q: "How do we ensure sensitive business data remains private?",
    a: "We implement private enterprise API endpoints and local vector embeddings with strict zero-data-retention agreements, ensuring your proprietary data is never used to train public models.",
  },
  {
    q: "How do we get started?",
    a: "We begin with a brief discovery conversation to understand your workflow bottlenecks, followed by a scoped pilot proposal.",
  },
];

export default function AiAutomation() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/software-engineering/ai-automation"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "AI & Automation", path: "/services/software-engineering/ai-automation" },
      ]}
      eyebrow="SOFTWARE & APPLIED AI / 03"
      serviceName="AI & Automation"
      benefitHeadline="practical AI that removes repetitive work from your team."
      overviewP1="We help you apply AI where it saves time: reading documents, answering questions from your own content, and automating routine steps. Every project starts with a clear goal, a small pilot, and a way to measure whether it works."
      typicalTimeline="Typical timeline: 3 – 8 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["Python", "PyTorch", "LangChain", "OpenAI / Claude API", "FastAPI", "Vector DBs"]}
      faqs={FAQS}
    />
  );
}
