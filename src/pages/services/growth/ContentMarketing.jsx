import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Strategic content pillars & editorial calendars",
  "High-authority industry articles & blog posts",
  "In-depth customer case studies & client stories",
  "Whitepapers, guides & downloadable lead assets",
  "SEO keyword research & competitive search analysis",
  "Content distribution strategy & multi-channel syndication",
];

export default function ContentMarketing() {
  return (
    <>
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            GROWTH & MARKETING / 04
          </div>

          <h1>
            Content
            <br />
            <span>marketing.</span>
          </h1>

          <p>
            Substantive thought leadership, educational content, and strategic
            storytelling that build domain authority and commercial trust.
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
            <h2>Content that proves capability and answers buyer questions.</h2>

            <p>
              In competitive markets, buyers research thoroughly before contacting sales.
              Content that answers their questions deeply, addresses objections, and demonstrates
              tangible expertise wins decisions.
            </p>

            <p>
              We produce clear, authoritative content that earns organic search rankings,
              educates your prospects, and positions your brand as the obvious industry leader.
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
          <span>BUILD YOUR DOMAIN AUTHORITY</span>

          <h2>
            Ready to lead the
            <br />
            conversation in your field?
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