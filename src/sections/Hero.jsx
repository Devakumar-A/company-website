import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import "../styles/Hero.css";

export default function Hero() {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    if (motionQuery?.addEventListener) {
      motionQuery.addEventListener("change", handleMotionChange);
    } else if (motionQuery?.addListener) {
      motionQuery.addListener(handleMotionChange);
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prev) => (prev !== mobile ? mobile : prev));
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const heroEl = document.getElementById("hero");
    if (!heroEl) return () => window.removeEventListener("resize", handleResize);

    const playVideo = () => {
      if (videoRef.current && !prefersReducedMotion) {
        videoRef.current.muted = true;
        videoRef.current.defaultMuted = true;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            // Autoplay blocked by browser policy (e.g. low-power mode)
            // First-frame poster remains seamlessly visible
            console.warn("Hero video autoplay status:", err?.name);
          });
        }
      }
    };

    if (!prefersReducedMotion) {
      playVideo();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (videoRef.current) {
          if (entry.isIntersecting && !prefersReducedMotion) {
            playVideo();
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(heroEl);

    // Pause when tab is hidden to eliminate background CPU/GPU drain
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (videoRef.current) videoRef.current.pause();
      } else {
        if (heroEl.getBoundingClientRect().bottom > 0 && !prefersReducedMotion) {
          playVideo();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (motionQuery?.removeEventListener) {
        motionQuery.removeEventListener("change", handleMotionChange);
      } else if (motionQuery?.removeListener) {
        motionQuery.removeListener(handleMotionChange);
      }
      observer.disconnect();
    };
  }, [isMobile, prefersReducedMotion]);

  const handleVideoPlaying = () => {
    setVideoPlaying(true);
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

  const posterSrc = isMobile
    ? "/assets/hero-poster-mobile.webp"
    : "/assets/hero-poster-desktop.webp";

  return (
    <section id="hero" className="hero-section" aria-label="Cognolynx Hero">
      {/* ====================================================================
          FULL-BLEED BACKGROUND VIDEO & IDENTICAL FIRST-FRAME POSTER
          - Preloaded identical first-frame WebP poster (< 30 KB) paints instantly
          - Single active video mounted for current viewport: hidden video is NOT downloaded
          - Fast WebM (VP9) with MP4 (faststart, no audio) fallback
          - Fade-in on playing event: zero black screen, zero visual jump
          - If autoplay blocked or reduced-motion requested: static first frame stays visible
          ==================================================================== */}
      <div className="hero-video-container" aria-hidden="true">
        <picture className="hero-poster-picture">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/hero-poster-mobile.webp"
          />
          <img
            src="/assets/hero-poster-desktop.webp"
            alt=""
            className="hero-poster-image"
            fetchPriority="high"
            decoding="async"
            width={isMobile ? 576 : 1280}
            height={isMobile ? 1024 : 720}
          />
        </picture>

        {!prefersReducedMotion && (
          <video
            key={isMobile ? "mobile-hero-video" : "desktop-hero-video"}
            ref={videoRef}
            className={`hero-video ${videoPlaying ? "is-playing" : ""}`}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={handleVideoPlaying}
            disablePictureInPicture
            tabIndex={-1}
            width="100%"
            height="100%"
          >
            {isMobile ? (
              <>
                <source
                  src="/assets/background_video_company.webm"
                  type="video/webm"
                />
                <source
                  src="/assets/background_video_company.mp4"
                  type="video/mp4"
                />
              </>
            ) : (
              <>
                <source src="/assets/background_video.webm" type="video/webm" />
                <source src="/assets/background_video.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}
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