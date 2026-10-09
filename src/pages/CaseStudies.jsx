import React from "react";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import "../styles/CaseStudies.css";

const featuredProjects = [
  {
    number: "01",
    category: "CLIENT / HOSPITALITY",
    title: "Starlight Hotels",
    subtitle:
      "A digital hospitality ecosystem built around direct bookings, guest experience and hotel operations.",
    description:
      "A modern hotel digital experience designed to connect guest discovery, booking, verification and operational workflows into a more structured hospitality ecosystem.",
    tags: [
      "Hospitality",
      "Booking",
      "Guest Experience",
      "GRC",
      "Verification",
    ],
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "MSG91",
    ],
    features: [
      "Multi-property hotel presentation",
      "Room and property discovery",
      "Booking workflow",
      "Guest information collection",
      "SMS OTP verification",
      "WhatsApp OTP verification",
      "Guest records",
      "Check-in workflow",
      "GRC operations",
    ],
    accent: "hotel",
  },
  {
    number: "02",
    category: "CLIENT / DIGITAL MARKETING",
    title: "AG ADS",
    subtitle:
      "A premium digital identity for a full-service marketing and outdoor advertising agency.",
    description:
      "A corporate website designed to bring digital marketing and outdoor advertising services together under one clear, premium and conversion-focused digital identity.",
    tags: [
      "Branding",
      "Digital Marketing",
      "Corporate Website",
      "Lead Generation",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Responsive UI",
      "Modern CSS",
    ],
    features: [
      "Digital marketing services",
      "Outdoor advertising services",
      "Brand positioning",
      "Service discovery",
      "Portfolio presentation",
      "Lead generation pathways",
      "Responsive experience",
    ],
    accent: "ads",
  },
  {
    number: "03",
    category: "CLIENT / SPORTS & EDUCATION",
    title: "MG Cricketer's Den",
    subtitle:
      "A digital platform for a modern cricket academy.",
    description:
      "A sports-focused digital experience designed to present the academy, facilities, practice opportunities, player information, admissions and communication in one structured platform.",
    tags: [
      "Sports",
      "Academy",
      "Booking",
      "Player Engagement",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Responsive UI",
      "Modern Web",
    ],
    features: [
      "Academy introduction",
      "Practice booking",
      "Player statistics",
      "Admissions",
      "Facilities",
      "About section",
      "Contact and enquiry",
      "Media experiences",
    ],
    accent: "cricket",
  },
  {
    number: "04",
    category: "CLIENT / REAL ESTATE",
    title: "Sri Suyambu Group",
    subtitle:
      "Tamil-first voice technology for real-estate customer registration.",
    description:
      "A voice-enabled customer registration system designed for users who are more comfortable speaking Tamil than typing. The application allows users to speak, verify their information through voice playback and generate a professional enquiry form.",
    tags: [
      "Voice UX",
      "Tamil Language",
      "Accessibility",
      "Real Estate",
      "Automation",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Web Speech API",
      "Speech Synthesis API",
      "Local Storage",
    ],
    features: [
      "Tamil voice input",
      "Field-specific speech recognition",
      "Voice playback",
      "Customer registration",
      "Phone number validation",
      "Local data storage",
      "A4 print generation",
      "Responsive interface",
    ],
    accent: "voice",
  },
];

const technicalProjects = [
  {
    number: "05",
    category: "AI / AGRICULTURE",
    title: "AquaCommandAI",
    subtitle:
      "AI-powered water and agricultural intelligence platform.",
    description:
      "A full-stack intelligence platform combining crop recommendation, yield prediction, water-demand forecasting, reservoir risk analysis and advisory capabilities.",
    technologies: [
      "React.js",
      "FastAPI",
      "Python",
      "Scikit-learn",
      "PostgreSQL",
      "Pandas",
      "NumPy",
      "Three.js",
    ],
    highlights: [
      "Crop recommendation",
      "Crop yield prediction",
      "Water demand forecasting",
      "Reservoir risk analysis",
      "AI advisory",
      "Interactive analytics dashboard",
    ],
  },
  {
    number: "06",
    category: "AI / HEALTHCARE / RESEARCH",
    title: "EEG Communication Aid",
    subtitle:
      "Exploring brain-computer interaction through deep learning.",
    description:
      "A multi-task EEG-based Brain-Computer Interface combining intent detection, emotion recognition and pain severity classification within a unified deep-learning architecture.",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "EEGNet",
      "MNE",
    ],
    highlights: [
      "EEG preprocessing",
      "Artifact removal",
      "Time-window segmentation",
      "Spatial-temporal feature extraction",
      "Multi-head classification",
    ],
    metric: "89%",
    metricLabel: "overall accuracy",
    secondaryMetric: "86–92%",
    secondaryLabel: "across three healthcare tasks",
  },
  {
    number: "07",
    category: "MACHINE LEARNING / FINANCE",
    title: "QuantPulse AI",
    subtitle:
      "Machine learning and deep learning for stock-market time-series forecasting.",
    description:
      "A forecasting system that compares Linear Regression and LSTM approaches using historical market data and an interactive Flask dashboard.",
    technologies: [
      "Python",
      "Flask",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "LSTM",
      "Pandas",
      "NumPy",
      "yfinance",
    ],
    highlights: [
      "Historical market analysis",
      "Stock forecasting",
      "Trend indication",
      "Confidence scoring",
      "Forecast visualization",
      "Multi-stock support",
    ],
  },
  {
    number: "08",
    category: "AI / NLP / RECRUITMENT",
    title: "Automated Resume Relevance Check",
    subtitle:
      "Semantic intelligence for smarter candidate screening.",
    description:
      "An AI-powered recruitment platform that compares resumes with job descriptions using Sentence Transformers and semantic similarity analysis.",
    technologies: [
      "Python",
      "Streamlit",
      "Sentence Transformers",
      "Hugging Face",
      "Scikit-learn",
      "SQLite",
    ],
    highlights: [
      "PDF and DOCX parsing",
      "Semantic similarity",
      "Resume scoring",
      "Automated verdict generation",
      "Student dashboard",
      "HR dashboard",
    ],
  },
  {
    number: "09",
    category: "AI / COMPUTER VISION",
    title: "MovieVerse AI",
    subtitle:
      "Understanding movies through multiple modalities.",
    description:
      "A multi-modal movie analysis system combining plot descriptions, poster images and trailer videos to generate genre predictions and recommendations.",
    technologies: [
      "Python",
      "BERT",
      "TF-IDF",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "ResNet50",
      "Scikit-learn",
      "Streamlit",
    ],
    highlights: [
      "Plot analysis",
      "Poster analysis",
      "Trailer analysis",
      "Multi-genre prediction",
      "Confidence scoring",
      "Explainable predictions",
      "Movie recommendations",
    ],
  },
  {
    number: "10",
    category: "EDUCATION / COMMUNITY",
    title: "Mathoria",
    subtitle:
      "A digital management ecosystem for a mathematics community.",
    description:
      "A centralized digital platform designed to modernize mathematics club operations through membership management, events, achievements, communication and interactive mathematical visualization.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Firebase",
    ],
    highlights: [
      "Membership management",
      "Event management",
      "Achievement dashboard",
      "Mathematical visualization",
      "Leadership management",
      "Gallery",
      "Communication center",
    ],
    metric: "600+",
    metricLabel: "community members",
  },
  {
    number: "11",
    category: "ACCESSIBILITY / ANDROID",
    title: "LinguaAssist",
    subtitle:
      "Making communication more accessible through speech technology.",
    description:
      "An Android application exploring accessible communication through speech-to-text and text-to-speech interaction.",
    technologies: [
      "Android",
      "Speech Recognition",
      "Text-to-Speech",
    ],
    highlights: [
      "Speech-to-text",
      "Text-to-speech",
      "Accessible interaction",
      "Mobile communication",
    ],
  },
];

const workIndex = [
  ["Starlight Hotels", "Client", "Hospitality / GRC"],
  ["AG ADS", "Client", "Marketing / Digital"],
  ["MG Cricketer's Den", "Client", "Sports / Academy"],
  ["Sri Suyambu Group", "Client", "Voice / Real Estate"],
  ["AquaCommandAI", "Product", "AI / Agriculture"],
  ["EEG Communication Aid", "Research", "AI / Healthcare"],
  ["QuantPulse AI", "Project", "ML / Finance"],
  ["Resume Relevance Check", "Product", "NLP / Recruitment"],
  ["MovieVerse AI", "Project", "AI / Computer Vision"],
  ["Mathoria", "Platform", "Education / Community"],
  ["LinguaAssist", "Project", "Accessibility / Android"],
];

function ProjectVisual({ project, featured = false }) {
  return (
    <div className={`case-visual case-visual-${project.accent || "default"}`}>
      <div className="visual-grid" />

      <div className="visual-top">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>

      <div className="visual-center">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-core">
          <span>{project.title.charAt(0)}</span>
        </div>
      </div>

      <div className="visual-bottom">
        <span>COGNOLYNX</span>
        <span>{featured ? "FEATURED WORK" : "SELECTED WORK"}</span>
      </div>
    </div>
  );
}

function FeaturedCaseStudy({ project, reverse = false }) {
  return (
    <article className={`featured-case ${reverse ? "reverse" : ""}`}>
      <ProjectVisual project={project} featured />

      <div className="featured-content">
        <div className="case-number">{project.number}</div>

        <span className="case-category">{project.category}</span>

        <h3>{project.title}</h3>

        <h4>{project.subtitle}</h4>

        <p className="case-description">{project.description}</p>

        <div className="case-section">
          <span className="case-label">CAPABILITIES</span>

          <div className="feature-list">
            {project.features.map((feature) => (
              <div className="feature-item" key={feature}>
                <span className="feature-dot" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="case-section">
          <span className="case-label">TECHNOLOGY</span>

          <div className="technology-list">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>

        <div className="case-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <button className="project-link" type="button">
          Explore Project
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

function TechnicalProject({ project, index }) {
  return (
    <article
      className={`technical-card ${
        index % 2 === 0 ? "technical-large" : ""
      }`}
    >
      <div className="technical-card-top">
        <span className="technical-number">{project.number}</span>
        <span className="technical-category">{project.category}</span>
      </div>

      <div className="technical-card-content">
        <h3>{project.title}</h3>
        <h4>{project.subtitle}</h4>
        <p>{project.description}</p>

        {project.metric && (
          <div className="metrics-row">
            <div className="metric-block">
              <strong>{project.metric}</strong>
              <span>{project.metricLabel}</span>
            </div>

            {project.secondaryMetric && (
              <div className="metric-block">
                <strong>{project.secondaryMetric}</strong>
                <span>{project.secondaryLabel}</span>
              </div>
            )}
          </div>
        )}

        <div className="technical-highlights">
          {project.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="technical-tech">
          {project.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>

        <button className="project-link project-link-dark" type="button">
          View Project
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  return (
    <div className="case-page">
      <SEO {...seoData["/case-studies"]} />
      {/* HERO */}
      <section className="case-hero">
        <div className="case-container">
          <div className="hero-eyebrow">
            <span />
            SELECTED WORK
          </div>

          <div className="hero-layout">
            <div>
              <h1>
                From ideas
                <br />
                to <em>digital products.</em>
              </h1>
            </div>

            <div className="hero-side">
              <p>
                We design and build websites, platforms and intelligent
                systems that solve real business, operational and user
                problems.
              </p>

              <div className="hero-tags">
                <span>WEB</span>
                <span>SOFTWARE</span>
                <span>AI</span>
                <span>AUTOMATION</span>
                <span>DIGITAL EXPERIENCES</span>
              </div>
            </div>
          </div>

          <div className="hero-bottom">
            <span>11 SELECTED PROJECTS</span>
            <span>CLIENT · PRODUCT · RESEARCH</span>
          </div>
        </div>
      </section>

      {/* CLIENT WORK */}
      <section className="work-section client-section">
        <div className="case-container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">01 / CLIENT WORK</span>
              <h2>
                Built for
                <br />
                <span>real businesses.</span>
              </h2>
            </div>

            <p>
              Digital experiences and business systems designed around
              practical operational requirements.
            </p>
          </div>

          <div className="featured-list">
            {featuredProjects.map((project, index) => (
              <FeaturedCaseStudy
                key={project.title}
                project={project}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL WORK */}
      <section className="work-section technical-section">
        <div className="case-container">
          <div className="section-heading technical-heading">
            <div>
              <span className="section-eyebrow">02 / TECHNOLOGY & RESEARCH</span>
              <h2>
                Engineering
                <br />
                <span>with purpose.</span>
              </h2>
            </div>

            <p>
              AI systems, platforms and research projects built to explore
              meaningful technical problems.
            </p>
          </div>

          <div className="technical-grid">
            {technicalProjects.map((project, index) => (
              <TechnicalProject
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WORK INDEX */}
      <section className="index-section">
        <div className="case-container">
          <div className="index-heading">
            <span className="section-eyebrow">03 / WORK INDEX</span>

            <h2>
              A broader view
              <br />
              <span>of our work.</span>
            </h2>
          </div>

          <div className="work-table">
            <div className="table-head">
              <span>PROJECT</span>
              <span>TYPE</span>
              <span>FOCUS</span>
            </div>

            {workIndex.map(([project, type, focus], index) => (
              <div className="table-row" key={project}>
                <span className="table-project">
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {project}
                </span>
                <span className="table-type">{type}</span>
                <span className="table-focus">{focus}</span>

                <ArrowUpRight
                  className="table-arrow"
                  size={18}
                  strokeWidth={1.7}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="approach-section">
        <div className="case-container">
          <div className="approach-intro">
            <span className="section-eyebrow">04 / OUR APPROACH</span>

            <h2>
              Different problems.
              <br />
              <span>One engineering mindset.</span>
            </h2>

            <p>
              Technology should serve the problem — not the other way around.
              We focus on understanding the context first, then designing and
              engineering the right solution around it.
            </p>
          </div>

          <div className="approach-grid">
            <div className="approach-card">
              <span>01</span>
              <h3>Understand</h3>
              <p>
                Understand the users, business context and actual problem
                before deciding on a solution.
              </p>
            </div>

            <div className="approach-card">
              <span>02</span>
              <h3>Design</h3>
              <p>
                Translate requirements into a clear product experience and
                technical direction.
              </p>
            </div>

            <div className="approach-card">
              <span>03</span>
              <h3>Engineer</h3>
              <p>
                Build with technologies and architecture that genuinely fit
                the requirements.
              </p>
            </div>

            <div className="approach-card">
              <span>04</span>
              <h3>Validate</h3>
              <p>
                Test functionality, usability and system behaviour against
                real workflows.
              </p>
            </div>

            <div className="approach-card">
              <span>05</span>
              <h3>Evolve</h3>
              <p>
                Create a foundation that can grow with the product and the
                business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="case-cta">
        <div className="case-container">
          <div className="cta-line" />

          <div className="cta-content">
            <span className="section-eyebrow">LET'S BUILD</span>

            <h2>
              Have a problem
              <br />
              <span>worth solving?</span>
            </h2>

            <p>
              From business websites to intelligent platforms, we're
              interested in building things that have a purpose.
            </p>

            <a href="/contact" className="cta-button">
              Start a conversation
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </a>
          </div>

          <div className="cta-footer">
            <span>COGNOLYNX</span>
            <span>BUILD · SOLVE · EVOLVE</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}