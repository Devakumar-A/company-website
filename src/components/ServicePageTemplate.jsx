import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SEO from "./SEO";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import "../styles/services/ServiceDetail.css";

export default function ServicePageTemplate({
  seoProps,
  breadcrumbs = [],
  eyebrow = "SERVICE SPECIFICATION",
  serviceName,
  benefitHeadline,
  overviewP1,
  overviewP2,
  typicalTimeline = "Typical timeline: 4 – 12 weeks (scope dependent)",
  deliverables = [],
  process = [
    {
      num: "01",
      title: "Discover and scope",
      desc: "We analyze your existing workflows, agree on functional requirements, and establish realistic project milestones.",
    },
    {
      num: "02",
      title: "Design and plan",
      desc: "We map user journeys, design prototypes in Figma, and finalize data architectures and technical specifications.",
    },
    {
      num: "03",
      title: "Build and review",
      desc: "We write clean, well-tested code in iterative sprints, conducting regular demos so your team can test progress.",
    },
    {
      num: "04",
      title: "Launch and support",
      desc: "We handle deployment, monitoring setup, and documentation handover to ensure a smooth transition.",
    },
  ],
  techStack = [],
  faqs = [],
}) {
  // Generate FAQPage JSON-LD schema matching visible questions
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${faq.a} Details are agreed in the project proposal.`,
      },
    })),
  } : null;

  return (
    <>
      <SEO {...seoProps} customSchema={faqSchema} />

      <main className="service-detail-page">
        {/* BREADCRUMBS */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} />
        )}

        {/* HERO SECTION WITH SINGLE H1 */}
        <section className="service-detail-hero" style={breadcrumbs && breadcrumbs.length > 0 ? { paddingTop: "32px" } : {}}>
          <div className="service-detail-eyebrow">{eyebrow}</div>

          <h1>
            {serviceName}
            <br />
            <span>{benefitHeadline}</span>
          </h1>

          <p>{overviewP1}</p>
          {overviewP2 && <p style={{ marginTop: "0" }}>{overviewP2}</p>}

          <div style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap", marginTop: "12px" }}>
            <Link to="/contact" className="service-detail-cta">
              Talk to our team
              <ArrowRight size={18} />
            </Link>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#64748b",
                background: "#ffffff",
                padding: "8px 14px",
                borderRadius: "999px",
                border: "1px solid #e2e8f0",
              }}
            >
              {typicalTimeline}
            </span>
          </div>
        </section>

        {/* WHAT YOU GET (DELIVERABLES) */}
        <section className="service-detail-features">
          <div className="service-detail-section-label">
            <span>01</span>
            WHAT YOU GET
          </div>

          <div className="service-feature-list">
            {deliverables.map((item, index) => (
              <div className="service-feature" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Check size={18} />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW WE WORK (PROCESS) */}
        <section className="service-detail-process">
          <div className="service-detail-section-label">
            <span>02</span>
            HOW WE WORK
          </div>

          <div className="service-process-grid">
            {process.map((step) => (
              <div key={step.num} className="service-process-card">
                <span className="service-process-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNOLOGIES WE USE */}
        <section className="service-detail-tech">
          <div className="service-detail-section-label">
            <span>03</span>
            TECHNOLOGIES WE USE
          </div>

          <div className="service-tech-chips">
            {techStack.map((tech) => (
              <span key={tech} className="service-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        {faqs && faqs.length > 0 && (
          <section className="service-detail-faq">
            <div className="service-detail-section-label">
              <span>04</span>
              QUESTIONS & ANSWERS
            </div>

            <div className="service-faq-list">
              {faqs.map((faq, idx) => (
                <div key={idx} className="service-faq-item">
                  <h3>{faq.q}</h3>
                  <p>{faq.a}</p>
                  <p className="service-faq-neutral">
                    Details are agreed in the project proposal.
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM CTA */}
        <section className="service-detail-bottom">
          <span>READY WHEN YOU ARE</span>

          <h2>
            Have a project
            <br />
            in mind?
          </h2>

          <Link to="/contact" className="service-detail-bottom-link">
            Talk to our team
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
