import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import TechnologySection from "../sections/Technology";
import Footer from "../components/Footer";

/**
 * Dedicated /technology page.
 * Renders the Technology section as a full standalone page.
 */
export default function TechnologyPage() {
  return (
    <>
      <SEO {...seoData["/technology"]} />
      <TechnologySection />
      <Footer />
    </>
  );
}
