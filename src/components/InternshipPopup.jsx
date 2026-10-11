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

  // Accessibility & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement;

    requestAnimationFrame(() => {
      cardRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
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

  if (!isOpen) return null;

  return (
    <div
      ref={cardRef}
      className="cg-internship-popup"
      role="dialog"
      aria-labelledby="cg-popup-title"
      aria-describedby="cg-popup-desc"
      aria-modal="false"
      tabIndex={-1}
    >
      {/* Top Header: Badge + Close button */}
      <div className="cg-popup-header">
        <div className="cg-popup-badge">
          <span className="cg-popup-badge-dot" aria-hidden="true" />
          <span>Internships open</span>
        </div>

        <button
          type="button"
          className="cg-popup-close-btn"
          onClick={handleClose}
          aria-label="Close internship popup"
        >
          <svg
            width="17"
            height="17"
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

      {/* Copy */}
      <h2 id="cg-popup-title" className="cg-popup-title">
        Build real products. Start your career here.
      </h2>

      <p id="cg-popup-desc" className="cg-popup-desc">
        Join Cognolynx as an intern and work on real software, design and digital
        projects with an engineering team that ships.
      </p>

      {/* Actions */}
      <div className="cg-popup-actions">
        <Link
          to="/careers/apply"
          className="cg-popup-primary-btn"
          onClick={() => {
            markPopupSeen();
            setIsOpen(false);
          }}
          aria-label="Apply for Internship"
        >
          Apply for Internship →
        </Link>

        <button
          type="button"
          className="cg-popup-secondary-btn"
          onClick={handleClose}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
