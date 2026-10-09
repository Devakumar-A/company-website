import React from "react";
import { ArrowLeft, ArrowRight, Database } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Relational schema modeling with PostgreSQL & MySQL",
  "High-speed document storage & caching with MongoDB & Redis",
  "Query optimization, indexing and connection pooling",
  "Real-time event subscriptions & pub/sub architecture",
  "Automated data replication, encryption & backup schedules",
  "Unified REST and GraphQL database access layers",
];

const technologies = [
  "PostgreSQL",
  "MongoDB",
  "MySQL",
  "Redis",
  "Supabase",
  "GraphQL",
];

export default function BackendDatabases() {
  return (
    <>
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 05</div>

          <div className="technology-icon">
            <Database size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Backend &
            <br />
            <span>databases.</span>
          </h1>

          <p>
            High-throughput data storage, relational modeling and optimized
            backend database services engineered for transactional integrity.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss data systems
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            DATA ARCHITECTURE
          </div>

          <div className="technology-copy">
            <h2>
              Data foundations designed for
              <br />
              speed, safety and integrity.
            </h2>

            <p>
              Your database is the core record of your business. Sloppy schema
              decisions or unindexed queries create sluggish response times that
              frustrate users and bottleneck application growth as datasets
              multiply.
            </p>

            <p>
              We design structured database architectures using relational and
              document engines matched to your data shapes. Every table, index,
              and query is tuned to deliver sub-millisecond lookups and clean ACID
              compliance.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            DATA & BACKEND
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
            <Database size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Data layers that remain fast,
              <br />
              consistent and durable as volume scales.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>STRUCTURING YOUR DATA?</span>

          <h2>
            Let's design a reliable
            <br />
            database backend.
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