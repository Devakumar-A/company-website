import React from "react";
import { ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Custom backend software architecture",
  "API design, versioning and microservices",
  "Python services and asynchronous tasks",
  "Automated business process pipelines",
  "Data processing, transformation & ETL flows",
  "System monitoring, health checks & observability",
];

const technologies = [
  "Python",
  "Node.js",
  "TypeScript",
  "REST APIs",
  "GraphQL",
  "Docker",
];

export default function SoftwareSystems() {
  return (
    <>
      <SEO {...seoData["/technology/software-systems"]} />
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 02</div>

          <div className="technology-icon">
            <Cpu size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Software
            <br />
            <span>systems.</span>
          </h1>

          <p>
            Robust backend engines, intelligent data workflows and automated
            business systems engineered for reliability and long-term utility.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss your system
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            THE FOUNDATION
          </div>

          <div className="technology-copy">
            <h2>
              Software built to handle
              <br />
              real business complexity.
            </h2>

            <p>
              When operations expand, businesses need software that coordinates
              data flows across departments without breaking down or creating
              blind spots. We construct scalable systems tailored to operational
              demands.
            </p>

            <p>
              From asynchronous processing to third-party integrations and
              custom API services, we engineer resilient software architectures
              that give teams confidence in their tools every day.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            CORE CAPABILITIES
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
            <Cpu size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Systems that run predictably
              <br />
              and scale with your operations.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>NEED ROBUST SOFTWARE?</span>

          <h2>
            Let's build systems
            <br />
            that grow with your business.
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