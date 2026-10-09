import React from "react";
import { ArrowLeft, ArrowRight, Check, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/solutions/SolutionDetail.css";

const capabilities = [
  "Customer mobile applications",
  "Business and employee apps",
  "Cross-platform applications",
  "Mobile booking experiences",
  "Account and service apps",
  "Mobile-first product interfaces",
];

const outcomes = [
  "A focused mobile experience",
  "Simple navigation",
  "Consistent performance",
  "A product designed around real usage",
];

export default function MobileExperiences() {
  return (
    <>
    <SEO {...seoData["/solutions/mobile-experiences"]} />
    <main className="solution-detail-page">

      <section className="solution-detail-hero">
        <div className="solution-hero-grid" aria-hidden="true" />

        <Link to="/solutions" className="solution-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Solutions</span>
        </Link>

        <div className="solution-eyebrow">
          SOLUTION / 03
        </div>

        <div className="solution-hero-icon">
          <Smartphone size={28} strokeWidth={1.4} />
        </div>

        <h1>
          Mobile
          <br />
          <span>experiences.</span>
        </h1>

        <p>
          Mobile applications designed around the way people actually use
          their phones — quickly, naturally and on the move.
        </p>

        <Link to="/contact" className="solution-hero-cta">
          Discuss your idea
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="solution-introduction">
        <div className="solution-label">
          <span>01</span>
          THE EXPERIENCE
        </div>

        <div className="solution-copy">
          <h2>
            Small screen.
            <br />
            Clear experience.
          </h2>

          <p>
            Mobile products have less room for unnecessary steps. The
            important actions need to be easy to find and the experience needs
            to feel natural from the first tap.
          </p>

          <p>
            We design mobile experiences around those realities, whether the
            application is for customers, employees or a specific business
            process.
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
            <Smartphone size={24} strokeWidth={1.4} />
          </div>

          <span>THE RESULT</span>

          <h2>
            An experience people
            <br />
            can use without thinking.
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
        <span>THINKING ABOUT MOBILE?</span>

        <h2>
          Let's shape the
          <br />
          right experience.
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