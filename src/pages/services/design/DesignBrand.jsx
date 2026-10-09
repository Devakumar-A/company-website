import React from "react";
import {
  ArrowUpRight,
  Palette,
  Layers,
  Layout,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import SEO from "../../../components/SEO";
import { seoData } from "../../../data/seoData";
import Footer from "../../../components/Footer";
import "../../../styles/services/ServiceCategory.css";

const services = [
  {
    number: "01",
    icon: Layout,
    title: "UI / UX Design",
    description:
      "Intuitive, accessible interfaces designed to make digital tools effortless for users.",
    path: "/services/design-brand/ui-ux-design",
  },
  {
    number: "02",
    icon: Layers,
    title: "Design Systems",
    description:
      "Cohesive component libraries and brand guidelines built for consistency and scale.",
    path: "/services/design-brand/design-systems",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Product Design",
    description:
      "End-to-end digital product design balancing user empathy and business objectives.",
    path: "/services/design-brand/product-design",
  },
  {
    number: "04",
    icon: Palette,
    title: "Brand Identity",
    description:
      "Distinct visual identities, typography and design languages that communicate credibility.",
    path: "/services/design-brand/brand-identity",
  },
];

export default function DesignBrand() {
  const navigate = useNavigate();

  return (
    <div className="service-category-wrapper">
      <SEO {...seoData["/services/design-brand"]} />
      <main className="service-category-page">
        {/* HERO */}
        <section className="service-category-hero">
          <div className="service-category-eyebrow">
            <span>03</span>
            DESIGN & BRAND
          </div>

          <h1>
            Design that clarifies
            <br />
            <span>and builds confidence.</span>
          </h1>

          <p>
            We shape visual systems, interfaces and digital experiences that
            make companies instantly recognizable, trustworthy and memorable.
          </p>

          <div className="service-category-meta">
            <span>UI / UX DESIGN</span>
            <span>DESIGN SYSTEMS</span>
            <span>BRAND IDENTITY</span>
          </div>
        </section>

        {/* SERVICES */}
        <section className="service-category-list">
          <div className="service-category-intro">
            <span>WHAT WE DO</span>

            <p>
              From product interfaces to comprehensive design languages,
              we design with intention, clarity and precision.
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
            Good design is
            <br />
            clarity made visible.
          </h2>

          <p>
            We eliminate visual noise and focus on what truly matters: clear
            information hierarchy, intuitive navigation, and craftsmanship
            that commands respect.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
