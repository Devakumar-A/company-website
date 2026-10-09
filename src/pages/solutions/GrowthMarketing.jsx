import React from "react";
import { ArrowLeft, ArrowRight, Check, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import "../../styles/solutions/SolutionDetail.css";

const capabilities = [
  "Digital marketing campaigns",
  "Performance advertising",
  "Social media management",
  "Content creation",
  "Lead generation",
  "Campaign reporting",
];

const outcomes = [
  "More relevant visibility",
  "Better campaign direction",
  "A steady flow of enquiries",
  "Marketing connected to business goals",
];

export default function GrowthMarketingSolution() {
  return (
    <>
    <main className="solution-detail-page">

      <section className="solution-detail-hero">
        <div className="solution-hero-grid" aria-hidden="true" />

        <Link to="/solutions" className="solution-back-btn">
          <ArrowLeft size={16} />
          <span>Back to Solutions</span>
        </Link>

        <div className="solution-eyebrow">
          SOLUTION / 05
        </div>

        <div className="solution-hero-icon">
          <TrendingUp size={28} strokeWidth={1.4} />
        </div>

        <h1>
          Growth &
          <br />
          <span>marketing.</span>
        </h1>

        <p>
          Marketing built around reaching the right audience and creating
          opportunities that can turn into real business.
        </p>

        <Link to="/contact" className="solution-hero-cta">
          Discuss your goals
          <ArrowRight size={18} />
        </Link>
      </section>

      <section className="solution-introduction">
        <div className="solution-label">
          <span>01</span>
          THE PURPOSE
        </div>

        <div className="solution-copy">
          <h2>
            Attention is useful
            <br />
            when it leads somewhere.
          </h2>

          <p>
            A large number of views does not automatically mean a business is
            growing. What matters is whether the right people are discovering
            the business and taking the next step.
          </p>

          <p>
            We connect marketing activity with practical business goals such
            as enquiries, bookings, sales and customer growth.
          </p>
        </div>
      </section>

      <section className="solution-capabilities">
        <div className="solution-label">
          <span>02</span>
          WHAT WE CAN HANDLE
        </div>

        <div className="solution-capability-grid">
          {capabilities.map((item, index) => (
            <div className="solution-capability" key={item}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="solution-outcome">
        <div className="solution-outcome-content">
          <div className="solution-outcome-icon">
            <TrendingUp size={24} strokeWidth={1.4} />
          </div>

          <span>THE RESULT</span>

          <h2>
            Marketing with a
            <br />
            business reason behind it.
          </h2>

          <div className="solution-outcome-list">
            {outcomes.map((item) => (
              <div key={item}>
                <Check size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="solution-final">
        <span>READY TO MOVE FORWARD?</span>

        <h2>
          Let's talk about
          <br />
          where you want to go.
        </h2>

        <Link to="/contact" className="solution-final-link">
          Start a conversation
          <ArrowRight size={18} />
        </Link>
      </section>

    </main>
    <Footer />
    </>
  );
}