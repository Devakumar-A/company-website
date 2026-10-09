import React from "react";
import { ArrowLeft, ArrowRight, Check, Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/solutions/SolutionDetail.css";

const capabilities = [
  "Business management systems",
  "Internal operations platforms",
  "Employee and workflow systems",
  "Inventory and booking systems",
  "Customer management",
  "Reports and dashboards",
];

const outcomes = [
  "Less repetitive manual work",
  "Information in one place",
  "Clearer business processes",
  "Better visibility for decision-making",
];

export default function BusinessSystems() {
  const { pathname } = useLocation();
  const meta = seoData[pathname] || seoData["/solutions/business-systems"];

  return (
    <>
    <SEO {...meta} />
    <main className="solution-detail-page">

      <section className="solution-detail-hero">
        <div className="solution-hero-grid" aria-hidden="true" />

        <Link to="/solutions" className="solution-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Solutions</span>
        </Link>

        <div className="solution-eyebrow">
          SOLUTION / 02
        </div>

        <div className="solution-hero-icon">
          <Database size={28} strokeWidth={1.4} />
        </div>

        <h1>
          Business
          <br />
          <span>systems.</span>
        </h1>

        <p>
          Connected software that brings everyday business operations,
          information and people into one clearer system.
        </p>

        <Link to="/contact" className="solution-hero-cta">
          Discuss your requirements
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="solution-introduction">
        <div className="solution-label">
          <span>01</span>
          THE PROBLEM
        </div>

        <div className="solution-copy">
          <h2>
            When the business grows,
            <br />
            scattered tools start showing.
          </h2>

          <p>
            Spreadsheets, messages, separate applications and manual updates
            can work for a while. Eventually, they make information harder to
            find and processes harder to manage.
          </p>

          <p>
            We build business systems around the actual workflow, connecting
            the information and actions your team needs every day.
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
            <Database size={24} strokeWidth={1.4} />
          </div>

          <span>THE RESULT</span>

          <h2>
            A clearer way
            <br />
            to run the business.
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
        <span>READY TO CONNECT THE WORK?</span>

        <h2>
          Let's understand
          <br />
          how your business works.
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