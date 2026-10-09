import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Customer portals",
  "Admin dashboards",
  "Booking and management platforms",
  "E-commerce applications",
  "Role-based business platforms",
  "API-driven web applications",
];

export default function WebApplications() {
  return (
    <>
    <SEO {...seoData["/services/software-engineering/web-applications"]} />
    <main className="service-detail-page">
      <section className="service-detail-hero">
        <div className="service-detail-eyebrow">
          SOFTWARE & ENGINEERING / 02
        </div>

        <h1>
          Web
          <br />
          <span>applications.</span>
        </h1>

        <p>
          Web applications that turn complex processes into simple,
          accessible experiences.
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
          <h2>Useful software, available wherever your team is.</h2>

          <p>
            A good web application should feel straightforward from the first
            interaction. We build browser-based products that help customers,
            employees and business teams get things done without unnecessary
            steps.
          </p>

          <p>
            We take care of the interface, application logic, data and
            integrations so the finished product works as one system.
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
        <span>LET'S BUILD IT</span>

        <h2>
          Have an idea
          <br />
          for a web product?
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