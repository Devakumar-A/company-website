import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Technical SEO audit and fixes",
  "Analytics and conversion tracking setup",
  "Landing pages for campaigns",
  "Search and social ad campaign setup",
  "Monthly reporting",
];

const FAQS = [
  {
    q: "How are growth and SEO sprints structured?",
    a: "We work on monthly iterative sprints with dedicated deliverables: technical SEO fixes, campaign landing page tests, and transparent monthly performance reviews.",
  },
  {
    q: "How do you track campaign conversions?",
    a: "We set up server-side and client-side event tracking across Google Analytics 4, Meta Conversions API, and tag managers to ensure accurate conversion measurement.",
  },
  {
    q: "Who owns the ad accounts and analytics properties?",
    a: "All advertising accounts, conversion pixels, and analytics dashboards are owned directly by your company. We never hold your data hostage.",
  },
  {
    q: "How soon do search engine improvements become noticeable?",
    a: "Technical SEO and crawl fixes are typically recognized within 2 to 6 weeks by search engines, while domain authority and ranking growth compound over several months.",
  },
  {
    q: "How do we get started?",
    a: "We begin with a technical audit of your current digital footprint and search rankings, followed by an actionable roadmap proposal.",
  },
];

export default function DigitalMarketing() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/growth-marketing/digital-marketing"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Growth & SEO", path: "/services/growth-marketing/digital-marketing" },
      ]}
      eyebrow="GROWTH & MARKETING / 08"
      serviceName="Growth & SEO"
      benefitHeadline="measurement, search, and campaigns that work together."
      overviewP1="We help you understand where visitors come from and what they do, then improve search visibility and landing pages based on that data."
      typicalTimeline="Typical timeline: Ongoing sprint (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["Google Analytics 4", "Meta Pixel", "Search Console", "Mixpanel", "Tag Manager"]}
      faqs={FAQS}
    />
  );
}