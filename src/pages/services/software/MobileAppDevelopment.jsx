import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Cross-platform app for Android and iOS",
  "Push notifications and offline support where needed",
  "Camera, location, and biometric features",
  "App Store and Google Play submission",
  "Crash reporting and analytics",
];

const FAQS = [
  {
    q: "How long does mobile app development typically take?",
    a: "Most mobile applications take between 6 to 12 weeks from initial wireframes to store submission, depending on feature scope and backend readiness.",
  },
  {
    q: "Do you build native or cross-platform applications?",
    a: "We specialize in React Native and Flutter, delivering high-performance cross-platform apps from a single, well-tested codebase that runs seamlessly on both iOS and Android.",
  },
  {
    q: "Who owns the mobile app code and developer accounts?",
    a: "You own 100% of the source code, assets, and app repository. We publish the application directly to your organization's Apple Developer and Google Play Console accounts.",
  },
  {
    q: "Do you provide post-launch maintenance and OS updates?",
    a: "Yes, we offer ongoing maintenance arrangements to monitor app health, crash metrics, and compatibility with new iOS and Android OS releases.",
  },
  {
    q: "How does the project kick off?",
    a: "We start with a product discovery call to define core user flows, technical requirements, and target launch timelines.",
  },
];

export default function MobileAppDevelopment() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/software-engineering/mobile-app-development"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Mobile App Development", path: "/services/software-engineering/mobile-app-development" },
      ]}
      eyebrow="SOFTWARE & MOBILE / 06"
      serviceName="Mobile App Development"
      benefitHeadline="Android and iOS apps from a single, well-tested codebase."
      overviewP1="We build mobile apps with React Native or Flutter, from first prototype through store release, with a focus on speed, usability, and reliability."
      typicalTimeline="Typical timeline: 6 – 12 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["React Native", "Flutter", "iOS", "Android", "Firebase", "TypeScript"]}
      faqs={FAQS}
    />
  );
}
