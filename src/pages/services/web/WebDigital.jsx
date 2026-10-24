import React from "react";
import {
  ArrowUpRight,
  Globe,
  ShoppingBag,
  Layers3,
  MonitorSmartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceCategory.css";

const services = [
  {
    number: "01",
    icon: Globe,
    title: "Website Development",
    description:
      "Fast, responsive websites designed to represent your business properly and turn visitors into customers.",
    path: "/services/web-digital/website-development",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Online stores that make it easier for customers to discover, choose and buy your products.",
    path: "/services/web-digital/ecommerce",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Web Platforms",
    description:
      "Larger web products that bring customers, teams, content and business operations together.",
    path: "/services/web-digital/web-platforms",
  },
  {
    number: "04",
    icon: MonitorSmartphone,
    title: "Digital Experiences",
    description:
      "Thoughtful digital experiences that make interacting with your brand simple and memorable.",
    path: "/services/web-digital/digital-experiences",
  },
];

export default function WebDigital() {
  return (
    <div className="service-category-wrapper">
      <SEO {...seoData["/services/web-digital"]} />
      <main className="service-category-page">
        {/* HERO */}
        <section className="service-category-hero">
          <div className="service-category-eyebrow">
            <span>02</span>
            WEB & DIGITAL
          </div>

          <h1>
            Make your business
            <br />
            <span>easy to find and use.</span>
          </h1>

          <p>
            We design and develop websites and digital products that give
            businesses a clear presence online and make it easier for people
            to take action.
          </p>

          <div className="service-category-meta">
            <span>WEBSITES</span>
            <span>E-COMMERCE</span>
            <span>WEB PLATFORMS</span>
          </div>
        </section>

        {/* SERVICES */}
        <section className="service-category-list">
          <div className="service-category-intro">
            <span>WHAT WE DO</span>

            <p>
              From a focused company website to a complete digital platform,
              we build around what your business actually needs.
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

        {/* APPROACH */}
        <section className="service-category-statement">
          <span>OUR APPROACH</span>

          <h2>
            Your website is often
            <br />
            the first conversation.
          </h2>

          <p>
            We treat that first impression seriously. The design should look
            right, the experience should feel natural, and the technology
            behind it should perform reliably across devices.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
