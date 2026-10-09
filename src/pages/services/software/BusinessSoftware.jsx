import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "ERP and operational systems",
  "Employee management",
  "Inventory and workflow systems",
  "CRM and customer management",
  "Reports and business dashboards",
  "Process automation",
];

export default function BusinessSoftware() {
  return (
    <>
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div className="service-detail-eyebrow">
          SOFTWARE & ENGINEERING / 03
        </div>

        <h1>
          Business
          <br />
          <span>software.</span>
        </h1>

        <p>
          Practical systems that help businesses organise information,
          simplify operations and keep work moving.
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
          <h2>Replace scattered work with one connected system.</h2>

          <p>
            Many businesses grow around spreadsheets, messages and separate
            tools. Eventually, keeping everything in sync becomes the work
            itself.
          </p>

          <p>
            We build business software that brings those processes together,
            giving teams a clearer way to manage information and make
            decisions.
          </p>
        </div>
      </section>

      <section className="service-detail-features">
        <div className="service-detail-section-label">
          <span>02</span>
          WHAT WE BUILD
        </div>

        <div className="service-feature-list">
          {features.map((feature, index) => (
            <div className="service-feature" key={feature}>
              <span>0{index + 1}</span>
              <Check size={17} />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="service-detail-bottom">
        <span>MAKE THE WORK SIMPLER</span>

        <h2>
          Still managing too much
          <br />
          manually?
        </h2>

        <Link to="/contact" className="service-detail-bottom-link">
          Talk to us
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
    <Footer />
    </>
  );
}