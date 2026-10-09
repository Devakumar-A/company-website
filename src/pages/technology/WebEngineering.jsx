import React from "react";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Production React & Next.js architectures",
  "TypeScript-first fullstack codebases",
  "Scalable APIs with Node.js & Express",
  "Design token systems with Tailwind CSS",
  "Core Web Vitals & performance optimization",
  "Automated testing & CI/CD deployment pipelines",
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "Express",
];

export default function WebEngineering() {
  return (
    <>
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 01</div>

          <div className="technology-icon">
            <Code2 size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Web
            <br />
            <span>engineering.</span>
          </h1>

          <p>
            Fast, reliable web architectures and applications built for scale,
            performance and long-term maintainability.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss your stack
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            THE ARCHITECTURE
          </div>

          <div className="technology-copy">
            <h2>
              Engineering built
              <br />
              for performance and growth.
            </h2>

            <p>
              Modern web applications require clean separation of concerns, fast
              rendering pipelines, and resilient state management. We architect
              digital products that remain fast and intuitive under real-world
              traffic.
            </p>

            <p>
              By leveraging component-driven systems, server-side rendering, and
              type-safe interfaces, we ensure that new features can be added
              smoothly without compromising application stability.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            FOCUS AREAS
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
            <Code2 size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Web applications that
              <br />
              are fast to load and built to scale.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>PLANNING A WEB PRODUCT?</span>

          <h2>
            Let's engineer the
            <br />
            right technical foundation.
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