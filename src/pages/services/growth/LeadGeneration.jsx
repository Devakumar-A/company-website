import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "B2B and B2C sales funnel architecture",
  "Lead capture mechanisms & dynamic form optimization",
  "CRM integration & lead scoring workflows",
  "Automated email nurture sequences",
  "Lead qualification & appointment scheduling setup",
  "Conversion rate optimization (CRO) audits",
];

export default function LeadGeneration() {
  return (
    <>
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            GROWTH & MARKETING / 03
          </div>

          <h1>
            Lead
            <br />
            <span>generation.</span>
          </h1>

          <p>
            Systematic customer acquisition pipelines that transform interested
            prospects into qualified, high-intent sales conversations.
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
            <h2>Building pipeline predictability for sales teams.</h2>

            <p>
              Generating web traffic is only the first step. If visitors don't have
              a clear reason to identify themselves and initiate a dialogue, the
              commercial potential is lost.
            </p>

            <p>
              We design frictionless conversion paths, compelling offers, and automated
              follow-up mechanisms that keep your pipeline populated with genuine,
              sales-ready inquiries.
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
          <span>FILL YOUR SALES PIPELINE</span>

          <h2>
            Ready for consistent
            <br />
            qualified leads?
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