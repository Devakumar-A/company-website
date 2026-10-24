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

function Github({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Orcid({ size = 24, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path fill="#A6CE39" d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z" />
      <path fill="#FFF" d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 66.8c-5.4 0-9.7-4.4-9.7-9.7s4.3-9.7 9.7-9.7 9.7 4.4 9.7 9.7c0 5.4-4.3 9.7-9.7 9.7zM108.9 79.1h41.6c39.6 0 57.1 28.3 57.1 53.6 0 27.5-20 53.5-56.8 53.5h-41.9V79.1zm15.4 92.4h24.5c34.9 0 43.6-25.2 43.6-38.8 0-20-13.4-38.9-43.2-38.9h-24.9v77.7z" />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

const footerGroups = [
  {
    title: "COMPANY",
    links: ["Home", "About", "Services", "Solutions", "Work", "FAQ", "Contact"],
  },
  {
    title: "SERVICES",
    links: [
      "Software Development",
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
  "Web Development": "/services/web-digital/website-development",
  "Ecommerce Solutions": "/services/web-digital/ecommerce",
  "Web Platforms": "/services/web-digital/web-platforms",
  "Digital Experiences": "/services/web-digital/digital-experiences",
  "Mobile Applications": "/services/software-engineering",
  "AI & Automation": "/solutions/ai-systems",
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
    label: "Devakumar A on LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/devakumar-a-129561305/",
    rel: "me noopener",
  },
  {
    label: "Devakumar A on GitHub",
    icon: Github,
    href: "https://github.com/Devakumar-A",
    rel: "me noopener",
  },
  {
    label: "Devakumar A on ORCID",
    icon: Orcid,
    href: "https://orcid.org/0009-0003-8934-6744",
    rel: "me noopener",
  },
  {
    label: "Cognolynx on LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/company/133397624/",
    rel: "noopener noreferrer",
  },
  {
    label: "Email Cognolynx & Founder",
    icon: Mail,
    href: "mailto:devak9391@gmail.com",
    rel: "me",
  },
];

export default function Footer() {
  const [openGroup, setOpenGroup] = useState(null);
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

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

    // Connect your newsletter API here later.
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

            <span className="footer-newsletter-note">
              No spam. Only useful updates.
            </span>
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