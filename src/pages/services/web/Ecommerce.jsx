import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Product catalogues",
  "Shopping carts and checkout",
  "Online payment integration",
  "Order management",
  "Customer accounts",
  "Inventory integration",
];

export default function Ecommerce() {
  return (
    <>
    <main className="service-detail-page">

      <section className="service-detail-hero">

        <div className="service-detail-eyebrow">
          WEB & DIGITAL / 02
        </div>

        <h1>
          E-commerce
          <br />
          <span>experiences.</span>
        </h1>

        <p>
          Online stores designed to make discovering products, making a
          decision and completing a purchase feel straightforward.
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
            Selling online should
            <br />
            feel simple.
          </h2>

          <p>
            An online store has one important job: help people find something
            they want and make buying it easy.
          </p>

          <p>
            We build commerce experiences with clear product presentation,
            simple navigation, reliable checkout flows and the tools needed
            to manage orders behind the scenes.
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

        <span>START SELLING ONLINE</span>

        <h2>
          Have products
          <br />
          ready to sell?
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