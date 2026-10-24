import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";

export default function Hero() {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion: if reduced motion is requested, do not autoplay
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const playActive = () => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const activeVideo = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
      const otherVideo = isMobile ? desktopVideoRef.current : mobileVideoRef.current;

      if (otherVideo) otherVideo.pause();
      if (activeVideo) {
        activeVideo.muted = true;
        activeVideo.defaultMuted = true;
        activeVideo.play().catch(() => {});
      }
    };

    playActive();

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;
        const isMobileScreen = typeof window !== "undefined" && window.innerWidth < 768;
        const targetVideo = isMobileScreen ? mobileVideoRef.current : desktopVideoRef.current;
        const otherVideo = isMobileScreen ? desktopVideoRef.current : mobileVideoRef.current;

        if (otherVideo) otherVideo.pause();
        if (targetVideo) {
          if (isVisible) {
            targetVideo.play().catch(() => {});
          } else {
            targetVideo.pause();
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const handleVideoReady = () => {
    setVideoLoaded(true);
  };

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

  return (
    <section id="hero" className="hero-section" aria-label="Cognolynx Hero">
      {/* ====================================================================
          FULL-BLEED BACKGROUND VIDEOS
          - Mobile: background_video_company.mp4
          - Desktop: background_video.mp4
          Played immediately on load with no static poster stutter/glitch.
          ==================================================================== */}
      <div className="hero-video-container" aria-hidden="true">
        {/* Desktop video (>= 768px) */}
        <video
          ref={desktopVideoRef}
          className={`hero-video hero-video-desktop ${videoLoaded ? "is-loaded" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          disablePictureInPicture
          tabIndex={-1}
          width="100%"
          height="100%"
        >
          <source src="/assets/background_video.mp4" type="video/mp4" />
        </video>

        {/* Mobile video (< 768px) */}
        <video
          ref={mobileVideoRef}
          className={`hero-video hero-video-mobile ${videoLoaded ? "is-loaded" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          disablePictureInPicture
          tabIndex={-1}
          width="100%"
          height="100%"
        >
          <source src="/assets/background_video_company.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ====================================================================
          SUBTLE GRADIENT OVERLAYS (READABILITY ONLY)
          ==================================================================== */}
      <div className="hero-overlay-top" aria-hidden="true" />
      <div className="hero-overlay-bottom" aria-hidden="true" />

      {/* ====================================================================
          HERO CONTENT (POSITIONED IN DARK NEGATIVE SPACE)
          ==================================================================== */}
      <div className="hero-content">
        {/* Headline: "BUILD WHAT'S NEXT." */}
        <h1 className="hero-headline">
          <span className="hero-headline-line">BUILD</span>
          <span className="hero-headline-line">
            WHAT&apos;S NEXT<span className="hero-headline-accent">.</span>
          </span>
        </h1>

        {/* Supporting Line */}
        <div className="hero-supporting-line">
          <span className="hero-supporting-item">Software</span>
          <span className="hero-dot" aria-hidden="true">·</span>
          <span className="hero-supporting-item">Digital Products</span>
          <span className="hero-dot" aria-hidden="true">·</span>
          <span className="hero-supporting-item">Technology</span>
        </div>

        {/* Call To Action */}
        <div className="hero-cta-wrapper">
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
        </div>
      </div>

      {/* ====================================================================
          BOTTOM SCROLL INDICATOR: SCROLL TO EXPLORE ↓
          Aria label matches visible text to satisfy WCAG 2.5.3 (Label in Name)
          ==================================================================== */}
      <button
        type="button"
        onClick={handleScrollToExplore}
        className="hero-scroll-indicator"
        aria-label="SCROLL TO EXPLORE about section"
      >
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-arrow" aria-hidden="true">↓</span>
      </button>
    </section>
  );
}