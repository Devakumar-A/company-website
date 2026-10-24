import React from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import TechnologySection from "../sections/Technology";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";

/**
 * Dedicated /technology page.
 * Renders the Technology section as a full standalone page.
 */
export default function TechnologyPage() {
  return (
    <>
      <SEO {...seoData["/technology"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Technology" }]} />
      <TechnologySection headingTag="h1" />
      <Footer />
    </>
  );
}
