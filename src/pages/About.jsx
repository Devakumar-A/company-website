import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail } from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/AboutPage.css";

function GithubIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function OrcidIcon({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path fill="#A6CE39" d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z" />
      <path fill="#FFF" d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 66.8c-5.4 0-9.7-4.4-9.7-9.7s4.3-9.7 9.7-9.7 9.7 4.4 9.7 9.7c0 5.4-4.3 9.7-9.7 9.7zM108.9 79.1h41.6c39.6 0 57.1 28.3 57.1 53.6 0 27.5-20 53.5-56.8 53.5h-41.9V79.1zm15.4 92.4h24.5c34.9 0 43.6-25.2 43.6-38.8 0-20-13.4-38.9-43.2-38.9h-24.9v77.7z" />
    </svg>
  );
}


const principles = [
  {
    number: "01",
    title: "Built for the business",
    text: "Every project starts with the business need, not with a trend. We build what is useful, practical and built to last.",
  },
  {
    number: "02",
    title: "Quality without excess",
    text: "We focus on clean design, reliable technology and production-ready work without adding things that do not create value.",
  },
  {
    number: "03",
    title: "Pricing that makes sense",
    text: "Good technology should be accessible. We shape solutions around the project, requirements and budget.",
  },
  {
    number: "04",
    title: "Built to grow",
    text: "We think beyond launch. Our products are designed so they can evolve as the business grows.",
  },
];

/* =========================================================
   ANIMATION VARIANTS
   ========================================================= */

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const createContainerVariants = (delay = 0, stagger = 0.035) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
});

const sectionVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * AnimatedWords Component
 * Splits strings into individual words, giving each one an in-view entrance animation.
 */
function AnimatedWords({ text, delay = 0, stagger = 0.03, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  if (!text) return null;

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={`about-words-container ${className}`}
      variants={createContainerVariants(delay, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="about-word-wrapper">
            <motion.span className="about-word" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <SEO {...seoData["/about"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About" }]} />

      {/* ───────────────── HERO ───────────────── */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="about-grid" />

        <div className="about-hero-inner">
          <motion.span
            className="about-eyebrow"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatedWords text="ABOUT COGNOLYNX" delay={0.2} stagger={0.06} />
          </motion.span>

          <h1 className="about-hero-title">
            <AnimatedWords text="We build technology" delay={0.25} stagger={0.05} />
            <br />
            <span>
              <AnimatedWords text="for what comes next." delay={0.45} stagger={0.05} />
            </span>
          </h1>

          <p className="about-hero-copy">
            <AnimatedWords
              text="Cognolynx is a technology company focused on building digital products, software and business solutions that are designed around real needs."
              delay={0.65}
              stagger={0.02}
            />
          </p>
        </div>

        <motion.div
          className="about-scroll"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-line" />
        </motion.div>
      </motion.section>

      {/* ───────────────── INTRO (01 WHAT WE DO) ───────────────── */}
      <motion.section
        className="about-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="about-section-label">
          <span>01</span>
          <AnimatedWords text="WHAT WE DO" delay={0.1} />
        </div>

        <div className="about-intro-content">
          <h2 className="about-heading">
            <AnimatedWords text="Technology should solve" delay={0.15} />
            <br />
            <span>
              <AnimatedWords text="something." delay={0.3} />
            </span>
          </h2>

          <div className="about-intro-text">
            <p>
              <AnimatedWords
                text="We work with businesses, teams and individuals to turn ideas into dependable digital products."
                delay={0.2}
                stagger={0.022}
              />
            </p>

            <p>
              <AnimatedWords
                text="From websites and software systems to digital platforms and custom business solutions, we take care of the technology so our clients can focus on their work."
                delay={0.35}
                stagger={0.02}
              />
            </p>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── APPROACH (02 OUR APPROACH) ───────────────── */}
      <motion.section
        className="about-approach"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="about-section-label">
          <span>02</span>
          <AnimatedWords text="OUR APPROACH" delay={0.1} />
        </div>

        <div className="about-approach-top">
          <h2 className="about-heading">
            <AnimatedWords text="Simple thinking." delay={0.15} />
            <br />
            <span>
              <AnimatedWords text="Serious execution." delay={0.3} />
            </span>
          </h2>

          <p className="about-approach-description">
            <AnimatedWords
              text="We believe the best work is clear, useful and carefully executed. Every decision—from design to development—is made with the final customer and the business in mind."
              delay={0.25}
              stagger={0.02}
            />
          </p>
        </div>

        <motion.div
          className="principles-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={cardGridVariants}
        >
          {principles.map((item) => (
            <motion.article
              className="principle-card"
              key={item.number}
              variants={cardVariants}
            >
              <span className="principle-number">{item.number}</span>

              <h3>
                <AnimatedWords text={item.title} delay={0.1} stagger={0.035} />
              </h3>

              <p>
                <AnimatedWords text={item.text} delay={0.2} stagger={0.018} />
              </p>

              <span className="principle-arrow">↗</span>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* ───────────────── QUALITY (03 WHAT YOU CAN EXPECT) ───────────────── */}
      <motion.section
        className="about-quality"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="quality-content">
          <div className="about-section-label">
            <span>03</span>
            <AnimatedWords text="WHAT YOU CAN EXPECT" delay={0.1} />
          </div>

          <h2 className="about-heading">
            <AnimatedWords text="Professional work." delay={0.15} />
            <br />
            <span>
              <AnimatedWords text="Without unnecessary complexity." delay={0.3} />
            </span>
          </h2>

          <p className="quality-copy">
            <AnimatedWords
              text="We aim to deliver production-quality work from the beginning—not something that simply looks good in a demo. Our focus is on performance, usability, maintainability and a polished final experience."
              delay={0.25}
              stagger={0.02}
            />
          </p>

          <motion.div
            className="quality-points"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardGridVariants}
          >
            {[
              "Thoughtful design",
              "Reliable development",
              "Responsive experiences",
              "Production-ready delivery",
            ].map((point) => (
              <motion.span key={point} variants={cardVariants}>
                <AnimatedWords text={point} delay={0.05} stagger={0.04} />
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ───────────────── RECOGNITION (04 RECOGNITION) ───────────────── */}
      <motion.section
        className="about-recognition"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="recognition-inner">
          <div className="about-section-label">
            <span>04</span>
            <AnimatedWords text="RECOGNITION" delay={0.1} />
          </div>

          <div className="recognition-layout">
            <div>
              <h2 className="about-heading">
                <AnimatedWords text="Built with purpose." delay={0.15} />
                <br />
                <span>
                  <AnimatedWords text="Recognized as a business." delay={0.3} />
                </span>
              </h2>
            </div>

            <motion.div
              className="recognition-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="recognition-mark">MSME</div>

              <div>
                <h3>
                  <AnimatedWords text="MSME Registered" delay={0.15} />
                </h3>

                <p>
                  <AnimatedWords
                    text="Cognolynx is recognized as a registered MSME, reflecting our commitment to building the company as a legitimate and long-term business."
                    delay={0.25}
                    stagger={0.02}
                  />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── FOUNDER (05 FOUNDER) ───────────────── */}
      <motion.section
        className="about-founder"
        id="founder"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="founder-inner">
          <div className="about-section-label">
            <span>05</span>
            <AnimatedWords text="FOUNDER & LEADERSHIP" delay={0.1} />
          </div>

          <div className="founder-layout">
            <div>
              <p className="founder-small">
                <AnimatedWords text="COGNOLYNX" delay={0.1} />
              </p>

              <h2 className="founder-name">
                <AnimatedWords text="Devakumar A" delay={0.15} stagger={0.06} />
              </h2>

              <p className="founder-role">
                <AnimatedWords text="Founder & Chief Executive Officer, Cognolynx" delay={0.25} />
              </p>

              <div className="founder-links">
                <a
                  href="https://github.com/Devakumar-A"
                  target="_blank"
                  rel="me noopener"
                  aria-label="Devakumar A GitHub Profile"
                  className="founder-link"
                >
                  <GithubIcon size={17} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://orcid.org/0009-0003-8934-6744"
                  target="_blank"
                  rel="me noopener"
                  aria-label="Devakumar A ORCID Profile"
                  className="founder-link"
                >
                  <OrcidIcon size={17} />
                  <span>ORCID</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/devakumar-a-129561305/"
                  target="_blank"
                  rel="me noopener"
                  aria-label="Devakumar A LinkedIn Profile"
                  className="founder-link"
                >
                  <LinkedinIcon size={17} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:cognolynxforge@gmail.com"
                  rel="me"
                  aria-label="Email Cognolynx directly at cognolynxforge@gmail.com"
                  className="founder-link founder-email"
                >
                  <Mail size={17} />
                  <span>cognolynxforge@gmail.com</span>
                </a>
              </div>
            </div>

            <p className="founder-description">
              <AnimatedWords
                text="Cognolynx was started with a simple idea: build useful technology with the same care and seriousness expected from a much larger technology company."
                delay={0.2}
                stagger={0.02}
              />
            </p>
          </div>
        </div>
      </motion.section>

      {/* ───────────────── CTA ───────────────── */}
      <motion.section
        className="about-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="about-cta-grid" />

        <div className="about-cta-inner">
          <span className="about-eyebrow">
            <AnimatedWords text="LET'S BUILD" delay={0.1} />
          </span>

          <h2 className="about-cta-title">
            <AnimatedWords text="Have something" delay={0.15} />
            <br />
            <span>
              <AnimatedWords text="worth building?" delay={0.3} />
            </span>
          </h2>

          <p className="about-cta-text">
            <AnimatedWords
              text="Tell us what you are working on. We will figure out the right way to build it."
              delay={0.35}
              stagger={0.025}
            />
          </p>

          <div className="about-cta-actions">
            <motion.a
              href="/#contact"
              className="about-cta-button"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Start a Project
              <span>↗</span>
            </motion.a>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}