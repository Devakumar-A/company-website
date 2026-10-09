import React from "react";
import { ArrowLeft, ArrowRight, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Comprehensive Figma component libraries and UI kits",
  "Design token architecture, semantic variables & dark mode",
  "Production React component implementations",
  "WCAG 2.1 AA accessibility and contrast validation",
  "Cross-platform design alignment between web and mobile",
  "Living component documentation and usage guidelines",
];

const technologies = [
  "Figma",
  "Design Tokens",
  "React",
  "Tailwind CSS",
  "Photoshop",
  "Illustrator",
];

export default function DesignSystemsTechnology() {
  return (
    <>
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 06</div>

          <div className="technology-icon">
            <Palette size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Design
            <br />
            <span>systems.</span>
          </h1>

          <p>
            Systematic UI architectures, design tokens and reusable component
            libraries engineered to unite design and codebases with speed and
            clarity.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss design systems
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            SYSTEM DESIGN
          </div>

          <div className="technology-copy">
            <h2>
              Consistency and velocity
              <br />
              across every product screen.
            </h2>

            <p>
              When design and development move at different speeds, visual drift
              creeps in. Inconsistent buttons, mismatched typography, and ad-hoc
              spacing slow down releases and degrade customer trust.
            </p>

            <p>
              A robust design system acts as the single source of truth. By
              codifying tokens, states, and accessibility rules into reusable
              components, engineering velocity increases while design quality
              remains uncompromised.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            SYSTEM PRACTICES
          </div>

          <div className="technology-capability-content">
            <div className="technology-capability-list">
              {capabilities.map((item, index) => (
                <div className="technology-capability" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div className="technology-stack">
              <span>PRIMARY TECHNOLOGIES</span>
              <div>
                {technologies.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="technology-result">
          <div className="technology-result-inner">
            <Palette size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Unified brand experiences
              <br />
              and accelerated product velocity.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>NEED A UNIFIED SYSTEM?</span>

          <h2>
            Let's build a design system
            <br />
            your entire team will love.
          </h2>

          <Link to="/contact" className="technology-final-link">
            Start a conversation
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}