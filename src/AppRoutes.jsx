import { Routes, Route } from "react-router-dom";

// 1. Software & Engineering
import SoftwareEngineering from "./pages/services/software/SoftwareEngineering";
import SoftwareDevelopment from "./pages/services/software/SoftwareDevelopment";
import WebApplications from "./pages/services/software/WebApplications";
import BusinessSoftware from "./pages/services/software/BusinessSoftware";
import CloudSolutions from "./pages/services/software/CloudSolutions";

// 2. Web & Digital
import WebDigital from "./pages/services/web/WebDigital";
import WebsiteDevelopment from "./pages/services/web/WebsiteDevelopment";
import Ecommerce from "./pages/services/web/Ecommerce";
import WebPlatforms from "./pages/services/web/WebPlatforms";
import DigitalExperiences from "./pages/services/web/DigitalExperiences";

// 3. Design & Brand
import DesignBrand from "./pages/services/design/DesignBrand";
import UIUXDesign from "./pages/services/design/UIUXDesign";
import DesignSystems from "./pages/services/design/DesignSystems";
import ProductDesign from "./pages/services/design/ProductDesign";
import BrandIdentity from "./pages/services/design/BrandIdentity";

// 4. Growth & Marketing
import GrowthMarketing from "./pages/services/growth/GrowthMarketing";
import DigitalMarketing from "./pages/services/growth/DigitalMarketing";
import PerformanceMarketing from "./pages/services/growth/PerformanceMarketing";
import LeadGeneration from "./pages/services/growth/LeadGeneration";
import ContentMarketing from "./pages/services/growth/ContentMarketing";

// Solutions
import SolutionsPage from "./pages/Solutions";
import DigitalProducts from "./pages/solutions/DigitalProducts";
import BusinessSystems from "./pages/solutions/BusinessSystems";
import MobileExperiences from "./pages/solutions/MobileExperiences";
import DesignBrandSolution from "./pages/solutions/DesignBrand";
import GrowthMarketingSolution from "./pages/solutions/GrowthMarketing";

// Technology
import TechnologyPage from "./pages/Technology";
import WebEngineering from "./pages/technology/WebEngineering";
import SoftwareSystems from "./pages/technology/SoftwareSystems";
import MobileDevelopment from "./pages/technology/MobileDevelopment";
import CloudInfrastructure from "./pages/technology/CloudInfrastructure";
import BackendDatabases from "./pages/technology/BackendDatabases";
import DesignSystemsTechnology from "./pages/technology/DesignSystems";

// Career
import Career from "./pages/Career";
import CareerApply from "./pages/CareerApply";

export default function AppRoutes() {
  return (
    <Routes>
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
        path="/services/design-brand/brand-identity"
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

      {/* Solutions */}
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

      {/* Technology */}
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

      {/* Career */}
      <Route path="/careers" element={<Career />} />
      <Route path="/career" element={<Career />} />
      <Route path="/careers/apply" element={<CareerApply />} />
      <Route path="/career/apply" element={<CareerApply />} />
    </Routes>
  );
}
