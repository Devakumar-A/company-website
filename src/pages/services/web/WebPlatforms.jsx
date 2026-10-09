import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Customer portals",
  "Booking platforms",
  "Partner platforms",
  "Management dashboards",
  "Multi-role applications",
  "Third-party integrations",
];

export default function WebPlatforms() {
  return (
    <>
    <main className="service-detail-page">

      <section className="service-detail-hero">

        <div className="service-detail-eyebrow">
          WEB & DIGITAL / 03
        </div>

        <h1>
          Web
          <br />
          <span>platforms.</span>
        </h1>

        <p>
          Larger web products that bring customers, teams and business
          operations together in one place.
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
            When a website needs
            <br />
            to do more.
          </h2>

          <p>
            Some businesses need more than pages. They need a platform where
            customers can book, teams can manage work, partners can interact
            and information can move between systems.
          </p>

          <p>
            We build those larger web products around the people and processes
            that use them.
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

        <span>BUILD SOMETHING BIGGER</span>

        <h2>
          Your business needs
          <br />
          a platform?
        </h2>

        <Link
          to="/contact"
          className="service-detail-bottom-link"
        >
          Talk to us
          <ArrowRight size={18} />
        </Link>

      </section>

    </main>
    <Footer />
    </>
  );
}