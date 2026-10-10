import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  Code2,
  Globe2,
  Palette,
  TrendingUp,
  Cloud,
} from "lucide-react";

import "../styles/Navbar.css";

/* ==========================================================================
   COGNOLYNX — PREMIUM CORPORATE NAVIGATION

   Structure:
   Home
   About
   Services
   Solutions
   Technology
   Career
   Contact
   Start a Project

   Priorities:
   - Clear Cognolynx branding
   - Strong desktop navigation
   - Fully usable mobile navigation
   - CTA always accessible
   - No unnecessary AI-focused wording
   - Accessible dropdowns
   - Smooth anchor navigation
   ========================================================================== */


/* ==========================================================================
   SERVICES
   ========================================================================== */

const servicePathMap = {
  // Software & Engineering
  "Software & Engineering": "/services/software-engineering",
  "Software Development": "/services/software-engineering/software-development",
  "Web Applications": "/services/software-engineering/web-applications",
  "Business Software": "/services/software-engineering/business-software",
  "Cloud Solutions": "/services/software-engineering/cloud-solutions",

  // Web & Digital
  "Web & Digital": "/services/web-digital",
  "Website Development": "/services/web-digital/website-development",
  "E-commerce": "/services/web-digital/ecommerce",
  "Web Platforms": "/services/web-digital/web-platforms",
  "Digital Experiences": "/services/web-digital/digital-experiences",

  // Design & Brand
  "Design & Brand": "/services/design-brand",
  "UI / UX Design": "/services/design-brand/ui-ux-design",
  "Design Systems": "/services/design-brand/design-systems",
  "Product Design": "/services/design-brand/product-design",
  "Graphic Design": "/services/design-brand/product-design",
  "Brand Identity": "/services/design-brand/brand-identity",

  // Growth & Marketing
  "Growth & Marketing": "/services/growth-marketing",
  "Digital Marketing": "/services/growth-marketing/digital-marketing",
  "Performance Marketing": "/services/growth-marketing/performance-marketing",
  "Performance Advertising": "/services/growth-marketing/performance-marketing",
  "Lead Generation": "/services/growth-marketing/lead-generation",
  "Social Media": "/services/growth-marketing/lead-generation",
  "Content Marketing": "/services/growth-marketing/content-marketing",
  "Content Production": "/services/growth-marketing/content-marketing",
};

const SERVICES = [
  {
    id: "engineering",
    title: "Software & Engineering",
    description:
      "Reliable software systems designed around the way your business works.",
    icon: Code2,
    items: [
      "Software Development",
      "Web Applications",
      "Business Software",
      "Cloud Solutions",
    ],
  },
  {
    id: "digital",
    title: "Web & Digital",
    description:
      "High-quality digital experiences built for performance, usability and growth.",
    icon: Globe2,
    items: [
      "Website Development",
      "E-commerce",
      "Web Platforms",
      "Digital Experiences",
    ],
  },
  {
    id: "design",
    title: "Design & Brand",
    description:
      "Clear digital experiences and visual systems that strengthen your brand.",
    icon: Palette,
    items: [
      "UI / UX Design",
      "Design Systems",
      "Product Design",
      "Brand Identity",
    ],
  },
  {
    id: "growth",
    title: "Growth & Marketing",
    description:
      "Digital marketing and content built to create measurable business growth.",
    icon: TrendingUp,
    items: [
      "Digital Marketing",
      "Performance Marketing",
      "Lead Generation",
      "Content Marketing",
    ],
  },
];


/* ==========================================================================
   SOLUTIONS
   ========================================================================== */

const SOLUTIONS = [
  {
    number: "01",
    title: "Digital Products",
    description:
      "Websites, web applications and scalable digital platforms.",
    path: "/solutions/digital-products",
  },
  {
    number: "02",
    title: "Business Systems",
    description:
      "Technology designed around real business operations.",
    path: "/solutions/business-systems",
  },
  {
    number: "03",
    title: "Mobile Experiences",
    description:
      "Modern mobile products built for connected experiences.",
    path: "/solutions/mobile-experiences",
  },
  {
    number: "04",
    title: "Design & Brand",
    description:
      "Digital interfaces and visual identities built with clarity.",
    path: "/solutions/design-brand",
  },
  {
    number: "05",
    title: "Growth & Marketing",
    description:
      "Digital campaigns, content and growth systems.",
    path: "/solutions/growth-marketing",
  },
];


/* ==========================================================================
   TECHNOLOGY
   ========================================================================== */

const TECHNOLOGY = [
  {
    number: "01",
    title: "Web Engineering",
    stack: "React · Next.js · Node.js · TypeScript",
    path: "/technology/web-engineering",
  },
  {
    number: "02",
    title: "Mobile Development",
    stack: "React Native · Flutter · Android · iOS",
    path: "/technology/mobile-development",
  },
  {
    number: "03",
    title: "Software Systems",
    stack: "Python · Java · JavaScript · APIs",
    path: "/technology/software-systems",
  },
  {
    number: "04",
    title: "Cloud & Infrastructure",
    stack: "AWS · Docker · Cloudflare · Firebase",
    path: "/technology/cloud-infrastructure",
  },
  {
    number: "05",
    title: "Backend & Databases",
    stack: "PostgreSQL · MongoDB · MySQL · Redis",
    path: "/technology/backend-databases",
  },
  {
    number: "06",
    title: "Design Systems",
    stack: "Figma · Prototyping · Design Systems",
    path: "/technology/design-systems",
  },
];


/* ==========================================================================
   NAVBAR
   ========================================================================== */

export default function Navbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [mobileExpanded, setMobileExpanded] = useState(null);

  const [activeService, setActiveService] = useState(0);

  const navRef = useRef(null);

  const closeTimer = useRef(null);


  /* ==========================================================================
     SCROLL STATE
     ========================================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  /* ==========================================================================
     MOBILE BODY LOCK
     ========================================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("cg-menu-open");
    } else {
      document.body.classList.remove("cg-menu-open");
    }

    return () => {
      document.body.classList.remove("cg-menu-open");
    };
  }, [mobileOpen]);


  /* ==========================================================================
     CLEANUP
     ========================================================================== */

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);


  /* ==========================================================================
     OUTSIDE CLICK + ESCAPE
     ========================================================================== */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setOpenMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);


  /* ==========================================================================
     DESKTOP DROPDOWN
     ========================================================================== */

  const openDropdown = useCallback((menu) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }

    setOpenMenu(menu);
  }, []);


  const closeDropdownDelayed = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }

    closeTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 180);
  }, []);


  /* ==========================================================================
     NAVIGATION
     ========================================================================== */

  const navigateTo = useCallback((event, target) => {
    if (!target) return;

    // Route paths (e.g. "/", "/about", "/services")
    if (!target.startsWith("#")) {
      event.preventDefault();
      setOpenMenu(null);
      setMobileOpen(false);
      setMobileExpanded(null);
      navigate(target);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Hash-based anchor scrolling (e.g. "#contact", "#hero")
    const element = document.querySelector(target);
    if (!element) {
      return;
    }

    event.preventDefault();
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileExpanded(null);

    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", target);
  }, [navigate]);


  /* ==========================================================================
     MOBILE
     ========================================================================== */

  const toggleMobileSection = (section) => {
    setMobileExpanded((current) =>
      current === section ? null : section
    );
  };


  const toggleMobileMenu = () => {
    setMobileOpen((current) => !current);

    setOpenMenu(null);
    setMobileExpanded(null);
  };


  /* ==========================================================================
     CTA
     ========================================================================== */

  const renderCTA = (extraClass = "") => (
    <a
      href="/contact"
      className={`cg-cta-btn ${extraClass}`}
      onClick={(event) => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          navigateTo(event, "#contact");
        } else {
          navigateTo(event, "/contact");
        }
      }}
      aria-label="Start a project with Cognolynx"
    >
      <span>Start a Project</span>

      <ArrowUpRight
        className="cg-cta-arrow"
        size={17}
        strokeWidth={2}
      />
    </a>
  );


  /* ==========================================================================
     RENDER
     ========================================================================== */

  return (
    <header
      ref={navRef}
      className={`cg-header ${
        isScrolled
          ? "cg-header-scrolled"
          : "cg-header-top"
      } ${mobileOpen ? "cg-header-mobile-open" : ""}`}
      role="banner"
    >

      {/* ================================================================
          MAIN NAVIGATION
          ================================================================ */}

      <div className="cg-nav-container">


        {/* ==============================================================
            BRAND
            ============================================================== */}

        <a
          href="/"
          className="cg-brand"
          aria-label="Cognolynx — Home"
          onClick={(event) =>
            navigateTo(event, "/")
          }
        >
          <span className="cg-brand-mark">
            <picture>
              <source srcSet="/assets/logo.webp" type="image/webp" />
              <img
                src="/assets/logo.png"
                alt="Cognolynx Logo"
                className="cg-brand-icon"
                width="36"
                height="36"
                loading="eager"
                decoding="async"
                draggable="false"
              />
            </picture>
          </span>

          <span className="cg-brand-text">
            Cogno
            <span className="cg-brand-accent">
              lynx
            </span>
          </span>
        </a>


        {/* ==============================================================
            DESKTOP NAVIGATION
            ============================================================== */}

        <nav
          className="cg-nav-desktop"
          aria-label="Primary Navigation"
        >

          {/* HOME */}

          <a
            href="/"
            className="cg-nav-btn"
            onClick={(event) =>
              navigateTo(event, "/")
            }
          >
            Home
          </a>


          {/* ABOUT */}

          <a
            href="/about"
            className="cg-nav-btn"
            onClick={(event) =>
              navigateTo(event, "/about")
            }
          >
            About
          </a>


          {/* ============================================================
              SERVICES
              ============================================================ */}

          <div
            className={`cg-nav-item ${
              openMenu === "services"
                ? "is-open"
                : ""
            }`}
            onMouseEnter={() =>
              openDropdown("services")
            }
            onMouseLeave={
              closeDropdownDelayed
            }
          >

            <button
              type="button"
              className={`cg-nav-btn ${
                openMenu === "services"
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setOpenMenu((current) =>
                  current === "services"
                    ? null
                    : "services"
                )
              }
              aria-expanded={
                openMenu === "services"
              }
              aria-haspopup="true"
            >
              <span>Services</span>

              <ChevronDown
                className="cg-nav-chevron"
                size={15}
                strokeWidth={1.8}
              />
            </button>


              <div
                className="cg-dropdown-panel cg-services-dropdown"
                role="menu"
              >

                <div className="cg-services-wrapper">

                  {/* SERVICE CATEGORIES */}

                  <div className="cg-services-sidebar">

                    <span className="cg-sidebar-header">
                      CAPABILITIES
                    </span>

                    {SERVICES.map(
                      (service, index) => {
                        const Icon =
                          service.icon;

                        const active =
                          activeService === index;

                        return (
                          <a
                            key={service.id}
                            href={servicePathMap[service.title] || "/services"}
                            className={`cg-category-tab ${
                              active
                                ? "is-active"
                                : ""
                            }`}
                            style={{ textDecoration: "none", color: "inherit" }}
                            onMouseEnter={() =>
                              setActiveService(
                                index
                              )
                            }
                            onFocus={() =>
                              setActiveService(
                                index
                              )
                            }
                            onClick={(event) => {
                              setActiveService(
                                index
                              );
                              navigateTo(
                                event,
                                servicePathMap[service.title] || "/services"
                              );
                            }}
                          >

                            <span className="cg-tab-left">

                              <span className="cg-tab-icon">
                                <Icon
                                  size={16}
                                  strokeWidth={1.8}
                                />
                              </span>

                              <span className="cg-tab-meta">

                                <span className="cg-tab-title">
                                  {service.title}
                                </span>

                                <span className="cg-tab-count">
                                  {String(
                                    service.items
                                      .length
                                  ).padStart(
                                    2,
                                    "0"
                                  )}{" "}
                                  services
                                </span>

                              </span>

                            </span>

                            <ChevronRight
                              className="cg-tab-arrow"
                              size={16}
                            />

                          </a>
                        );
                      }
                    )}

                  </div>


                  {/* ACTIVE SERVICE */}

                  <div className="cg-services-flyout">

                    <div className="cg-flyout-header">

                      <div>

                        <span className="cg-flyout-kicker">
                          CAPABILITY
                        </span>

                        <h3 className="cg-flyout-title">
                          {servicePathMap[SERVICES[activeService].title] ? (
                            <a
                              href={servicePathMap[SERVICES[activeService].title]}
                              onClick={(event) =>
                                navigateTo(
                                  event,
                                  servicePathMap[SERVICES[activeService].title]
                                )
                              }
                              style={{ color: "inherit", textDecoration: "none" }}
                            >
                              {SERVICES[activeService].title}
                            </a>
                          ) : (
                            SERVICES[activeService].title
                          )}
                        </h3>

                        <p className="cg-subservice-desc">
                          {
                            SERVICES[
                              activeService
                            ].description
                          }
                        </p>

                      </div>

                    </div>


                    <div className="cg-subservices-grid">

                      {SERVICES[
                        activeService
                      ].items.map(
                        (item, index) => {
                          const itemPath = servicePathMap[item] || "/services";

                          return (
                            <a
                              key={item}
                              href={itemPath}
                              className="cg-subservice-card"
                              onClick={(event) =>
                                navigateTo(
                                  event,
                                  itemPath
                                )
                              }
                            >

                              <div className="cg-subservice-top">

                                <span className="cg-subservice-num">
                                  {String(
                                    index + 1
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                                </span>

                                <ArrowUpRight
                                  className="cg-subservice-arrow"
                                  size={16}
                                />

                              </div>

                              <h4 className="cg-subservice-name">
                                {item}
                              </h4>

                              <span className="cg-subservice-link">
                                Explore service
                              </span>

                            </a>
                          );
                        }
                      )}

                    </div>

                  </div>

                </div>


                <div className="cg-dropdown-footer">

                  <span className="cg-footer-lead">

                    <span className="cg-footer-dot" />

                    Built around your business.

                  </span>

                  <a
                    href="/services"
                    className="cg-footer-link"
                    onClick={(event) =>
                      navigateTo(
                        event,
                        "/services"
                      )
                    }
                  >
                    View all services

                    <ArrowUpRight size={13} />
                  </a>

                </div>

              </div>

          </div>


          {/* ============================================================
              SOLUTIONS
              ============================================================ */}

          <div
            className={`cg-nav-item ${
              openMenu === "solutions"
                ? "is-open"
                : ""
            }`}
            onMouseEnter={() =>
              openDropdown("solutions")
            }
            onMouseLeave={
              closeDropdownDelayed
            }
          >

            <button
              type="button"
              className={`cg-nav-btn ${
                openMenu === "solutions"
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setOpenMenu((current) =>
                  current === "solutions"
                    ? null
                    : "solutions"
                )
              }
              aria-expanded={
                openMenu === "solutions"
              }
              aria-haspopup="true"
            >
              <span>Solutions</span>

              <ChevronDown
                className="cg-nav-chevron"
                size={15}
                strokeWidth={1.8}
              />
            </button>


              <div
                className="cg-dropdown-panel cg-solutions-dropdown"
                role="menu"
              >

                <div className="cg-solutions-grid">

                  <div className="cg-solutions-list">

                    {SOLUTIONS.map(
                      (solution) => (
                        <a
                          key={
                            solution.number
                          }
                          href={solution.path || "/solutions"}
                          className="cg-solution-tile"
                          onClick={(event) =>
                            navigateTo(
                              event,
                              solution.path || "/solutions"
                            )
                          }
                        >

                          <span className="cg-solution-badge">
                            {solution.number}
                          </span>

                          <span className="cg-solution-content">

                            <span className="cg-solution-title">
                              {solution.title}
                            </span>

                            <span className="cg-solution-sub">
                              {
                                solution.description
                              }
                            </span>

                          </span>

                          <ArrowUpRight
                            className="cg-solution-arrow"
                            size={17}
                          />

                        </a>
                      )
                    )}

                  </div>


                  <div className="cg-spotlight-card">

                    <span className="cg-spotlight-tag">
                      COGNOLYNX
                    </span>

                    <h3 className="cg-spotlight-title">
                      Technology built around the outcome.
                    </h3>

                    <p className="cg-spotlight-text">
                      From the first idea to the
                      finished product, we build
                      with purpose, clarity and
                      scale in mind.
                    </p>

                    <a
                      href="/solutions"
                      className="cg-spotlight-cta"
                      onClick={(event) =>
                        navigateTo(
                          event,
                          "/solutions"
                        )
                      }
                    >
                      Explore solutions
                      <ArrowUpRight size={14} />
                    </a>

                  </div>

                </div>

              </div>

          </div>


          {/* ============================================================
              TECHNOLOGY
              ============================================================ */}

          <div
            className={`cg-nav-item ${
              openMenu === "technology"
                ? "is-open"
                : ""
            }`}
            onMouseEnter={() =>
              openDropdown("technology")
            }
            onMouseLeave={
              closeDropdownDelayed
            }
          >

            <button
              type="button"
              className={`cg-nav-btn ${
                openMenu === "technology"
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setOpenMenu((current) =>
                  current === "technology"
                    ? null
                    : "technology"
                )
              }
              aria-expanded={
                openMenu === "technology"
              }
              aria-haspopup="true"
            >
              <span>Technology</span>

              <ChevronDown
                className="cg-nav-chevron"
                size={15}
                strokeWidth={1.8}
              />
            </button>


              <div
                className="cg-dropdown-panel cg-tech-dropdown"
                role="menu"
              >

                <div className="cg-tech-grid">

                  {TECHNOLOGY.map(
                    (technology) => (
                      <a
                        key={
                          technology.number
                        }
                        href={technology.path || "/technology"}
                        className="cg-tech-card"
                        onClick={(event) =>
                          navigateTo(
                            event,
                            technology.path || "/technology"
                          )
                        }
                      >

                        <div className="cg-tech-head">

                          <span className="cg-tech-num">
                            {technology.number}
                          </span>

                          <span className="cg-tech-name">
                            {technology.title}
                          </span>

                          <ArrowUpRight
                            className="cg-tech-arrow"
                            size={16}
                          />

                        </div>

                        <span className="cg-tech-tags">
                          {technology.stack}
                        </span>

                      </a>
                    )
                  )}

                </div>


                <div className="cg-dropdown-footer">

                  <span className="cg-footer-lead">

                    <Cloud size={14} />

                    Modern technology, chosen for the work.

                  </span>

                  <a
                    href="/technology"
                    className="cg-footer-link"
                    onClick={(event) =>
                      navigateTo(
                        event,
                        "/technology"
                      )
                    }
                  >
                    View technology

                    <ArrowUpRight size={13} />
                  </a>

                </div>

              </div>

          </div>


          {/* CAREER */}

          <a
            href="/careers"
            className="cg-nav-btn"
            onClick={(event) =>
              navigateTo(event, "/careers")
            }
          >
            Career
          </a>


          {/* CONTACT */}

          <a
            href="/contact"
            className="cg-nav-btn"
            onClick={(event) =>
              navigateTo(event, "/contact")
            }
          >
            Contact
          </a>

        </nav>


        {/* ==============================================================
            RIGHT ACTIONS
            ============================================================== */}

        <div className="cg-nav-actions">

          {/* DESKTOP CTA */}

          {renderCTA("cg-desktop-cta")}


          {/* MOBILE MENU */}

          <button
            type="button"
            className="cg-mobile-toggle"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
            aria-controls="cg-mobile-navigation"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? (
              <X
                size={22}
                strokeWidth={1.8}
              />
            ) : (
              <Menu
                size={22}
                strokeWidth={1.8}
              />
            )}
          </button>

        </div>

      </div>


      {/* ================================================================
          MOBILE NAVIGATION
          ================================================================ */}

      {mobileOpen && (
        <div
          id="cg-mobile-navigation"
          className="cg-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* SCROLLABLE MENU BODY */}
          <div className="cg-mobile-scroll">
            <div className="cg-mobile-inner">
              {/* MOBILE HOME */}
              <a
                href="/"
                className="cg-mobile-direct-link"
                onClick={(event) =>
                  navigateTo(
                    event,
                    "/"
                  )
                }
              >
                <span>Home</span>
                <ArrowUpRight size={17} />
              </a>

              {/* MOBILE ABOUT */}
              <a
                href="/about"
                className="cg-mobile-direct-link"
                onClick={(event) =>
                  navigateTo(
                    event,
                    "/about"
                  )
                }
              >
                <span>About</span>
                <ArrowUpRight size={17} />
              </a>

              {/* MOBILE SERVICES */}
              <div
                className={`cg-mobile-item ${
                  mobileExpanded === "services"
                    ? "is-open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  className="cg-mobile-trigger"
                  onClick={() =>
                    toggleMobileSection(
                      "services"
                    )
                  }
                  aria-expanded={
                    mobileExpanded ===
                    "services"
                  }
                >
                  <span>Services</span>
                  <ChevronDown
                    className="cg-mobile-trigger-chevron"
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

                {mobileExpanded ===
                  "services" && (
                  <div className="cg-mobile-sublist">
                    {SERVICES.map(
                      (service, index) => {
                        const targetPath = servicePathMap[service.title] || "/services";

                        return (
                          <a
                            key={service.id}
                            href={targetPath}
                            className="cg-mobile-nested-link"
                            onClick={(event) =>
                              navigateTo(
                                event,
                                targetPath
                              )
                            }
                          >
                            <span className="cg-mobile-nested-num">
                              {String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                            <span className="cg-mobile-nested-title">
                              {service.title}
                            </span>
                            <ArrowUpRight
                              className="cg-mobile-nested-arrow"
                              size={14}
                            />
                          </a>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE SOLUTIONS */}
              <div
                className={`cg-mobile-item ${
                  mobileExpanded ===
                  "solutions"
                    ? "is-open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  className="cg-mobile-trigger"
                  onClick={() =>
                    toggleMobileSection(
                      "solutions"
                    )
                  }
                  aria-expanded={
                    mobileExpanded ===
                    "solutions"
                  }
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className="cg-mobile-trigger-chevron"
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

                {mobileExpanded ===
                  "solutions" && (
                  <div className="cg-mobile-sublist">
                    {SOLUTIONS.map(
                      (solution) => (
                        <a
                          key={
                            solution.number
                          }
                          href={solution.path || "/solutions"}
                          className="cg-mobile-nested-link"
                          onClick={(event) =>
                            navigateTo(
                              event,
                              solution.path || "/solutions"
                            )
                          }
                        >
                          <span className="cg-mobile-nested-num">
                            {solution.number}
                          </span>
                          <span className="cg-mobile-nested-title">
                            {solution.title}
                          </span>
                          <ArrowUpRight
                            className="cg-mobile-nested-arrow"
                            size={14}
                          />
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE TECHNOLOGY */}
              <div
                className={`cg-mobile-item ${
                  mobileExpanded ===
                  "technology"
                    ? "is-open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  className="cg-mobile-trigger"
                  onClick={() =>
                    toggleMobileSection(
                      "technology"
                    )
                  }
                  aria-expanded={
                    mobileExpanded ===
                    "technology"
                  }
                >
                  <span>Technology</span>
                  <ChevronDown
                    className="cg-mobile-trigger-chevron"
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

                {mobileExpanded ===
                  "technology" && (
                  <div className="cg-mobile-sublist">
                    {TECHNOLOGY.map(
                      (technology) => (
                        <a
                          key={
                            technology.number
                          }
                          href={technology.path || "/technology"}
                          className="cg-mobile-nested-link"
                          onClick={(event) =>
                            navigateTo(
                              event,
                              technology.path || "/technology"
                            )
                          }
                        >
                          <span className="cg-mobile-nested-num">
                            {
                              technology.number
                            }
                          </span>
                          <span className="cg-mobile-nested-title">
                            {
                              technology.title
                            }
                          </span>
                          <ArrowUpRight
                            className="cg-mobile-nested-arrow"
                            size={14}
                          />
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* MOBILE CAREER */}
              <a
                href="/careers"
                className="cg-mobile-direct-link"
                onClick={(event) =>
                  navigateTo(
                    event,
                    "/careers"
                  )
                }
              >
                <span>Career</span>
                <ArrowUpRight size={17} />
              </a>

              {/* MOBILE CONTACT */}
              <a
                href="/contact"
                className="cg-mobile-direct-link"
                onClick={(event) =>
                  navigateTo(
                    event,
                    "/contact"
                  )
                }
              >
                <span>Contact</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>

          {/* FIXED BOTTOM CTA — ALWAYS VISIBLE WITHOUT COVERING CONTENT */}
          <div className="cg-mobile-cta-bar">
            {renderCTA("cg-mobile-fixed-cta")}
          </div>
        </div>
      )}

    </header>
  );
}