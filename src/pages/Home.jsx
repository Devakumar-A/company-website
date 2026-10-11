import React, { useState, useEffect, lazy, Suspense } from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Solutions from "../sections/Solutions";
import Technology from "../sections/Technology";
import Footer from "../components/Footer";

// Lazy-load after hydration to keep critical bundle & hydration path untouched
const InternshipPopup = lazy(() => import("../components/InternshipPopup"));

export default function Home() {
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  return (
    <>
      <SEO {...seoData["/"]} />
      <div className="hero-about-flow">
        <Hero />
        <About />
      </div>

      <Services />

      <Solutions />

      <Technology />

      <Footer />

      {isClientMounted && (
        <Suspense fallback={null}>
          <InternshipPopup />
        </Suspense>
      )}
    </>
  );
}
