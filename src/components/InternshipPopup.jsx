import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/InternshipPopup.css";

const STORAGE_KEY = "cg_internship_popup_v1";
let memoryFallbackSeen = false;

function hasSeenPopup() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    }
  } catch {
    // Storage restricted or unavailable
  }
  return memoryFallbackSeen;
}

function markPopupSeen() {
  memoryFallbackSeen = true;
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, "1");
    }
  } catch {
    // Storage restricted or unavailable
  }
}

export default function InternshipPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);
  const scrimRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Trigger once when About section scrolls into view (~35% visible) after ~600ms
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Strict route gating: homepage only
    if (window.location.pathname !== "/") return;

    if (hasSeenPopup()) return;

    const aboutEl = document.getElementById("about");
    if (!aboutEl) return;

    let delayTimer = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          observer.disconnect();

          delayTimer = setTimeout(() => {
            // Verify current route is still homepage and not careers/apply
            if (window.location.pathname === "/" && !hasSeenPopup()) {
              markPopupSeen();
              setIsOpen(true);
            }
          }, 600);
        }
      },
      {
        threshold: [0.35],
      }
    );

    observer.observe(aboutEl);

    return () => {
      observer.disconnect();
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  // Background scroll lock & Focus trap while open
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element for restoration on close
    previousActiveElement.current = document.activeElement;

    // Scroll lock background
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the card without scrolling page
    requestAnimationFrame(() => {
      cardRef.current?.focus({ preventScroll: true });
    });

    // Keydown handler: Escape to close + Tab key focus trap
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
  }, [isOpen]);

  const handleClose = () => {
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
  };

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
        {/* Top bar: Brand + Kicker + Close button */}
        <div className="cg-popup-top-bar">
          <div className="cg-popup-brand-row">
            <img
              src="/assets/logo.webp"
              alt=""
              className="cg-popup-logo"
              width="18"
              height="18"
              aria-hidden="true"
            />
            <span className="cg-popup-kicker">
              COGNOLYNX INTERNSHIP PROGRAM
            </span>
          </div>

          <button
            type="button"
            className="cg-popup-close-btn"
            onClick={handleClose}
            aria-label="Close dialog"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Big headline */}
        <h2 id="cg-popup-title" className="cg-popup-headline">
          <span>Internships are open.</span>
          <span className="cg-popup-headline-sub">And they're free.</span>
        </h2>

        {/* Bold "FREE" centerpiece */}
        <div className="cg-popup-free-wrap" aria-hidden="true">
          <span className="cg-popup-free-text">FREE</span>
        </div>

        {/* Short body */}
        <p id="cg-popup-desc" className="cg-popup-body">
          Learn by working on real software, design and digital projects with the
          Cognolynx team.
        </p>

        {/* Urgency */}
        <p className="cg-popup-urgency">Register soon.</p>

        {/* Actions */}
        <div className="cg-popup-actions">
          <Link
            to="/careers/apply"
            className="cg-popup-cta-btn"
            onClick={() => {
              markPopupSeen();
              setIsOpen(false);
            }}
            aria-label="Register for Free"
          >
            Register for Free →
          </Link>

          <button
            type="button"
            className="cg-popup-secondary-link"
            onClick={handleClose}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
