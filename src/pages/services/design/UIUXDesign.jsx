import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "User journeys and information architecture",
  "Wireframes and clickable prototypes",
  "Design system and components in Figma",
  "Usability testing",
  "Developer-ready handoff files",
];

const FAQS = [
  {
    q: "How long does a UI/UX design project take?",
    a: "Design sprints typically run between 2 to 6 weeks, depending on whether we are designing a focused MVP flow or an enterprise design system.",
  },
  {
    q: "Which design tools do you use for deliverables?",
    a: "We work exclusively in Figma with component tokens, auto-layout, interactive variants, and comprehensive style guides for effortless developer handoff.",
  },
  {
    q: "Who owns the Figma files and component libraries?",
    a: "You receive full ownership and edit access to all Figma workspaces, vector assets, and design system component libraries upon project completion.",
  },
  {
    q: "Do you assist developers during implementation?",
    a: "Yes, our designers work alongside engineering teams during sprint reviews to inspect pixel fidelity, states, and responsive breakpoints.",
  },
  {
    q: "How do we get started?",
    a: "We begin with a discovery session to review user personas, business objectives, and current product friction points.",
  },
];

export default function UIUXDesign() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/design-brand/ui-ux-design"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "UI/UX & Design Systems", path: "/services/design-brand/ui-ux-design" },
      ]}
      eyebrow="DESIGN & BRAND / 05"
      serviceName="UI/UX & Design Systems"
      benefitHeadline="interfaces that are clear, consistent, and easy to use."
      overviewP1="We research how people use your product, design the flows, and turn them into prototypes and reusable components so design and development stay in sync."
      typicalTimeline="Typical timeline: 2 – 6 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["Figma", "Design Tokens", "Prototyping", "WCAG 2.1 AA", "Storybook"]}
      faqs={FAQS}
    />
  );
}
