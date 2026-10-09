import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import ServicesSection from "../sections/Services";
import Footer from "../components/Footer";

/**
 * Dedicated /services page.
 * Renders the Services section as a full standalone page.
 */
export default function ServicesPage() {
  return (
    <>
      <SEO {...seoData["/services"]} />
      <ServicesSection />
      <Footer />
    </>
  );
}
