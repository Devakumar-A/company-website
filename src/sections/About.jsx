import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "../styles/About.css";

export default function About() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about-section ${isInView ? "about-in-view" : ""}`}
    >
      {/* Ambient background grid & light glow */}
      <div className="about-bg" aria-hidden="true">
        <div className="about-grid" />
        <div className="about-ambient-glow" />
      </div>

      <div className="about-container">
        {/* =====================================================
            CINEMATIC LOGO ASSEMBLY CHAMBER
        ====================================================== */}
        <div className="about-logo-chamber">
          {/* Ambient purple/blue halo behind the logo stage */}
          <div className="about-logo-halo" />

          {/* Complete Cognolynx Logo */}
          <div className="about-logo-stage">
            <picture>
              <source srcSet="/assets/logo.webp" type="image/webp" />
              <img
                src="/assets/logo.png"
                alt="Cognolynx Logo"
                className="about-logo-full"
                draggable="false"
                loading="eager"
                decoding="async"
                width="800"
                height="685"
              />
            </picture>
          </div>
        </div>

        {/* =====================================================
            SYNCHRONIZED CONVERGING FOREGROUND CONTENT
            Text halves enter from left and right and join in unison
        ====================================================== */}
        <div className="about-content">
          {/* Eyebrow: "ABOUT" (Left) + "COGNOLYNX" (Right) */}
          <div className="about-eyebrow">
            <span className="about-split-left about-eyebrow-left">
              <span className="about-eyebrow-accent" />
              <span>ABOUT</span>
            </span>{" "}
            <span className="about-split-right about-eyebrow-right">
              <span>COGNOLYNX</span>
            </span>
          </div>

          {/* Core Headline: "We build technology" (Left) + "for what’s next." (Right) */}
          <h2 className="about-statement">
            <span className="about-split-left about-statement-left">
              We build technology
            </span>{" "}
            <span className="about-split-right about-statement-right">
              for what&rsquo;s next.
            </span>
          </h2>

          {/* Body Paragraph 1 */}
          <p className="about-description">
            Cognolynx builds modern software, digital products, and technology solutions designed around real business needs. We focus on creating experiences that are useful, scalable, and built to evolve.
          </p>

          {/* Body Paragraph 2 */}
          <p className="about-description">
            From software and digital platforms to intelligent systems, we turn ideas and complex challenges into technology that works — with a focus on simplicity, performance, and long-term value.
          </p>

          <div className="about-actions" style={{ marginTop: "28px" }}>
            <Link to="/about" className="about-intern-cta">
              <span>Learn More About Cognolynx</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
