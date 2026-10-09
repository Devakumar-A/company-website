import React, { useEffect } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Career.css";

export default function Career() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <>
      <main className="career-page">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="career-hero">
          <div className="career-hero-grid" aria-hidden="true" />

          <div className="career-hero-content">
            <div className="career-eyebrow">
              <span>CAREERS</span>
              <i />
              COGNOLYNX
            </div>

            <h1>
              Careers at
              <br />
              <span>Cognolynx.</span>
            </h1>

            <p>
              Explore opportunities to learn, contribute and grow with
              Cognolynx.
            </p>
          </div>

          <div className="career-hero-index">
            <span>01</span>
            <span>03</span>
          </div>
        </section>

        {/* =====================================================
            OPPORTUNITIES
        ===================================================== */}

        <section className="career-opportunities">
          <div className="career-section-label">
            <span>01</span>
            OPPORTUNITIES
          </div>

          <div className="career-options">
            {/* Internship */}
            <Link
              to="/careers/apply"
              className="career-option"
            >
              <div className="career-option-top">
                <div className="career-option-icon">
                  <GraduationCap size={24} strokeWidth={1.5} />
                </div>

                <span className="career-option-number">01</span>
              </div>

              <div className="career-option-content">
                <h2>Internship</h2>

                <p>
                  Start your professional journey through practical work
                  and real project experience.
                </p>

                <span className="career-option-link">
                  Apply for Internship
                  <ArrowRight size={17} strokeWidth={1.7} />
                </span>
              </div>
            </Link>

            {/* Jobs */}
            <Link
              to="/careers/job"
              className="career-option"
            >
              <div className="career-option-top">
                <div className="career-option-icon">
                  <BriefcaseBusiness size={23} strokeWidth={1.5} />
                </div>

                <span className="career-option-number">02</span>
              </div>

              <div className="career-option-content">
                <h2>Job Opportunities</h2>

                <p>
                  Explore professional opportunities and take the next step
                  in your career with Cognolynx.
                </p>

                <span className="career-option-link">
                  Apply for a Job
                  <ArrowRight size={17} strokeWidth={1.7} />
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* =====================================================
            CERTIFICATE VERIFICATION
        ===================================================== */}

        <section className="career-verification">
          <div className="career-section-label">
            <span>02</span>
            CERTIFICATE
          </div>

          <div className="career-verification-inner">
            <div className="career-verification-icon">
              <ShieldCheck size={27} strokeWidth={1.4} />
            </div>

            <div className="career-verification-content">
              <h2>Verify a Certificate</h2>

              <p>
                Check the authenticity of a Cognolynx certificate using its
                unique certificate ID.
              </p>

              <Link
                to="/certificate/verify"
                className="career-verify-button"
              >
                Verify Certificate
                <ArrowRight size={17} strokeWidth={1.7} />
              </Link>
            </div>
          </div>
        </section>

        {/* =====================================================
            TRUST
        ===================================================== */}

        <section className="career-trust">
          <span>COGNOLYNX</span>

          <p>
            MSME-registered organisation.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}