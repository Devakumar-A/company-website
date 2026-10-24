import React, {
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  Children,
  cloneElement,
} from "react";
import "../styles/ThreeDBendCarousel.css";

/**
 * BendCarouselItem
 * Renders an individual 3D curved item forming part of a continuous cylindrical ribbon.
 * Direct DOM refs are used so RAF updates transforms without React render overhead.
 */
export function BendCarouselItem({
  children,
  className = "",
  style = {},
  as: Component = "div",
  ...rest
}) {
  const isAnchor = Boolean(rest.to || rest.href || Component === "a");

  return (
    <Component
      className={`bend-carousel-item ${className}`}
      style={style}
      {...(!isAnchor ? { role: "group", "aria-roledescription": "slide" } : {})}
      {...rest}
    >
      {/* Subtle dynamic glass sheen moving with 3D rotation */}
      <div className="bend-card-glare" aria-hidden="true" />

      {/* Card Content */}
      <div className="bend-card-inner">{children}</div>
    </Component>
  );
}

/**
 * Positive modulo helper
 */
function wrapIndex(val, n) {
  return ((val % n) + n) % n;
}

/**
 * ThreeDBendCarousel
 * High-performance 3D curved cylinder/ribbon carousel.
 * Continuous RAF interpolation, smooth momentum, natural pointer drag,
 * non-hijacking wheel gestures, seamless circular infinite loop,
 * 5-second auto-advance with smart pause, and mobile vertical scroll preservation.
 */
export const ThreeDBendCarousel = forwardRef(function ThreeDBendCarousel(
  {
    children,
    initialIndex = 0,
    onIndexChange,
    className = "",
    ariaLabel = "3D Solutions Carousel",
  },
  ref
) {
  const items = Children.toArray(children);
  const itemCount = items.length;

  // DOM node references for 120fps direct transform updates
  const stageRef = useRef(null);
  const cardElementsRef = useRef([]);
  const glareElementsRef = useRef([]);
  const containerRef = useRef(null);

  // Animation physics state (kept in refs to avoid React re-rendering per frame)
  const currentPosition = useRef(initialIndex);
  const targetPosition = useRef(initialIndex);
  const isDragging = useRef(false);
  const isGestureActive = useRef(false);
  const isHorizontalDrag = useRef(false);
  const dragMovedRef = useRef(false);
  const dragStart = useRef({
    x: 0,
    y: 0,
    lastX: 0,
    time: 0,
    velocity: 0,
  });
  const animFrame = useRef(null);
  const lastActiveIndexRef = useRef(initialIndex);
  const onIndexChangeRef = useRef(onIndexChange);
  const wheelSnapTimeout = useRef(null);
  const requestTickRef = useRef(null);

  // Autoplay and interaction state refs
  const autoplayTimerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isFocusedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const isTabVisibleRef = useRef(typeof document !== "undefined" ? !document.hidden : true);
  const isReducedMotionRef = useRef(false);

  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

  // Autoplay condition checker
  const canAutoplay = useCallback(() => {
    return (
      !isHoveredRef.current &&
      !isFocusedRef.current &&
      !isDragging.current &&
      isVisibleRef.current &&
      isTabVisibleRef.current &&
      !isReducedMotionRef.current
    );
  }, []);

  // Reset 5s autoplay interval so it never advances right after a user interaction
  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      if (canAutoplay()) {
        targetPosition.current = Math.round(targetPosition.current) + 1;
        requestTickRef.current?.();
      }
    }, 5000);
  }, [canAutoplay]);

  // Responsive cylindrical configuration
  const getConfig = useCallback(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (width < 480) {
      // Mobile portrait tuning (centered card ~270-300px, subtle side peek, smooth cylindrical curve)
      return {
        bendAngle: 30,
        radius: 480,
        zExtra: 25,
        minScale: 0.8,
        maxScale: 1.05,
        scaleStep: 0.12,
        minOpacity: 0.45,
        opacityStep: 0.28,
        cardSpacing: 240,
      };
    }
    if (width < 900) {
      // Tablet
      return {
        bendAngle: 28,
        radius: 580,
        zExtra: 32,
        minScale: 0.76,
        maxScale: 1.06,
        scaleStep: 0.14,
        minOpacity: 0.45,
        opacityStep: 0.26,
        cardSpacing: 280,
      };
    }
    // Desktop
    return {
      bendAngle: 28,
      radius: 680,
      zExtra: 40,
      minScale: 0.75,
      maxScale: 1.06,
      scaleStep: 0.15,
      minOpacity: 0.45,
      opacityStep: 0.25,
      cardSpacing: 330,
    };
  }, []);

  const configRef = useRef(getConfig());

  useEffect(() => {
    const handleResize = () => {
      configRef.current = getConfig();
      requestTickRef.current?.();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [getConfig]);

  // Smooth goTo card using shortest circular distance along circular ring
  const goToCard = useCallback(
    (index) => {
      const current = currentPosition.current;
      const currentNorm = wrapIndex(Math.round(current), itemCount);
      let delta = index - currentNorm;

      // Shortest path along circular ring: no reverse-spin across all cards
      if (delta > itemCount / 2) delta -= itemCount;
      if (delta < -itemCount / 2) delta += itemCount;

      targetPosition.current = Math.round(current) + delta;
      resetAutoplayTimer();
      requestTickRef.current?.();
    },
    [itemCount, resetAutoplayTimer]
  );

  // Expose imperative API for external controls
  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        targetPosition.current = Math.round(targetPosition.current) + 1;
        resetAutoplayTimer();
        requestTickRef.current?.();
      },
      prev: () => {
        targetPosition.current = Math.round(targetPosition.current) - 1;
        resetAutoplayTimer();
        requestTickRef.current?.();
      },
      goTo: (idx) => {
        goToCard(idx);
      },
      resetAutoplay: () => {
        resetAutoplayTimer();
      },
    }),
    [goToCard, resetAutoplayTimer]
  );

  // Main 60fps/120fps RAF physics loop & visibility observer
  useEffect(() => {
    if (stageRef.current) {
      cardElementsRef.current = Array.from(
        stageRef.current.querySelectorAll(":scope > .bend-carousel-item")
      );
      glareElementsRef.current = cardElementsRef.current.map((card) =>
        card.querySelector(".bend-card-glare")
      );
    }

    const motionQuery =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    isReducedMotionRef.current = motionQuery ? motionQuery.matches : false;

    const handleMotionChange = (e) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches && autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      } else {
        resetAutoplayTimer();
      }
    };
    motionQuery?.addEventListener?.("change", handleMotionChange);

    const damping = isReducedMotionRef.current ? 0.35 : 0.095;

    let isRunning = false;
    let needsUpdate = true;

    const tick = () => {
      if (!isVisibleRef.current) {
        isRunning = false;
        animFrame.current = null;
        return;
      }

      // Smooth interpolation: currentPosition += (targetPosition - currentPosition) * damping
      const current = currentPosition.current;
      const target = targetPosition.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0002) {
        currentPosition.current += diff * damping;
        needsUpdate = true;
      } else {
        if (current !== target) {
          currentPosition.current = target;
          needsUpdate = true;
        } else {
          needsUpdate = false;
        }
      }

      const pos = currentPosition.current;
      const cfg = configRef.current;

      // Update 3D cylindrical transform on each card DOM element
      for (let i = 0; i < itemCount; i++) {
        const cardEl = cardElementsRef.current[i];
        if (!cardEl) continue;

        // Continuous modular offset along circular ring
        let offset = (i - wrapIndex(pos, itemCount) + itemCount) % itemCount;
        if (offset > itemCount / 2) offset -= itemCount;

        const absOffset = Math.abs(offset);

        // Cylindrical 3D coordinate calculation
        const theta = offset * cfg.bendAngle; // degrees
        const rad = (theta * Math.PI) / 180;
        const x = cfg.radius * Math.sin(rad);
        const z = cfg.radius * (Math.cos(rad) - 1) - absOffset * cfg.zExtra;
        const rotateY = -theta;
        const scale = Math.max(cfg.minScale, cfg.maxScale - absOffset * cfg.scaleStep);
        const opacity = Math.max(cfg.minOpacity, 1 - absOffset * cfg.opacityStep);
        const zIndex = Math.round(120 - absOffset * 15);

        // Contrast & brightness: active center card is sharp & full saturation
        const brightness = absOffset < 0.25 ? 100 : Math.max(78, Math.round(100 - absOffset * 11));
        const grayscale = absOffset < 0.25 ? 0 : Math.min(100, Math.round(absOffset * 55));

        cardEl.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        cardEl.style.opacity = opacity;
        cardEl.style.zIndex = zIndex;
        cardEl.style.filter = `grayscale(${grayscale}%) brightness(${brightness}%)`;

        // Active center class toggle
        if (absOffset < 0.35) {
          if (!cardEl.classList.contains("bend-item-active")) {
            cardEl.classList.add("bend-item-active");
            cardEl.classList.remove("bend-item-inactive");
            cardEl.setAttribute("aria-hidden", "false");
          }
        } else {
          if (!cardEl.classList.contains("bend-item-inactive")) {
            cardEl.classList.add("bend-item-inactive");
            cardEl.classList.remove("bend-item-active");
            cardEl.setAttribute("aria-hidden", "true");
          }
        }

        // Dynamic subtle glass sheen reflection
        const glareEl = glareElementsRef.current[i];
        if (glareEl) {
          const glareAngle = 115 + offset * 22;
          const glareOpacity = absOffset < 0.25 ? 0.22 : Math.max(0.04, 0.18 - absOffset * 0.07);
          glareEl.style.opacity = glareOpacity;
          glareEl.style.background = `linear-gradient(${glareAngle}deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 80%)`;
        }
      }

      // Check active card index and notify parent only when center changes
      const activeIdx = wrapIndex(Math.round(pos), itemCount);
      if (activeIdx !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = activeIdx;
        if (onIndexChangeRef.current) {
          onIndexChangeRef.current(activeIdx);
        }
      }

      if (needsUpdate) {
        animFrame.current = requestAnimationFrame(tick);
      } else {
        isRunning = false;
        animFrame.current = null;
        // Normalize stored positions while at rest so numbers stay bounded in [0, itemCount - 1]
        // This has ZERO visual difference because wrapIndex(norm) === wrapIndex(pos)
        const norm = wrapIndex(Math.round(currentPosition.current), itemCount);
        currentPosition.current = norm;
        targetPosition.current = norm;
      }
    };

    const requestTick = () => {
      needsUpdate = true;
      if (isRunning || !isVisibleRef.current) return;
      isRunning = true;
      animFrame.current = requestAnimationFrame(tick);
    };
    requestTickRef.current = requestTick;

    const stopLoop = () => {
      isRunning = false;
      if (animFrame.current) {
        cancelAnimationFrame(animFrame.current);
        animFrame.current = null;
      }
    };

    // IntersectionObserver: pauses rAF loop and autoplay when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          requestTick();
          if (!wasVisible) {
            resetAutoplayTimer();
          }
        } else {
          stopLoop();
          if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
        }
      },
      { rootMargin: "200px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Tab visibility handling: pause when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      isTabVisibleRef.current = !document.hidden;
      if (isTabVisibleRef.current && isVisibleRef.current) {
        resetAutoplayTimer();
        requestTick();
      } else {
        if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery?.removeEventListener?.("change", handleMotionChange);
      stopLoop();
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      requestTickRef.current = null;
    };
  }, [itemCount, resetAutoplayTimer]);

  // Wheel Handling: VERTICAL SCROLL NEVER HIJACKED.
  // Wheel/trackpad with vertical intent (|deltaY| >= |deltaX|) scrolls the page normally.
  // Only horizontal intent (|deltaX| > |deltaY|) moves the cards.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelAcc = 0;

    const onWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // 1. Vertical intent: let page scroll naturally!
      // NEVER preventDefault, NEVER mutate targetPosition.
      if (absY >= absX) {
        return;
      }

      // 2. Horizontal intent: trackpad horizontal swipe or shift+wheel
      if (absX < 2) return;

      // Prevent horizontal browser page navigation / back-swipe
      if (e.cancelable) {
        e.preventDefault();
      }

      resetAutoplayTimer();

      const sensitivity = 0.0018;
      targetPosition.current += e.deltaX * sensitivity;
      wheelAcc += e.deltaX;
      requestTickRef.current?.();

      if (wheelSnapTimeout.current) clearTimeout(wheelSnapTimeout.current);
      wheelSnapTimeout.current = setTimeout(() => {
        if (Math.abs(wheelAcc) > 80) {
          const dir = wheelAcc > 0 ? 1 : -1;
          targetPosition.current = Math.round(targetPosition.current + dir * 0.35);
        } else {
          targetPosition.current = Math.round(targetPosition.current);
        }
        wheelAcc = 0;
        requestTickRef.current?.();
      }, 160);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelSnapTimeout.current) clearTimeout(wheelSnapTimeout.current);
    };
  }, [resetAutoplayTimer]);

  // Pointer Event Handlers (Desktop Mouse Drag & Mobile Touch Swipe)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    isDragging.current = true;
    isGestureActive.current = true;
    isHorizontalDrag.current = false;
    dragMovedRef.current = false;

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      lastX: e.clientX,
      time: performance.now(),
      velocity: 0,
    };

    resetAutoplayTimer();
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - dragStart.current.lastX;
    const totalDeltaX = Math.abs(currentX - dragStart.current.x);
    const totalDeltaY = Math.abs(currentY - dragStart.current.y);

    // Suppress card link click only when pointer moved more than ~6px
    if (totalDeltaX > 6 || totalDeltaY > 6) {
      dragMovedRef.current = true;
    }

    // Direction lock: preserve normal vertical page scroll on touch
    if (!isHorizontalDrag.current) {
      if (totalDeltaY > 8 && totalDeltaY > totalDeltaX) {
        // User is scrolling vertically: let browser scroll naturally
        isDragging.current = false;
        isGestureActive.current = false;
        return;
      }
      if (totalDeltaX > 8 && totalDeltaX >= totalDeltaY) {
        // User is swiping horizontally: capture pointer
        isHorizontalDrag.current = true;
        if (e.currentTarget.setPointerCapture) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // Fallback
          }
        }
      } else {
        return;
      }
    }

    dragStart.current.lastX = currentX;

    const now = performance.now();
    const dt = Math.max(1, now - dragStart.current.time);
    dragStart.current.time = now;
    dragStart.current.velocity = deltaX / dt;

    // Convert pixel drag to target position offset
    const spacing = configRef.current.cardSpacing;
    targetPosition.current -= deltaX / spacing;
    resetAutoplayTimer();
    requestTickRef.current?.();
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current && !isGestureActive.current) return;
    isDragging.current = false;
    resetAutoplayTimer();

    if (isHorizontalDrag.current) {
      // Releasing swipe continues with momentum, then smoothly snaps
      const v = dragStart.current.velocity;
      const momentum = Math.max(-1.8, Math.min(1.8, -v * 0.42));
      targetPosition.current = Math.round(targetPosition.current + momentum);
    } else {
      targetPosition.current = Math.round(targetPosition.current);
    }

    isGestureActive.current = false;
    isHorizontalDrag.current = false;
    requestTickRef.current?.();

    if (e?.currentTarget?.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }
  };

  // Intercept and suppress card link navigation only if the user dragged
  const handleClickCapture = (e) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setTimeout(() => {
        dragMovedRef.current = false;
      }, 50);
    }
  };

  // Click on side peek cards brings them smoothly into focus
  const handleStageClick = (e) => {
    if (dragMovedRef.current) return;
    const cardEl = e.target.closest("[data-bend-index]");
    if (cardEl && cardEl.classList.contains("bend-item-inactive")) {
      e.preventDefault();
      const idx = parseInt(cardEl.getAttribute("data-bend-index"), 10);
      if (!Number.isNaN(idx)) {
        goToCard(idx);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetPosition.current = Math.round(targetPosition.current) + 1;
      resetAutoplayTimer();
      requestTickRef.current?.();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetPosition.current = Math.round(targetPosition.current) - 1;
      resetAutoplayTimer();
      requestTickRef.current?.();
    } else if (e.key === "Home") {
      e.preventDefault();
      goToCard(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goToCard(itemCount - 1);
    }
  };

  // Hover pause handling
  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    resetAutoplayTimer();
  };

  // Focus within pause handling
  const handleFocus = () => {
    isFocusedRef.current = true;
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      isFocusedRef.current = false;
      resetAutoplayTimer();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`three-d-bend-carousel ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="bend-carousel-viewport">
        <div
          ref={stageRef}
          className="bend-carousel-stage"
          onClickCapture={handleClickCapture}
          onClick={handleStageClick}
        >
          {items.map((child, index) =>
            cloneElement(child, {
              key: child.key || index,
              "data-bend-index": index,
            })
          )}
        </div>
      </div>
    </div>
  );
});

export default ThreeDBendCarousel;
