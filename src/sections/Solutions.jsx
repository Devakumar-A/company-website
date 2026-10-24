import React, { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ThreeDBendCarousel,
  BendCarouselItem,
} from "../components/ThreeDBendCarousel";
import "../styles/Solutions.css";

// Exactly 5 Solution categories — Clean Editorial Technology Direction
const solutionsData = [
  {
    id: "digital-products",
    number: "01",
    title: "DIGITAL PRODUCTS",
    summary: "Websites · Web Apps · SaaS",
    image: "/assets/solutions/digital-products.webp",
    imageWebp: "/assets/solutions/digital-products.webp",
    alt: "Digital Products — Modern software interface displayed on minimalist tablet",
    path: "/solutions/digital-products",
  },
  {
    id: "ai-systems",
    number: "02",
    title: "AI & INTELLIGENT SYSTEMS",
    summary: "AI · Automation · Machine Learning",
    image: "/assets/solutions/ai-systems.webp",
    imageWebp: "/assets/solutions/ai-systems.webp",
    alt: "AI & Intelligent Systems — Precision processor hardware and optical glass",
    path: "/solutions/ai-systems",
  },
  {
    id: "mobile-experiences",
    number: "03",
    title: "MOBILE EXPERIENCES",
    summary: "iOS · Android · Cross-Platform",
    image: "/assets/solutions/mobile-experiences.webp",
    imageWebp: "/assets/solutions/mobile-experiences.webp",
    alt: "Mobile Experiences — Minimalist mobile product interface",
    path: "/solutions/mobile-experiences",
  },
  {
    id: "design-brand",
    number: "04",
    title: "DESIGN & BRAND",
    summary: "UI/UX · Branding · Visual Identity",
    image: "/assets/solutions/design-brand.webp",
    imageWebp: "/assets/solutions/design-brand.webp",
    alt: "Design & Brand — Minimalist Swiss brand identity system",
    path: "/solutions/design-brand",
  },
  {
    id: "growth-marketing",
    number: "05",
    title: "GROWTH & MARKETING",
    summary: "Digital Marketing · Ads · Content",
    image: "/assets/solutions/growth-marketing.webp",
    imageWebp: "/assets/solutions/growth-marketing.webp",
    alt: "Growth & Marketing — Editorial brand campaign collateral",
    path: "/solutions/growth-marketing",
  },
];

/**
 * Solutions Section
 * Premium editorial technology company aesthetic.
 * Clean white canvas with architectural grid lines, restrained lighting,
 * and high-performance 3D curved cylinder carousel.
 */
export default function Solutions({ headingTag = "h2" }) {
  const Heading = headingTag;
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleIndexChange = useCallback((newIndex) => {
    setActiveCardIndex(newIndex);
  }, []);

  const handleDotClick = (index) => {
    carouselRef.current?.goTo(index);
  };

  return (
    <section className="solutions-section" id="solutions">
      {/* Editorial White Background Ambient Elements */}
      <div className="solutions-bg" aria-hidden="true">
        <div className="solutions-grid-layer" />
        <div className="solutions-ambient-glow" />
      </div>

      <div className="solutions-container">
        {/* Minimal Editorial Section Header */}
        <div className="solutions-header">
          <span className="solutions-eyebrow">OUR SOLUTIONS</span>
          <Heading className="solutions-title">
            Technology.
            <br />
            <span className="solutions-title-dim">Built around your business.</span>
          </Heading>
          <p className="solutions-subtitle">
            From digital products to intelligent systems, we build technology around real business needs.
          </p>
        </div>

        {/* 3D Cylindrical Ribbon Carousel */}
        <div className="solutions-carousel-wrapper">
          <ThreeDBendCarousel
            ref={carouselRef}
            initialIndex={0}
            onIndexChange={handleIndexChange}
            ariaLabel="Cognolynx Solutions 3D Carousel"
          >
            {solutionsData.map((item) => (
              <BendCarouselItem
                key={item.id}
                as={Link}
                to={item.path}
                className="solution-card"
                style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}
              >
                {/* [01] DIGITAL PRODUCTS */}
                <div className="sol-card-header">
                  <span className="sol-card-number">[{item.number}]</span>
                  {headingTag === "h1" ? (
                    <h2 className="sol-card-title">{item.title}</h2>
                  ) : (
                    <h3 className="sol-card-title">{item.title}</h3>
                  )}
                </div>

                {/* Real Case-Study / Product Visual */}
                <div className="sol-card-media">
                  <picture>
                    <source srcSet={item.imageWebp} type="image/webp" />
                    <img
                      src={item.imageWebp}
                      alt={item.alt}
                      className="sol-card-image"
                      width="1200"
                      height="896"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </picture>
                </div>

                {/* Websites · Web Apps · SaaS */}
                <div className="sol-card-footer">
                  <p className="sol-card-summary">{item.summary}</p>
                </div>
              </BendCarouselItem>
            ))}
          </ThreeDBendCarousel>

          {/* Responsive Pagination Dots: • • ● • • */}
          <div className="solutions-controls-bar">
            <div
              className="solutions-dots"
              role="tablist"
              aria-label="Solutions pagination"
            >
              {solutionsData.map((item, index) => {
                const isActive = index === activeCardIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Go to ${item.title}`}
                    className={`sol-dot ${isActive ? "sol-dot-active" : ""}`}
                    onClick={() => handleDotClick(index)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
