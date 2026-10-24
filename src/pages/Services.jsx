import React from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import ServicesSection from "../sections/Services";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

/**
 * Dedicated /services page.
 * Renders the Services section as a full standalone page.
 */
export default function ServicesPage() {
  return (
    <>
      <SEO {...seoData["/services"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services" }]} />
      <div className="page-feature-visual-container">
        <img
          src="/images/cognolynx-technology-services.webp"
          alt="Cognolynx custom technology services: software engineering, web platforms, and cloud architecture"
          width="1200"
          height="675"
          className="page-feature-visual-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <ServicesSection headingTag="h1" />
      <Footer />
    </>
  );
}
