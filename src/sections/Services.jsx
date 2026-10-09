import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Services.css";

const services = [
  {
    id: 1,
    number: "01",
    title: "Software Development",
    short: "Custom software built around your business.",
    tags: ["Web Apps", "SaaS", "Business Software"],
    path: "/services/software-engineering/software-development",
  },
  {
    id: 2,
    number: "02",
    title: "Website Development",
    short: "Modern websites designed to convert visitors.",
    tags: ["Corporate", "Business", "Landing Pages"],
    path: "/services/web-digital/website-development",
  },
  {
    id: 3,
    number: "03",
    title: "Website Redesign",
    short: "Transform outdated websites into modern experiences.",
    tags: ["UI/UX", "Modernization", "Performance"],
  },
  {
    id: 4,
    number: "04",
    title: "Web Applications",
    short: "Scalable and interactive web applications.",
    tags: ["React", "Node.js", "Full Stack"],
    path: "/services/software-engineering/web-applications",
  },
  {
    id: 5,
    number: "05",
    title: "AI & Automation",
    short: "Automate repetitive work with intelligent systems.",
    tags: ["AI", "Automation", "Machine Learning"],
  },
  {
    id: 6,
    number: "06",
    title: "Mobile Applications",
    short: "Mobile experiences designed for modern users.",
    tags: ["Android", "iOS", "Cross Platform"],
  },
  {
    id: 7,
    number: "07",
    title: "Cloud & Technology",
    short: "Reliable infrastructure for growing products.",
    tags: ["Cloud", "Deployment", "Infrastructure"],
    path: "/services/software-engineering/cloud-solutions",
  },
  {
    id: 8,
    number: "08",
    title: "UI / UX Design",
    short: "Interfaces that feel simple, premium and intuitive.",
    tags: ["UX", "UI", "Prototyping"],
    path: "/services/design-brand/ui-ux-design",
  },
  {
    id: 9,
    number: "09",
    title: "Graphic Design",
    short: "Visual identities that make businesses recognizable.",
    tags: ["Creative", "Social Media", "Marketing"],
    path: "/services/design-brand/product-design",
  },
  {
    id: 10,
    number: "10",
    title: "Logo & Brand Design",
    short: "Build a visual identity people remember.",
    tags: ["Logo", "Branding", "Identity"],
    path: "/services/design-brand/brand-identity",
  },
  {
    id: 11,
    number: "11",
    title: "Meta Ads",
    short: "Performance campaigns built to generate leads.",
    tags: ["Facebook", "Instagram", "Lead Generation"],
    path: "/services/growth-marketing/performance-marketing",
  },
  {
    id: 12,
    number: "12",
    title: "Digital Marketing",
    short: "Grow your online presence with measurable strategies.",
    tags: ["SEO", "Ads", "Social Media"],
    path: "/services/growth-marketing/digital-marketing",
  },
  {
    id: 13,
    number: "13",
    title: "Video Editing",
    short: "Short-form and branded content that gets attention.",
    tags: ["Reels", "YouTube", "Promotional"],
    path: "/services/growth-marketing/content-marketing",
  },
  {
    id: 14,
    number: "14",
    title: "Business Analysis",
    short: "Turn business problems into practical solutions.",
    tags: ["Analysis", "Strategy", "Research"],
    path: "/services/software-engineering/business-software",
  },
  {
    id: 15,
    number: "15",
    title: "Business Solutions",
    short: "Technology and strategy working together.",
    tags: ["Consulting", "Systems", "Growth"],
    path: "/services/software-engineering",
  },
];

// 3 sets of the 15 services ensures seamless modulo wrap without any jumps
const marqueeItems = [...services, ...services, ...services];

export default function Services() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // Physics animation state stored in refs for 60/120fps direct DOM manipulation
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const baseSpeedRef = useRef(0.6); // Base speed in px/frame (normalized to 60fps)
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const animFrameIdRef = useRef(null);
  const lastActiveIndexRef = useRef(0);

  // Pointer & Gesture tracking state
  const gestureRef = useRef({
    isDown: false,
    isLocked: false,
    isVertical: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastTime: 0,
    totalMoved: 0,
    pointerId: null,
  });

  /*
   * Get single card width including CSS column gap
   */
  const getCardWidth = useCallback(() => {
    if (!trackRef.current) return 384;
    const card = trackRef.current.querySelector(".service-card");
    if (!card) return 384;
    const style = window.getComputedStyle(trackRef.current);
    const gap = parseFloat(style.columnGap || style.gap || "24");
    return card.offsetWidth + gap;
  }, []);

  /*
   * Main 60fps/120fps physics loop:
   * Combines continuous marquee auto-scrolling with user drag momentum,
   * gentle hover deceleration, and seamless modulo wrap.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let previousTime = performance.now();

    const tick = (currentTime) => {
      // Normalized delta time factor (1.0 at 60fps, ~0.5 at 120fps)
      const rawDelta = currentTime - previousTime;
      const dt = Math.min(32, Math.max(6, rawDelta)) / 16.667;
      previousTime = currentTime;

      const oneSetWidth = track.scrollWidth / 3;

      if (!isDraggingRef.current) {
        // Momentum decay when thrown by user swipe / drag
        if (Math.abs(velocityRef.current) > 0.08) {
          positionRef.current += velocityRef.current * dt;
          // Fluid friction deceleration
          velocityRef.current *= Math.pow(0.93, dt);
        } else {
          velocityRef.current = 0;
          // Smooth continuous marquee cruising
          // When hovered, slows down gently so cards are easily readable
          const speed = isHoveredRef.current
            ? baseSpeedRef.current * 0.2
            : baseSpeedRef.current;
          positionRef.current += speed * dt;
        }
      }

      // Seamless infinite wrap in both directions
      if (oneSetWidth > 0) {
        while (positionRef.current >= oneSetWidth) {
          positionRef.current -= oneSetWidth;
        }
        while (positionRef.current < 0) {
          positionRef.current += oneSetWidth;
        }
      }

      // Hardware-accelerated direct transform update
      track.style.transform = `translate3d(${-positionRef.current}px, 0, 0)`;

      // Sync active index for card highlight
      if (oneSetWidth > 0) {
        const cardWidth = getCardWidth();
        const currentCard =
          Math.floor((positionRef.current + cardWidth * 0.45) / cardWidth) %
          services.length;

        if (currentCard !== lastActiveIndexRef.current) {
          lastActiveIndexRef.current = currentCard;
          setActiveIndex(currentCard);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [getCardWidth]);

  /*
   * Pointer down: initiates gesture detection
   */
  const handlePointerDown = (e) => {
    // Only respond to primary mouse click or touch
    if (e.button !== undefined && e.button !== 0) return;

    const g = gestureRef.current;
    g.isDown = true;
    g.isLocked = false;
    g.isVertical = false;
    g.startX = e.clientX;
    g.startY = e.clientY;
    g.lastX = e.clientX;
    g.lastTime = performance.now();
    g.totalMoved = 0;
    g.pointerId = e.pointerId;

    // Halt existing throw momentum while finger/mouse touches
    velocityRef.current = 0;
  };

  /*
   * Pointer move: direction-locking gesture handler
   * - Vertical movement preserves normal mobile page scrolling
   * - Horizontal movement locks drag and scrubs the marquee with 1:1 precision
   */
  const handlePointerMove = (e) => {
    const g = gestureRef.current;
    if (!g.isDown || g.isVertical) return;

    const diffX = e.clientX - g.startX;
    const diffY = e.clientY - g.startY;

    // Gesture direction threshold determination
    if (!g.isLocked) {
      if (Math.abs(diffY) > 7 && Math.abs(diffY) > Math.abs(diffX)) {
        // Vertical page scroll detected — yield immediately so mobile scrolling is 100% smooth
        g.isVertical = true;
        return;
      }
      if (Math.abs(diffX) > 7 && Math.abs(diffX) >= Math.abs(diffY)) {
        // Horizontal swipe detected — lock gesture and capture pointer
        g.isLocked = true;
        isDraggingRef.current = true;
        if (trackRef.current) {
          trackRef.current.style.cursor = "grabbing";
        }
        if (e.currentTarget?.setPointerCapture) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // ignore
          }
        }
      }
    }

    if (g.isLocked) {
      const now = performance.now();
      const step = e.clientX - g.lastX;
      g.totalMoved += Math.abs(step);

      // Scrub marquee position directly with the cursor/finger
      positionRef.current -= step;

      // Track throw velocity (px per 16.6ms frame)
      const timeElapsed = Math.max(1, now - g.lastTime);
      const instantVelocity = (-step / timeElapsed) * 16.667;
      // Filtered velocity for natural momentum release
      velocityRef.current = velocityRef.current * 0.3 + instantVelocity * 0.7;

      g.lastX = e.clientX;
      g.lastTime = now;
    }
  };

  /*
   * Pointer release: smoothly transitions drag into momentum decay & auto-scroll
   */
  const handlePointerUp = (e) => {
    const g = gestureRef.current;
    if (!g.isDown) return;

    g.isDown = false;
    isDraggingRef.current = false;
    g.isLocked = false;
    g.isVertical = false;

    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }

    // Clamp throw velocity to pleasant bounds
    velocityRef.current = Math.max(-26, Math.min(26, velocityRef.current));

    if (e?.currentTarget?.releasePointerCapture && g.pointerId !== null) {
      try {
        e.currentTarget.releasePointerCapture(g.pointerId);
      } catch {
        // ignore
      }
    }
  };

  /*
   * Desktop mouse wheel & trackpad horizontal scroll support
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // Horizontal wheel or Shift+vertical wheel or prominent horizontal swipe
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.shiftKey
            ? e.deltaY
            : 0;

      if (Math.abs(delta) > 1) {
        e.preventDefault();
        positionRef.current += delta * 0.85;
        velocityRef.current = Math.max(-20, Math.min(20, delta * 0.15));
      }
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []);

  /*
   * Navigation controls: smooth glide forward and backward
   */
  const handlePrev = () => {
    velocityRef.current = -14;
  };

  const handleNext = () => {
    velocityRef.current = 14;
  };

  /*
   * Handle card click (distinguishes clicks from drags)
   */
  const handleCardClick = (realIndex) => {
    if (gestureRef.current.totalMoved > 10) return;
    setActiveIndex(realIndex);
  };

  return (
    <section ref={sectionRef} className="services-section" id="services">
      {/* Background Ambient Orbs */}
      <div className="services-orb services-orb-one" aria-hidden="true" />
      <div className="services-orb services-orb-two" aria-hidden="true" />

      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <div className="services-heading">
            <span className="services-eyebrow">WHAT WE DO</span>
            <h2>
              Everything you need
              <br />
              <span>to move forward.</span>
            </h2>
          </div>

          <div className="services-description">
            Technology, design, marketing and business solutions — brought
            together under one roof.
          </div>
        </div>

        {/* Interactive Marquee Carousel Stage */}
        <div
          ref={containerRef}
          className="services-carousel"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          tabIndex={0}
          role="region"
          aria-label="Cognolynx Services Marquee Carousel"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
          }}
        >
          <div
            ref={trackRef}
            className="services-track"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {marqueeItems.map((service, index) => {
              const realIndex = index % services.length;
              const isActive = realIndex === activeIndex;

              return (
                <article
                  key={`${service.id}-${index}`}
                  className={`service-card ${
                    isActive ? "service-card-active" : ""
                  }`}
                  onClick={() => handleCardClick(realIndex)}
                >
                  <div className="card-top">
                    <span className="card-number">{service.number}</span>
                    <div
                      className="card-arrow"
                      aria-hidden="true"
                      onClick={(e) => {
                        if (service.path && gestureRef.current.totalMoved <= 8) {
                          e.stopPropagation();
                          navigate(service.path);
                        }
                      }}
                      style={{ cursor: service.path ? "pointer" : "default" }}
                    >
                      ↗
                    </div>
                  </div>

                  <div className="card-content">
                    <h3>{service.title}</h3>
                    <p>{service.short}</p>
                  </div>

                  <div className="card-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div
                    className="card-bottom"
                    onClick={(e) => {
                      if (service.path && gestureRef.current.totalMoved <= 8) {
                        e.stopPropagation();
                        navigate(service.path);
                      }
                    }}
                    style={{ cursor: service.path ? "pointer" : "default" }}
                  >
                    <span>Explore Service</span>
                    <div className="card-line" aria-hidden="true" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Minimal Controls */}
        <div className="services-controls">
          <div className="services-instruction">
            <div className="instruction-icon" aria-hidden="true">
              ⇄
            </div>
            <div>
              <strong>DRAG OR SWIPE</strong>
              <span>Explore all 15 capabilities</span>
            </div>
          </div>

          <div className="carousel-buttons">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous service"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next service"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
