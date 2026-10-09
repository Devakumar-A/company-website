import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const templatePath = path.resolve(distDir, 'index.html');

const SITE_URL = 'https://cognolynx.com';

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const routeComponentMap = {
  // Main routes
  '/': './src/pages/Home.jsx',
  '/about': './src/pages/About.jsx',
  '/services': './src/pages/Services.jsx',
  '/solutions': './src/pages/Solutions.jsx',
  '/technology': './src/pages/Technology.jsx',
  '/contact': './src/pages/Contact.jsx',
  '/careers': './src/pages/Career.jsx',
  '/case-studies': './src/pages/CaseStudies.jsx',
  '/blog': './src/pages/Blog.jsx',
  '/privacy-policy': './src/pages/PrivacyPolicy.jsx',
  '/terms-conditions': './src/pages/TermsConditions.jsx',
  '/support': './src/pages/Support.jsx',

  // Solutions
  '/solutions/digital-products': './src/pages/solutions/DigitalProducts.jsx',
  '/solutions/business-systems': './src/pages/solutions/BusinessSystems.jsx',
  '/solutions/ai-systems': './src/pages/solutions/BusinessSystems.jsx',
  '/solutions/mobile-experiences': './src/pages/solutions/MobileExperiences.jsx',
  '/solutions/design-brand': './src/pages/solutions/DesignBrand.jsx',
  '/solutions/growth-marketing': './src/pages/solutions/GrowthMarketing.jsx',

  // Technology
  '/technology/web-engineering': './src/pages/technology/WebEngineering.jsx',
  '/technology/software-systems': './src/pages/technology/SoftwareSystems.jsx',
  '/technology/mobile-development': './src/pages/technology/MobileDevelopment.jsx',
  '/technology/cloud-infrastructure': './src/pages/technology/CloudInfrastructure.jsx',
  '/technology/backend-databases': './src/pages/technology/BackendDatabases.jsx',
  '/technology/design-systems': './src/pages/technology/DesignSystems.jsx',

  // Services: Software Engineering
  '/services/software-engineering': './src/pages/services/software/SoftwareEngineering.jsx',
  '/services/software-engineering/software-development': './src/pages/services/software/SoftwareDevelopment.jsx',
  '/services/software-engineering/web-applications': './src/pages/services/software/WebApplications.jsx',
  '/services/software-engineering/business-software': './src/pages/services/software/BusinessSoftware.jsx',
  '/services/software-engineering/cloud-solutions': './src/pages/services/software/CloudSolutions.jsx',

  // Services: Web & Digital
  '/services/web-digital': './src/pages/services/web/WebDigital.jsx',
  '/services/web-digital/website-development': './src/pages/services/web/WebsiteDevelopment.jsx',
  '/services/web-digital/ecommerce': './src/pages/services/web/Ecommerce.jsx',
  '/services/web-digital/web-platforms': './src/pages/services/web/WebPlatforms.jsx',
  '/services/web-digital/digital-experiences': './src/pages/services/web/DigitalExperiences.jsx',

  // Services: Design & Brand
  '/services/design-brand': './src/pages/services/design/DesignBrand.jsx',
  '/services/design-brand/ui-ux-design': './src/pages/services/design/UIUXDesign.jsx',
  '/services/design-brand/design-systems': './src/pages/services/design/DesignSystems.jsx',
  '/services/design-brand/product-design': './src/pages/services/design/ProductDesign.jsx',
  '/services/design-brand/brand-identity': './src/pages/services/design/BrandIdentity.jsx',

  // Services: Growth & Marketing
  '/services/growth-marketing': './src/pages/services/growth/GrowthMarketing.jsx',
  '/services/growth-marketing/digital-marketing': './src/pages/services/growth/DigitalMarketing.jsx',
  '/services/growth-marketing/performance-marketing': './src/pages/services/growth/PerformanceMarketing.jsx',
  '/services/growth-marketing/lead-generation': './src/pages/services/growth/LeadGeneration.jsx',
  '/services/growth-marketing/content-marketing': './src/pages/services/growth/ContentMarketing.jsx',

  // Utility & private routes
  '/careers/apply': './src/pages/careers/CareerApply.jsx',
  '/careers/job': './src/pages/careers/JobApply.jsx',
  '/certificate/verify': './src/pages/certificate/CertificateVerify.jsx',
  '/404': './src/pages/NotFound.jsx',

  // Alias routes
  '/career': './src/pages/Career.jsx',
  '/career/apply': './src/pages/careers/CareerApply.jsx',
  '/career/job': './src/pages/careers/JobApply.jsx',
  '/certificates/verify': './src/pages/certificate/CertificateVerify.jsx',
  '/verify': './src/pages/certificate/CertificateVerify.jsx',
  '/privacy': './src/pages/PrivacyPolicy.jsx',
  '/terms': './src/pages/TermsConditions.jsx',
  '/technology/web': './src/pages/technology/WebEngineering.jsx',
  '/technology/mobile': './src/pages/technology/MobileDevelopment.jsx',
  '/technology/cloud': './src/pages/technology/CloudInfrastructure.jsx',
  '/technology/data': './src/pages/technology/BackendDatabases.jsx',
  '/technology/creative': './src/pages/technology/DesignSystems.jsx',
  '/services/web': './src/pages/services/web/WebDigital.jsx',
  '/services/web/website-development': './src/pages/services/web/WebsiteDevelopment.jsx',
  '/services/web/ecommerce': './src/pages/services/web/Ecommerce.jsx',
  '/services/web/web-platforms': './src/pages/services/web/WebPlatforms.jsx',
  '/services/web/digital-experiences': './src/pages/services/web/DigitalExperiences.jsx',
  '/services/design': './src/pages/services/design/DesignBrand.jsx',
  '/services/design/ui-ux-design': './src/pages/services/design/UIUXDesign.jsx',
  '/services/design/design-systems': './src/pages/services/design/DesignSystems.jsx',
  '/services/design/product-design': './src/pages/services/design/ProductDesign.jsx',
  '/services/design/graphic-design': './src/pages/services/design/BrandIdentity.jsx',
  '/services/design/brand-identity': './src/pages/services/design/BrandIdentity.jsx',
  '/services/growth': './src/pages/services/growth/GrowthMarketing.jsx',
  '/services/growth/digital-marketing': './src/pages/services/growth/DigitalMarketing.jsx',
  '/services/growth/performance-marketing': './src/pages/services/growth/PerformanceMarketing.jsx',
  '/services/growth/lead-generation': './src/pages/services/growth/LeadGeneration.jsx',
  '/services/growth/content-marketing': './src/pages/services/growth/ContentMarketing.jsx',
};

const aliasMap = {
  '/career': '/careers',
  '/career/apply': '/careers/apply',
  '/career/job': '/careers/job',
  '/certificates/verify': '/certificate/verify',
  '/verify': '/certificate/verify',
  '/privacy': '/privacy-policy',
  '/terms': '/terms-conditions',
  '/technology/web': '/technology/web-engineering',
  '/technology/mobile': '/technology/mobile-development',
  '/technology/cloud': '/technology/cloud-infrastructure',
  '/technology/data': '/technology/backend-databases',
  '/technology/creative': '/technology/design-systems',
  '/services/web': '/services/web-digital',
  '/services/web/website-development': '/services/web-digital/website-development',
  '/services/web/ecommerce': '/services/web-digital/ecommerce',
  '/services/web/web-platforms': '/services/web-digital/web-platforms',
  '/services/web/digital-experiences': '/services/web-digital/digital-experiences',
  '/services/design': '/services/design-brand',
  '/services/design/ui-ux-design': '/services/design-brand/ui-ux-design',
  '/services/design/design-systems': '/services/design-brand/design-systems',
  '/services/design/product-design': '/services/design-brand/product-design',
  '/services/design/graphic-design': '/services/design-brand/brand-identity',
  '/services/design/brand-identity': '/services/design-brand/brand-identity',
  '/services/growth': '/services/growth-marketing',
  '/services/growth/digital-marketing': '/services/growth-marketing/digital-marketing',
  '/services/growth/performance-marketing': '/services/growth-marketing/performance-marketing',
  '/services/growth/lead-generation': '/services/growth-marketing/lead-generation',
  '/services/growth/content-marketing': '/services/growth-marketing/content-marketing',
};

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error('Prerender error: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  console.log('Starting build-time prerendering...');
  const startTime = Date.now();

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: rootDir,
  });

  const { StaticRouter } = await import('react-router-dom');
  const { HelmetProvider } = await import('react-helmet-async');
  const { seoData } = await vite.ssrLoadModule('./src/data/seoData.js');
  const Navbar = (await vite.ssrLoadModule('./src/components/Navbar.jsx')).default;

  const routes = Object.keys(routeComponentMap);
  let renderedCount = 0;

  for (const route of routes) {
    const compPath = routeComponentMap[route];
    const mod = await vite.ssrLoadModule(compPath);
    const Component = mod.default;

    const helmetContext = {};
    const rawHtml = renderToString(
      React.createElement(
        StaticRouter,
        { location: route },
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(Navbar),
          React.createElement(Component)
        )
      )
    );

    // Strip out runtime Helmet-rendered tags from body markup to keep #root clean
    const cleanBodyHtml = rawHtml
      .replace(/<title[^>]*>.*?<\/title>/gi, '')
      .replace(/<meta[^>]*\/?>/gi, '')
      .replace(/<link rel="canonical"[^>]*\/?>/gi, '');

    const targetKey = aliasMap[route] || route;
    const seo = seoData[targetKey] || seoData['/'] || {};

    const resolvedCanonical = seo.canonical === null
      ? null
      : (seo.canonical
          ? (seo.canonical.startsWith('http') ? seo.canonical : `${SITE_URL}${seo.canonical.startsWith('/') ? '' : '/'}${seo.canonical}`)
          : (targetKey === '/' ? SITE_URL : `${SITE_URL}${targetKey}`));

    const robotsContent = seo.noindex ? 'noindex, nofollow' : 'index, follow';

    let pageHtml = templateHtml;

    // Replace Title
    if (seo.title) {
      pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`);
    }

    // Replace Meta Description
    if (seo.description) {
      pageHtml = pageHtml.replace(
        /<meta name="description" content=".*?"\s*\/?>/,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`
      );
    }

    // Replace or Remove Canonical
    if (resolvedCanonical === null) {
      pageHtml = pageHtml.replace(/\s*<link rel="canonical" href=".*?"\s*\/?>/, '');
    } else {
      pageHtml = pageHtml.replace(
        /<link rel="canonical" href=".*?"\s*\/?>/,
        `<link rel="canonical" href="${resolvedCanonical}" />`
      );
    }

    // Replace Robots
    pageHtml = pageHtml.replace(
      /<meta name="robots" content=".*?"\s*\/?>/,
      `<meta name="robots" content="${robotsContent}" />`
    );

    // Replace Open Graph Tags
    if (seo.title) {
      pageHtml = pageHtml.replace(
        /<meta property="og:title" content=".*?"\s*\/?>/,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta name="twitter:title" content=".*?"\s*\/?>/,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
      );
    }
    if (seo.description) {
      pageHtml = pageHtml.replace(
        /<meta property="og:description" content=".*?"\s*\/?>/,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
      );
      pageHtml = pageHtml.replace(
        /<meta name="twitter:description" content=".*?"\s*\/?>/,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
      );
    }
    if (resolvedCanonical === null) {
      pageHtml = pageHtml.replace(/\s*<meta property="og:url" content=".*?"\s*\/?>/, '');
    } else {
      pageHtml = pageHtml.replace(
        /<meta property="og:url" content=".*?"\s*\/?>/,
        `<meta property="og:url" content="${resolvedCanonical}" />`
      );
    }

    // Inject JSON-LD if present
    if (seo.jsonLd) {
      const jsonLdTag = `  <script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>\n  `;
      pageHtml = pageHtml.replace('</head>', `${jsonLdTag}</head>`);
    }

    // Inject Prerendered HTML into #root
    pageHtml = pageHtml.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${cleanBodyHtml}</div>`
    );

    // Determine output file path
    let outFilePath;
    if (route === '/') {
      outFilePath = path.resolve(distDir, 'index.html');
    } else {
      const cleanRoute = route.replace(/^\/+/, '').replace(/\/+$/, '');
      const routeDir = path.resolve(distDir, cleanRoute);
      fs.mkdirSync(routeDir, { recursive: true });
      outFilePath = path.resolve(routeDir, 'index.html');

      // Also create dist/404.html for 404 route
      if (route === '/404') {
        const root404Path = path.resolve(distDir, '404.html');
        fs.writeFileSync(root404Path, pageHtml, 'utf8');
      }
    }

    fs.writeFileSync(outFilePath, pageHtml, 'utf8');
    renderedCount++;
  }

  await vite.close();
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`Prerender complete: ${renderedCount} routes prerendered into dist/ in ${duration}s.`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
