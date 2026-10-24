import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import SEO from "../../components/SEO";
import Footer from "../../components/Footer";
import { INTERNSHIP_PROGRAM_INFO, INTERNSHIP_DOMAINS_DATA } from "../../data/internshipData";
import "../../styles/internship/Internship.css";

export default function Internship() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) => (current === index ? null : index));
  };

  const domainList = Object.values(INTERNSHIP_DOMAINS_DATA);

  // FAQ Schema for visible FAQs
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": INTERNSHIP_PROGRAM_INFO.generalFaqs.map((faq) => ({
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
        "@id": "https://cognolynx.tech/internship#breadcrumb",
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
          }
        ]
      },
      faqSchema
    ]
  };

  return (
    <div className="internship-page">
      <SEO
        title="Internship Program | Remote Student Training | Cognolynx"
        description="Apply for Cognolynx's 1-month remote internship program for engineering, BCA, MCA & B.Sc students. Hands-on projects, mentorship & verified certificates."
        canonical="https://cognolynx.tech/internship"
        jsonLd={pageSchema}
      />

      {/* =====================================================
          HERO SECTION
          ===================================================== */}
      <section className="internship-hero">
        <div className="internship-hero-grid" aria-hidden="true" />

        <div className="internship-eyebrow">
          <span className="internship-eyebrow-dot" />
          <span>COGNOLYNX STUDENT INTERNSHIPS</span>
        </div>

        <h1 className="internship-title">
          100% Remote <span>Internship Program</span> for Students & Engineers
        </h1>

        <p className="internship-subtitle">
          Accelerate your tech career with 1-month hands-on project sprints, real-world architecture mentorship, and verified skill certification in 10 modern engineering domains.
        </p>

        <div className="internship-hero-actions">
          <Link to="/careers/apply" className="internship-primary-cta" aria-label="Apply now for Cognolynx Internship">
            <span>Apply for Internship</span>
            <ArrowRight size={18} />
          </Link>

          <a href="#domains" className="internship-secondary-cta">
            <span>Explore 10 Domains</span>
            <ChevronDown size={16} />
          </a>
        </div>
      </section>

      {/* =====================================================
          PROGRAM FACTS & HIGHLIGHTS STRIP
          ===================================================== */}
      <section className="internship-highlights" aria-label="Program Highlights">
        <div className="internship-highlight-card">
          <span className="highlight-label">Mode</span>
          <p className="highlight-value">{INTERNSHIP_PROGRAM_INFO.mode}</p>
          <p className="highlight-detail">{INTERNSHIP_PROGRAM_INFO.modeDetail}</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Duration</span>
          <p className="highlight-value">{INTERNSHIP_PROGRAM_INFO.duration}</p>
          <p className="highlight-detail">Intensive project milestones with performance-based extension track.</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Tuition Fee</span>
          <p className="highlight-value">{INTERNSHIP_PROGRAM_INFO.fee}</p>
          <p className="highlight-detail">No upfront training fees for student participants.</p>
        </div>

        <div className="internship-highlight-card">
          <span className="highlight-label">Certification</span>
          <p className="highlight-value">Verified Digital Certificate</p>
          <p className="highlight-detail">{INTERNSHIP_PROGRAM_INFO.certificateInfo}</p>
        </div>
      </section>

      {/* =====================================================
          DOMAINS SECTION
          ===================================================== */}
      <section className="internship-domains-section" id="domains">
        <div className="internship-section-header">
          <span className="section-tag">01 / CHOOSE YOUR TRACK</span>
          <h2 className="section-title">10 Industry-Aligned Internship Domains</h2>
          <p className="section-desc">
            Choose the technology specialization that matches your degree and ambitions. Work on production-grade deliverables and receive structured code feedback.
          </p>
        </div>

        <div className="internship-domains-grid">
          {domainList.map((domain, index) => (
            <Link
              key={domain.slug}
              to={`/internship/${domain.slug}`}
              className="domain-card"
              aria-label={`Explore ${domain.domainName} Internship details`}
            >
              <div>
                <div className="domain-card-top">
                  <span className="domain-number">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowUpRight className="domain-card-arrow" size={20} />
                </div>

                <h3 className="domain-card-title">{domain.domainName}</h3>
                <p className="domain-card-desc">{domain.heroSubtitle}</p>

                <div className="domain-specs">
                  {domain.specializations.slice(0, 3).map((spec) => (
                    <span key={spec} className="domain-spec-pill">
                      {spec.split("(")[0].trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="domain-card-link">
                <span>View Track Curriculum</span>
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================
          SELECTION & ONBOARDING PROCESS
          ===================================================== */}
      <section className="internship-steps-section" aria-label="Internship Selection Process">
        <div className="internship-section-header">
          <span className="section-tag">02 / HOW TO JOIN</span>
          <h2 className="section-title">Selection &amp; Onboarding Steps</h2>
          <p className="section-desc">
            Our streamlined process gets you onboarded quickly without unnecessary delays so you can focus on building meaningful software.
          </p>
        </div>

        <div className="steps-grid">
          {INTERNSHIP_PROGRAM_INFO.selectionSteps.map((step) => (
            <div key={step.step} className="step-card">
              <span className="step-number">{step.step}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          ELIGIBILITY & WHO CAN APPLY
          ===================================================== */}
      <section className="internship-domains-section" aria-label="Eligibility Criteria">
        <div className="internship-section-header">
          <span className="section-tag">03 / ELIGIBILITY</span>
          <h2 className="section-title">Who Can Apply</h2>
          <p className="section-desc">
            We welcome motivated students seeking genuine hands-on engineering exposure and portfolio development.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <h3 className="step-title">Engineering Students</h3>
            <p className="step-desc">
              Students pursuing B.E or B.Tech degrees across Computer Science, Information Technology, Electronics &amp; Communication, Artificial Intelligence &amp; Data Science.
            </p>
          </div>

          <div className="step-card">
            <h3 className="step-title">Computer Applications &amp; Science</h3>
            <p className="step-desc">
              Students enrolled in BCA, MCA, B.Sc Computer Science, B.Sc IT, or M.Sc IT seeking structured, practical industry project deliverables.
            </p>
          </div>

          <div className="step-card">
            <h3 className="step-title">Diploma &amp; Self-Taught Devs</h3>
            <p className="step-desc">
              Polytechnic diploma students and self-taught programmers wanting to validate their skills through production milestones and verified credentials.
            </p>
          </div>

          <div className="step-card">
            <h3 className="step-title">Open Pan-India Enrollment</h3>
            <p className="step-desc">
              Open to students from Puducherry, Tamil Nadu, and across India. 100% remote online participation allows you to learn from anywhere without relocation.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FREQUENTLY ASKED QUESTIONS (FAQ)
          ===================================================== */}
      <section className="internship-faq-section" id="faq" aria-label="Frequently Asked Questions">
        <div className="internship-section-header">
          <span className="section-tag">04 / FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Clear, transparent answers regarding fees, duration, mode, certification, and stipend tracks.
          </p>
        </div>

        <div className="faq-list">
          {INTERNSHIP_PROGRAM_INFO.generalFaqs.map((faq, index) => {
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

      {/* =====================================================
          BOTTOM CTA
          ===================================================== */}
      <section className="internship-bottom-cta">
        <div className="internship-bottom-cta-inner">
          <h2>Ready to Build Practical Engineering Skills?</h2>
          <p>
            Applications are reviewed on a rolling basis. Choose your domain, complete hands-on milestones, and earn your verified certificate with Cognolynx.
          </p>
          <Link to="/careers/apply" className="internship-primary-cta" aria-label="Start your internship application">
            <span>Apply for Internship Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
