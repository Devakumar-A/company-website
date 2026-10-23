import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/InternshipPopup.css";

const SESSION_KEY = "cg_internship_popup_session_v1";
let memoryFallbackSeen = false;

function hasSeenPopup() {
  try {
    if (typeof window !== "undefined") {
      // Allow manual query param override for testing (?popup=1)
      if (new URLSearchParams(window.location.search).get("popup") === "1") {
        return false;
      }
      if (window.sessionStorage) {
        return window.sessionStorage.getItem(SESSION_KEY) === "1";
      }
    }
  } catch {
    // Storage restricted or unavailable
  }
  return memoryFallbackSeen;
}

function markPopupSeen() {
  memoryFallbackSeen = true;
  try {
    if (typeof window !== "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem("cg_internship_popup_v1");
    }
  } catch {
    // Storage restricted or unavailable
  }
}

export default function InternshipPopup() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("popup") === "1";
    }
    return false;
  });
  const cardRef = useRef(null);
  const scrimRef = useRef(null);
  const previousActiveElement = useRef(null);

  const handleClose = useCallback(() => {
    markPopupSeen();
    setIsOpen(false);
    if (
      previousActiveElement.current &&
      typeof previousActiveElement.current.focus === "function"
    ) {
      try {
        previousActiveElement.current.focus({ preventScroll: true });
      } catch {
        // Element may no longer exist
      }
    }
  }, []);

  // Trigger when About section is scrolled into view (~30% visible) or safety timer
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Strict route gating: homepage only
    if (window.location.pathname !== "/") return;

    if (hasSeenPopup()) return;

    const aboutEl = document.getElementById("about");
    let delayTimer = null;
    let observer = null;

    if (aboutEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            observer.disconnect();

            delayTimer = setTimeout(() => {
              if (window.location.pathname === "/" && !hasSeenPopup()) {
                markPopupSeen();
                setIsOpen(true);
              }
            }, 500);
          }
        },
        { threshold: [0.3] }
      );

      observer.observe(aboutEl);
    }

    // Safety fallback: display after 7 seconds on homepage if user hasn't scrolled
    const safetyTimer = setTimeout(() => {
      if (window.location.pathname === "/" && !hasSeenPopup()) {
        markPopupSeen();
        setIsOpen(true);
      }
    }, 7000);

    return () => {
      if (observer) observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Background scroll lock & Focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      cardRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === "Tab") {
        if (!cardRef.current) return;
        const focusable = cardRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey) {
          if (
            document.activeElement === firstElement ||
            document.activeElement === cardRef.current
          ) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleScrimClick = (event) => {
    if (event.target === scrimRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={scrimRef}
      className="cg-popup-scrim"
      onClick={handleScrimClick}
      aria-hidden="false"
    >
      <div
        ref={cardRef}
        className="cg-popup-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cg-popup-title"
        aria-describedby="cg-popup-desc"
        tabIndex={-1}
      >
        {/* Top-Right Clean Minimalist 'X' Close Button */}
        <button
          type="button"
          className="cg-popup-close-btn"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Brand Row: Logo Icon + COGNOLYNX */}
        <div className="cg-popup-brand-row">
          <picture>
            <source srcSet="/assets/logo.webp" type="image/webp" />
            <img
              src="/assets/logo.png"
              alt="Cognolynx"
              className="cg-popup-logo"
              width="36"
              height="36"
              loading="eager"
              decoding="async"
              draggable="false"
            />
          </picture>
          <span className="cg-popup-brand-name">COGNOLYNX</span>
        </div>

        {/* Headline Row with Flanking Purple Celebration Sparks */}
        <div className="cg-popup-headline-wrap">
          {/* Left Spark Accents */}
          <svg
            className="cg-popup-spark cg-popup-spark-left"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            {/* Upper ray: angled ~45° from top-left to bottom-right */}
            <path
              d="M9 7L23 21"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Lower ray: gentle angle ~15° */}
            <path
              d="M5 25L21 30"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h2 id="cg-popup-title" className="cg-popup-headline">
            <span className="cg-popup-headline-top">We’re Hiring</span>
            <span className="cg-popup-headline-bottom">Interns</span>
          </h2>

          {/* Right Spark Accents */}
          <svg
            className="cg-popup-spark cg-popup-spark-right"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            aria-hidden="true"
          >
            {/* Upper ray: angled ~45° from top-right to bottom-left */}
            <path
              d="M27 7L13 21"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Lower ray: gentle angle ~15° */}
            <path
              d="M31 25L15 30"
              stroke="#8B5CF6"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Subtitle / Description */}
        <p id="cg-popup-desc" className="cg-popup-desc">
          Gain real-world experience, work on live projects,
          <br />
          and grow with our team.
        </p>

        {/* Primary CTA Button: Apply Now → */}
        <Link
          to="/careers/apply"
          className="cg-popup-cta-btn"
          onClick={() => {
            markPopupSeen();
            setIsOpen(false);
          }}
          aria-label="Apply Now for Internship"
        >
          <span>Apply Now</span>
          <svg
            className="cg-popup-cta-arrow"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
