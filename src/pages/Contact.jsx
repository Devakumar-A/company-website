import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
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

const currentYear = new Date().getFullYear();

const channels = [
  {
    number: "01",
    label: "EMAIL",
    title: "Send an Email",
    description: "For project proposals, business inquiries and collaboration requests.",
    value: "contact@cognolynx.com",
    href: "mailto:contact@cognolynx.com",
    icon: Mail,
    external: false,
  },
  {
    number: "02",
    label: "LINKEDIN",
    title: "Connect on LinkedIn",
    description: "Follow company milestones, official updates and industry perspectives.",
    value: "linkedin.com/company/133397624",
    href: "https://www.linkedin.com/company/133397624/",
    icon: LinkedinIcon,
    external: true,
  },
  {
    number: "03",
    label: "LOCATION",
    title: "Headquarters",
    description: "Built with purpose in Puducherry, India. Delivering technology solutions globally.",
    value: "Puducherry, India 🇮🇳",
    href: "https://maps.google.com/?q=Puducherry,India",
    icon: MapPin,
    external: true,
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
            <span />
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
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
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

          <motion.a
            href="mailto:contact@cognolynx.com"
            className="contact-project-button"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>
              <AnimatedWords text="Send Us a Proposal" delay={0.5} />
            </span>
            <ArrowUpRight size={17} />
          </motion.a>
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
