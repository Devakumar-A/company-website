import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Visual brand positioning & identity strategy",
  "Logo design & wordmarks with usage systems",
  "Typography selection & color palette architecture",
  "Brand voice, tone & key messaging guides",
  "Digital collateral & social media template suites",
  "Brand guidelines manual for teams and partners",
];

export default function BrandIdentity() {
  const seo = seoData["/services/design-brand/brand-identity"];
  return (
    <>
      <SEO {...seo} />
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            DESIGN & BRAND / 04
          </div>

          <h1>
            Brand
            <br />
            <span>identity.</span>
          </h1>

          <p>
            Distinctive visual identities and strategic brand frameworks that
            communicate authority, professionalism, and enduring purpose.
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
            <h2>A presence that resonates and endures.</h2>

            <p>
              Your identity is the visible signature of your standards and reputation.
              It establishes confidence long before a sales conversation begins and
              gives customers a memorable reference point.
            </p>

            <p>
              We craft comprehensive brand systems that feel poised, sophisticated,
              and ready to perform across digital interfaces, print mediums, and
              corporate communications.
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
          <span>DEFINE YOUR REPUTATION</span>

          <h2>
            Ready to establish
            <br />
            a lasting brand?
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
