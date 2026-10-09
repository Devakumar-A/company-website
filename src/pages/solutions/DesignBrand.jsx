import React from "react";
import { ArrowLeft, ArrowRight, Check, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/solutions/SolutionDetail.css";

const capabilities = [
  "Brand identity development",
  "Website and interface design",
  "Visual direction",
  "Design systems",
  "Marketing design",
  "Product experience design",
];

const outcomes = [
  "A clearer visual identity",
  "Consistent brand expression",
  "Better digital experiences",
  "Design that supports the business",
];

export default function DesignBrandSolution() {
  return (
    <>
    <SEO {...seoData["/solutions/design-brand"]} />
    <main className="solution-detail-page">

      <section className="solution-detail-hero">
        <div className="solution-hero-grid" aria-hidden="true" />

        <Link to="/solutions" className="solution-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Solutions</span>
        </Link>

        <div className="solution-eyebrow">
          SOLUTION / 04
        </div>

        <div className="solution-hero-icon">
          <Palette size={28} strokeWidth={1.4} />
        </div>

        <h1>
          Design &
          <br />
          <span>brand.</span>
        </h1>

        <p>
          A stronger visual presence and clearer digital experience for
          businesses that want to be recognised for the right reasons.
        </p>

        <Link to="/contact" className="solution-hero-cta">
          Discuss your brand
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="solution-introduction">
        <div className="solution-label">
          <span>01</span>
          THE PURPOSE
        </div>

        <div className="solution-copy">
          <h2>
            Make the business
            <br />
            easier to recognise.
          </h2>

          <p>
            Design should help people understand who you are, what you offer
            and why they should pay attention.
          </p>

          <p>
            We bring brand identity and digital design together so the
            experience feels consistent from the first impression through to
            the product itself.
          </p>
        </div>
      </section>

      <section className="solution-capabilities">
        <div className="solution-label">
          <span>02</span>
          WHAT WE CAN BUILD
        </div>

        <div className="solution-capability-grid">
          {capabilities.map((item, index) => (
            <div className="solution-capability" key={item}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="solution-outcome">
        <div className="solution-outcome-content">
          <div className="solution-outcome-icon">
            <Palette size={24} strokeWidth={1.4} />
          </div>

          <span>THE RESULT</span>

          <h2>
            A brand that feels
            <br />
            like one business.
          </h2>

          <div className="solution-outcome-list">
            {outcomes.map((item) => (
              <div key={item}>
                <Check size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-final">
        <span>READY TO SHARPEN THE BRAND?</span>

        <h2>
          Let's build a presence
          <br />
          people remember.
        </h2>

        <Link to="/contact" className="solution-final-link">
          Start a conversation
          <ArrowRight size={18} />
        </Link>
      </section>

    </main>
    <Footer />
    </>
  );
}