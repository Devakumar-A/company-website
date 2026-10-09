import React, { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import "../styles/About.css";

export default function About() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Detect when About section enters the viewport
  const isInView = useInView(sectionRef, {
    amount: 0.25,
    once: false,
  });

  // Natural scroll parallax for subtle floating depth (zero scroll locking)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const logoParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-16, 16]
  );

  const contentParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [12, -12]
  );

  // Synchronized cinematic easing curve: fast entry, gentle approach, locked alignment
  const assembleEase = [0.16, 1, 0.3, 1];
  const duration = shouldReduceMotion ? 0.6 : 1.45;

  return (
    <section ref={sectionRef} id="about" className="about-section">
      {/* Ambient background grid & light glow */}
      <div className="about-bg" aria-hidden="true">
        <div className="about-grid" />
        <div className="about-ambient-glow" />
      </div>

      <div className="about-container">
        {/* =====================================================
            CINEMATIC LOGO ASSEMBLY CHAMBER
        ====================================================== */}
        <motion.div
          className="about-logo-chamber"
          style={{ y: logoParallaxY }}
        >
          {/* Ambient purple/blue halo behind the logo stage */}
          <div className="about-logo-halo" />

          {/* 1355x1161 Aspect-Ratio Logo Assembly Stage */}
          <div className="about-logo-stage">
            {/* 1. BLACK LOGO PIECE — Enters from left */}
            <motion.img
              src="/assets/logo-black.webp"
              alt="Cognolynx Black Shard"
              className="about-logo-piece about-piece-black"
              draggable="false"
              loading="lazy"
              decoding="async"
              width="800"
              height="685"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -95, y: -8, opacity: 0, filter: "blur(5px)" }
              }
              animate={
                isInView
                  ? { x: 0, y: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -95, y: -8, opacity: 0, filter: "blur(5px)" }
              }
              transition={{ duration, ease: assembleEase }}
            />

            {/* 2. PURPLE LOGO PIECE — Enters from right */}
            <motion.img
              src="/assets/logo-purple.webp"
              alt="Cognolynx Purple Shard"
              className="about-logo-piece about-piece-purple"
              draggable="false"
              loading="lazy"
              decoding="async"
              width="800"
              height="685"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 95, y: 8, opacity: 0, filter: "blur(5px)" }
              }
              animate={
                isInView
                  ? { x: 0, y: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 95, y: 8, opacity: 0, filter: "blur(5px)" }
              }
              transition={{ duration, ease: assembleEase }}
            />
          </div>
        </motion.div>

        {/* =====================================================
            SYNCHRONIZED CONVERGING FOREGROUND CONTENT
            Text halves enter from left and right and join in unison
        ====================================================== */}
        <motion.div
          className="about-content"
          style={{ y: contentParallaxY }}
        >
          {/* Eyebrow: "ABOUT" (Left) + "COGNOLYNX" (Right) */}
          <div className="about-eyebrow">
            <motion.span
              className="about-split-left about-eyebrow-left"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -45, opacity: 0, filter: "blur(4px)" }
              }
              animate={
                isInView
                  ? { x: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -45, opacity: 0, filter: "blur(4px)" }
              }
              transition={{ duration, ease: assembleEase }}
            >
              <span className="about-eyebrow-accent" />
              <span>ABOUT</span>
            </motion.span>
            {" "}
            <motion.span
              className="about-split-right about-eyebrow-right"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 45, opacity: 0, filter: "blur(4px)" }
              }
              animate={
                isInView
                  ? { x: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 45, opacity: 0, filter: "blur(4px)" }
              }
              transition={{ duration, ease: assembleEase }}
            >
              <span>COGNOLYNX</span>
            </motion.span>
          </div>

          {/* Core Headline: "We build technology" (Left) + "for what’s next." (Right) */}
          <h2 className="about-statement">
            <motion.span
              className="about-split-left about-statement-left"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -80, opacity: 0, filter: "blur(5px)" }
              }
              animate={
                isInView
                  ? { x: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: -80, opacity: 0, filter: "blur(5px)" }
              }
              transition={{ duration, ease: assembleEase }}
            >
              We build technology
            </motion.span>
            {" "}
            <motion.span
              className="about-split-right about-statement-right"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 80, opacity: 0, filter: "blur(5px)" }
              }
              animate={
                isInView
                  ? { x: 0, opacity: 1, filter: "blur(0px)" }
                  : shouldReduceMotion
                  ? { opacity: 0 }
                  : { x: 80, opacity: 0, filter: "blur(5px)" }
              }
              transition={{ duration, ease: assembleEase }}
            >
              for what&rsquo;s next.
            </motion.span>
          </h2>

          {/* Body Paragraph 1 */}
          <motion.p
            className="about-description"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.75,
              delay: 0.12,
              ease: assembleEase,
            }}
          >
            Cognolynx builds modern software, digital products, and technology solutions designed around real business needs. We focus on creating experiences that are useful, scalable, and built to evolve.
          </motion.p>

          {/* Body Paragraph 2 */}
          <motion.p
            className="about-description"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.75,
              delay: 0.22,
              ease: assembleEase,
            }}
          >
            From software and digital platforms to intelligent systems, we turn ideas and complex challenges into technology that works — with a focus on simplicity, performance, and long-term value.
          </motion.p>

          {/* Founder Belief Callout */}
          <motion.div
            className="about-founder-box"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 16 }
            }
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.75,
              delay: 0.32,
              ease: assembleEase,
            }}
          >
            <p className="about-founder-belief">
              <strong className="about-founder-name">Founded by Devakumar A</strong>, Cognolynx is built with a simple belief: technology should make businesses better, not more complicated.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
