import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  X,
  Plus,
  Minus,
  ArrowRight,
  HelpCircle,
  Code2,
  Layers,
  GraduationCap,
  ShieldCheck,
  CreditCard,
  LifeBuoy,
  Sparkles,
  Send,
  Bot,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  MessageSquare,
  Building2,
  Mail,
} from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import "../styles/FAQ.css";

const CATEGORIES = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "company", label: "Leadership & MSME", icon: Building2 },
  { id: "internship", label: "Internship & Certification", icon: GraduationCap },
  { id: "services", label: "Services & Capabilities", icon: Code2 },
  { id: "process", label: "Process & Delivery", icon: Layers },
  { id: "pricing", label: "Pricing & IP Ownership", icon: CreditCard },
  { id: "technology", label: "Tech Stack & Security", icon: ShieldCheck },
  { id: "support", label: "Support & Warranty", icon: LifeBuoy },
];

const FAQS_DATA = [
  // 1. Leadership & MSME Registration (High Priority)
  {
    id: "founder-leadership",
    category: "company",
    categoryLabel: "Leadership & MSME",
    question: "Who is the founder and leadership behind Cognolynx?",
    answer:
      "Cognolynx was founded by Devakumar A, a software engineer, digital systems architect, and technology researcher.\n\nDevakumar leads overall software engineering, system architecture, research-backed development workflows, and hands-on technical mentorship for client projects and student developer tracks.\n\nOfficial Profiles & Verification:\n• GitHub: https://github.com/Devakumar-A\n• LinkedIn: https://www.linkedin.com/in/devakumar-a-129561305/\n• ORCID Research ID: https://orcid.org/0009-0003-8934-6744\n• Official Email: cognolynxforge@gmail.com",
    linkText: "Connect with Devakumar A on LinkedIn",
    linkUrl: "https://www.linkedin.com/in/devakumar-a-129561305/",
  },
  {
    id: "company-msme-registration",
    category: "company",
    categoryLabel: "Leadership & MSME",
    question: "Is Cognolynx an officially registered enterprise under the Government of India (MSME)?",
    answer:
      "Yes. Cognolynx is an officially recognized and registered Micro, Small, and Medium Enterprise (MSME) under the Ministry of MSME, Government of India.\n\nOfficial Government Registration Credentials:\n• Udyam Registration Number: UDYAM-PY-03-0061320\n• Enterprise Name: COGNOLYNX\n• Enterprise Type: Micro Enterprise (Services)\n• National Industry Classification (NIC): 62011 (Computer programming, consultancy, software development, modifying and testing)\n• Registered Office Address: Door No. 25, Palvadi Street, Nethaji Nagar, Puducherry - 605001, India\n• Official Email: cognolynxforge@gmail.com\n• Date of Udyam Registration: 28/09/2026\n\nThis government registration certifies our legal status as an authentic Indian enterprise, validating our adherence to statutory business standards, legally enforceable commercial client contracts, mutual NDAs, and authentic Certificate of Completion issuance for student interns and trainees.",
    linkText: "Learn more about our company profile",
    linkUrl: "/about",
  },
  {
    id: "msme-benefits-clients-interns",
    category: "company",
    categoryLabel: "Leadership & MSME",
    question: "How does Government MSME registration benefit clients and student interns?",
    answer:
      "Our MSME accreditation (UDYAM-PY-03-0061320) provides certified authenticity across all company engagements:\n• For Enterprise & Startup Clients: Assures engagement with a legitimate, government-recognized Indian enterprise with legally binding bilateral NDAs, compliant invoicing, and complete intellectual property (IP) assignment.\n• For Student Interns & Academic Institutions: Every Certificate of Completion issued carries recognized credentials backed by an MSME-registered enterprise, widely accepted by university examination cells, colleges, and corporate recruiters as authentic industrial project experience.",
    linkText: "Verify student certificates online",
    linkUrl: "/certificate/verify",
  },

  // 2. Internship & Certification (High Priority - Updated with Rs 149 details)
  {
    id: "internship-free-program",
    category: "internship",
    categoryLabel: "Internship & Certification",
    question: "Is the Cognolynx Internship program completely free of cost?",
    answer:
      "Yes, participating in the Cognolynx Internship program is 100% free. We charge zero application fees, zero registration costs, and zero tuition fees throughout your training and live project deliverables.\n\nUpon successful completion and evaluation of your live project, interns can receive their official, tamper-proof Certificate of Completion by paying a nominal certification fee of ₹149 (Rs 149 only). This one-time fee exclusively covers administrative verification, digital credential ledgering, and permanent hosting on our online verification system.",
    linkText: "Apply directly for the Internship",
    linkUrl: "/careers/apply",
  },
  {
    id: "internship-certificate-fee-details",
    category: "internship",
    categoryLabel: "Internship & Certification",
    question: "What is the ₹149 certification amount for and is it mandatory?",
    answer:
      "The ₹149 certification amount is charged only if you request the official, verified Certificate of Completion after finishing your project deliverables. It covers:\n• Generation of an authentic, tamper-proof digital certificate with a verifiable QR code\n• Allocation of a unique permanent Certificate ID registered in our global ledger\n• 24/7 lifelong online verification hosting at /certificate/verify for employers, recruiters, and university administrators\n• Manual review and verification of submitted project source code and deliverables.\n\nThere are no other hidden fees, subscriptions, or recurring costs.",
    linkText: "Verify a certificate online",
    linkUrl: "/certificate/verify",
  },
  {
    id: "internship-screening-timeline",
    category: "internship",
    categoryLabel: "Internship & Certification",
    question: "How long does application screening take and what happens next?",
    answer:
      "Our technical team screens all submitted applications within 24 hours. If shortlisted:\n1. An official selection invitation and offer letter will be sent directly to your registered email address.\n2. Important: Please check both your Primary Inbox and your Spam / Promotions folders, as automated onboarding emails may occasionally be filtered there.\n3. Your offer letter contains comprehensive instructions, domain track assignment, and immediate next steps to begin your live deliverables.",
    linkText: "Submit your internship application",
    linkUrl: "/careers/apply",
  },
  {
    id: "internship-verification",
    category: "internship",
    categoryLabel: "Internship & Certification",
    question: "Can universities, colleges, and employers authenticate the completion certificate?",
    answer:
      "Yes. Every Certificate of Completion issued after payment of the ₹149 certification fee includes a unique alphanumeric Certificate ID and a scannable QR code. Employers and university evaluators can enter this ID at /certificate/verify to instantly view the intern's verified name, project track, completion date, and credential status.",
    linkText: "Visit certificate verification portal",
    linkUrl: "/certificate/verify",
  },
  {
    id: "internship-fulltime-ppo",
    category: "internship",
    categoryLabel: "Internship & Certification",
    question: "Can an internship lead to a full-time job offer or junior engineering role at Cognolynx?",
    answer:
      "Yes. Exceptional performers who demonstrate high code quality, consistency, and problem-solving skills during their internship are actively evaluated for Pre-Placement Offers (PPOs) and full-time junior engineering roles within our client delivery and product teams.",
    linkText: "Explore career opportunities",
    linkUrl: "/careers",
  },

  // 3. Services & Scope
  {
    id: "services-what-we-do",
    category: "services",
    categoryLabel: "Services & Capabilities",
    question: "What core services and technical solutions does Cognolynx provide?",
    answer:
      "Cognolynx is a full-cycle software engineering and digital transformation company. Our capabilities include:\n• Custom Web Applications & Enterprise SaaS platforms\n• Cross-Platform & Native Mobile Applications (iOS & Android)\n• Cloud Architecture, DevOps & Infrastructure Automation\n• Production AI, RAG Pipelines & Intelligent Automation\n• Modern UI/UX Design Systems & High-Fidelity Prototyping\n• Performance Optimization & Modern Growth Marketing.",
    linkText: "Explore our full range of services",
    linkUrl: "/services",
  },
  {
    id: "services-legacy-modernization",
    category: "services",
    categoryLabel: "Services & Capabilities",
    question: "Can Cognolynx modernize legacy software systems without operational downtime?",
    answer:
      "Yes. We specialize in non-disruptive software modernization. We conduct an architectural audit to isolate bottlenecks, decouple monolithic databases, build modular microservices or modern REST/GraphQL APIs, and systematically migrate user workflows to modern cloud architectures with zero unplanned downtime.",
    linkText: "Learn about software engineering",
    linkUrl: "/services/software-engineering/software-development",
  },
  {
    id: "services-cross-platform-mobile",
    category: "services",
    categoryLabel: "Services & Capabilities",
    question: "Do you build cross-platform mobile apps or native iOS and Android apps?",
    answer:
      "We build both, choosing the architecture that best fits your performance and budget needs. For maximum time-to-market and code reusability, we develop high-performance cross-platform apps using React Native and Flutter. For hardware-intensive applications requiring low-level device access, we build native apps using Swift and Kotlin.",
    linkText: "View mobile solutions",
    linkUrl: "/solutions/mobile-experiences",
  },
  {
    id: "services-ai-integration",
    category: "services",
    categoryLabel: "Services & Capabilities",
    question: "How does Cognolynx integrate Artificial Intelligence (AI) into existing products?",
    answer:
      "We integrate production-grade AI models, retrieval-augmented generation (RAG) pipelines, intelligent process automation, computer vision, and predictive analytics directly into your web, mobile, or enterprise applications. We ensure models are secure, cost-optimized, and compliant with enterprise privacy standards.",
    linkText: "Discover AI & Intelligent Systems",
    linkUrl: "/solutions/business-systems",
  },

  // 4. Process & Delivery
  {
    id: "process-how-we-work",
    category: "process",
    categoryLabel: "Process & Delivery",
    question: "What is the typical project workflow from initial contact to delivery?",
    answer:
      "Our delivery framework follows four clear phases:\n1. Discovery & Technical Blueprint: We evaluate your business requirements, define technical architecture, and establish a milestone roadmap.\n2. Agile Sprints: We deliver working software in bi-weekly sprints with live staging deployments.\n3. Quality Assurance & Security Hardening: Automated test suites, cross-browser audits, and vulnerability checks.\n4. Production Launch & Handover: Seamless deployment, DNS configuration, source code transfer, and team documentation.",
    linkText: "Contact our team to get started",
    linkUrl: "/contact",
  },
  {
    id: "process-project-timelines",
    category: "process",
    categoryLabel: "Process & Delivery",
    question: "How long does a typical software project take from kickoff to production?",
    answer:
      "Project timelines vary by scope: a focused MVP (Minimum Viable Product) or custom corporate platform typically takes 4 to 8 weeks. Comprehensive enterprise software, SaaS platforms, or multi-platform mobile apps generally take 3 to 6 months with progressive sprint deliverables deployed to staging every two weeks.",
    linkText: "Review our case studies",
    linkUrl: "/case-studies",
  },
  {
    id: "process-communication",
    category: "process",
    categoryLabel: "Process & Delivery",
    question: "How do we track progress and communicate with the Cognolynx engineering team?",
    answer:
      "Transparency is our foundation. Clients receive access to a private Slack/Teams channel, weekly sprint demo meetings, and live staging URLs updated on every Git commit. You also have direct access to your dedicated Project Lead and Solution Architect.",
    linkText: "Schedule a discovery consultation",
    linkUrl: "/contact",
  },

  // 5. Pricing & IP Rights
  {
    id: "pricing-models",
    category: "pricing",
    categoryLabel: "Pricing & IP Ownership",
    question: "What pricing models does Cognolynx offer for client projects?",
    answer:
      "We provide two transparent engagement structures:\n• Fixed-Scope Milestone Pricing: Recommended for clearly defined MVPs and platforms. Costs are agreed upfront and tied to verified deliverables.\n• Dedicated Engineering Team (Time & Material): Ideal for evolving enterprise roadmaps. You engage dedicated full-stack developers, designers, and QA engineers billed on bi-weekly or monthly sprint cycles.",
    linkText: "Request a custom project estimate",
    linkUrl: "/contact",
  },
  {
    id: "pricing-ip-ownership",
    category: "pricing",
    categoryLabel: "Pricing & IP Ownership",
    question: "Do clients retain 100% intellectual property (IP) and source code ownership?",
    answer:
      "Yes, absolutely. Upon milestone completion and final payment, 100% of all intellectual property, source code, database architectures, designs, and digital assets are fully transferred to you. Cognolynx claims zero proprietary lock-in and zero royalties.",
    linkText: "Review our standard terms",
    linkUrl: "/terms-conditions",
  },
  {
    id: "pricing-nda",
    category: "pricing",
    categoryLabel: "Pricing & IP Ownership",
    question: "Do you sign non-disclosure agreements (NDAs) before discussing project ideas?",
    answer:
      "Yes. We strictly respect your intellectual property. We are happy to execute a standard bilateral NDA before any technical discussions, discovery sessions, or requirement reviews take place.",
    linkText: "Request an NDA & discuss your project",
    linkUrl: "/contact",
  },

  // 6. Tech Stack & Security
  {
    id: "tech-stack-details",
    category: "technology",
    categoryLabel: "Tech Stack & Security",
    question: "What programming languages and frameworks does Cognolynx specialize in?",
    answer:
      "We leverage modern, battle-tested technologies:\n• Frontend: React, Next.js, TypeScript, Tailwind CSS, Vue.js\n• Backend: Node.js, Express, Python (FastAPI, Django), Go, PostgreSQL, MongoDB, Redis\n• Mobile: React Native, Flutter, Swift (iOS), Kotlin (Android)\n• Cloud & DevOps: AWS, Google Cloud Platform, Microsoft Azure, Docker, Kubernetes, GitHub Actions CI/CD\n• AI/ML: PyTorch, TensorFlow, OpenAI APIs, Anthropic Claude, LangChain, LlamaIndex.",
    linkText: "Explore our technical stack",
    linkUrl: "/technology",
  },
  {
    id: "tech-security-standards",
    category: "technology",
    categoryLabel: "Tech Stack & Security",
    question: "What cybersecurity and data protection standards do you implement?",
    answer:
      "Security is engineered into our codebases from day one. We enforce OWASP Top 10 security standards, end-to-end data encryption (in transit using TLS 1.3 and at rest using AES-256), strict role-based access control (RBAC), automated vulnerability scanning, and secure API rate-limiting.",
    linkText: "Read our security & privacy protocols",
    linkUrl: "/privacy-policy",
  },

  // 7. Support & Maintenance
  {
    id: "support-post-launch",
    category: "support",
    categoryLabel: "Support & Warranty",
    question: "What level of support and warranty do you provide after product launch?",
    answer:
      "Every project delivered by Cognolynx includes a complimentary 30-day hyper-care warranty period covering bug fixes, performance tuning, and technical guidance. Following launch, we offer flexible SLA-backed maintenance packages for cloud monitoring, continuous security patches, and incremental feature updates.",
    linkText: "Visit our Support Center",
    linkUrl: "/support",
  },
  {
    id: "support-contact-options",
    category: "support",
    categoryLabel: "Support & Warranty",
    question: "How can I contact technical support or request emergency assistance?",
    answer:
      "You can reach our technical support team via our dedicated Support Desk at /support or by emailing cognolynxforge@gmail.com. Priority enterprise clients receive dedicated emergency response channels with guaranteed response times.",
    linkText: "Submit a support ticket",
    linkUrl: "/support",
  },
];

// Sample quick questions for the agentic assistant
const SUGGESTED_QUESTIONS = [
  "What is your MSME registration number?",
  "Who is the founder of Cognolynx?",
  "How can I contact Cognolynx?",
  "How much is the internship certificate?",
  "Do I own 100% of the source code?",
];

// Agentic answering engine based on comprehensive corporate knowledge base
function generateAgenticAnswer(rawQuery) {
  const q = rawQuery.trim().toLowerCase();

  // 1. MSME & Udyam Number
  if (
    q.includes("udyam") ||
    q.includes("0061320") ||
    q.includes("msme") ||
    (q.includes("number") && (q.includes("register") || q.includes("reg") || q.includes("company") || q.includes("gov") || q.includes("govt")))
  ) {
    return {
      title: "Government of India MSME Registration: UDYAM-PY-03-0061320",
      answer:
        "Cognolynx is an officially recognized and registered enterprise under the Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.",
      points: [
        "Udyam Registration Number: UDYAM-PY-03-0061320",
        "Enterprise Name: COGNOLYNX (Micro Enterprise - Services)",
        "Major Activity: Computer programming, consultancy, software development & testing (NIC 62011)",
        "Official Registered Address: No. 25, Palvadi Street, Nethaji Nagar, Puducherry - 605001, India",
        "Official Email: cognolynxforge@gmail.com",
        "Registration Date: 28/09/2026",
      ],
      links: [
        { label: "Email Founder", url: "mailto:cognolynxforge@gmail.com" },
        { label: "About Cognolynx", url: "/about" },
        { label: "Contact Form", url: "/contact" },
      ],
      category: "company",
    };
  }

  // 2. Contact & Email Query
  if (
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("mail") ||
    q.includes("reach") ||
    q.includes("message")
  ) {
    return {
      title: "Official Contact Details",
      answer:
        "You can directly reach Cognolynx and our founder Devakumar A using the official communication channels below:",
      points: [
        "Official Email: cognolynxforge@gmail.com",
        "Founder: Devakumar A (GitHub: Devakumar-A | LinkedIn: devakumar-a-129561305)",
        "Udyam Registration Number: UDYAM-PY-03-0061320",
        "Registered Office: No. 25, Palvadi Street, Nethaji Nagar, Puducherry - 605001, India",
      ],
      links: [
        { label: "Email: cognolynxforge@gmail.com", url: "mailto:cognolynxforge@gmail.com" },
        { label: "Contact Form", url: "/contact" },
      ],
      category: "company",
    };
  }

  // 3. Founder & Leadership Query (Devakumar A)
  if (
    q.includes("founder") ||
    q.includes("devakumar") ||
    q.includes("deva") ||
    q.includes("ceo") ||
    q.includes("who started") ||
    q.includes("who founded") ||
    q.includes("orcid") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    (q.includes("who") && (q.includes("run") || q.includes("lead") || q.includes("owner")))
  ) {
    return {
      title: "Founder & Technical Leadership: Devakumar A",
      answer:
        "Cognolynx was founded by Devakumar A, a software engineer, digital systems architect, and technology researcher who leads engineering architecture and mentorship across all operations.",
      points: [
        "Founder & Lead Architect: Devakumar A",
        "Official Email: cognolynxforge@gmail.com",
        "GitHub: github.com/Devakumar-A",
        "LinkedIn: linkedin.com/in/devakumar-a-129561305/",
        "ORCID Research ID: orcid.org/0009-0003-8934-6744",
        "Udyam Registration Number: UDYAM-PY-03-0061320",
      ],
      links: [
        { label: "Founder LinkedIn", url: "https://www.linkedin.com/in/devakumar-a-129561305/" },
        { label: "Founder GitHub", url: "https://github.com/Devakumar-A" },
        { label: "ORCID Profile", url: "https://orcid.org/0009-0003-8934-6744" },
        { label: "Email Founder", url: "mailto:cognolynxforge@gmail.com" },
      ],
      category: "company",
    };
  }

  // 4. Internship & Certificate Fee Query
  if (
    q.includes("149") ||
    q.includes("certif") ||
    (q.includes("intern") && (q.includes("cost") || q.includes("pay") || q.includes("fee") || q.includes("free") || q.includes("price") || q.includes("amount")))
  ) {
    return {
      title: "Internship Program & Certificate Fee (₹149)",
      answer:
        "The Cognolynx Internship program itself is 100% free of charge—there are zero application fees, registration costs, or course fees during your training and live project work.",
      points: [
        "Certification Fee: A nominal amount of ₹149 (Rs 149 only) is required solely when requesting your official verified Certificate of Completion upon finishing project deliverables.",
        "What it covers: Lifetime digital credential hosting, a unique verifiable Certificate ID with QR code, and administrative audit.",
        "Public Verification: Anyone (employers, university evaluators) can verify your certificate 24/7 at /certificate/verify.",
        "Government Recognized: Certificates carry our verified MSME Registration (UDYAM-PY-03-0061320).",
      ],
      links: [
        { label: "Apply for Internship", url: "/careers/apply" },
        { label: "Verify Certificate", url: "/certificate/verify" },
      ],
      category: "internship",
    };
  }

  // 5. Internship Screening & Next Steps
  if (
    q.includes("screen") ||
    q.includes("spam") ||
    q.includes("shortlist") ||
    q.includes("offer letter") ||
    (q.includes("intern") && (q.includes("process") || q.includes("next") || q.includes("after") || q.includes("result")))
  ) {
    return {
      title: "Internship Screening & Onboarding Process",
      answer:
        "Our technical team screens all internship applications within 24 hours of submission. Here is exactly what happens next:",
      points: [
        "24-Hour Review: Technical evaluation of your applied track and academic profile.",
        "Email Offer Letter: Shortlisted candidates receive an official offer letter and task instructions via email.",
        "Check Spam Folder: Please check both your Primary Inbox and Spam/Junk/Promotions folders so you don't miss the offer.",
        "Live Projects: You will work on real deliverables designed to build industry-standard portfolio work.",
      ],
      links: [
        { label: "Apply for Internship", url: "/careers/apply" },
        { label: "Careers Portal", url: "/careers" },
      ],
      category: "internship",
    };
  }

  // 6. Pricing, Cost & Payment Models
  if (
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("how much") ||
    q.includes("budget") ||
    q.includes("quote") ||
    q.includes("rate") ||
    q.includes("expensive")
  ) {
    return {
      title: "Project Pricing & Engagement Models",
      answer:
        "Cognolynx provides two transparent engagement structures tailored to project scope and business objectives:",
      points: [
        "Fixed-Scope Milestone Model: Best for MVPs, web applications, and corporate platforms with clear deliverables. Milestones and prices are locked upfront.",
        "Dedicated Engineering Sprint Model: Best for growing products and SaaS scale-ups needing dedicated full-stack developers, designers, and QA engineers.",
        "Zero Hidden Fees: Comprehensive project breakdown with full technical blueprints provided before kickoff.",
      ],
      links: [
        { label: "Request a Custom Quote", url: "/contact" },
        { label: "View Our Services", url: "/services" },
      ],
      category: "pricing",
    };
  }

  // 7. IP Ownership, Source Code & NDA
  if (
    q.includes("ip") ||
    q.includes("intellectual property") ||
    q.includes("source code") ||
    q.includes("code ownership") ||
    q.includes("own") ||
    q.includes("nda") ||
    q.includes("confidential")
  ) {
    return {
      title: "100% Intellectual Property & Code Ownership",
      answer:
        "At Cognolynx, clients retain complete ownership of all intellectual property, source code, and design assets:",
      points: [
        "100% IP Transfer: All repository rights, databases, architecture schemas, and production code belong entirely to you upon milestone delivery.",
        "Zero Vendor Lock-In: Clean, documented code that your in-house team or any external team can maintain.",
        "Strict Bilateral NDAs: We execute standard mutual non-disclosure agreements prior to reviewing proprietary project specifications.",
      ],
      links: [
        { label: "Review Terms & Conditions", url: "/terms-conditions" },
        { label: "Schedule a Discussion", url: "/contact" },
      ],
      category: "pricing",
    };
  }

  // 8. Tech Stack & Technologies
  if (
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("react") ||
    q.includes("node") ||
    q.includes("python") ||
    q.includes("mobile") ||
    q.includes("framework") ||
    q.includes("database") ||
    q.includes("aws")
  ) {
    return {
      title: "Engineering Stack & Architecture Standards",
      answer:
        "We build with modern, scalable, enterprise-tested technologies across web, cloud, and mobile ecosystems:",
      points: [
        "Frontend: React, Next.js, TypeScript, modern CSS/Tailwind, Vue.js.",
        "Backend & APIs: Node.js, Python (FastAPI/Django), Go, PostgreSQL, MongoDB, Redis.",
        "Mobile Development: React Native, Flutter, native Swift (iOS) and Kotlin (Android).",
        "Cloud & DevOps: AWS, Google Cloud, Azure, Docker, Kubernetes, automated CI/CD pipelines.",
        "AI/ML & Automation: RAG pipelines, OpenAI, Claude, LangChain, local LLM fine-tuning.",
      ],
      links: [
        { label: "Explore Technology Stack", url: "/technology" },
        { label: "View Case Studies", url: "/case-studies" },
      ],
      category: "technology",
    };
  }

  // 9. Timelines & Delivery Process
  if (
    q.includes("timeline") ||
    q.includes("how long") ||
    q.includes("turnaround") ||
    q.includes("time") ||
    q.includes("sprint") ||
    q.includes("process") ||
    q.includes("delivery") ||
    q.includes("methodology")
  ) {
    return {
      title: "Delivery Timeline & Agile Methodology",
      answer:
        "We deliver in structured, transparent 2-week agile sprints with bi-weekly staging deployments:",
      points: [
        "Fast MVP Launch: 4 to 8 weeks for Minimum Viable Products and targeted custom applications.",
        "Enterprise Platforms: 3 to 6 months for large-scale SaaS or multi-platform native mobile solutions.",
        "Bi-Weekly Demos: Live staging environments and Sprint Reviews so you inspect working software regularly.",
        "Direct Leadership: Dedicated project lead and real-time communication via private Slack/Teams.",
      ],
      links: [
        { label: "Our Case Studies", url: "/case-studies" },
        { label: "Get Project Timeline", url: "/contact" },
      ],
      category: "process",
    };
  }

  // 10. Support, Maintenance & Warranty
  if (
    q.includes("support") ||
    q.includes("warranty") ||
    q.includes("maintenance") ||
    q.includes("bug") ||
    q.includes("sla") ||
    q.includes("after launch") ||
    q.includes("help")
  ) {
    return {
      title: "Post-Launch Warranty & Support SLAs",
      answer:
        "Every software delivery includes dedicated hyper-care and long-term maintenance options:",
      points: [
        "30-Day Hyper-Care Warranty: Free bug fixes, performance monitoring, and handover guidance included post-launch.",
        "Flexible Maintenance SLAs: Proactive security updates, cloud cost optimization, and ongoing feature development.",
        "Dedicated Help Desk: Reach out 24/7 through /support or email cognolynxforge@gmail.com.",
      ],
      links: [
        { label: "Visit Support Center", url: "/support" },
        { label: "Contact Engineering", url: "/contact" },
      ],
      category: "support",
    };
  }

  // 11. General / Fallback Agentic Answer
  return {
    title: "Answer to Your Inquiry",
    answer: `Regarding "${rawQuery}": Cognolynx is a Government of India MSME-registered enterprise (UDYAM-PY-03-0061320) founded by Devakumar A. Here are key highlights relevant to your inquiry:`,
    points: [
      "Udyam Registration Number: UDYAM-PY-03-0061320 (Micro - Services, Govt. of India)",
      "Leadership: Founded by Devakumar A (GitHub: Devakumar-A | ORCID: 0009-0003-8934-6744)",
      "Direct Contact: Email: cognolynxforge@gmail.com",
      "100% Free Internship: Complete live project deliverables for free. Verified Certificate for ₹149 only.",
      "Engineering Services: Full-stack custom software, SaaS, mobile apps, and cloud AI systems.",
    ],
    links: [
      { label: "Email Founder", url: "mailto:cognolynxforge@gmail.com" },
      { label: "Contact Form", url: "/contact" },
      { label: "Internship Details", url: "/careers/apply" },
    ],
    category: "all",
  };
}

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState({});

  // Agentic AI Assistant States
  const [aiInput, setAiInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const aiAnswerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAskAgent = (queryToAsk) => {
    const question = (queryToAsk || aiInput).trim();
    if (!question) return;

    setIsGenerating(true);
    setAiResponse(null);

    // Realistic synthesis delay to give a smooth agentic experience
    setTimeout(() => {
      const response = generateAgenticAnswer(question);
      setAiResponse({
        query: question,
        ...response,
      });
      setIsGenerating(false);

      // Scroll smoothly to answer
      setTimeout(() => {
        if (aiAnswerRef.current) {
          aiAnswerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 50);
    }, 450);
  };

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return FAQS_DATA.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!query) return true;

      return (
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts = { all: FAQS_DATA.length };
    FAQS_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Generate Google FAQPage Schema
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS_DATA.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer.replace(/\n/g, "<br />"),
        },
      })),
    };
  }, []);

  return (
    <>
      <SEO
        {...seoData["/faq"]}
        schema={faqSchema}
      />

      <main className="faq-page">
        <div className="faq-container">
          {/* ==============================================================
              TRADITIONAL CORPORATE HERO
              ============================================================== */}
          <header className="faq-hero">
            <div className="faq-eyebrow">
              <Building2 size={14} className="faq-eyebrow-icon" />
              <span>Govt. of India MSME Registered: UDYAM-PY-03-0061320</span>
            </div>

            <h1 className="faq-title">Frequently Asked Questions</h1>

            <p className="faq-subtitle">
              Comprehensive information regarding Cognolynx leadership, Government of India MSME registration (UDYAM-PY-03-0061320),
              software engineering services, project sprints, IP ownership, and the ₹149 verified internship program.
            </p>
          </header>

          {/* ==============================================================
              AGENTIC SMART Q&A ASSISTANT
              ============================================================== */}
          <section className="faq-agent-section" aria-label="Interactive AI Knowledge Assistant">
            <div className="faq-agent-card">
              <div className="faq-agent-header">
                <div className="faq-agent-badge">
                  <Bot size={18} className="faq-agent-bot-icon" />
                  <span>Cognolynx Knowledge Agent</span>
                  <span className="faq-agent-status-dot" title="Ready to answer" />
                </div>
                <span className="faq-agent-hint">Ask any question about our founder, MSME number, services, or internship</span>
              </div>

              <form
                className="faq-agent-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAskAgent();
                }}
              >
                <div className="faq-agent-input-wrapper">
                  <Sparkles size={18} className="faq-agent-sparkle" />
                  <input
                    type="text"
                    className="faq-agent-input"
                    placeholder="Ask anything (e.g. 'What is your MSME number?', 'Who is the founder?', 'How much is the internship certificate?')..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    aria-label="Ask our AI agent a question"
                  />
                  {aiInput && (
                    <button
                      type="button"
                      className="faq-agent-clear-btn"
                      onClick={() => setAiInput("")}
                      aria-label="Clear input"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  className="faq-agent-submit-btn"
                  disabled={isGenerating || !aiInput.trim()}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={16} className="faq-spinner-icon" />
                      <span>Searching...</span>
                    </>
                  ) : (
                    <>
                      <span>Ask Agent</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Suggested Questions Pills */}
              <div className="faq-agent-suggestions">
                <span className="faq-agent-suggestions-label">Popular queries:</span>
                <div className="faq-agent-chips">
                  {SUGGESTED_QUESTIONS.map((questionText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="faq-agent-chip"
                      onClick={() => {
                        setAiInput(questionText);
                        handleAskAgent(questionText);
                      }}
                    >
                      <span>{questionText}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Agent Generated Response Display */}
              {aiResponse && (
                <div className="faq-agent-response" ref={aiAnswerRef}>
                  <div className="faq-agent-response-top">
                    <div className="faq-agent-response-meta">
                      <span className="faq-agent-tag">Answer for:</span>
                      <span className="faq-agent-user-query">"{aiResponse.query}"</span>
                    </div>
                    <button
                      type="button"
                      className="faq-agent-dismiss"
                      onClick={() => setAiResponse(null)}
                      title="Dismiss response"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <h3 className="faq-agent-response-title">{aiResponse.title}</h3>
                  <p className="faq-agent-response-p">{aiResponse.answer}</p>

                  {aiResponse.points && aiResponse.points.length > 0 && (
                    <ul className="faq-agent-points">
                      {aiResponse.points.map((pt, pIdx) => (
                        <li key={pIdx}>
                          <CheckCircle2 size={16} className="faq-point-icon" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {aiResponse.links && aiResponse.links.length > 0 && (
                    <div className="faq-agent-links">
                      <span className="faq-agent-links-label">Helpful links:</span>
                      {aiResponse.links.map((linkItem, lIdx) => {
                        const isExternal =
                          linkItem.url.startsWith("http") || linkItem.url.startsWith("mailto:");

                        return isExternal ? (
                          <a
                            key={lIdx}
                            href={linkItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="faq-agent-link-pill"
                          >
                            <span>{linkItem.label}</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <Link key={lIdx} to={linkItem.url} className="faq-agent-link-pill">
                            <span>{linkItem.label}</span>
                            <ExternalLink size={12} />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ==============================================================
              SEARCH & FILTER CONTROLS
              ============================================================== */}
          <div className="faq-controls">
            {/* Traditional Live Search */}
            <div className="faq-search-wrapper">
              <Search className="faq-search-icon" size={18} />
              <input
                type="text"
                className="faq-search-input"
                placeholder="Filter by keyword (e.g. UDYAM-PY-03-0061320, Devakumar, MSME, 149)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter frequently asked questions"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search filter"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="faq-categories" role="tablist" aria-label="FAQ Categories">
              {CATEGORIES.map(({ id, label, icon: Icon }) => {
                const isActive = selectedCategory === id;
                const count = categoryCounts[id] || 0;

                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`faq-cat-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedCategory(id)}
                  >
                    <Icon size={14} className="faq-cat-icon" />
                    <span>{label}</span>
                    <span className="faq-cat-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ==============================================================
              TRADITIONAL ACCORDION LIST
              ============================================================== */}
          <section className="faq-list" aria-label="Frequently Asked Questions List">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const isOpen = !!openItems[item.id];
                const isExternal =
                  item.linkUrl &&
                  (item.linkUrl.startsWith("http") || item.linkUrl.startsWith("mailto:"));

                return (
                  <article
                    key={item.id}
                    id={item.id}
                    className={`faq-card ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-trigger"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <div className="faq-trigger-left">
                        <span className="faq-item-category">
                          {item.categoryLabel}
                        </span>
                        <h2 className="faq-question-text">
                          {item.question}
                        </h2>
                      </div>

                      <div className="faq-icon-pill" aria-hidden="true">
                        {isOpen ? (
                          <Minus size={18} strokeWidth={2.4} />
                        ) : (
                          <Plus size={18} strokeWidth={2.4} />
                        )}
                      </div>
                    </button>

                    <div
                      id={`faq-answer-${item.id}`}
                      className="faq-body-collapse"
                      role="region"
                      aria-labelledby={item.id}
                    >
                      <div className="faq-body-inner">
                        <div className="faq-answer-content">
                          {item.answer.split("\n\n").map((paragraph, pIdx) => (
                            <p key={pIdx}>
                              {paragraph.split("\n").map((line, lIdx) => {
                                // Auto-link URLs inside lines for founder links
                                const hasUrl = line.includes("https://");
                                if (hasUrl) {
                                  const parts = line.split(/(https:\/\/[^\s]+)/g);
                                  return (
                                    <React.Fragment key={lIdx}>
                                      {parts.map((part, partIdx) =>
                                        part.startsWith("https://") ? (
                                          <a
                                            key={partIdx}
                                            href={part}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                              color: "#2563eb",
                                              textDecoration: "underline",
                                              fontWeight: 600,
                                              wordBreak: "break-all",
                                            }}
                                          >
                                            {part}
                                          </a>
                                        ) : (
                                          part
                                        )
                                      )}
                                      {lIdx < paragraph.split("\n").length - 1 && <br />}
                                    </React.Fragment>
                                  );
                                }

                                return (
                                  <React.Fragment key={lIdx}>
                                    {line}
                                    {lIdx < paragraph.split("\n").length - 1 && <br />}
                                  </React.Fragment>
                                );
                              })}
                            </p>
                          ))}

                          {item.linkText && item.linkUrl && (
                            <div className="faq-answer-action">
                              {isExternal ? (
                                <a
                                  href={item.linkUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="faq-answer-link"
                                >
                                  <span>{item.linkText}</span>
                                  <ExternalLink size={14} />
                                </a>
                              ) : (
                                <Link to={item.linkUrl} className="faq-answer-link">
                                  <span>{item.linkText}</span>
                                  <ArrowRight size={14} />
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="faq-empty-state">
                <div className="faq-empty-icon">
                  <Search size={24} />
                </div>
                <h3 className="faq-empty-title">No matching questions found</h3>
                <p className="faq-empty-desc">
                  We couldn't find any questions matching "{searchQuery}". Try searching for UDYAM-PY-03-0061320, Devakumar, or ask our AI agent above.
                </p>
                <button
                  type="button"
                  className="faq-reset-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>

          {/* ==============================================================
              TRADITIONAL CONTACT & SUPPORT CALLOUT
              ============================================================== */}
          <section className="faq-contact-card">
            <div className="faq-contact-icon-wrapper">
              <MessageSquare size={28} className="faq-contact-icon" />
            </div>

            <div className="faq-contact-text">
              <h2 className="faq-contact-title">
                Have specific inquiries for Devakumar A or our team?
              </h2>
              <p className="faq-contact-desc">
                Whether you need technical consulting, custom enterprise architecture, or have questions about our Government of India MSME-recognized programs (UDYAM-PY-03-0061320), reach out directly.
              </p>
            </div>

            <div className="faq-contact-buttons">
              <Link to="/contact" className="faq-btn-primary">
                <span>Contact Engineering</span>
                <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:cognolynxforge@gmail.com"
                className="faq-btn-secondary"
              >
                <Mail size={14} />
                <span>Email Founder</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
