import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Meta Ads (Facebook & Instagram) campaign management",
  "Google Ads (Search, Performance Max, Display)",
  "LinkedIn Ads B2B account-based targeting",
  "High-converting landing page design & A/B testing",
  "Pixel tracking, server-side CAPI & conversion setup",
  "Strict CPA / ROAS budgeting & weekly optimization",
];

export default function PerformanceMarketing() {
  return (
    <>
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            GROWTH & MARKETING / 02
          </div>

          <h1>
            Performance
            <br />
            <span>marketing.</span>
          </h1>

          <p>
            Precision paid acquisition campaigns built on mathematical rigor,
            creative testing, and positive return on investment.
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
            <h2>Paid advertising with predictable returns and clear attribution.</h2>

            <p>
              Paid media fails when ad copy is generic, targeting is broad, or post-click
              landing pages don't fulfill expectations. High-performing campaigns require
              meticulous alignment across message, audience, and landing page.
            </p>

            <p>
              We manage campaigns with relentless commercial focus, testing copy and
              visuals continuously to drive down customer acquisition costs while scaling
              revenue.
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
          <span>MAXIMIZE YOUR ADVERTISING ROI</span>

          <h2>
            Ready to scale
            <br />
            paid acquisition?
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