import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Comprehensive growth & channel strategy",
  "Search engine optimization (Technical & Content SEO)",
  "Social media authority & audience development",
  "Email marketing automation & lifecycle campaigns",
  "Cross-channel tracking & Google Analytics 4 audits",
  "Monthly performance reviews & executive reporting",
];

export default function DigitalMarketing() {
  const seo = seoData["/services/growth-marketing/digital-marketing"];
  return (
    <>
      <SEO {...seo} />
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            GROWTH & MARKETING / 01
          </div>

          <h1>
            Digital
            <br />
            <span>marketing.</span>
          </h1>

          <p>
            Holistic digital marketing frameworks engineered to increase market
            presence, build brand trust, and attract consistent inbound demand.
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
            <h2>Building an organic inbound engine that compounds over time.</h2>

            <p>
              Relying solely on sporadic campaigns leaves your pipeline vulnerable.
              Sustainable digital marketing requires an ecosystem where SEO, content,
              brand presence, and email automation work together harmoniously.
            </p>

            <p>
              We craft comprehensive digital marketing roadmaps that turn your website
              into an authoritative commercial asset that consistently generates
              inbound inquiries.
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
          <span>EXPAND YOUR DIGITAL REACH</span>

          <h2>
            Ready to grow
            <br />
            your brand online?
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