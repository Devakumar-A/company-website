import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <SEO {...seoData["/404"]} />
      <main className="not-found-main">
        <section className="not-found-hero">
          <div className="not-found-content">
            <div className="not-found-code">
              <span>4</span>
              <div className="not-found-orbit">
                <div className="not-found-orbit-dot"></div>
              </div>
              <span>4</span>
            </div>

            <p className="not-found-label">PAGE NOT FOUND</p>

            <h1>
              This page
              <br />
              <span>doesn’t exist.</span>
            </h1>

            <p className="not-found-description">
              The page you’re looking for may have been moved, removed, or the
              URL may be incorrect.
            </p>

            <div className="not-found-actions">
              <Link
                to="/"
                className="not-found-primary"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Back to Home
                <ArrowUpRight size={18} strokeWidth={2} />
              </Link>

              <button
                className="not-found-secondary"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={17} strokeWidth={2} />
                Go Back
              </button>
            </div>
          </div>

          <div className="not-found-background">
            <div className="not-found-grid"></div>

            <div className="not-found-circle circle-one"></div>
            <div className="not-found-circle circle-two"></div>
            <div className="not-found-circle circle-three"></div>

            <div className="not-found-brand">
              COGNOLYNX
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;