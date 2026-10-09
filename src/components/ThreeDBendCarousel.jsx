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
  ...rest
}) {
  return (
    <div
      className={`bend-carousel-item ${className}`}
      style={style}
      role="group"
      aria-roledescription="slide"
      {...rest}
    >
      {/* Subtle dynamic glass sheen moving with 3D rotation */}
      <div className="bend-card-glare" aria-hidden="true" />

      {/* Card Content */}
      <div className="bend-card-inner">{children}</div>
    </div>
  );
}

/**
 * ThreeDBendCarousel
 * High-performance 3D curved cylinder/ribbon carousel.
 * Continuous RAF interpolation, smooth momentum, natural pointer drag,
 * mouse wheel, seamless infinite loop, and mobile vertical scroll preservation.
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

  useEffect(() => {
    onIndexChangeRef.current = onIndexChange;
  }, [onIndexChange]);

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
    };
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [getConfig]);

  // Smooth goTo card using shortest circular distance
  const goToCard = useCallback(
    (index) => {
      const current = currentPosition.current;
      const currentNorm = ((Math.round(current) % itemCount) + itemCount) % itemCount;
      let delta = index - currentNorm;

      // Shortest path along circular ring
      if (delta > itemCount / 2) delta -= itemCount;
      if (delta < -itemCount / 2) delta += itemCount;

      targetPosition.current = Math.round(current) + delta;
    },
    [itemCount]
  );

  // Expose imperative API for external controls
  useImperativeHandle(
    ref,
    () => ({
      next: () => {
        targetPosition.current = Math.round(targetPosition.current) + 1;
      },
      prev: () => {
        targetPosition.current = Math.round(targetPosition.current) - 1;
      },
      goTo: (idx) => {
        goToCard(idx);
      },
    }),
    [goToCard]
  );

  // Main 60fps/120fps RAF physics loop
  useEffect(() => {
    if (stageRef.current) {
      cardElementsRef.current = Array.from(
        stageRef.current.querySelectorAll(":scope > .bend-carousel-item")
      );
      glareElementsRef.current = cardElementsRef.current.map((card) =>
        card.querySelector(".bend-card-glare")
      );
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const damping = prefersReducedMotion ? 0.35 : 0.095;

    const tick = () => {
      // Smooth interpolation: currentPosition += (targetPosition - currentPosition) * damping
      const current = currentPosition.current;
      const target = targetPosition.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.0002) {
        currentPosition.current += diff * damping;
      } else if (current !== target) {
        currentPosition.current = target;
      }

      const pos = currentPosition.current;
      const cfg = configRef.current;

      // Update 3D cylindrical transform on each card DOM element
      for (let i = 0; i < itemCount; i++) {
        const cardEl = cardElementsRef.current[i];
        if (!cardEl) continue;

        // Continuous modular offset along circular ring
        let offset = (i - (pos % itemCount) + itemCount) % itemCount;
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

        // Contrast & brightness: active center card is sharp & full saturation, surrounding cards gently desaturate/dim into Z-depth
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
      const activeIdx = ((Math.round(pos) % itemCount) + itemCount) % itemCount;
      if (activeIdx !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = activeIdx;
        if (onIndexChangeRef.current) {
          onIndexChangeRef.current(activeIdx);
        }
      }

      animFrame.current = requestAnimationFrame(tick);
    };

    animFrame.current = requestAnimationFrame(tick);
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [itemCount]);

  // Mouse Wheel Handling (Only activates while pointer is over the carousel)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelAcc = 0;

    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 3) return;

      // Prevent whole page vertical jump while wheeling directly on carousel
      e.preventDefault();

      // Convert wheel delta into smooth target offset velocity
      const sensitivity = 0.0018;
      targetPosition.current += delta * sensitivity;
      wheelAcc += delta;

      // Debounce snapping to nearest card when wheel gesture ends
      if (wheelSnapTimeout.current) clearTimeout(wheelSnapTimeout.current);
      wheelSnapTimeout.current = setTimeout(() => {
        targetPosition.current = Math.round(targetPosition.current);
        wheelAcc = 0;
      }, 160);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelSnapTimeout.current) clearTimeout(wheelSnapTimeout.current);
    };
  }, []);

  // Pointer Event Handlers (Desktop Mouse Drag & Mobile Touch Swipe)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;

    isDragging.current = true;
    isGestureActive.current = true;
    isHorizontalDrag.current = false;

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      lastX: e.clientX,
      time: performance.now(),
      velocity: 0,
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const currentX = e.clientX;
    const currentY = e.clientY;
    const deltaX = currentX - dragStart.current.lastX;
    const totalDeltaX = Math.abs(currentX - dragStart.current.x);
    const totalDeltaY = Math.abs(currentY - dragStart.current.y);

    // Direction lock: preserve normal vertical page scroll on mobile
    if (!isHorizontalDrag.current) {
      if (totalDeltaY > 8 && totalDeltaY > totalDeltaX) {
        // User is scrolling the page vertically: let the browser scroll naturally
        isDragging.current = false;
        isGestureActive.current = false;
        return;
      }
      if (totalDeltaX > 8 && totalDeltaX >= totalDeltaY) {
        // User is swiping the carousel horizontally: capture pointer
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
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current && !isGestureActive.current) return;
    isDragging.current = false;

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

    if (e?.currentTarget?.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetPosition.current = Math.round(targetPosition.current) + 1;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetPosition.current = Math.round(targetPosition.current) - 1;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetPosition.current = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetPosition.current = itemCount - 1;
    }
  };

  const handleStageClick = (e) => {
    const cardEl = e.target.closest("[data-bend-index]");
    if (cardEl) {
      const idx = parseInt(cardEl.getAttribute("data-bend-index"), 10);
      if (!Number.isNaN(idx)) {
        goToCard(idx);
      }
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
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="bend-carousel-viewport">
        <div
          ref={stageRef}
          className="bend-carousel-stage"
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
