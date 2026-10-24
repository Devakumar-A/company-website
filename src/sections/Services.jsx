import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  X,
} from "lucide-react";
import "../styles/Services.css";

/* ==========================================================================
   COGNOLYNX SERVICES DATASET (BENEFIT-FIRST PROFESSIONAL COPY)
   Google Cloud & Microsoft style: plain language, short sentences, verified facts
   ========================================================================== */

const SERVICES_DATA = [
  {
    id: 1,
    number: "01",
    title: "Custom Software Development",
    category: "Enterprise Systems",
    timeline: "Typical timeline: 4 – 12 weeks (scope dependent)",
    short: "Reliable software built around how your business actually works.",
    path: "/services/software-engineering/software-development",
    gradient: "linear-gradient(135deg, #090e1f 0%, #0d1b3e 50%, #152758 100%)",
    accent: "#3b82f6",
    deliverables: [
      "Web and back-end systems with secure APIs",
      "Database design and data migration",
      "User accounts, roles, and permissions",
      "Automated testing and deployment",
      "Documentation and team handover",
    ],
    techStack: ["Node.js", "Python", "TypeScript", "PostgreSQL", "Docker", "AWS"],
    description:
      "We design, build, and maintain custom software for teams that have outgrown off-the-shelf tools. We start with your workflow, agree on scope and milestones, and deliver in small releases you can review along the way.",
  },
  {
    id: 2,
    number: "02",
    title: "Web Applications",
    category: "Digital Products",
    timeline: "Typical timeline: 3 – 8 weeks (scope dependent)",
    short: "Fast, accessible web apps that your customers and teams enjoy using.",
    path: "/services/software-engineering/web-applications",
    gradient: "linear-gradient(135deg, #0b0f24 0%, #171f45 50%, #202b63 100%)",
    accent: "#6366f1",
    deliverables: [
      "Responsive apps for desktop, tablet, and mobile",
      "Dashboards and reporting views",
      "Accessibility aligned with WCAG 2.1 AA guidelines",
      "Performance tuning for Core Web Vitals",
      "Analytics and error monitoring",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Supabase"],
    description:
      "We build responsive web applications with modern frameworks, clear navigation, and thoughtful performance and accessibility from day one.",
  },
  {
    id: 3,
    number: "03",
    title: "AI & Automation",
    category: "Applied AI",
    timeline: "Typical timeline: 8 – 12 weeks (scope dependent)",
    short: "Practical AI that removes repetitive work from your team.",
    path: "/services/software-engineering/ai-automation",
    gradient: "linear-gradient(135deg, #120a2a 0%, #21124a 50%, #351a75 100%)",
    accent: "#8b5cf6",
    deliverables: [
      "Document and email processing",
      "Chat assistants and search over your own content",
      "Workflow automation connected to your existing tools",
      "Review steps so people stay in control",
      "Guidance on data privacy and access",
    ],
    techStack: ["Python", "PyTorch", "LangChain", "OpenAI / Claude API", "FastAPI", "Vector DBs"],
    description:
      "We help you apply AI where it saves time: reading documents, answering questions from your own content, and automating routine steps. Every project starts with a clear goal, a small pilot, and a way to measure whether it works.",
  },
  {
    id: 4,
    number: "04",
    title: "Cloud & DevOps",
    category: "Cloud Engineering",
    timeline: "Typical timeline: 2 – 6 weeks (scope dependent)",
    short: "Dependable hosting, deployment, and monitoring.",
    path: "/services/software-engineering/cloud-solutions",
    gradient: "linear-gradient(135deg, #061524 0%, #0c2b4a 50%, #124373 100%)",
    accent: "#0ea5e9",
    deliverables: [
      "Cloud setup on AWS or Google Cloud",
      "Automated build and deployment pipelines",
      "Monitoring and alerts",
      "Backup and recovery planning",
      "Cloud cost review",
    ],
    techStack: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    description:
      "We set up cloud infrastructure that is easy to deploy to, easy to monitor, and easy to understand, so your team can release updates with confidence.",
  },
  {
    id: 5,
    number: "05",
    title: "UI/UX & Design Systems",
    category: "Experience Design",
    timeline: "Typical timeline: 2 – 6 weeks (scope dependent)",
    short: "Interfaces that are clear, consistent, and easy to use.",
    path: "/services/design-brand/ui-ux-design",
    gradient: "linear-gradient(135deg, #1b0c26 0%, #301444 50%, #4b1f69 100%)",
    accent: "#a855f7",
    deliverables: [
      "User journeys and information architecture",
      "Wireframes and clickable prototypes",
      "Design system and components in Figma",
      "Usability testing",
      "Developer-ready handoff files",
    ],
    techStack: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.1 AA", "Storybook"],
    description:
      "We research how people use your product, design the flows, and turn them into prototypes and reusable components so design and development stay in sync.",
  },
  {
    id: 6,
    number: "06",
    title: "Mobile App Development",
    category: "Mobile",
    timeline: "Typical timeline: 6 – 12 weeks (scope dependent)",
    short: "Android and iOS apps from a single, well-tested codebase.",
    path: "/services/software-engineering/mobile-app-development",
    gradient: "linear-gradient(135deg, #07191e 0%, #0e303a 50%, #174b5c 100%)",
    accent: "#14b8a6",
    deliverables: [
      "Cross-platform app for Android and iOS",
      "Push notifications and offline support where needed",
      "Camera, location, and biometric features",
      "App Store and Google Play submission",
      "Crash reporting and analytics",
    ],
    techStack: ["React Native", "Flutter", "iOS", "Android", "Firebase", "TypeScript"],
    description:
      "We build mobile apps with React Native or Flutter, from first prototype through store release, with a focus on speed, usability, and reliability.",
  },
  {
    id: 7,
    number: "07",
    title: "Website Development",
    category: "Web & Digital",
    timeline: "Typical timeline: 2 – 5 weeks (scope dependent)",
    short: "Fast, search-friendly websites that explain what you do and bring in enquiries.",
    path: "/services/web-digital/website-development",
    gradient: "linear-gradient(135deg, #1f1107 0%, #3b210c 50%, #5d3413 100%)",
    accent: "#f59e0b",
    deliverables: [
      "Custom responsive website",
      "SEO-ready structure and structured data",
      "Content management setup",
      "Analytics and enquiry tracking",
      "Hosting and domain setup",
    ],
    techStack: ["React", "HTML5", "CSS3", "Headless CMS", "Sharp", "Netlify"],
    description:
      "We design and build business websites that load quickly, work on every device, and are structured so search engines and visitors understand them.",
  },
  {
    id: 8,
    number: "08",
    title: "Growth & SEO",
    category: "Growth Engineering",
    timeline: "Typical timeline: Ongoing sprint (scope dependent)",
    short: "Measurement, search, and campaigns that work together.",
    path: "/services/growth-marketing/digital-marketing",
    gradient: "linear-gradient(135deg, #061917 0%, #0d332e 50%, #16524b 100%)",
    accent: "#10b981",
    deliverables: [
      "Technical SEO audit and fixes",
      "Analytics and conversion tracking setup",
      "Landing pages for campaigns",
      "Search and social ad campaign setup",
      "Monthly reporting",
    ],
    techStack: ["Google Analytics 4", "Meta Pixel", "Search Console", "Mixpanel", "Tag Manager"],
    description:
      "We help you understand where visitors come from and what they do, then improve search visibility and landing pages based on that data.",
  },
];

export default function Services({ headingTag = "h2" }) {
  const Heading = headingTag;
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState(1); // 1 = swipe left, -1 = swipe right
  const [isModalOpen, setIsModalOpen] = useState(false);
  const savedScrollY = useRef(null);

  const activeService = SERVICES_DATA[currentIndex];

  /* --------------------------------------------------------------------------
     BODY SCROLL LOCK & SCROLL PRESERVATION
     Locks page scroll when Apple drop-up sheet is open so content behind stays frozen.
     Restores exact scroll position when closed so the user stays in the Services section.
     -------------------------------------------------------------------------- */
  useEffect(() => {
    if (isModalOpen) {
      savedScrollY.current =
        window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (savedScrollY.current !== null) {
        const targetY = savedScrollY.current;
        window.scrollTo({
          top: targetY,
          behavior: "instant",
        });
        requestAnimationFrame(() => {
          if (Math.abs(window.scrollY - targetY) > 20) {
            window.scrollTo({
              top: targetY,
              behavior: "instant",
            });
          }
        });
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  /* --------------------------------------------------------------------------
     SWIPE ACTIONS
     -------------------------------------------------------------------------- */
  const swipeNext = useCallback(() => {
    setExitDirection(1);
    setCurrentIndex((prev) => (prev < SERVICES_DATA.length - 1 ? prev + 1 : 0));
  }, []);

  const swipePrev = useCallback(() => {
    setExitDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SERVICES_DATA.length - 1));
  }, []);

  /* --------------------------------------------------------------------------
     KEYBOARD NAVIGATION
     -------------------------------------------------------------------------- */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) {
        if (e.key === "Escape") setIsModalOpen(false);
        return;
      }
      if (e.key === "ArrowRight") swipeNext();
      if (e.key === "ArrowLeft") swipePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [swipeNext, swipePrev, isModalOpen]);

  /* --------------------------------------------------------------------------
     DRAG / SWIPE HANDLER (Zero Lag GPU Composited)
     -------------------------------------------------------------------------- */
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 40;
    const velocityThreshold = 200;

    if (offset.x < -swipeThreshold || velocity.x < -velocityThreshold) {
      swipeNext();
    } else if (offset.x > swipeThreshold || velocity.x > velocityThreshold) {
      swipePrev();
    }
  };

  /* Indices for the 2 cards stacked visibly behind the active card */
  const cardIndex1 = (currentIndex + 1) % SERVICES_DATA.length;
  const cardIndex2 = (currentIndex + 2) % SERVICES_DATA.length;

  const peekCard1 = SERVICES_DATA[cardIndex1];
  const peekCard2 = SERVICES_DATA[cardIndex2];

  return (
    <section id="services" className="services-section" aria-label="Cognolynx Services">
      {/* Background Ambient Orbs */}
      <div className="services-orb services-orb-one" aria-hidden="true" />
      <div className="services-orb services-orb-two" aria-hidden="true" />

      <div className="services-container">
        {/* =================================================================
            SECTION HEADER
            ================================================================= */}
        <div className="services-header">
          <div className="services-heading">
            <span className="services-eyebrow">WHAT WE DO</span>
            <Heading>
              Everything you need
              <br />
              <span>to move forward.</span>
            </Heading>
          </div>

          <div className="services-description">
            Explore our engineering and digital capabilities. Swipe cards left or right to
            browse services, or tap any card for specifications and deliverables.
          </div>
        </div>

        {/* =================================================================
            INTERACTIVE CARD STACK CONTAINER
            ================================================================= */}
        <div className="services-deck-layout">
          {/* Top Bar: Counter */}
          <div className="services-deck-topbar">
            <div className="services-deck-counter">
              <span className="counter-current">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="counter-divider">/</span>
              <span className="counter-total">
                {String(SERVICES_DATA.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Animated Header for Active Card */}
          <header className="services-deck-header" key={activeService.id}>
            <div className="deck-header-meta">
              <span
                className="deck-header-category"
                style={{ color: activeService.accent }}
              >
                <Layers size={14} style={{ display: "inline-block", marginRight: "6px" }} />
                {activeService.category}
              </span>
              <span className="deck-header-timeline">
                <Clock size={13} style={{ display: "inline-block", marginRight: "5px" }} />
                {activeService.timeline}
              </span>
            </div>
            <h3 className="deck-header-title">{activeService.title}</h3>
          </header>

          {/* Stacked Cards Deck Stage with Visible Peek Layers */}
          <div className="services-deck-stage">
            <div className="services-deck-stack">
              {/* Stack Tier 3 (Card furthest behind, peeking out on right) */}
              <div
                className="services-deck-card services-deck-card-stacked-2"
                style={{
                  background: peekCard2.gradient,
                  zIndex: 8,
                }}
                onClick={swipeNext}
                aria-hidden="true"
              >
                <div className="card-ambient-spot" style={{ background: peekCard2.accent }} />
                <div className="card-stack-shade-2" />
                <div className="card-peek-badge">
                  <span>{peekCard2.number}</span>
                </div>
              </div>

              {/* Stack Tier 2 (Card directly behind front card, clearly visible) */}
              <div
                className="services-deck-card services-deck-card-stacked-1"
                style={{
                  background: peekCard1.gradient,
                  zIndex: 12,
                }}
                onClick={swipeNext}
                role="button"
                tabIndex={0}
                aria-label={`Next service: ${peekCard1.title}. Click to view.`}
              >
                <div className="card-ambient-spot" style={{ background: peekCard1.accent }} />
                <div className="card-stack-shade-1" />
                <div className="card-peek-content">
                  <div className="card-top-row">
                    <span className="card-badge-num">{peekCard1.number}</span>
                    <span className="card-peek-cue">
                      <span>Next</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                  <div className="card-mid-body">
                    <span
                      className="card-category-tag"
                      style={{
                        borderColor: `${peekCard1.accent}66`,
                        color: peekCard1.accent,
                      }}
                    >
                      {peekCard1.category}
                    </span>
                    <h4 className="card-title-text">{peekCard1.title}</h4>
                  </div>
                </div>
              </div>

              {/* Stack Tier 1 (Active Front Card with Framer Motion Swipe & Vanish) */}
              <AnimatePresence initial={false} custom={exitDirection}>
                <motion.div
                  key={activeService.id}
                  className="services-deck-card services-deck-card-front"
                  style={{
                    background: activeService.gradient,
                    zIndex: 20,
                  }}
                  custom={exitDirection}
                  initial={{
                    x: exitDirection === 1 ? 40 : -40,
                    scale: 0.94,
                    opacity: 0.85,
                  }}
                  animate={{
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    rotate: 0,
                  }}
                  exit={(dir) => ({
                    x: dir === 1 ? -650 : 650,
                    opacity: 0,
                    rotate: dir === 1 ? -14 : 14,
                    scale: 0.88,
                    transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] },
                  })}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 26,
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.75}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.01, cursor: "grabbing" }}
                  onClick={() => setIsModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Service ${activeService.number}: ${activeService.title}. Click to open details, or swipe to vanish.`}
                >
                  <div className="services-deck-card-inner">
                    {/* Ambient Accent Light */}
                    <div
                      className="card-ambient-spot"
                      style={{ background: activeService.accent }}
                      aria-hidden="true"
                    />

                    {/* Card Top Row */}
                    <div className="card-top-row">
                      <span className="card-badge-num">{activeService.number}</span>
                      <span className="card-tap-cue">
                        <span>Click to expand</span>
                        <ArrowUpRight size={15} />
                      </span>
                    </div>

                    {/* Card Middle Editorial Body */}
                    <div className="card-mid-body">
                      <span
                        className="card-category-tag"
                        style={{
                          borderColor: `${activeService.accent}66`,
                          color: activeService.accent,
                        }}
                      >
                        {activeService.category}
                      </span>
                      <h4 className="card-title-text">{activeService.title}</h4>
                      <p className="card-short-desc">{activeService.short}</p>
                    </div>

                    {/* Card Bottom Tech Chips */}
                    <div className="card-bottom-row">
                      <div className="card-tech-badges">
                        {activeService.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="card-tech-chip">
                            {tech}
                          </span>
                        ))}
                        {activeService.techStack.length > 3 && (
                          <span className="card-tech-chip card-tech-more">
                            +{activeService.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Pagination Dots */}
          <div className="services-deck-footer">
            <div className="services-deck-dots">
              {SERVICES_DATA.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setExitDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`deck-dot ${idx === currentIndex ? "deck-dot-active" : ""}`}
                  aria-label={`Jump to ${s.title}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================
            APPLE DROP-UP (EXPANDABLE DETAIL SHEET)
            Smooth bottom sheet with pull handle, clear header gap, and scrollable content
            ================================================================= */}
        <AnimatePresence>
          {isModalOpen && (
            <div
              className="screen-modal-root"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-service-title"
            >
              {/* Backdrop Scrim */}
              <motion.div
                className="screen-modal-scrim"
                onClick={() => setIsModalOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                aria-hidden="true"
              />

              {/* Apple-style Drop-Up Modal Sheet */}
              <motion.div
                className="screen-modal"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 32, stiffness: 360 }}
              >
                {/* Apple Drag Handle Pill */}
                <div className="screen-modal-drag-handle" aria-hidden="true" />

                {/* Modal Top Bar */}
                <div className="screen-modal-topbar">
                  <button
                    type="button"
                    className="screen-modal-back-btn"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Back to Services"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Services</span>
                  </button>
                  <span className="screen-modal-service-num">
                    Service {activeService.number} of {SERVICES_DATA.length}
                  </span>
                  <button
                    type="button"
                    className="screen-modal-close-icon"
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Close details"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Scroll Content */}
                <div className="screen-modal-scroll">
                  <div className="screen-modal-content">
                    <div className="modal-header-block">
                      <div className="modal-meta-row">
                        <span
                          className="modal-category-chip"
                          style={{
                            background: `${activeService.accent}22`,
                            color: activeService.accent,
                            borderColor: `${activeService.accent}44`,
                          }}
                        >
                          <Layers size={13} style={{ display: "inline-block", marginRight: "5px" }} />
                          {activeService.category}
                        </span>
                        <span className="modal-timeline-chip">
                          <Clock size={13} style={{ display: "inline-block", marginRight: "5px" }} />
                          {activeService.timeline}
                        </span>
                      </div>

                      <h2 id="modal-service-title" className="modal-title">
                        {activeService.title}
                      </h2>
                    </div>

                    {/* Prose Overview */}
                    <div className="modal-prose">
                      <p>{activeService.description}</p>
                    </div>

                    {/* Key Deliverables ("What you get") */}
                    <div className="modal-deliverables-section">
                      <h4 className="modal-subheading">
                        <CheckCircle2 size={16} className="modal-subheading-icon" />
                        What You Get
                      </h4>
                      <div className="modal-deliverables-grid">
                        {activeService.deliverables.map((item, idx) => (
                          <div key={idx} className="modal-deliverable-item">
                            <span className="deliverable-bullet">✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies & Tools */}
                    <div className="modal-tech-section">
                      <h4 className="modal-subheading">
                        <Sparkles size={16} className="modal-subheading-icon" />
                        Technologies We Use
                      </h4>
                      <div className="modal-tech-chips">
                        {activeService.techStack.map((tech) => (
                          <span key={tech} className="modal-tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="modal-actions-row">
                      <Link
                        to={activeService.path}
                        className="modal-primary-btn"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <span>Explore Service Page</span>
                        <ArrowRight size={16} />
                      </Link>

                      <Link
                        to="/contact"
                        className="modal-secondary-btn"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <span>Talk to our team</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
