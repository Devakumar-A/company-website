import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import "../styles/Technology.css";

/* =========================================================
   TECHNOLOGY DATA — 100% PRESERVED
   ========================================================= */

const TECHNOLOGY_CHAPTERS = [
  {
    id: "web",
    number: "01",
    eyebrow: "WEB",
    title: "Web Development",
    description:
      "Modern interfaces, scalable applications and high-performance digital experiences.",
    path: "/technology/web-engineering",
    technologies: [
      {
        name: "React",
        logo: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Next.js",
        logo: "https://cdn.simpleicons.org/nextdotjs/white",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.simpleicons.org/typescript",
      },
      {
        name: "Node.js",
        logo: "https://cdn.simpleicons.org/nodedotjs",
      },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.simpleicons.org/tailwindcss",
      },
      {
        name: "Express",
        logo: "https://cdn.simpleicons.org/express/white",
      },
    ],
  },

  {
    id: "mobile",
    number: "02",
    eyebrow: "MOBILE",
    title: "Mobile Development",
    description:
      "Cross-platform and native mobile experiences designed around real users.",
    path: "/technology/mobile-development",
    technologies: [
      {
        name: "React Native",
        logo: "https://cdn.simpleicons.org/react",
      },
      {
        name: "Flutter",
        logo: "https://cdn.simpleicons.org/flutter",
      },
      {
        name: "Android",
        logo: "https://cdn.simpleicons.org/android",
      },
      {
        name: "Kotlin",
        logo: "https://cdn.simpleicons.org/kotlin",
      },
      {
        name: "Swift",
        logo: "https://cdn.simpleicons.org/swift",
      },
      {
        name: "Firebase",
        logo: "https://cdn.simpleicons.org/firebase",
      },
    ],
  },

  {
    id: "ai",
    number: "03",
    eyebrow: "INTELLIGENCE",
    title: "AI & Machine Learning",
    description:
      "Intelligent systems combining machine learning, computer vision and automation.",
    path: "/technology/software-systems",
    technologies: [
      {
        name: "Python",
        logo: "https://cdn.simpleicons.org/python",
      },
      {
        name: "TensorFlow",
        logo: "https://cdn.simpleicons.org/tensorflow",
      },
      {
        name: "PyTorch",
        logo: "https://cdn.simpleicons.org/pytorch",
      },
      {
        name: "OpenCV",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
      },
      {
        name: "NumPy",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
      },
      {
        name: "Pandas",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
      },
    ],
  },

  {
    id: "cloud",
    number: "04",
    eyebrow: "INFRASTRUCTURE",
    title: "Cloud & DevOps",
    description:
      "Reliable infrastructure engineered for deployment, performance and scale.",
    path: "/technology/cloud-infrastructure",
    technologies: [
      {
        name: "AWS",
        logo: "https://api.iconify.design/logos:aws.svg",
      },
      {
        name: "Azure",
        logo: "https://api.iconify.design/logos:microsoft-azure.svg",
      },
      {
        name: "Google Cloud",
        logo: "https://cdn.simpleicons.org/googlecloud",
      },
      {
        name: "Docker",
        logo: "https://cdn.simpleicons.org/docker",
      },
      {
        name: "Kubernetes",
        logo: "https://cdn.simpleicons.org/kubernetes",
      },
      {
        name: "Cloudflare",
        logo: "https://cdn.simpleicons.org/cloudflare",
      },
    ],
  },

  {
    id: "data",
    number: "05",
    eyebrow: "DATA",
    title: "Database & Backend",
    description:
      "Secure data foundations and backend systems built for growing products.",
    path: "/technology/backend-databases",
    technologies: [
      {
        name: "PostgreSQL",
        logo: "https://cdn.simpleicons.org/postgresql",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.simpleicons.org/mongodb",
      },
      {
        name: "MySQL",
        logo: "https://cdn.simpleicons.org/mysql",
      },
      {
        name: "Redis",
        logo: "https://cdn.simpleicons.org/redis",
      },
      {
        name: "Supabase",
        logo: "https://cdn.simpleicons.org/supabase",
      },
      {
        name: "GraphQL",
        logo: "https://cdn.simpleicons.org/graphql",
      },
    ],
  },

  {
    id: "creative",
    number: "06",
    eyebrow: "CREATIVE",
    title: "Design & Creative",
    description:
      "Interfaces, identities and visual experiences designed to make brands memorable.",
    path: "/technology/design-systems",
    technologies: [
      {
        name: "Figma",
        logo: "https://cdn.simpleicons.org/figma",
      },
      {
        name: "Photoshop",
        logo: "https://api.iconify.design/logos:adobe-photoshop.svg",
      },
      {
        name: "Illustrator",
        logo: "https://api.iconify.design/logos:adobe-illustrator.svg",
      },
      {
        name: "After Effects",
        logo: "https://api.iconify.design/logos:adobe-after-effects.svg",
      },
      {
        name: "Premiere Pro",
        logo: "https://api.iconify.design/logos:adobe-premiere.svg",
      },
      {
        name: "Canva",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
      },
    ],
  },
];

/* =========================================================
   MATH UTILITIES
   ========================================================= */

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const lerp = (start, end, amount) => start + (end - start) * amount;

/* =========================================================
   REDUCED MOTION HOOK
   ========================================================= */

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
    } else {
      media.addListener(update);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", update);
      } else {
        media.removeListener(update);
      }
    };
  }, []);

  return reducedMotion;
}

/* =========================================================
   3D TUNNEL TECHNOLOGY NODE (Pure Logo — High Contrast & Fallback)
   ========================================================= */

/* =========================================================
   3D TUNNEL TECHNOLOGY NODE (Pure Logo — 100% GPU Composited)
   ========================================================= */

const TechnologyNode = React.memo(
  function TechnologyNode({
    technology,
    index,
    total,
    chapterDiff,
    chapterIndex,
    mouse,
    mobile,
  }) {
    const [hasError, setHasError] = useState(false);
    const absDiff = Math.abs(chapterDiff);

    // Natural horizon threshold so nodes don't suddenly pop
    if (absDiff > 1.65) return null;

    // Helical spiral rotation per layer creates authentic 3D warp depth
    const spiralOffset = chapterIndex * (Math.PI / 4);
    const baseAngle = (index / total) * Math.PI * 2 - Math.PI / 2 + spiralOffset;

    let x;
    let y;
    let z;
    let scale;
    let opacity;

    if (mobile) {
      // Mobile: calibrated vertical cylinder
      const baseRadiusX = 118;
      const baseRadiusY = 190;

      if (chapterDiff >= 0) {
        // Approaching focus plane from the background
        const progressToFocus = clamp(1 - chapterDiff, 0, 1);
        const ease = progressToFocus * progressToFocus;
        z = chapterDiff * -480;
        scale = 0.52 + 0.5 * ease;
        opacity = clamp(progressToFocus * 1.3, 0, 1);
        x = Math.cos(baseAngle) * baseRadiusX + mouse.x * 5;
        y = Math.sin(baseAngle) * baseRadiusY + mouse.y * 5;
      } else {
        // Gliding past the camera: gently parts outward and clears out
        const pastFocus = Math.abs(chapterDiff);
        const spread = 1 + pastFocus * 0.45;
        z = pastFocus * 300;
        scale = clamp(1.02 + pastFocus * 0.22, 1.0, 1.3);
        opacity = clamp(1 - pastFocus * 1.25, 0, 1);
        x = Math.cos(baseAngle) * (baseRadiusX * spread) + mouse.x * 5;
        y = Math.sin(baseAngle) * (baseRadiusY * spread) + mouse.y * 5;
      }
    } else {
      // Desktop: widescreen 3D tunnel with generous negative space
      const baseRadiusX = 345;
      const baseRadiusY = 225;
      const depthStagger = index % 2 === 0 ? 25 : -25;

      if (chapterDiff >= 0) {
        // Approaching focus plane: smooth cubic deceleration
        const progressToFocus = clamp(1 - chapterDiff, 0, 1);
        const ease = progressToFocus * (2 - progressToFocus);
        z = chapterDiff * -550 + depthStagger;
        scale = 0.54 + 0.48 * ease;
        opacity = clamp(progressToFocus * 1.35, 0, 1);
        x = Math.cos(baseAngle) * baseRadiusX + mouse.x * 16;
        y = Math.sin(baseAngle) * baseRadiusY + mouse.y * 13;
      } else {
        // Moving past the viewer: expands laterally to create a portal pass-through
        const pastFocus = Math.abs(chapterDiff);
        const spread = 1 + pastFocus * 0.42;
        z = pastFocus * 380 + depthStagger;
        scale = clamp(1.02 + pastFocus * 0.24, 1.0, 1.35);
        opacity = clamp(1 - pastFocus * 1.2, 0, 1);
        x = Math.cos(baseAngle) * (baseRadiusX * spread) + mouse.x * 16;
        y = Math.sin(baseAngle) * (baseRadiusY * spread) + mouse.y * 13;
      }
    }

    const zIndex = Math.round(100 - chapterDiff * 50);

    return (
      <div
        className="technology-node"
        style={{
          transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) scale(${scale.toFixed(3)})`,
          opacity: Number(opacity.toFixed(3)),
          zIndex,
          pointerEvents: absDiff < 0.4 ? "auto" : "none",
        }}
      >
        <div className="technology-node-glow" />

        <div className="technology-node-card" title={technology.name}>
          {!hasError ? (
            <img
              className="technology-node-logo"
              src={technology.logo}
              alt={technology.name}
              draggable="false"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
              onError={() => setHasError(true)}
            />
          ) : (
            <span className="technology-node-fallback">
              {technology.name.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>
    );
  },
  (prev, next) => {
    if (prev.technology.name !== next.technology.name) return false;
    if (prev.mobile !== next.mobile) return false;
    // Skip re-render if position has moved less than 0.0008 units
    return (
      Math.abs(prev.chapterDiff - next.chapterDiff) < 0.0008 &&
      Math.abs(prev.mouse.x - next.mouse.x) < 0.015 &&
      Math.abs(prev.mouse.y - next.mouse.y) < 0.015
    );
  }
);

/* =========================================================
   GLOWING CONNECTION LINES
   ========================================================= */

const TechnologyConnections = React.memo(
  function TechnologyConnections({ mobile, mouse, activeFraction }) {
    const desktopPaths = [
      "M 50 50 C 42 38, 28 28, 16 16",
      "M 50 50 C 46 32, 44 18, 50 8",
      "M 50 50 C 58 38, 72 28, 84 16",
      "M 50 50 C 58 62, 72 72, 84 84",
      "M 50 50 C 46 68, 44 82, 50 92",
      "M 50 50 C 42 62, 28 72, 16 84",
    ];

    const mobilePaths = [
      "M 50 50 C 46 36, 42 22, 50 10",
      "M 50 50 C 64 42, 78 30, 88 22",
      "M 50 50 C 64 58, 78 70, 88 78",
      "M 50 50 C 46 64, 42 78, 50 90",
      "M 50 50 C 36 58, 22 70, 12 78",
      "M 50 50 C 36 42, 22 30, 12 22",
    ];

    const paths = mobile ? mobilePaths : desktopPaths;
    const lineOpacity = (0.28 + (1 - activeFraction) * 0.45).toFixed(2);

    return (
      <svg
        className="technology-connections"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{
          transform: `translate(-50%, -50%) translate3d(${mouse.x * 4}px, ${mouse.y * 4}px, 0)`,
          opacity: lineOpacity,
        }}
      >
        <defs>
          <linearGradient
            id="technologyConnectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#1769e0" stopOpacity="0.05" />
            <stop offset="45%" stopColor="#4f9cff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1769e0" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            pathLength="1"
            className="technology-connection-line"
            style={{
              animationDelay: `${index * 0.22}s`,
            }}
          />
        ))}
      </svg>
    );
  },
  (prev, next) => {
    return (
      Math.abs(prev.activeFraction - next.activeFraction) < 0.02 &&
      Math.abs(prev.mouse.x - next.mouse.x) < 0.05 &&
      prev.mobile === next.mobile
    );
  }
);

/* =========================================================
   CENTRAL COGNOLYNX CORE
   ========================================================= */

const TechnologyCore = React.memo(
  function TechnologyCore({ chapter, progressPulse }) {
    return (
      <div className="technology-core">
        {/* 3D Concentric Orbit Rings */}
        <div className="technology-core-orbit orbit-one" />
        <div className="technology-core-orbit orbit-two" />
        <div className="technology-core-orbit orbit-three" />

        {/* Volumetric ambient halo */}
        <div className="technology-core-halo" />

        {/* Center Nexus Sphere */}
        <div
          className="technology-core-inner"
          style={{
            transform: `scale(${1 + Math.sin(progressPulse * Math.PI) * 0.04})`,
          }}
        >
          <span className="technology-core-small">TECHNOLOGY</span>
          <strong>COGNOLYNX</strong>
          <span className="technology-core-chapter">
            {chapter.number} / 06
          </span>
        </div>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.chapter.number === next.chapter.number &&
      Math.abs(prev.progressPulse - next.progressPulse) < 0.025
    );
  }
);

/* =========================================================
   MAIN TECHNOLOGY TUNNEL SECTION
   ========================================================= */

export default function Technology({ headingTag = "h2" }) {
  const Heading = headingTag;
  const sectionRef = useRef(null);

  /*
   * STRICT SCROLL PRESERVATION:
   * We NEVER modify window.scrollY, body overflow, wheel events,
   * touch events, or call preventDefault().
   * Browser scrolling remains 100% natural, allowing standard
   * mouse wheel, trackpad, and touch fling scrolling.
   */

  const targetProgress = useRef(0);
  const smoothProgress = useRef(0);

  const targetMouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  const animationFrame = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  /* =======================================================
     RESPONSIVE BREAKPOINT
  ======================================================= */

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateDevice();
    window.addEventListener("resize", updateDevice, { passive: true });
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  /* =======================================================
     RELIABLE SECTION-BASED SCROLL PROGRESS CALCULATION
     scrollableDistance = section.offsetHeight - window.innerHeight
     progress = -section.getBoundingClientRect().top / scrollableDistance
  ======================================================= */

  const calculateProgress = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return 0;

    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);

    const rawProgress = -rect.top / scrollableDistance;
    return clamp(rawProgress, 0, 1);
  }, []);

  /* =======================================================
     STEADY, LAG-FREE CINEMATIC ANIMATION LOOP
     Decouples scroll measurement from rAF rendering to prevent
     layout thrashing, and throttles idle React state updates.
  ======================================================= */

  useEffect(() => {
    let isIntersecting = false;
    let isRunning = false;
    let scrollTicking = false;

    const handleScroll = () => {
      if (!isIntersecting) return;
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          targetProgress.current = calculateProgress();
          scrollTicking = false;
        });
      }
    };

    // Initialize immediate progress on mount
    const initialProgress = calculateProgress();
    targetProgress.current = initialProgress;
    smoothProgress.current = initialProgress;

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    let lastProgress = -1;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const animate = () => {
      if (!isIntersecting || !isRunning) {
        isRunning = false;
        return;
      }

      const target = targetProgress.current;
      const current = smoothProgress.current;

      // Responsive, critically-damped lerp (0.085): zero input lag + 100% fluid easing
      const nextProgress = reducedMotion ? target : lerp(current, target, 0.085);
      smoothProgress.current = nextProgress;

      const targetM = targetMouse.current;
      const currentM = smoothMouse.current;

      const mouseX = reducedMotion
        ? targetM.x
        : lerp(currentM.x, targetM.x, 0.06);

      const mouseY = reducedMotion
        ? targetM.y
        : lerp(currentM.y, targetM.y, 0.06);

      smoothMouse.current = { x: mouseX, y: mouseY };

      // Only re-render React state if value has meaningfully moved (avoids 120fps CPU thrash)
      const pDiff = Math.abs(nextProgress - lastProgress);
      const mDiff = Math.abs(mouseX - lastMouseX) + Math.abs(mouseY - lastMouseY);

      if (pDiff > 0.0012 || mDiff > 0.002) {
        lastProgress = nextProgress;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        setProgress(nextProgress);
        setMouse({ x: mouseX, y: mouseY });
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      animationFrame.current = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          handleScroll();
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "250px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [calculateProgress, reducedMotion]);

  /* =======================================================
     MOUSE PARALLAX (Desktop only)
  ======================================================= */

  const handlePointerMove = useCallback(
    (event) => {
      if (isMobile) return;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;

      targetMouse.current = {
        x: clamp((relativeX - 0.5) * 2, -1, 1),
        y: clamp((relativeY - 0.5) * 2, -1, 1),
      };
    },
    [isMobile]
  );

  const handlePointerLeave = useCallback(() => {
    targetMouse.current = { x: 0, y: 0 };
  }, []);

  /* =======================================================
     CHAPTER PROGRESS & DEPTH TIMELINE
  ======================================================= */

  const chapterCount = TECHNOLOGY_CHAPTERS.length; // 6
  // Continuous position along the tunnel (0.0 to 5.0)
  const tunnelPosition = progress * (chapterCount - 1);

  // Active closest chapter index (0 to 5)
  const activeChapterIndex = clamp(
    Math.round(tunnelPosition),
    0,
    chapterCount - 1
  );
  const activeChapter = TECHNOLOGY_CHAPTERS[activeChapterIndex];

  // Fraction of distance from exact chapter alignment
  const activeFraction = Math.abs(tunnelPosition - activeChapterIndex);

  /* =======================================================
     BACKGROUND PARTICLES
  ======================================================= */

  const particles = useMemo(() => {
    return Array.from({ length: 42 }, (_, index) => ({
      id: index,
      left: ((index * 37.17) % 100).toFixed(2),
      top: ((index * 61.43) % 100).toFixed(2),
      size: 1 + ((index * 11) % 3),
      delay: ((index * 0.41) % 4).toFixed(2),
    }));
  }, []);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={sectionRef}
      id="technology"
      className={[
        "technology-section",
        isMobile ? "technology-mobile" : "technology-desktop",
        reducedMotion ? "technology-reduced-motion" : "",
      ].join(" ")}
      style={{
        "--technology-progress": progress,
        "--technology-mouse-x": mouse.x,
        "--technology-mouse-y": mouse.y,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* =================================================
          STICKY VIEWPORT STAGE
          Pins smoothly to top during natural document scroll.
      ================================================= */}
      <div className="technology-sticky">
        <div className="technology-scene">

          {/* =============================================
              CYBERNETIC BACKGROUND & VOID DEPTH
          ============================================= */}
          <div className="technology-background">
            <div className="technology-noise" />
            <div className="technology-grid" />
            <div className="technology-vignette" />
            <div className="technology-blue-glow" />
            <div className="technology-purple-glow" />

            <div className="technology-particles">
              {particles.map((particle) => (
                <span
                  key={particle.id}
                  className="technology-particle"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDelay: `${particle.delay}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* =============================================
              TOP BAR
          ============================================= */}
          <header className="technology-topbar">
            <div className="technology-label">
              <span className="technology-label-dot" />
              TECHNOLOGY ECOSYSTEM
            </div>

            <div className="technology-counter">
              <strong>{activeChapter.number}</strong>
              <span>/</span>
              <span>06</span>
            </div>
          </header>

          {/* =============================================
              INTRO HEADLINE (Fades as you enter tunnel)
          ============================================= */}
          <div
            className="technology-intro"
            style={{
              opacity: clamp(1 - progress * 4.5, 0, 1),
              transform: `translate3d(0, ${-progress * 85}px, 0)`,
            }}
          >
            <span className="technology-intro-eyebrow">THE STACK</span>
            <Heading>
              Technology
              <br />
              behind
              <br />
              what we build.
            </Heading>
            <p>
              Scroll to travel through our core technology stack and digital
              capabilities.
            </p>
          </div>

          {/* =============================================
              3D TECHNOLOGY TUNNEL
          ============================================= */}
          <div
            className="technology-tunnel"
            style={{
              transform: `translate3d(${mouse.x * -12}px, ${mouse.y * -12}px, 0)`,
            }}
          >
            {/* Architectural 3D Depth Rings Receding into Z-axis */}
            <div className="technology-depth-ring ring-one" />
            <div className="technology-depth-ring ring-two" />
            <div className="technology-depth-ring ring-three" />
            <div className="technology-depth-ring ring-four" />

            {/* Glowing Connection Network */}
            <TechnologyConnections
              mobile={isMobile}
              mouse={mouse}
              activeFraction={activeFraction}
            />

            {/* Central Cognolynx Nexus Core */}
            <TechnologyCore
              chapter={activeChapter}
              progressPulse={tunnelPosition}
            />

            {/* Multi-Layer 3D Technology Nodes */}
            <div className="technology-nodes">
              {TECHNOLOGY_CHAPTERS.map((chapter, cIndex) => {
                const chapterDiff = cIndex - tunnelPosition;

                // Render active chapter and adjacent incoming/outgoing chapters
                if (Math.abs(chapterDiff) > 1.35) return null;

                return chapter.technologies.map((technology, tIndex) => (
                  <TechnologyNode
                    key={`${chapter.id}-${technology.name}`}
                    technology={technology}
                    index={tIndex}
                    total={chapter.technologies.length}
                    chapterDiff={chapterDiff}
                    chapterIndex={cIndex}
                    mouse={mouse}
                    mobile={isMobile}
                  />
                ));
              })}
            </div>
          </div>

          {/* =============================================
              ACTIVE CHAPTER INFO PANEL
          ============================================= */}
          <Link
            to={activeChapter.path}
            className="technology-chapter-info"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer", pointerEvents: "auto" }}
          >
            <span className="technology-chapter-number">
              {activeChapter.number}
            </span>

            <div className="technology-chapter-copy">
              <span className="technology-chapter-eyebrow">
                {activeChapter.eyebrow}
              </span>

              {headingTag === "h1" ? (
                <h2>{activeChapter.title}</h2>
              ) : (
                <h3>{activeChapter.title}</h3>
              )}

              <p>{activeChapter.description}</p>
            </div>
          </Link>

          {/* =============================================
              SCROLL INDICATOR
          ============================================= */}
          <div className="technology-scroll">
            <span>SCROLL TO DIVE</span>
            <div className="technology-scroll-line">
              <div
                style={{
                  transform: `scaleY(${Math.max(progress, 0.05)})`,
                }}
              />
            </div>
          </div>

          {/* =============================================
              CHAPTER PROGRESS DOTS
          ============================================= */}
          <div className="technology-progress" aria-hidden="true">
            {TECHNOLOGY_CHAPTERS.map((chapter, index) => (
              <span
                key={chapter.id}
                className={index === activeChapterIndex ? "active" : ""}
              />
            ))}
          </div>

          {/* =============================================
              MOBILE SCROLL HINT
          ============================================= */}
          <div className="technology-mobile-hint">
            <span>SCROLL TO EXPLORE</span>
            <span className="technology-mobile-arrow">↓</span>
          </div>

        </div>
      </div>
    </section>
  );
}