import React from "react";
import { ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import "../../styles/technology/TechnologyDetail.css";

const capabilities = [
  "Cross-platform applications with React Native",
  "High-performance mobile apps with Flutter",
  "Native iOS (Swift) & Android (Kotlin) development",
  "Offline-first local storage and sync mechanisms",
  "Push notification systems & background services",
  "App Store and Google Play Store deployment & maintenance",
];

const technologies = [
  "React Native",
  "Flutter",
  "Android",
  "Kotlin",
  "Swift",
  "Firebase",
];

export default function MobileDevelopment() {
  return (
    <>
      <SEO {...seoData["/technology/mobile-development"]} />
      <main className="technology-detail-page">
        <section className="technology-detail-hero">
          <div className="technology-hero-grid" aria-hidden="true" />

          <Link to="/technology" className="technology-back-btn">
            <ArrowLeft size={16} />
            <span>Back to Technology</span>
          </Link>

          <div className="technology-eyebrow">TECHNOLOGY / 03</div>

          <div className="technology-icon">
            <Smartphone size={28} strokeWidth={1.4} />
          </div>

          <h1>
            Mobile
            <br />
            <span>development.</span>
          </h1>

          <p>
            Cross-platform and native mobile applications engineered for fluid
            performance, responsive interaction and genuine user retention.
          </p>

          <Link to="/contact" className="technology-cta">
            Discuss mobile
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className="technology-introduction">
          <div className="technology-label">
            <span>01</span>
            MOBILE ARCHITECTURE
          </div>

          <div className="technology-copy">
            <h2>
              Smooth performance
              <br />
              on every mobile device.
            </h2>

            <p>
              Mobile applications must feel effortless from the first tap. Screen
              space is constrained, network speeds vary, and user patience is
              limited. We build mobile architectures engineered for speed and
              predictability under any connection speed.
            </p>

            <p>
              Whether you need cross-platform velocity or platform-specific
              native features, our engineering approach guarantees buttery-smooth
              60fps rendering, resilient caching, and battery-conscious efficiency.
            </p>
          </div>
        </section>

        <section className="technology-capabilities">
          <div className="technology-label">
            <span>02</span>
            MOBILE STACK
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
            <Smartphone size={24} strokeWidth={1.4} />
            <span>THE OUTCOME</span>

            <h2>
              Mobile applications that
              <br />
              delight users with instant responsiveness.
            </h2>
          </div>
        </section>

        <section className="technology-final">
          <span>READY TO LAUNCH MOBILE?</span>

          <h2>
            Let's bring your product
            <br />
            to iOS and Android.
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