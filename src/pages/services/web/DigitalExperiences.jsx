import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Interactive websites",
  "Product experiences",
  "Campaign experiences",
  "Mobile-first interfaces",
  "Motion and interaction design",
  "User-focused navigation",
];

export default function DigitalExperiences() {
  return (
    <>
    <main className="service-detail-page">

      <section className="service-detail-hero">

        <div className="service-detail-eyebrow">
          WEB & DIGITAL / 04
        </div>

        <h1>
          Digital
          <br />
          <span>experiences.</span>
        </h1>

        <p>
          Digital experiences that make a brand feel clear, considered and
          easy to interact with.
        </p>

        <Link
          to="/contact"
          className="service-detail-cta"
        >
          Discuss a project
          <ArrowRight size={18} />
        </Link>

      </section>

      <section className="service-detail-content">

        <div className="service-detail-section-label">
          <span>01</span>
          THE WORK
        </div>

        <div className="service-detail-copy">

          <h2>
            Every interaction
            <br />
            says something.
          </h2>

          <p>
            The way a website moves, responds and guides someone through a
            page affects how they feel about the business behind it.
          </p>

          <p>
            We create digital experiences where visual design and interaction
            work together without getting in the way of the message.
          </p>

        </div>

      </section>

      <section className="service-detail-features">

        <div className="service-detail-section-label">
          <span>02</span>
          WHAT WE CREATE
        </div>

        <div className="service-feature-list">

          {features.map((feature, index) => (
            <div
              className="service-feature"
              key={feature}
            >
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <Check size={17} />

              <p>{feature}</p>
            </div>
          ))}

        </div>

      </section>

      <section className="service-detail-bottom">

        <span>MAKE THE EXPERIENCE COUNT</span>

        <h2>
          Want your digital
          <br />
          presence to stand out?
        </h2>

        <Link
          to="/contact"
          className="service-detail-bottom-link"
        >
          Start a conversation
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
    <Footer />
    </>
  );
}