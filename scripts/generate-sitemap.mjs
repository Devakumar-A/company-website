import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { seoData } from '../src/data/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const sitemapDistPath = path.resolve(distDir, 'sitemap.xml');
const sitemapPublicPath = path.resolve(rootDir, 'public', 'sitemap.xml');

const SITE_URL = 'https://cognolynx.tech';

const routeComponentMap = {
  '/': 'src/pages/Home.jsx',
  '/about': 'src/pages/About.jsx',
  '/services': 'src/pages/Services.jsx',
  '/solutions': 'src/pages/Solutions.jsx',
  '/technology': 'src/pages/Technology.jsx',
  '/contact': 'src/pages/Contact.jsx',
  '/careers': 'src/pages/Career.jsx',
  '/case-studies': 'src/pages/CaseStudies.jsx',
  '/blog': 'src/pages/Blog.jsx',
  '/privacy-policy': 'src/pages/PrivacyPolicy.jsx',
  '/terms-conditions': 'src/pages/TermsConditions.jsx',
  '/support': 'src/pages/Support.jsx',
  '/faq': 'src/pages/FAQ.jsx',


  '/solutions/digital-products': 'src/pages/solutions/DigitalProducts.jsx',
  '/solutions/business-systems': 'src/pages/solutions/BusinessSystems.jsx',
  '/solutions/ai-systems': 'src/pages/solutions/BusinessSystems.jsx',
  '/solutions/mobile-experiences': 'src/pages/solutions/MobileExperiences.jsx',
  '/solutions/design-brand': 'src/pages/solutions/DesignBrand.jsx',
  '/solutions/growth-marketing': 'src/pages/solutions/GrowthMarketing.jsx',

  '/technology/web-engineering': 'src/pages/technology/WebEngineering.jsx',
  '/technology/software-systems': 'src/pages/technology/SoftwareSystems.jsx',
  '/technology/mobile-development': 'src/pages/technology/MobileDevelopment.jsx',
  '/technology/cloud-infrastructure': 'src/pages/technology/CloudInfrastructure.jsx',
  '/technology/backend-databases': 'src/pages/technology/BackendDatabases.jsx',
  '/technology/design-systems': 'src/pages/technology/DesignSystems.jsx',

  '/services/software-engineering': 'src/pages/services/software/SoftwareEngineering.jsx',
  '/services/software-engineering/software-development': 'src/pages/services/software/SoftwareDevelopment.jsx',
  '/services/software-engineering/ai-automation': 'src/pages/services/software/AiAutomation.jsx',
  '/services/software-engineering/mobile-app-development': 'src/pages/services/software/MobileAppDevelopment.jsx',
  '/services/software-engineering/web-applications': 'src/pages/services/software/WebApplications.jsx',
  '/services/software-engineering/business-software': 'src/pages/services/software/BusinessSoftware.jsx',
  '/services/software-engineering/cloud-solutions': 'src/pages/services/software/CloudSolutions.jsx',

  '/services/web-digital': 'src/pages/services/web/WebDigital.jsx',
  '/services/web-digital/website-development': 'src/pages/services/web/WebsiteDevelopment.jsx',
  '/services/web-digital/ecommerce': 'src/pages/services/web/Ecommerce.jsx',
  '/services/web-digital/web-platforms': 'src/pages/services/web/WebPlatforms.jsx',
  '/services/web-digital/digital-experiences': 'src/pages/services/web/DigitalExperiences.jsx',

  '/services/design-brand': 'src/pages/services/design/DesignBrand.jsx',
  '/services/design-brand/ui-ux-design': 'src/pages/services/design/UIUXDesign.jsx',
  '/services/design-brand/design-systems': 'src/pages/services/design/DesignSystems.jsx',
  '/services/design-brand/product-design': 'src/pages/services/design/ProductDesign.jsx',
  '/services/design-brand/brand-identity': 'src/pages/services/design/BrandIdentity.jsx',

  '/services/growth-marketing': 'src/pages/services/growth/GrowthMarketing.jsx',
  '/services/growth-marketing/digital-marketing': 'src/pages/services/growth/DigitalMarketing.jsx',
  '/services/growth-marketing/performance-marketing': 'src/pages/services/growth/PerformanceMarketing.jsx',
  '/services/growth-marketing/lead-generation': 'src/pages/services/growth/LeadGeneration.jsx',
  '/services/growth-marketing/content-marketing': 'src/pages/services/growth/ContentMarketing.jsx',
};

function getFileLastmod(relativeFilePath) {
  if (!relativeFilePath) return null;
  try {
    // Exclude SEO-only commits to find the last commit that changed actual page content
    const gitDate = execSync(
      `git log --invert-grep --grep="^feat(seo)" -1 --format=%cs -- "${relativeFilePath}"`,
      {
        cwd: rootDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }
    ).trim();
    return gitDate || null;
  } catch {
    return null;
  }
}

const routeImageMap = {
  '/': { loc: `${SITE_URL}/images/cognolynx-engineering-platform.webp`, title: 'Cognolynx Custom Software and AI Product Engineering Platform' },
  '/about': { loc: `${SITE_URL}/images/cognolynx-about-studio.webp`, title: 'Cognolynx Engineering Studio and Technology Philosophy' },
  '/services': { loc: `${SITE_URL}/images/cognolynx-technology-services.webp`, title: 'Cognolynx Modern Technology Services' },
  '/solutions': { loc: `${SITE_URL}/images/cognolynx-digital-solutions.webp`, title: 'Cognolynx Intelligent Digital Solutions' },

  '/blog': { loc: `${SITE_URL}/images/cognolynx-blog-16x9.webp`, title: 'Cognolynx Engineering Insights and Architecture Articles' },
};

function generateSitemap() {
  console.log('Generating sitemap.xml...');

  // Filter ONLY indexable routes (exclude noindex: true and /404)
  const indexableRoutes = Object.keys(seoData).filter((route) => {
    const item = seoData[route];
    if (item.noindex === true) return false;
    if (route === '/404' || item.path === '/404') return false;
    return true;
  });

  const urlEntries = [];
  const distinctLastmods = new Set();

  for (const route of indexableRoutes) {
    const item = seoData[route];
    const canonicalUrl = item.canonical
      ? (item.canonical.startsWith('http') ? item.canonical : `${SITE_URL}${item.canonical.startsWith('/') ? '' : '/'}${item.canonical}`)
      : (route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`);

    const compFile = routeComponentMap[route];
    const lastmod = getFileLastmod(compFile);
    if (lastmod) {
      distinctLastmods.add(lastmod);
    }

    const lastmodElement = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';

    const imgData = routeImageMap[route];
    const imageElement = imgData
      ? `\n    <image:image>\n      <image:loc>${imgData.loc}</image:loc>\n      <image:title>${imgData.title}</image:title>\n    </image:image>`
      : '';

    urlEntries.push(`  <url>
    <loc>${canonicalUrl}</loc>${lastmodElement}${imageElement}
  </url>`);
  }

  console.log(`Distinct lastmod values in sitemap: ${distinctLastmods.size} (${Array.from(distinctLastmods).join(', ') || 'none'})`);

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('\n')}
</urlset>
`;

  if (fs.existsSync(distDir)) {
    fs.writeFileSync(sitemapDistPath, sitemapXml, 'utf8');
    console.log(`Saved sitemap to ${sitemapDistPath} (${indexableRoutes.length} URLs)`);
  }
  // Also keep in public/ so dev/preview builds have it
  fs.writeFileSync(sitemapPublicPath, sitemapXml, 'utf8');
  console.log(`Saved sitemap to ${sitemapPublicPath}`);
}

generateSitemap();
