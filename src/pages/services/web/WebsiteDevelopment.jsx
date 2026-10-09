import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceDetail.css";

const features = [
  "Corporate websites",
  "Business websites",
  "Landing pages",
  "Service and product websites",
  "Responsive development",
  "CMS and content integration",
];

export default function WebsiteDevelopment() {
  return (
    <>
    <SEO {...seoData["/services/web-digital/website-development"]} />
    <main className="service-detail-page">

      <section className="service-detail-hero">

        <div className="service-detail-eyebrow">
          WEB & DIGITAL / 01
        </div>

        <h1>
          Website
          <br />
          <span>development.</span>
        </h1>

        <p>
          A clear, professional website that gives your business a strong
          presence and makes it easy for customers to understand what you do.
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
            More than a website.
            <br />
            A proper first impression.
          </h2>

          <p>
            Your website is often the first place someone meets your business.
            It needs to explain what you offer quickly, look trustworthy and
            make the next step obvious.
          </p>

          <p>
            We combine thoughtful design with solid development to create
            websites that work properly across phones, tablets and desktops.
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

        <span>YOUR BUSINESS DESERVES A BETTER PRESENCE</span>

        <h2>
          Ready to build
          <br />
          your website?
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