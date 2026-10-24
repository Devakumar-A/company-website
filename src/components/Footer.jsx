import React, { useState } from "react";
import {
  ArrowUp,
  ArrowRight,
  ChevronDown,
  Mail,
} from "lucide-react";
import "../styles/Footer.css";

function Linkedin({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}



const currentYear = new Date().getFullYear();

const footerGroups = [
  {
    title: "COMPANY",
    links: ["Home", "About", "Services", "Solutions", "Internship", "Work", "FAQ", "Contact"],
  },
  {
    title: "SERVICES",
    links: [
      "Software Development",
      "AI & Automation",
      "Mobile App Development",
      "Web Development",
      "Ecommerce Solutions",
      "Web Platforms",
      "Digital Experiences",
      "UI/UX Design",
      "Design Systems",
      "Product Design",
      "Brand Identity",
      "Digital Marketing",
      "Performance Marketing",
      "Lead Generation",
      "Content Marketing",
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      "Digital Products",
      "AI Systems",
      "Mobile Experiences",
      "Design & Brand",
      "Growth & Marketing",
    ],
  },
  {
    title: "RESOURCES",
    links: [
      "Blog",
      "Case Studies",
      "Internship Program",
      "FAQ",
      "Support",
      "Careers",
      "Certificate Verification",
      "Privacy Policy",
      "Terms & Conditions",
    ],
  },
];

const linkRouteMap = {
  Home: "/",
  About: "/about",
  Services: "/services",
  Solutions: "/solutions",
  Internship: "/internship",
  "Internship Program": "/internship",
  Work: "/case-studies",
  Contact: "/contact",
  Careers: "/careers",
  Career: "/careers",
  FAQ: "/faq",
  "Frequently Asked Questions": "/faq",
  "Certificate Verification": "/certificate/verify",
  "Privacy Policy": "/privacy-policy",
  "Terms & Conditions": "/terms-conditions",
  Support: "/support",
  "Case Studies": "/case-studies",
  Blog: "/blog",
  "Digital Products": "/solutions/digital-products",
  "AI Systems": "/solutions/ai-systems",
  "Mobile Experiences": "/solutions/mobile-experiences",
  "Design & Brand": "/solutions/design-brand",
  "Growth & Marketing": "/solutions/growth-marketing",
  "Software Development": "/services/software-engineering/software-development",
  "AI & Automation": "/services/software-engineering/ai-automation",
  "Mobile App Development": "/services/software-engineering/mobile-app-development",
  "Mobile Applications": "/services/software-engineering/mobile-app-development",
  "Web Development": "/services/web-digital/website-development",
  "Ecommerce Solutions": "/services/web-digital/ecommerce",
  "Web Platforms": "/services/web-digital/web-platforms",
  "Digital Experiences": "/services/web-digital/digital-experiences",
  "UI/UX Design": "/services/design-brand/ui-ux-design",
  "Design Systems": "/services/design-brand/design-systems",
  "Product Design": "/services/design-brand/product-design",
  "Brand Identity": "/services/design-brand/brand-identity",
  "Digital Marketing": "/services/growth-marketing/digital-marketing",
  "Performance Marketing": "/services/growth-marketing/performance-marketing",
  "Lead Generation": "/services/growth-marketing/lead-generation",
  "Content Marketing": "/services/growth-marketing/content-marketing",
};

const socialLinks = [
  {
    label: "Cognolynx on LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/133397624/",
    rel: "noopener noreferrer",
  },
  {
    label: "Email Cognolynx",
    icon: Mail,
    href: "mailto:cognolynxforge@gmail.com",
    rel: "noopener noreferrer",
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] = useState(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleGroup = (index) => {
    setOpenGroup((current) => (current === index ? null : index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Bot detection via honeypot field: silently reject
    if (honeypot) {
      setEmail("");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail) || cleanEmail.length > 254) {
      return;
    }

    setSubmitted(true);

    const subject = encodeURIComponent("Newsletter Subscription & Inquiry from " + cleanEmail);
    const body = encodeURIComponent(
      `Hello Cognolynx Team,\n\nPlease subscribe my email (${cleanEmail}) to technology updates and reach out to me regarding your services.\n\nBest regards,\n${cleanEmail}`
    );
    window.location.href = `mailto:cognolynxforge@gmail.com?subject=${subject}&body=${body}`;

    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="cognolynx-footer">
      {/* Large background company watermark */}
      <div className="footer-watermark" aria-hidden="true">
        <svg
          viewBox="0 0 1200 150"
          className="footer-watermark-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            dominantBaseline="middle"
            textLength="1190"
            lengthAdjust="spacing"
            className="footer-watermark-text"
          >
            COGNOLYNX
          </text>
        </svg>
      </div>

      {/* Subtle background grid */}
      <div className="footer-grid" aria-hidden="true" />

      <div className="footer-container">
        {/* =========================================
            MAIN FOOTER
        ========================================= */}
        <div className="footer-main">
          {/* BRAND */}
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="Cognolynx Home">
              <span>COGNO</span>
              <span className="footer-logo-accent">LYNX</span>
            </a>

            <h2 className="footer-tagline">
              We build technology for
              <br />
              what’s next.
            </h2>

            <p className="footer-description">
              Software development, AI and digital products that help
              businesses grow and work smarter.
            </p>

            <div className="footer-socials">
              {socialLinks.map(({ label, icon: Icon, href, rel }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social"
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="footer-navigation">
            {footerGroups.map((group, index) => {
              const isOpen = openGroup === index;

              return (
                <div
                  className={`footer-group ${
                    isOpen ? "footer-group-open" : ""
                  }`}
                  key={group.title}
                >
                  <button
                    type="button"
                    className="footer-group-title"
                    onClick={() => toggleGroup(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{group.title}</span>

                    <ChevronDown
                      className="footer-group-chevron"
                      size={20}
                      strokeWidth={1.8}
                    />
                  </button>

                  <div className="footer-links">
                    {group.links.map((link) => (
                      <a href={linkRouteMap[link] || "#"} key={link}>
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* NEWSLETTER */}
          <div className="footer-newsletter">
            <span className="footer-column-label">STAY UPDATED</span>

            <p className="footer-newsletter-text">
              Get the latest insights on technology,
              <br />
              AI and digital growth.
            </p>

            <form
              className="footer-newsletter-form"
              onSubmit={handleSubmit}
            >
              {/* Invisible bot honeypot field */}
              <input
                type="text"
                name="website_url_hp"
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                maxLength={254}
                required
              />

              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </form>

            {submitted && (
              <div style={{ color: "#34d399", fontSize: "12.5px", fontWeight: "600", marginTop: "8px" }}>
                ✓ Connecting with cognolynxforge@gmail.com...
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px" }}>
              <span className="footer-newsletter-note" style={{ margin: 0 }}>
                No spam. Only useful updates.
              </span>
              <a
                href="mailto:cognolynxforge@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#93c5fd",
                  fontSize: "12.5px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
                aria-label="Direct Email to Cognolynx"
              >
                <Mail size={13} />
                <span>cognolynxforge@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================
            BOTTOM BAR
        ========================================= */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Cognolynx. All rights reserved.
          </p>

          <div className="footer-category-strip">
            <span />
            <p>
              SOFTWARE
              <b>•</b>
              AI
              <b>•</b>
              DIGITAL PRODUCTS
            </p>
            <span />
          </div>

          <p className="footer-location">
            <span className="footer-location-prefix">Built with purpose </span>
            <span className="footer-location-main">
              in India 🇮🇳 • Puducherry
            </span>
          </p>
        </div>
      </div>

      {/* BACK TO TOP */}
      <button
        type="button"
        className="footer-back-top"
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={21} strokeWidth={1.7} />
      </button>
    </footer>
  );
}