import React from "react";
import { ArrowUpRight, Code2, Globe2, Database, Cloud } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceCategory.css";

const services = [
  {
    number: "01",
    icon: Code2,
    title: "Software Development",
    description:
      "Custom software built around the way your business actually operates.",
    path: "/services/software-engineering/software-development",
  },
  {
    number: "02",
    icon: Globe2,
    title: "Web Applications",
    description:
      "Reliable web applications for customers, teams and day-to-day operations.",
    path: "/services/software-engineering/web-applications",
  },
  {
    number: "03",
    icon: Database,
    title: "Business Software",
    description:
      "Practical systems that bring processes, information and people together.",
    path: "/services/software-engineering/business-software",
  },
  {
    number: "04",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Secure and scalable infrastructure for applications that need to grow.",
    path: "/services/software-engineering/cloud-solutions",
  },
];

export default function SoftwareEngineering() {

  return (
    <div className="service-category-wrapper">
      <SEO {...seoData["/services/software-engineering"]} />
      <main className="service-category-page">
        <section className="service-category-hero">
          <div className="service-category-eyebrow">
            <span>01</span>
            SOFTWARE & ENGINEERING
          </div>

          <h1>
            Software that works
            <br />
            <span>the way you work.</span>
          </h1>

          <p>
            We design and build dependable software for businesses that need
            technology to make everyday work simpler, faster and more effective.
          </p>

          <div className="service-category-meta">
            <span>PRODUCTS</span>
            <span>PLATFORMS</span>
            <span>BUSINESS SYSTEMS</span>
          </div>
        </section>

        <section className="service-category-list">
          <div className="service-category-intro">
            <span>WHAT WE DO</span>
            <p>
              From a single application to a complete business platform, we
              handle the engineering behind the product.
            </p>
          </div>

          <div className="service-category-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.number}
                  to={service.path}
                  className="service-category-card"
                  style={{ textDecoration: "none", color: "inherit" }}
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
                </Link>
              );
            })}
          </div>
        </section>

        <section className="service-category-statement">
          <span>OUR APPROACH</span>

          <h2>
            Good software should
            <br />
            make business easier.
          </h2>

          <p>
            We start with the problem, understand how the business works, and
            then build the technology around it. No unnecessary complexity.
            No one-size-fits-all systems.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
