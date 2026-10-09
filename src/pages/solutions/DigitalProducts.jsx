import React from "react";
import { ArrowLeft, ArrowRight, Check, Layers3, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/solutions/SolutionDetail.css";

const capabilities = [
  "Customer-facing digital products",
  "SaaS platforms",
  "Web-based products",
  "Product interfaces",
  "Business portals",
  "Product development support",
];

const outcomes = [
  "A clear product direction",
  "A usable experience",
  "A strong technical foundation",
  "A product that can grow with the business",
];

export default function DigitalProducts() {
  return (
    <>
    <SEO {...seoData["/solutions/digital-products"]} />
    <main className="solution-detail-page">

      <section className="solution-detail-hero">
        <div className="solution-hero-grid" aria-hidden="true" />

        <Link to="/solutions" className="solution-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Solutions</span>
        </Link>

        <div className="solution-eyebrow">
          SOLUTION / 01
        </div>

        <div className="solution-hero-icon">
          <Layers3 size={28} strokeWidth={1.4} />
        </div>

        <h1>
          Digital
          <br />
          <span>products.</span>
        </h1>

        <p>
          From an early idea to a working product, we help businesses turn
          useful ideas into digital experiences people can actually use.
        </p>

        <Link to="/contact" className="solution-hero-cta">
          Discuss your idea
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="solution-introduction">
        <div className="solution-label">
          <span>01</span>
          THE IDEA
        </div>

        <div className="solution-copy">
          <h2>
            Build the product
            <br />
            around the problem.
          </h2>

          <p>
            A digital product should solve something useful. We work with
            businesses to understand the problem first, then shape the product
            around the people who will use it.
          </p>

          <p>
            That can mean creating something completely new or turning an
            existing business process into a product that customers and teams
            can access online.
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
            <Monitor size={24} strokeWidth={1.4} />
          </div>

          <span>THE RESULT</span>

          <h2>
            Something useful,
            <br />
            not just something new.
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
        <span>HAVE AN IDEA?</span>

        <h2>
          Let's see what
          <br />
          it could become.
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