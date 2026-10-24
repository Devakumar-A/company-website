import React, { useState, useEffect, lazy, Suspense } from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Footer from "../components/Footer";

import InternshipPopup from "../components/InternshipPopup";

// Lazy-load below-the-fold heavy sections to keep the initial client bundle light
const LazyServices = lazy(() => import("../sections/Services"));
const LazySolutions = lazy(() => import("../sections/Solutions"));
const LazyTechnology = lazy(() => import("../sections/Technology"));

export default function Home({
  ServicesComp = LazyServices,
  SolutionsComp = LazySolutions,
  TechnologyComp = LazyTechnology,
}) {
  return (
    <>
      <SEO {...seoData["/"]} />
      <div className="hero-about-flow">
        <Hero />
        <About />
      </div>

      <Suspense fallback={<div className="section-suspense-placeholder" style={{ minHeight: "650px" }} />}>
        <ServicesComp />
      </Suspense>

      <Suspense fallback={<div className="section-suspense-placeholder" style={{ minHeight: "650px" }} />}>
        <SolutionsComp />
      </Suspense>

      <Suspense fallback={<div className="section-suspense-placeholder" style={{ minHeight: "850px" }} />}>
        <TechnologyComp />
      </Suspense>

      <Footer />
      <InternshipPopup />
    </>
  );
}
