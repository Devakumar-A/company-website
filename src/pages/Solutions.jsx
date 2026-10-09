import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import SolutionsSection from "../sections/Solutions";
import Footer from "../components/Footer";

/**
 * Dedicated /solutions page.
 * Renders the Solutions section as a full standalone page.
 */
export default function SolutionsPage() {
  return (
    <>
      <SEO {...seoData["/solutions"]} />
      <SolutionsSection />
      <Footer />
    </>
  );
}
