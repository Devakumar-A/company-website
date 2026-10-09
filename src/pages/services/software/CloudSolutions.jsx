import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Cloud application deployment",
  "Database infrastructure",
  "Application hosting",
  "Storage and backups",
  "Performance and scalability",
  "Monitoring and maintenance",
];

export default function CloudSolutions() {
  return (
    <>
    <SEO {...seoData["/services/software-engineering/cloud-solutions"]} />
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div className="service-detail-eyebrow">
          SOFTWARE & ENGINEERING / 04
        </div>

        <h1>
          Cloud
          <br />
          <span>solutions.</span>
        </h1>

        <p>
          Reliable infrastructure that gives your applications room to grow
          without making the technology harder to manage.
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
          <h2>Infrastructure should support the product, not slow it down.</h2>

          <p>
            As applications grow, hosting, databases, storage and performance
            become important parts of the product itself.
          </p>

          <p>
            We help businesses set up cloud infrastructure that is dependable,
            maintainable and prepared for the amount of traffic and data the
            application actually needs.
          </p>
        </div>
      </section>

      <section className="service-detail-features">
        <div className="service-detail-section-label">
          <span>02</span>
          WHAT WE HANDLE
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
        <span>BUILD WITH ROOM TO GROW</span>

        <h2>
          Planning something
          <br />
          bigger?
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