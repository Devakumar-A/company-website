import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import "../styles/Contact.css";

function LinkedinIcon({ size = 22, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 22, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function OrcidIcon({ size = 22, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" fill="currentColor" {...props}>
      <path fill="#A6CE39" d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0z" />
      <path fill="#FFF" d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 66.8c-5.4 0-9.7-4.4-9.7-9.7s4.3-9.7 9.7-9.7 9.7 4.4 9.7 9.7c0 5.4-4.3 9.7-9.7 9.7zM108.9 79.1h41.6c39.6 0 57.1 28.3 57.1 53.6 0 27.5-20 53.5-56.8 53.5h-41.9V79.1zm15.4 92.4h24.5c34.9 0 43.6-25.2 43.6-38.8 0-20-13.4-38.9-43.2-38.9h-24.9v77.7z" />
    </svg>
  );
}

const currentYear = new Date().getFullYear();

const channels = [
  {
    number: "01",
    label: "DIRECT EMAIL",
    title: "Send an Email",
    description: "For project proposals, business inquiries and collaboration requests.",
    value: "devak9391@gmail.com",
    href: "mailto:devak9391@gmail.com",
    ariaLabel: "Email Cognolynx directly at devak9391@gmail.com",
    icon: Mail,
    external: false,
    rel: "me",
  },
  {
    number: "02",
    label: "FOUNDER LINKEDIN",
    title: "Devakumar A",
    description: "Founder & Chief Executive Officer. Connect for executive partnerships.",
    value: "linkedin.com/in/devakumar-a",
    href: "https://www.linkedin.com/in/devakumar-a-129561305/",
    ariaLabel: "Devakumar A LinkedIn profile",
    icon: LinkedinIcon,
    external: true,
    rel: "me noopener",
  },
  {
    number: "03",
    label: "FOUNDER GITHUB",
    title: "GitHub Repository",
    description: "Explore open-source engineering, code contributions and technical work.",
    value: "github.com/Devakumar-A",
    href: "https://github.com/Devakumar-A",
    ariaLabel: "Devakumar A GitHub profile",
    icon: GithubIcon,
    external: true,
    rel: "me noopener",
  },
  {
    number: "04",
    label: "RESEARCH / ORCID",
    title: "ORCID Record",
    description: "Verified academic and researcher persistent identifier.",
    value: "orcid.org/0009-0003-8934-6744",
    href: "https://orcid.org/0009-0003-8934-6744",
    ariaLabel: "Devakumar A ORCID profile",
    icon: OrcidIcon,
    external: true,
    rel: "me noopener",
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

const channelListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const channelItemVariants = {
  hidden: { opacity: 0, y: 24 },
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
 * Splits strings into individual words with in-view entrance animation.
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
      className={`contact-words-container ${className}`}
      variants={createContainerVariants(delay, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="contact-word-wrapper">
            <motion.span className="contact-word" variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

export default function ContactPage() {
  return (
    <div className="contact-page">
      <SEO {...seoData["/contact"]} />
      {/* ───────────────── HERO ───────────────── */}
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-hero-grid" aria-hidden="true" />
        <div className="contact-hero-orb contact-orb-one" aria-hidden="true" />
        <div className="contact-hero-orb contact-orb-two" aria-hidden="true" />

        <div className="contact-hero-content">
          <motion.div
            className="contact-eyebrow"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="contact-eyebrow-dot" />
            <AnimatedWords text="GET IN TOUCH" delay={0.2} stagger={0.06} />
          </motion.div>

          <h1 className="contact-title">
            <span>
              <AnimatedWords text="Start a" delay={0.25} stagger={0.05} />
            </span>
            <AnimatedWords text="conversation" delay={0.35} stagger={0.05} />
            <em>
              <AnimatedWords text="with Cognolynx." delay={0.45} stagger={0.05} />
            </em>
          </h1>

          <p className="contact-intro">
            <AnimatedWords
              text="Have a project in mind, need technical architecture guidance, or want to discuss custom software development? Reach out through any of our direct channels."
              delay={0.6}
              stagger={0.02}
            />
          </p>

          <motion.div
            className="contact-hero-line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="contact-hero-divider" aria-hidden="true" />
            <p>
              <AnimatedWords text="COMMUNICATION CHANNELS" delay={0.9} stagger={0.05} />
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ───────────────── CHANNELS ───────────────── */}
      <motion.section
        className="contact-channels"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="contact-section-heading">
          <span className="contact-section-index">
            <AnimatedWords text="01 / REACH OUT" delay={0.1} />
          </span>

          <h2>
            <AnimatedWords text="Direct channels." delay={0.15} />
            <br />
            <span>
              <AnimatedWords text="Fast response." delay={0.25} />
            </span>
          </h2>

          <p>
            <AnimatedWords
              text="We respond to all business inquiries and technical requests within 24 business hours."
              delay={0.3}
              stagger={0.02}
            />
          </p>
        </div>

        <motion.div
          className="contact-channel-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={channelListVariants}
        >
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <motion.a
                key={channel.number}
                href={channel.href}
                className="contact-channel"
                aria-label={channel.ariaLabel || channel.title}
                target={channel.external ? "_blank" : undefined}
                rel={channel.rel || (channel.external ? "noopener noreferrer" : undefined)}
                variants={channelItemVariants}
              >
                <div className="contact-channel-top">
                  <span className="contact-channel-number">
                    {channel.number}
                  </span>
                  <span className="contact-channel-label">
                    <AnimatedWords text={channel.label} delay={0.1} />
                  </span>
                </div>

                <div className="contact-channel-main">
                  <div className="contact-channel-icon">
                    <Icon size={24} />
                  </div>

                  <div className="contact-channel-copy">
                    <h3>
                      <AnimatedWords text={channel.title} delay={0.15} />
                    </h3>
                    <p>
                      <AnimatedWords
                        text={channel.description}
                        delay={0.2}
                        stagger={0.018}
                      />
                    </p>
                    <span className="contact-channel-value">
                      {channel.value}
                    </span>
                  </div>

                  <div className="contact-channel-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ───────────────── PROJECT CTA ───────────────── */}
      <motion.section
        className="contact-project"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className="contact-project-grid" aria-hidden="true" />

        <div className="contact-project-inner">
          <span className="contact-project-label">
            <AnimatedWords text="START A PROJECT" delay={0.1} />
          </span>

          <h2>
            <AnimatedWords text="Have something" delay={0.15} />
            <span>
              <AnimatedWords text="worth building?" delay={0.25} />
            </span>
          </h2>

          <p>
            <AnimatedWords
              text="Share your goals and requirements. We will analyze the scope and help shape the right technological solution."
              delay={0.3}
              stagger={0.02}
            />
          </p>

          <ContactForm />
        </div>
      </motion.section>

      {/* ───────────────── CLOSING NOTE ───────────────── */}
      <motion.div
        className="contact-closing"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="contact-closing-line" />
        <p>
          © {currentYear} COGNOLYNX — ALL COMMUNICATIONS ARE TREATED UNDER
          STRICT CONFIDENTIALITY
        </p>
      </motion.div>

      <Footer />
    </div>
  );
}
