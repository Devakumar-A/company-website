import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Core design tokens (colors, typography, spacing)",
  "Reusable React & Figma UI component libraries",
  "Design system documentation & guidelines",
  "Accessibility compliance standards (WCAG)",
  "Version control & multi-team governance",
  "Dark mode & theme architecture",
];

export default function DesignSystems() {
  const seo = seoData["/services/design-brand/design-systems"];
  return (
    <>
      <SEO {...seo} />
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            DESIGN & BRAND / 02
          </div>

          <h1>
            Design
            <br />
            <span>systems.</span>
          </h1>

          <p>
            Scalable foundation systems that empower design and engineering
            teams to ship consistent, high-quality interfaces faster.
          </p>

          <Link to="/contact" className="service-detail-cta">
            Discuss a project
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="service-detail-content">
          <div className="service-detail-section-label">
            <span>01</span>
            THE WORK
          </div>

          <div className="service-detail-copy">
            <h2>Consistency at scale without slowing down release cycles.</h2>

            <p>
              As companies grow, inconsistency creeps in across screens, codebases,
              and team handoffs. A well-constructed design system turns chaos into
              a repeatable, reliable rhythm.
            </p>

            <p>
              We bridge the gap between design files and production code, creating
              robust, documented component libraries that reduce development time
              and protect your brand standards.
            </p>
          </div>
        </section>

        <section className="service-detail-features">
          <div className="service-detail-section-label">
            <span>02</span>
            WHAT WE DELIVER
          </div>

          <div className="service-feature-list">
            {features.map((feature, index) => (
              <div className="service-feature" key={feature}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Check size={17} />
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="service-detail-bottom">
          <span>SCALE YOUR PRODUCT SYSTEM</span>

          <h2>
            Build once,
            <br />
            use everywhere.
          </h2>

          <Link to="/contact" className="service-detail-bottom-link">
            Start a conversation
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
