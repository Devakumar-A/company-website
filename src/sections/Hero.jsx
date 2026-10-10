import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";

export default function Hero() {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Ensure seamless, reliable muted playback across all browsers
  useEffect(() => {
    const playSafe = (videoEl) => {
      if (!videoEl) return;
      videoEl.muted = true;
      videoEl.defaultMuted = true;
      const playPromise = videoEl.play();
      if (playPromise !== undefined && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          // Autoplay fallback handling
        });
      }
    };

    playSafe(desktopVideoRef.current);
    playSafe(mobileVideoRef.current);

    // Keep Hero video playing naturally while visible / sliding, pause when completely off-screen
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;
        [desktopVideoRef.current, mobileVideoRef.current].forEach((v) => {
          if (!v) return;
          if (isVisible) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleScrollToExplore = (e) => {
    e.preventDefault();
    const target = document.getElementById("about");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  // Snappy, cinematic entrance animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="hero" className="hero-section" aria-label="Cognolynx Hero">
      {/* ====================================================================
          FULL-BLEED BACKGROUND VIDEOS
          - Mobile: background_video_company.mp4
          - Desktop: background_video.mp4
          ==================================================================== */}
      <div className="hero-video-container" aria-hidden="true">
        {/* Desktop full-bleed video */}
        <video
          ref={desktopVideoRef}
          className="hero-video hero-video-desktop"
          src="/assets/background_video.mp4"
          poster="/assets/hero-video-poster-desktop.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          width="100%"
          height="100%"
        />

        {/* Mobile full-bleed video */}
        <video
          ref={mobileVideoRef}
          className="hero-video hero-video-mobile"
          src="/assets/background_video_company.mp4"
          poster="/assets/hero-video-poster-mobile.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          width="100%"
          height="100%"
        />
      </div>

      {/* ====================================================================
          SUBTLE GRADIENT OVERLAYS (READABILITY ONLY)
          Minimal top & bottom gradient to blend with navbar and next section
          ==================================================================== */}
      <div className="hero-overlay-top" aria-hidden="true" />
      <div className="hero-overlay-bottom" aria-hidden="true" />

      {/* ====================================================================
          HERO CONTENT (POSITIONED IN DARK NEGATIVE SPACE)
          ==================================================================== */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Headline: "BUILD WHAT'S NEXT." */}
        <motion.h1 className="hero-headline" variants={itemVariants}>
          <span className="hero-headline-line">BUILD</span>
          <span className="hero-headline-line">
            WHAT&apos;S NEXT<span className="hero-headline-accent">.</span>
          </span>
        </motion.h1>

        {/* Supporting Line */}
        <motion.div className="hero-supporting-line" variants={itemVariants}>
          <span className="hero-supporting-item">Software</span>
          <span className="hero-dot" aria-hidden="true">·</span>
          <span className="hero-supporting-item">Digital Products</span>
          <span className="hero-dot" aria-hidden="true">·</span>
          <span className="hero-supporting-item">Technology</span>
        </motion.div>

        {/* Call To Action */}
        <motion.div className="hero-cta-wrapper" variants={itemVariants}>
          <a
            href="#contact"
            onClick={handleCtaClick}
            className="hero-cta-btn"
            aria-label="Start a Project with Cognolynx"
          >
            <span>Start a Project</span>
            <span className="hero-cta-arrow" aria-hidden="true">
              <ArrowRight size={17} strokeWidth={2.2} />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ====================================================================
          BOTTOM SCROLL INDICATOR: SCROLL TO EXPLORE ↓
          ==================================================================== */}
      <motion.button
        type="button"
        onClick={handleScrollToExplore}
        className="hero-scroll-indicator"
        aria-label="Scroll down to explore about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.3,
          duration: shouldReduceMotion ? 0.1 : 0.4,
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </motion.button>
    </section>
  );
}