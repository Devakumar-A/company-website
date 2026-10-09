import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Solutions from "../sections/Solutions";
import Technology from "../sections/Technology";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="hero-about-flow">
        <Hero />
        <About />
      </div>

      <Services />

      <Solutions />

      <Technology />

      <Footer />
    </>
  );
}
