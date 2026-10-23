import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Helper to allow preloading lazy route components before hydration,
// ensuring prerendered HTML is not blanked by Suspense on first load.
function lazyWithPreload(factory) {
  let LoadedComponent = null;
  let factoryPromise = null;

  const preload = () => {
    if (!factoryPromise) {
      factoryPromise = factory()
        .then((module) => {
          LoadedComponent = module.default || module;
          return module;
        })
        .catch((err) => {
          factoryPromise = null;
          throw err;
        });
    }
    return factoryPromise;
  };

  const LazyComponent = lazy(preload);

  function PreloadedComponent(props) {
    if (LoadedComponent) {
      return <LoadedComponent {...props} />;
    }
    return <LazyComponent {...props} />;
  }

  PreloadedComponent.preload = preload;
  return PreloadedComponent;
}

const AboutPage = lazyWithPreload(() => import("./pages/About"));
const ServicesPage = lazyWithPreload(() => import("./pages/Services"));
const SolutionsPage = lazyWithPreload(() => import("./pages/Solutions"));
const TechnologyPage = lazyWithPreload(() => import("./pages/Technology"));
const ContactPage = lazyWithPreload(() => import("./pages/Contact"));
const Career = lazyWithPreload(() => import("./pages/Career"));
const CareerApply = lazyWithPreload(() => import("./pages/careers/CareerApply"));
const JobApply = lazyWithPreload(() => import("./pages/careers/JobApply"));
const CertificateVerify = lazyWithPreload(() => import("./pages/certificate/CertificateVerify"));
const PrivacyPolicy = lazyWithPreload(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazyWithPreload(() => import("./pages/TermsConditions"));
const Support = lazyWithPreload(() => import("./pages/Support"));
const FAQ = lazyWithPreload(() => import("./pages/FAQ"));
const CaseStudies = lazyWithPreload(() => import("./pages/CaseStudies"));
const Blog = lazyWithPreload(() => import("./pages/Blog"));
const NotFound = lazyWithPreload(() => import("./pages/NotFound"));

// 1. Software & Engineering
const SoftwareEngineering = lazyWithPreload(() => import("./pages/services/software/SoftwareEngineering"));
const SoftwareDevelopment = lazyWithPreload(() => import("./pages/services/software/SoftwareDevelopment"));
const WebApplications = lazyWithPreload(() => import("./pages/services/software/WebApplications"));
const BusinessSoftware = lazyWithPreload(() => import("./pages/services/software/BusinessSoftware"));
const CloudSolutions = lazyWithPreload(() => import("./pages/services/software/CloudSolutions"));

// 2. Web & Digital
const WebDigital = lazyWithPreload(() => import("./pages/services/web/WebDigital"));
const WebsiteDevelopment = lazyWithPreload(() => import("./pages/services/web/WebsiteDevelopment"));
const Ecommerce = lazyWithPreload(() => import("./pages/services/web/Ecommerce"));
const WebPlatforms = lazyWithPreload(() => import("./pages/services/web/WebPlatforms"));
const DigitalExperiences = lazyWithPreload(() => import("./pages/services/web/DigitalExperiences"));

// 3. Design & Brand
const DesignBrand = lazyWithPreload(() => import("./pages/services/design/DesignBrand"));
const UIUXDesign = lazyWithPreload(() => import("./pages/services/design/UIUXDesign"));
const DesignSystems = lazyWithPreload(() => import("./pages/services/design/DesignSystems"));
const ProductDesign = lazyWithPreload(() => import("./pages/services/design/ProductDesign"));
const BrandIdentity = lazyWithPreload(() => import("./pages/services/design/BrandIdentity"));

// 4. Growth & Marketing
const GrowthMarketing = lazyWithPreload(() => import("./pages/services/growth/GrowthMarketing"));
const DigitalMarketing = lazyWithPreload(() => import("./pages/services/growth/DigitalMarketing"));
const PerformanceMarketing = lazyWithPreload(() => import("./pages/services/growth/PerformanceMarketing"));
const LeadGeneration = lazyWithPreload(() => import("./pages/services/growth/LeadGeneration"));
const ContentMarketing = lazyWithPreload(() => import("./pages/services/growth/ContentMarketing"));

// Solutions
const DigitalProducts = lazyWithPreload(() => import("./pages/solutions/DigitalProducts"));
const BusinessSystems = lazyWithPreload(() => import("./pages/solutions/BusinessSystems"));
const MobileExperiences = lazyWithPreload(() => import("./pages/solutions/MobileExperiences"));
const DesignBrandSolution = lazyWithPreload(() => import("./pages/solutions/DesignBrand"));
const GrowthMarketingSolution = lazyWithPreload(() => import("./pages/solutions/GrowthMarketing"));

// Technology
const WebEngineering = lazyWithPreload(() => import("./pages/technology/WebEngineering"));
const SoftwareSystems = lazyWithPreload(() => import("./pages/technology/SoftwareSystems"));
const MobileDevelopment = lazyWithPreload(() => import("./pages/technology/MobileDevelopment"));
const CloudInfrastructure = lazyWithPreload(() => import("./pages/technology/CloudInfrastructure"));
const BackendDatabases = lazyWithPreload(() => import("./pages/technology/BackendDatabases"));
const DesignSystemsTechnology = lazyWithPreload(() => import("./pages/technology/DesignSystems"));

const routePreloadMap = {
  "/about": AboutPage,
  "/services": ServicesPage,
  "/solutions": SolutionsPage,
  "/technology": TechnologyPage,
  "/contact": ContactPage,
  "/careers": Career,
  "/career": Career,
  "/careers/apply": CareerApply,
  "/career/apply": CareerApply,
  "/careers/job": JobApply,
  "/career/job": JobApply,
  "/certificate/verify": CertificateVerify,
  "/certificates/verify": CertificateVerify,
  "/verify": CertificateVerify,
  "/privacy-policy": PrivacyPolicy,
  "/privacy": PrivacyPolicy,
  "/terms-conditions": TermsConditions,
  "/terms": TermsConditions,
  "/support": Support,
  "/faq": FAQ,
  "/faqs": FAQ,
  "/case-studies": CaseStudies,
  "/blog": Blog,

  // Solutions
  "/solutions/digital-products": DigitalProducts,
  "/solutions/business-systems": BusinessSystems,
  "/solutions/ai-systems": BusinessSystems,
  "/solutions/mobile-experiences": MobileExperiences,
  "/solutions/design-brand": DesignBrandSolution,
  "/solutions/growth-marketing": GrowthMarketingSolution,

  // Technology
  "/technology/web-engineering": WebEngineering,
  "/technology/web": WebEngineering,
  "/technology/software-systems": SoftwareSystems,
  "/technology/mobile-development": MobileDevelopment,
  "/technology/mobile": MobileDevelopment,
  "/technology/cloud-infrastructure": CloudInfrastructure,
  "/technology/cloud": CloudInfrastructure,
  "/technology/backend-databases": BackendDatabases,
  "/technology/data": BackendDatabases,
  "/technology/design-systems": DesignSystemsTechnology,
  "/technology/creative": DesignSystemsTechnology,

  // Services: Software
  "/services/software-engineering": SoftwareEngineering,
  "/services/software-engineering/software-development": SoftwareDevelopment,
  "/services/software-engineering/web-applications": WebApplications,
  "/services/software-engineering/business-software": BusinessSoftware,
  "/services/software-engineering/cloud-solutions": CloudSolutions,

  // Services: Web
  "/services/web-digital": WebDigital,
  "/services/web": WebDigital,
  "/services/web-digital/website-development": WebsiteDevelopment,
  "/services/web/website-development": WebsiteDevelopment,
  "/services/web-digital/ecommerce": Ecommerce,
  "/services/web/ecommerce": Ecommerce,
  "/services/web-digital/web-platforms": WebPlatforms,
  "/services/web/web-platforms": WebPlatforms,
  "/services/web-digital/digital-experiences": DigitalExperiences,
  "/services/web/digital-experiences": DigitalExperiences,

  // Services: Design
  "/services/design-brand": DesignBrand,
  "/services/design": DesignBrand,
  "/services/design-brand/ui-ux-design": UIUXDesign,
  "/services/design/ui-ux-design": UIUXDesign,
  "/services/design-brand/design-systems": DesignSystems,
  "/services/design/design-systems": DesignSystems,
  "/services/design-brand/product-design": ProductDesign,
  "/services/design/product-design": ProductDesign,
  "/services/design-brand/graphic-design": ProductDesign,
  "/services/design-brand/brand-identity": BrandIdentity,
  "/services/design/brand-identity": BrandIdentity,

  // Services: Growth
  "/services/growth-marketing": GrowthMarketing,
  "/services/growth": GrowthMarketing,
  "/services/growth-marketing/digital-marketing": DigitalMarketing,
  "/services/growth/digital-marketing": DigitalMarketing,
  "/services/growth-marketing/performance-marketing": PerformanceMarketing,
  "/services/growth/performance-marketing": PerformanceMarketing,
  "/services/growth-marketing/lead-generation": LeadGeneration,
  "/services/growth/lead-generation": LeadGeneration,
  "/services/growth-marketing/content-marketing": ContentMarketing,
  "/services/growth/content-marketing": ContentMarketing,
};

export async function preloadRoute(pathname) {
  const cleanPath = (pathname || "").replace(/\/$/, "") || "/";
  if (cleanPath === "/") return;
  const targetComponent = routePreloadMap[cleanPath];
  if (targetComponent?.preload) {
    await targetComponent.preload();
  } else if (NotFound?.preload) {
    await NotFound.preload();
  }
}

// Always scroll to top upon route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

// Lightweight route transition spinner matching dark theme
function PageLoadingFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000009",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-busy="true"
      aria-label="Loading page"
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          border: "2px solid rgba(255, 255, 255, 0.12)",
          borderTopColor: "#6366f1",
          borderRadius: "50%",
          animation: "cg-spin 0.6s linear infinite",
        }}
      />
      <style>{`@keyframes cg-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
      <Navbar />

      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route
              path="/solutions/digital-products"
              element={<DigitalProducts />}
            />
            <Route
              path="/solutions/business-systems"
              element={<BusinessSystems />}
            />
            <Route
              path="/solutions/ai-systems"
              element={<BusinessSystems />}
            />
            <Route
              path="/solutions/mobile-experiences"
              element={<MobileExperiences />}
            />
            <Route
              path="/solutions/design-brand"
              element={<DesignBrandSolution />}
            />
            <Route
              path="/solutions/growth-marketing"
              element={<GrowthMarketingSolution />}
            />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route
              path="/technology/web-engineering"
              element={<WebEngineering />}
            />
            <Route
              path="/technology/software-systems"
              element={<SoftwareSystems />}
            />
            <Route
              path="/technology/mobile-development"
              element={<MobileDevelopment />}
            />
            <Route
              path="/technology/cloud-infrastructure"
              element={<CloudInfrastructure />}
            />
            <Route
              path="/technology/backend-databases"
              element={<BackendDatabases />}
            />
            <Route
              path="/technology/design-systems"
              element={<DesignSystemsTechnology />}
            />
            {/* Technology aliases */}
            <Route
              path="/technology/web"
              element={<WebEngineering />}
            />
            <Route
              path="/technology/mobile"
              element={<MobileDevelopment />}
            />
            <Route
              path="/technology/cloud"
              element={<CloudInfrastructure />}
            />
            <Route
              path="/technology/data"
              element={<BackendDatabases />}
            />
            <Route
              path="/technology/creative"
              element={<DesignSystemsTechnology />}
            />
            <Route path="/contact" element={<ContactPage />} />

            {/* Careers */}
            <Route path="/careers" element={<Career />} />
            <Route path="/career" element={<Career />} />
            <Route path="/careers/apply" element={<CareerApply />} />
            <Route path="/career/apply" element={<CareerApply />} />
            <Route path="/careers/job" element={<JobApply />} />
            <Route path="/career/job" element={<JobApply />} />

            {/* Certificate Verification */}
            <Route
              path="/certificate/verify"
              element={<CertificateVerify />}
            />
            <Route
              path="/certificates/verify"
              element={<CertificateVerify />}
            />
            <Route
              path="/verify"
              element={<CertificateVerify />}
            />

            {/* Legal & Support */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/privacy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/terms-conditions"
              element={<TermsConditions />}
            />
            <Route
              path="/terms"
              element={<TermsConditions />}
            />
            <Route
              path="/support"
              element={<Support />}
            />
            <Route
              path="/faq"
              element={<FAQ />}
            />
            <Route
              path="/faqs"
              element={<FAQ />}
            />

            {/* Case Studies */}
            <Route
              path="/case-studies"
              element={<CaseStudies />}
            />

            {/* Blog */}
            <Route
              path="/blog"
              element={<Blog />}
            />

            {/* 1. Software & Engineering */}
            <Route
              path="/services/software-engineering"
              element={<SoftwareEngineering />}
            />
            <Route
              path="/services/software-engineering/software-development"
              element={<SoftwareDevelopment />}
            />
            <Route
              path="/services/software-engineering/web-applications"
              element={<WebApplications />}
            />
            <Route
              path="/services/software-engineering/business-software"
              element={<BusinessSoftware />}
            />
            <Route
              path="/services/software-engineering/cloud-solutions"
              element={<CloudSolutions />}
            />

            {/* 2. Web & Digital */}
            <Route
              path="/services/web-digital"
              element={<WebDigital />}
            />
            <Route
              path="/services/web-digital/website-development"
              element={<WebsiteDevelopment />}
            />
            <Route
              path="/services/web-digital/ecommerce"
              element={<Ecommerce />}
            />
            <Route
              path="/services/web-digital/web-platforms"
              element={<WebPlatforms />}
            />
            <Route
              path="/services/web-digital/digital-experiences"
              element={<DigitalExperiences />}
            />
            {/* Web & Digital aliases */}
            <Route path="/services/web" element={<WebDigital />} />
            <Route
              path="/services/web/website-development"
              element={<WebsiteDevelopment />}
            />
            <Route
              path="/services/web/ecommerce"
              element={<Ecommerce />}
            />
            <Route
              path="/services/web/web-platforms"
              element={<WebPlatforms />}
            />
            <Route
              path="/services/web/digital-experiences"
              element={<DigitalExperiences />}
            />

            {/* 3. Design & Brand */}
            <Route
              path="/services/design-brand"
              element={<DesignBrand />}
            />
            <Route
              path="/services/design-brand/ui-ux-design"
              element={<UIUXDesign />}
            />
            <Route
              path="/services/design-brand/design-systems"
              element={<DesignSystems />}
            />
            <Route
              path="/services/design-brand/product-design"
              element={<ProductDesign />}
            />
            <Route
              path="/services/design-brand/graphic-design"
              element={<ProductDesign />}
            />
            <Route
              path="/services/design-brand/brand-identity"
              element={<BrandIdentity />}
            />
            {/* Design & Brand aliases */}
            <Route path="/services/design" element={<DesignBrand />} />
            <Route
              path="/services/design/ui-ux-design"
              element={<UIUXDesign />}
            />
            <Route
              path="/services/design/design-systems"
              element={<DesignSystems />}
            />
            <Route
              path="/services/design/product-design"
              element={<ProductDesign />}
            />
            <Route
              path="/services/design/brand-identity"
              element={<BrandIdentity />}
            />

            {/* 4. Growth & Marketing */}
            <Route
              path="/services/growth-marketing"
              element={<GrowthMarketing />}
            />
            <Route
              path="/services/growth-marketing/digital-marketing"
              element={<DigitalMarketing />}
            />
            <Route
              path="/services/growth-marketing/performance-marketing"
              element={<PerformanceMarketing />}
            />
            <Route
              path="/services/growth-marketing/lead-generation"
              element={<LeadGeneration />}
            />
            <Route
              path="/services/growth-marketing/content-marketing"
              element={<ContentMarketing />}
            />
            {/* Growth & Marketing aliases */}
            <Route path="/services/growth" element={<GrowthMarketing />} />
            <Route
              path="/services/growth/digital-marketing"
              element={<DigitalMarketing />}
            />
            <Route
              path="/services/growth/performance-marketing"
              element={<PerformanceMarketing />}
            />
            <Route
              path="/services/growth/lead-generation"
              element={<LeadGeneration />}
            />
            <Route
              path="/services/growth/content-marketing"
              element={<ContentMarketing />}
            />

            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
