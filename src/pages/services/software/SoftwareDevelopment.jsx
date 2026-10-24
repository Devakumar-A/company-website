import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Web and back-end systems with secure APIs",
  "Database design and data migration",
  "User accounts, roles, and permissions",
  "Automated testing and deployment",
  "Documentation and team handover",
];

const FAQS = [
  {
    q: "How long does custom software development typically take?",
    a: "Typical timeline ranges between 4 to 12 weeks depending on scope, architecture complexity, and integration requirements.",
  },
  {
    q: "How do you structure project pricing?",
    a: "We provide fixed milestone-based scopes with clearly defined deliverables so your team has predictable investment and zero hidden costs.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You retain full ownership and intellectual property rights of all custom source code, documentation, and assets upon project completion.",
  },
  {
    q: "Do you provide support and maintenance after launch?",
    a: "Yes, we offer ongoing maintenance, monitoring, and feature iteration agreements tailored to your operational needs.",
  },
  {
    q: "How do we get started?",
    a: "We start with a workflow discovery session to review requirements, agree on milestones, and outline a project proposal.",
  },
];

export default function SoftwareDevelopment() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/software-engineering/software-development"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Custom Software Development", path: "/services/software-engineering/software-development" },
      ]}
      eyebrow="SOFTWARE & ENGINEERING / 01"
      serviceName="Custom Software Development"
      benefitHeadline="reliable software built around how your business actually works."
      overviewP1="We design, build, and maintain custom software for teams that have outgrown off-the-shelf tools. We start with your workflow, agree on scope and milestones, and deliver in small releases you can review along the way."
      typicalTimeline="Typical timeline: 4 – 12 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["Node.js", "Python", "TypeScript", "PostgreSQL", "Docker", "AWS"]}
      faqs={FAQS}
    />
  );
}