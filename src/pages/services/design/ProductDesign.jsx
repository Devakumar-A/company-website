import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "End-to-end digital product design",
  "Feature validation & proof of concept",
  "Customer journey mapping & empathy studies",
  "Interaction models & micro-animations",
  "Product iteration based on analytics",
  "Strategic design roadmapping",
];

export default function ProductDesign() {
  const seo = seoData["/services/design-brand/product-design"];
  return (
    <>
      <SEO {...seo} />
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            DESIGN & BRAND / 03
          </div>

          <h1>
            Product
            <br />
            <span>design.</span>
          </h1>

          <p>
            Holistic digital product experiences uniting strategic customer insights,
            elegant visuals, and commercial performance goals.
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
            <h2>From conceptual vision to production-grade product.</h2>

            <p>
              Successful products are never accidental; they arise when user value
              aligns cleanly with technological execution. We work alongside founders
              and product leads to clarify product requirements and validate ideas rapidly.
            </p>

            <p>
              We design every touchpoint with precision — from onboarding journeys to
              complex data views — ensuring every state provides utility and satisfaction.
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
          <span>TURN CONCEPTS INTO REALITY</span>

          <h2>
            Have a product
            <br />
            ready to build?
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
