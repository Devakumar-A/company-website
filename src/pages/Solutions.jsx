import React from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import SolutionsSection from "../sections/Solutions";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

/**
 * Dedicated /solutions page.
 * Renders the Solutions section as a full standalone page.
 */
export default function SolutionsPage() {
  return (
    <>
      <SEO {...seoData["/solutions"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Solutions" }]} />
      <div className="page-feature-visual-container">
        <img
          src="/images/cognolynx-digital-solutions.webp"
          alt="Cognolynx end-to-end digital solutions: digital products, enterprise systems, and intelligent automation"
          width="1200"
          height="675"
          className="page-feature-visual-image"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <SolutionsSection headingTag="h1" />
      <Footer />
    </>
  );
}
