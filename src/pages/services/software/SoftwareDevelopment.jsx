import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const points = [
  "Custom business applications",
  "Internal management systems",
  "Customer-facing platforms",
  "API and backend development",
  "Database design and integration",
  "Third-party service integration",
];

export default function SoftwareDevelopment() {
  return (
    <>
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div className="service-detail-eyebrow">
          SOFTWARE & ENGINEERING / 01
        </div>

        <h1>
          Software
          <br />
          <span>development.</span>
        </h1>

        <p>
          Software built around your business, your processes and the people
          who use it every day.
        </p>

        <Link to="/contact" className="service-detail-cta">
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
          <h2>Built for the job it needs to do.</h2>

          <p>
            Off-the-shelf software can work well until your business starts
            doing things differently. That is where custom software becomes
            useful.
          </p>

          <p>
            We build applications that fit your actual workflow — whether that
            means replacing spreadsheets, connecting disconnected systems,
            improving an existing process or creating a completely new
            product.
          </p>
        </div>
      </section>

      <section className="service-detail-features">
        <div className="service-detail-section-label">
          <span>02</span>
          WHAT WE BUILD
        </div>

        <div className="service-feature-list">
          {points.map((point, index) => (
            <div className="service-feature" key={point}>
              <span>0{index + 1}</span>
              <Check size={17} />
              <p>{point}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom">
        <span>READY WHEN YOU ARE</span>

        <h2>
          Have a process
          <br />
          worth improving?
        </h2>

        <Link to="/contact" className="service-detail-bottom-link">
          Start a conversation
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
    <Footer />
    </>
  );
}