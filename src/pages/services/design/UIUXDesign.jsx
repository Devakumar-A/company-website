import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Website and web application interfaces",
  "Mobile application interfaces",
  "User flows and information architecture",
  "Wireframes and prototypes",
  "Responsive interface design",
  "Usability-focused design",
];

export default function UIUXDesign() {
  return (
    <>
      <main className="service-detail-page">
        <section className="service-detail-hero">
          <div className="service-detail-eyebrow">
            DESIGN & BRAND / 01
          </div>

          <h1>
            UI / UX
            <br />
            <span>design.</span>
          </h1>

          <p>
            Interfaces designed around what people need to do, not just what
            looks good in a screenshot.
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
            <h2>
              Make the next step
              <br />
              obvious.
            </h2>

            <p>
              A good interface should not make someone think about how to use
              it. The structure, wording and visual hierarchy should guide them
              naturally.
            </p>

            <p>
              We work through the actual user journey, from the first screen to
              the final action, and turn that journey into a clear interface.
            </p>
          </div>
        </section>

        <section className="service-detail-features">
          <div className="service-detail-section-label">
            <span>02</span>
            WHAT WE DESIGN
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
          <span>DESIGN THE EXPERIENCE</span>

          <h2>
            Have a product
            <br />
            that needs clarity?
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
