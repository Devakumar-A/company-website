import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Responsive apps for desktop, tablet, and mobile",
  "Dashboards and reporting views",
  "Accessibility aligned with WCAG 2.1 AA guidelines",
  "Performance tuning for Core Web Vitals",
  "Analytics and error monitoring",
];

const FAQS = [
  {
    q: "How long does building a web application typically take?",
    a: "A typical web application takes between 3 to 8 weeks to build and launch, depending on the number of views, user roles, and third-party integrations.",
  },
  {
    q: "Which frameworks and technologies do you use?",
    a: "We primarily build with React, Next.js, and TypeScript on the frontend, backed by Node.js, Python, PostgreSQL, or Supabase.",
  },
  {
    q: "Who owns the codebase and deployment setup?",
    a: "You retain full ownership of the entire repository, documentation, and cloud infrastructure setup upon launch.",
  },
  {
    q: "Do you offer post-launch support and SLA coverage?",
    a: "Yes, we provide post-launch warranty support followed by flexible maintenance retainers for continuous improvements and security monitoring.",
  },
  {
    q: "How does the project begin?",
    a: "We kick off with an introductory call to review your product goals, map the essential user journeys, and prepare a detailed scope.",
  },
];

export default function WebApplications() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/software-engineering/web-applications"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Web Applications", path: "/services/software-engineering/web-applications" },
      ]}
      eyebrow="SOFTWARE & DIGITAL PRODUCTS / 02"
      serviceName="Web Applications"
      benefitHeadline="fast, accessible web apps that your customers and teams enjoy using."
      overviewP1="We build responsive web applications with modern frameworks, clear navigation, and thoughtful performance and accessibility from day one."
      typicalTimeline="Typical timeline: 3 – 8 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Supabase"]}
      faqs={FAQS}
    />
  );
}