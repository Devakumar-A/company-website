import React from "react";
import { ArrowLeft, ArrowRight, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Cloud architecture across AWS, GCP and Azure",
  "Docker containerization & Kubernetes cluster orchestration",
  "Infrastructure as Code (Terraform) & automated CI/CD",
  "Edge delivery, caching and DDoS defense with Cloudflare",
  "Full-stack observability, logging & automated alert triggers",
  "Zero-downtime rolling deployments and disaster recovery",
];

const technologies = [
  "AWS",
  "Google Cloud",
  "Azure",
  "Docker",
  "Kubernetes",
  "Cloudflare",
];

export default function CloudInfrastructure() {
  return (
    <>
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 04</div>

          <div className="technology-icon">
            <Cloud size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Cloud &
            <br />
            <span>infrastructure.</span>
          </h1>

          <p>
            Resilient cloud environments, automated deployment pipelines and
            highly available infrastructure engineered for uninterrupted service.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss infrastructure
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            INFRASTRUCTURE DESIGN
          </div>

          <div className="technology-copy">
            <h2>
              Scalable cloud systems with
              <br />
              zero unnecessary complexity.
            </h2>

            <p>
              Growing digital applications quickly outpace simple hosting. As
              user counts fluctuate and transaction volumes spike, infrastructure
              must dynamically scale while guarding sensitive data and keeping
              operational costs controlled.
            </p>

            <p>
              We implement infrastructure-as-code and containerized deployment
              strategies that make environments reproducible, auditable, and
              resilient against regional outages or traffic surges.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            CLOUD & DEVOPS
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
            <Cloud size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Infrastructure that keeps your
              <br />
              applications online and resilient 24/7.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>SCALING YOUR INFRASTRUCTURE?</span>

          <h2>
            Let's engineer cloud
            <br />
            reliability and cost efficiency.
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