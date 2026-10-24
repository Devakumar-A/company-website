import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Custom responsive website",
  "SEO-ready structure and structured data",
  "Content management setup",
  "Analytics and enquiry tracking",
  "Hosting and domain setup",
];

const FAQS = [
  {
    q: "How long does building a new website typically take?",
    a: "Most corporate and marketing website projects take between 2 to 5 weeks from initial design approval to live domain deployment.",
  },
  {
    q: "Can non-technical team members update content easily?",
    a: "Yes, we integrate modern headless content management systems (CMS) so your marketing team can update copy, images, and blog posts with zero coding required.",
  },
  {
    q: "Who owns the domain, hosting, and code?",
    a: "You own 100% of your website code, domain registrations, and hosting accounts. We hand over all administrator credentials upon launch.",
  },
  {
    q: "Is search engine optimization included?",
    a: "Yes, every website we deliver includes semantic HTML5 structure, OpenGraph meta tags, XML sitemaps, and validated JSON-LD schema markup.",
  },
  {
    q: "How do we get started?",
    a: "We begin with a brief consultation to review your brand positioning, page requirements, and target launch date.",
  },
];

export default function WebsiteDevelopment() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/web-digital/website-development"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Website Development", path: "/services/web-digital/website-development" },
      ]}
      eyebrow="WEB & DIGITAL / 07"
      serviceName="Website Development"
      benefitHeadline="fast, search-friendly websites that explain what you do and bring in enquiries."
      overviewP1="We design and build business websites that load quickly, work on every device, and are structured so search engines and visitors understand them."
      typicalTimeline="Typical timeline: 2 – 5 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["React", "HTML5", "CSS3", "Headless CMS", "Sharp", "Netlify"]}
      faqs={FAQS}
    />
  );
}