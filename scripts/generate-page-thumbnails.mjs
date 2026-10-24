import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const imagesDir = path.resolve(publicDir, 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const logoPath = path.resolve(publicDir, 'assets', 'logo.png');

const pages = [
  {
    filename: 'cognolynx-engineering-platform.webp',
    width: 1200,
    height: 675,
    tag: 'COGNOLYNX PLATFORM',
    title: 'Custom Software & AI Product Engineering',
    subtitle: 'High-performance digital products, web platforms, and intelligent technology systems.',
    accent: '#3b82f6',
    secondary: '#8b5cf6',
  },
  {
    filename: 'cognolynx-about-studio.webp',
    width: 1200,
    height: 675,
    tag: 'ENGINEERING PHILOSOPHY',
    title: 'We Build Technology for What Comes Next',
    subtitle: 'Purposeful digital architectures, production-grade software, and long-term scalability.',
    accent: '#8b5cf6',
    secondary: '#3b82f6',
  },
  {
    filename: 'cognolynx-technology-services.webp',
    width: 1200,
    height: 675,
    tag: 'FULL-SPECTRUM SERVICES',
    title: 'Modern Technology Engineering Services',
    subtitle: 'Custom software, responsive web platforms, bespoke design systems, and cloud architecture.',
    accent: '#2563eb',
    secondary: '#60a5fa',
  },
  {
    filename: 'cognolynx-digital-solutions.webp',
    width: 1200,
    height: 675,
    tag: 'ENTERPRISE SOLUTIONS',
    title: 'Intelligent Technology Built for Business',
    subtitle: 'Scalable digital products, AI automation pipelines, and modern mobile app experiences.',
    accent: '#6366f1',
    secondary: '#a855f7',
  },
  {
    filename: 'cognolynx-internship-program.webp',
    width: 1200,
    height: 675,
    tag: 'REMOTE STUDENT PROGRAM',
    title: '1-Month Remote Engineering Internship',
    subtitle: 'Hands-on production architecture, engineering mentorship, and verified skill certification.',
    accent: '#06b6d4',
    secondary: '#3b82f6',
  },
  {
    filename: 'internship-web-development.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 01',
    title: 'Web Development Internship',
    subtitle: 'Production-ready React, Next.js, TypeScript & Node.js web applications with hands-on mentorship.',
    accent: '#38bdf8',
    secondary: '#6366f1',
  },
  {
    filename: 'internship-ai-ml.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 02',
    title: 'AI & Machine Learning Internship',
    subtitle: 'Generative AI workflows, NLP pipelines, Python deep learning, and practical intelligent agents.',
    accent: '#818cf8',
    secondary: '#c084fc',
  },
  {
    filename: 'internship-data-science.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 03',
    title: 'Data Science & Analytics Internship',
    subtitle: 'Statistical modeling, Python data analytics, Power BI dashboards, and predictive insights.',
    accent: '#34d399',
    secondary: '#38bdf8',
  },
  {
    filename: 'internship-mobile-development.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 04',
    title: 'Mobile App Development Internship',
    subtitle: 'Cross-platform mobile applications using Flutter, React Native, iOS, and Android architectures.',
    accent: '#f472b6',
    secondary: '#818cf8',
  },
  {
    filename: 'internship-software-engineering.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 05',
    title: 'Software Engineering Internship',
    subtitle: 'Enterprise backend architectures, algorithms, data structures, and secure RESTful APIs.',
    accent: '#fb923c',
    secondary: '#f43f5e',
  },
  {
    filename: 'internship-ui-ux-design.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 06',
    title: 'UI/UX & Product Design Internship',
    subtitle: 'Modern design tokens, Figma component systems, user research, and tactile product prototyping.',
    accent: '#e879f9',
    secondary: '#818cf8',
  },
  {
    filename: 'internship-database-management.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 07',
    title: 'Database Management Internship',
    subtitle: 'PostgreSQL, MongoDB, SQL query optimization, data modeling, and transaction management.',
    accent: '#4ade80',
    secondary: '#2dd4bf',
  },
  {
    filename: 'internship-software-testing.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 08',
    title: 'Software Testing & QA Internship',
    subtitle: 'Automated test suites with Selenium & Playwright, API regression testing, and CI/CD quality pipelines.',
    accent: '#facc15',
    secondary: '#fb923c',
  },
  {
    filename: 'internship-cloud-devops.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 09',
    title: 'Cloud Computing & DevOps Internship',
    subtitle: 'Containerization with Docker, AWS cloud infrastructure, automation scripts, and CI/CD deployment.',
    accent: '#60a5fa',
    secondary: '#a78bfa',
  },
  {
    filename: 'internship-cybersecurity.webp',
    width: 1200,
    height: 675,
    tag: 'INTERNSHIP TRACK 10',
    title: 'Cybersecurity & Ethical Hacking Internship',
    subtitle: 'Web application defense, vulnerability assessments, OWASP top 10 security, and network protection.',
    accent: '#f87171',
    secondary: '#fb923c',
  },
  // Blog variations (16:9, 4:3, 1:1)
  {
    filename: 'cognolynx-blog-16x9.webp',
    width: 1200,
    height: 675,
    tag: 'COGNOLYNX INSIGHTS',
    title: 'Software Engineering & Architecture Articles',
    subtitle: 'Technical perspectives, systems design, and engineering methodologies from Cognolynx.',
    accent: '#3b82f6',
    secondary: '#8b5cf6',
  },
  {
    filename: 'cognolynx-blog-4x3.webp',
    width: 1200,
    height: 900,
    tag: 'COGNOLYNX INSIGHTS',
    title: 'Software Engineering & Architecture Articles',
    subtitle: 'Technical perspectives, systems design, and engineering methodologies from Cognolynx.',
    accent: '#3b82f6',
    secondary: '#8b5cf6',
  },
  {
    filename: 'cognolynx-blog-1x1.webp',
    width: 1200,
    height: 1200,
    tag: 'COGNOLYNX INSIGHTS',
    title: 'Cognolynx Engineering Articles',
    subtitle: 'Technical perspectives, systems design, and software methodologies.',
    accent: '#3b82f6',
    secondary: '#8b5cf6',
  },
];

async function generate() {
  console.log(`Generating ${pages.length} page thumbnail images in public/images/...`);

  let logoBuffer = null;
  if (fs.existsSync(logoPath)) {
    logoBuffer = await sharp(logoPath).resize({ width: 220, height: 220, fit: 'inside' }).toBuffer();
  }

  for (const p of pages) {
    const dest = path.resolve(imagesDir, p.filename);
    const w = p.width;
    const h = p.height;

    // Build SVG artwork
    const svgOverlay = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#02040a" />
            <stop offset="50%" stop-color="#080e1c" />
            <stop offset="100%" stop-color="#02040a" />
          </linearGradient>
          <radialGradient id="glowGrad" cx="75%" cy="35%" r="65%">
            <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.35" />
            <stop offset="50%" stop-color="${p.secondary}" stop-opacity="0.12" />
            <stop offset="100%" stop-color="#02040a" stop-opacity="0" />
          </radialGradient>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255, 255, 255, 0.04)" stroke-width="1"/>
          </pattern>
        </defs>

        <!-- Base Background -->
        <rect width="${w}" height="${h}" fill="url(#bgGrad)" />
        <rect width="${w}" height="${h}" fill="url(#glowGrad)" />
        <rect width="${w}" height="${h}" fill="url(#grid)" />

        <!-- Ambient tech line accents -->
        <circle cx="${w * 0.78}" cy="${h * 0.5}" r="220" fill="none" stroke="${p.accent}" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="6 8" />
        <circle cx="${w * 0.78}" cy="${h * 0.5}" r="280" fill="none" stroke="${p.secondary}" stroke-opacity="0.12" stroke-width="1" />
        <line x1="80" y1="${h - 60}" x2="${w - 80}" y2="${h - 60}" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" />

        <!-- Tag badge -->
        <g transform="translate(80, 80)">
          <rect width="210" height="32" rx="16" fill="rgba(255, 255, 255, 0.06)" stroke="${p.accent}" stroke-width="1.2" stroke-opacity="0.5" />
          <circle cx="16" cy="16" r="4" fill="${p.accent}" />
          <text x="32" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5" fill="#ffffff">${p.tag}</text>
        </g>

        <!-- Title and Subtitle -->
        <text x="80" y="${h * 0.46}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.8">
          ${p.title.replace(/&/g, '&amp;')}
        </text>

        <text x="80" y="${h * 0.58}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="400" fill="rgba(255, 255, 255, 0.72)">
          ${p.subtitle.replace(/&/g, '&amp;')}
        </text>

        <!-- Brand Footer -->
        <g transform="translate(80, ${h - 40})">
          <text font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="rgba(255, 255, 255, 0.55)" letter-spacing="0.5">
            COGNOLYNX · HIGH-PERFORMANCE DIGITAL SYSTEMS ARCHITECTURE
          </text>
        </g>
      </svg>
    `;

    const compositeList = [
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ];

    if (logoBuffer) {
      // Position logo on the right chamber
      compositeList.push({
        input: logoBuffer,
        top: Math.round(h * 0.5 - 110),
        left: Math.round(w * 0.78 - 110),
      });
    }

    await sharp({
      create: {
        width: w,
        height: h,
        channels: 4,
        background: { r: 2, g: 4, b: 10, alpha: 1 },
      },
    })
      .composite(compositeList)
      .webp({ quality: 90, effort: 4 })
      .toFile(dest);

    console.log(`Generated: ${p.filename} (${w}x${h})`);
  }

  console.log('All page thumbnail images successfully generated!');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
