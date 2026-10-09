import React from "react";
import {
  ArrowUpRight,
  TrendingUp,
  Target,
  Users2,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceCategory.css";

const services = [
  {
    number: "01",
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Strategic multi-channel marketing campaigns focused on qualified customer acquisition and brand visibility.",
    path: "/services/growth-marketing/digital-marketing",
  },
  {
    number: "02",
    icon: Target,
    title: "Performance Marketing",
    description:
      "Data-driven paid media campaigns on Meta, Google and LinkedIn engineered for positive return on ad spend.",
    path: "/services/growth-marketing/performance-marketing",
  },
  {
    number: "03",
    icon: Users2,
    title: "Lead Generation",
    description:
      "End-to-end sales funnel architecture turning targeted traffic into qualified, sales-ready prospects.",
    path: "/services/growth-marketing/lead-generation",
  },
  {
    number: "04",
    icon: FileText,
    title: "Content Marketing",
    description:
      "High-value thought leadership, editorial content and case studies that build domain authority.",
    path: "/services/growth-marketing/content-marketing",
  },
];

export default function GrowthMarketing() {
  const navigate = useNavigate();

  return (
    <div className="service-category-wrapper">
      <main className="service-category-page">
        {/* HERO */}
        <section className="service-category-hero">
          <div className="service-category-eyebrow">
            <span>04</span>
            GROWTH & MARKETING
          </div>

          <h1>
            Growth built on data,
            <br />
            <span>substance and results.</span>
          </h1>

          <p>
            We build predictable acquisition funnels, performance advertising
            campaigns and content strategies that drive sustainable commercial growth.
          </p>

          <div className="service-category-meta">
            <span>PERFORMANCE ADS</span>
            <span>LEAD GENERATION</span>
            <span>CONTENT STRATEGY</span>
          </div>
        </section>

        {/* SERVICES */}
        <section className="service-category-list">
          <div className="service-category-intro">
            <span>WHAT WE DO</span>

            <p>
              From customer acquisition campaigns to long-term audience building,
              we execute growth strategies centered on measurable business metrics.
            </p>
          </div>

          <div className="service-category-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="service-category-card"
                  onClick={() => navigate(service.path)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(service.path);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Explore ${service.title}`}
                >
                  <div className="service-card-top">
                    <span>{service.number}</span>

                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div className="service-card-content">
                    <h2>{service.title}</h2>

                    <p>{service.description}</p>
                  </div>

                  <div className="service-card-link">
                    Explore
                    <ArrowUpRight size={18} strokeWidth={1.6} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* APPROACH */}
        <section className="service-category-statement">
          <span>OUR APPROACH</span>

          <h2>
            Marketing should generate
            <br />
            revenue, not vanity metrics.
          </h2>

          <p>
            We focus strictly on economics: cost per qualified lead, customer
            lifetime value, and customer acquisition efficiency. No vanity impressions,
            no ambiguous reports — just clear commercial outcomes.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
