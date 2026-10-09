import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";

// Code-split pages for high-performance on-demand loading
const AboutPage = lazy(() => import("./pages/About"));
const ServicesPage = lazy(() => import("./pages/Services"));
const SolutionsPage = lazy(() => import("./pages/Solutions"));
const TechnologyPage = lazy(() => import("./pages/Technology"));
const ContactPage = lazy(() => import("./pages/Contact"));
const Career = lazy(() => import("./pages/Career"));
const CareerApply = lazy(() => import("./pages/careers/CareerApply"));
const JobApply = lazy(() => import("./pages/careers/JobApply"));
const CertificateVerify = lazy(() => import("./pages/certificate/CertificateVerify"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Support = lazy(() => import("./pages/Support"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 1. Software & Engineering
const SoftwareEngineering = lazy(() => import("./pages/services/software/SoftwareEngineering"));
const SoftwareDevelopment = lazy(() => import("./pages/services/software/SoftwareDevelopment"));
const WebApplications = lazy(() => import("./pages/services/software/WebApplications"));
const BusinessSoftware = lazy(() => import("./pages/services/software/BusinessSoftware"));
const CloudSolutions = lazy(() => import("./pages/services/software/CloudSolutions"));

// 2. Web & Digital
const WebDigital = lazy(() => import("./pages/services/web/WebDigital"));
const WebsiteDevelopment = lazy(() => import("./pages/services/web/WebsiteDevelopment"));
const Ecommerce = lazy(() => import("./pages/services/web/Ecommerce"));
const WebPlatforms = lazy(() => import("./pages/services/web/WebPlatforms"));
const DigitalExperiences = lazy(() => import("./pages/services/web/DigitalExperiences"));

// 3. Design & Brand
const DesignBrand = lazy(() => import("./pages/services/design/DesignBrand"));
const UIUXDesign = lazy(() => import("./pages/services/design/UIUXDesign"));
const DesignSystems = lazy(() => import("./pages/services/design/DesignSystems"));
const ProductDesign = lazy(() => import("./pages/services/design/ProductDesign"));
const BrandIdentity = lazy(() => import("./pages/services/design/BrandIdentity"));

// 4. Growth & Marketing
const GrowthMarketing = lazy(() => import("./pages/services/growth/GrowthMarketing"));
const DigitalMarketing = lazy(() => import("./pages/services/growth/DigitalMarketing"));
const PerformanceMarketing = lazy(() => import("./pages/services/growth/PerformanceMarketing"));
const LeadGeneration = lazy(() => import("./pages/services/growth/LeadGeneration"));
const ContentMarketing = lazy(() => import("./pages/services/growth/ContentMarketing"));

// Solutions
const DigitalProducts = lazy(() => import("./pages/solutions/DigitalProducts"));
const BusinessSystems = lazy(() => import("./pages/solutions/BusinessSystems"));
const MobileExperiences = lazy(() => import("./pages/solutions/MobileExperiences"));
const DesignBrandSolution = lazy(() => import("./pages/solutions/DesignBrand"));
const GrowthMarketingSolution = lazy(() => import("./pages/solutions/GrowthMarketing"));

// Technology
const WebEngineering = lazy(() => import("./pages/technology/WebEngineering"));
const SoftwareSystems = lazy(() => import("./pages/technology/SoftwareSystems"));
const MobileDevelopment = lazy(() => import("./pages/technology/MobileDevelopment"));
const CloudInfrastructure = lazy(() => import("./pages/technology/CloudInfrastructure"));
const BackendDatabases = lazy(() => import("./pages/technology/BackendDatabases"));
const DesignSystemsTechnology = lazy(() => import("./pages/technology/DesignSystems"));

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
  );
}
