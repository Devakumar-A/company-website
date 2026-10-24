import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer";
import { INTERNSHIP_DOMAINS_DATA, INTERNSHIP_PROGRAM_INFO } from "../../data/internshipData";
import "../../styles/internship/Internship.css";

export default function InternshipDomain({ explicitSlug }) {
  const params = useParams();
  const slug = explicitSlug || params.domainSlug;
  const domain = INTERNSHIP_DOMAINS_DATA[slug] || INTERNSHIP_DOMAINS_DATA["web-development"];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const domainUrl = `https://cognolynx.tech/internship/${domain.slug}`;

  // Domain FAQs Schema
  const domainFaqSchema = {
    "@type": "FAQPage",
    "mainEntity": (domain.domainFaqs || []).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${domainUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://cognolynx.tech/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Internship Program",
            "item": "https://cognolynx.tech/internship"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": domain.domainName,
            "item": domainUrl
          }
        ]
      },
      ...(domain.domainFaqs && domain.domainFaqs.length > 0 ? [domainFaqSchema] : [])
    ]
  };

  return (
    <div className="domain-detail-page">
      <SEO
        title={domain.title}
        description={domain.description}
        canonical={domainUrl}
        jsonLd={pageSchema}
      />

      {/* =====================================================
          DOMAIN HERO
          ===================================================== */}
      <section className="domain-detail-hero">
        <div className="internship-hero-grid" aria-hidden="true" />

        <Link to="/internship" className="domain-back-link">
          <ArrowLeft size={16} />
          <span>Back to All Internship Domains</span>
        </Link>

        <div className="internship-eyebrow">
          <span className="internship-eyebrow-dot" />
          <span>{domain.domainName.toUpperCase()} TRACK</span>
        </div>

        <h1 className="internship-title">{domain.h1}</h1>

        <p className="internship-subtitle">{domain.heroSubtitle}</p>

        <div className="internship-hero-actions">
          <Link
            to="/careers/apply"
            className="internship-primary-cta"
            aria-label={`Apply for ${domain.domainName} Internship`}
          >
            <span>Apply for this Track</span>
            <ArrowRight size={18} />
          </Link>

          <a href="#curriculum" className="internship-secondary-cta">
            <span>View 4-Week Plan</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* =====================================================
          QUICK PROGRAM METRICS
          ===================================================== */}
      <section className="internship-highlights" aria-label="Track Details">
        <div className="internship-highlight-card">
          <span className="highlight-label">Track Duration</span>
          <p className="highlight-value">{INTERNSHIP_PROGRAM_INFO.duration}</p>
          <p className="highlight-detail">4 structured project weeks + review.</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Delivery Mode</span>
          <p className="highlight-value">{INTERNSHIP_PROGRAM_INFO.mode}</p>
          <p className="highlight-detail">Work from anywhere with mentor feedback.</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Tuition Fee</span>
          <p className="highlight-value">Free (₹0 Fee)</p>
          <p className="highlight-detail">Free project sprint; optional ₹149 verified certificate.</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Performance Track</span>
          <p className="highlight-value">Stipend Evaluation</p>
          <p className="highlight-detail">Top performers evaluated for paid extension.</p>
        </div>
      </section>

      {/* =====================================================
          TRACK OVERVIEW & SPECIALIZATIONS
          ===================================================== */}
      <section className="internship-domains-section">
        <div className="internship-section-header">
          <span className="section-tag">01 / TRACK OVERVIEW</span>
          <h2 className="section-title">What You Will Build &amp; Master</h2>
          <p className="section-desc">{domain.overview}</p>
        </div>

        <div className="internship-section-header" style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#ffffff", margin: "0 0 12px" }}>
            Focus Specializations in this Track
          </h3>
          <div className="domain-specs" style={{ gap: "10px" }}>
            {domain.specializations.map((spec) => (
              <span
                key={spec}
                className="domain-spec-pill"
                style={{ fontSize: "13px", padding: "6px 14px", background: "rgba(99, 102, 241, 0.08)", borderColor: "rgba(99, 102, 241, 0.2)" }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="internship-section-header" style={{ marginTop: "40px", marginBottom: "16px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#ffffff", margin: "0 0 12px" }}>
            Tools &amp; Technologies
          </h3>
          <div className="tech-tags-list">
            {domain.technologies.map((tech) => (
              <span key={tech} className="tech-tag-badge">{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          4-WEEK PRACTICAL CURRICULUM
          ===================================================== */}
      <section className="internship-steps-section" id="curriculum" aria-label="Curriculum Milestones">
        <div className="internship-section-header">
          <span className="section-tag">02 / 4-WEEK ROADMAP</span>
          <h2 className="section-title">Hands-On Milestone Schedule</h2>
          <p className="section-desc">
            Structured week-by-week goals that guide you from environment configuration to fully working deliverables.
          </p>
        </div>

        <div className="curriculum-grid">
          {domain.curriculum.map((item) => (
            <div key={item.week} className="curriculum-card">
              <span className="curriculum-week">{item.week}</span>
              <h3 className="curriculum-title">{item.title}</h3>
              <p className="curriculum-details">{item.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY & WHO CAN APPLY
          ===================================================== */}
      <section className="internship-domains-section" aria-label="Eligibility Requirements">
        <div className="internship-section-header">
          <span className="section-tag">03 / ELIGIBILITY</span>
          <h2 className="section-title">Eligibility Criteria for this Domain</h2>
          <p className="section-desc">{domain.whoCanApply}</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <h3 className="step-title">Degree Programs</h3>
            <p className="step-desc">
              Open to B.E/B.Tech (CSE, IT, ECE, AI/DS), BCA, MCA, B.Sc Computer Science / IT, and polytechnic diploma students.
            </p>
          </div>

          <div className="step-card">
            <h3 className="step-title">Prerequisites</h3>
            <p className="step-desc">
              Foundational interest in programming, basic logic, and willingness to learn with provided documentation and code reviews.
            </p>
          </div>

          <div className="step-card">
            <h3 className="step-title">Hardware Requirements</h3>
            <p className="step-desc">
              A standard laptop or desktop computer with internet connectivity. No expensive hardware or paid software licenses required.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DOMAIN FAQS
          ===================================================== */}
      {domain.domainFaqs && domain.domainFaqs.length > 0 && (
        <section className="internship-faq-section" aria-label="Domain Questions">
          <div className="internship-section-header">
            <span className="section-tag">04 / TRACK FAQ</span>
            <h2 className="section-title">Track-Specific Questions</h2>
          </div>

          <div className="faq-list">
            {domain.domainFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="faq-item">
                  <button
                    type="button"
                    className="faq-button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`faq-chevron ${isOpen ? "is-open" : ""}`} size={20} />
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}
      <section className="internship-bottom-cta">
        <div className="internship-bottom-cta-inner">
          <h2>Apply for the {domain.domainName} Track</h2>
          <p>
            Gain authentic engineering project experience, build portfolio-grade code, and earn your verified certificate with Cognolynx.
          </p>
          <Link
            to="/careers/apply"
            className="internship-primary-cta"
            aria-label={`Submit application for ${domain.domainName} Internship`}
          >
            <span>Start Your Application</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
