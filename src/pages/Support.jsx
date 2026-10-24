import React, { useEffect, useState } from "react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/Support.css";

const supportCategories = [
  {
    number: "01",
    title: "Internship Support",
    description:
      "Questions about internship applications, tasks, submissions, or completion.",
  },
  {
    number: "02",
    title: "Job Application Support",
    description:
      "Need help with a job application or application-related issue?",
  },
  {
    number: "03",
    title: "Certificate Support",
    description:
      "Having trouble verifying or accessing a Cognolynx certificate?",
  },
  {
    number: "04",
    title: "Technical Support",
    description:
      "Report a website issue or another technical problem.",
  },
];

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Bot detection via honeypot field: silently absorb
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const cleanName = formData.name.trim();
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanSubject = formData.subject.trim();
    const cleanMessage = formData.message.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !cleanName ||
      cleanName.length > 100 ||
      !cleanEmail ||
      cleanEmail.length > 254 ||
      !emailRegex.test(cleanEmail) ||
      !formData.category ||
      !cleanSubject ||
      cleanSubject.length > 150 ||
      !cleanMessage ||
      cleanMessage.length > 3000
    ) {
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <SEO {...seoData["/support"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Support" }]} />
      <main className="support-page">

        {/* =========================
            HERO
        ========================== */}

        <section className="support-hero">
          <div className="support-container">

            <span className="support-eyebrow">
              SUPPORT
            </span>

            <h1>
              How can we
              <span> help?</span>
            </h1>

            <p>
              Have a question, facing an issue, or need
              assistance with something related to Cognolynx?
              Tell us what you need and we'll point you in
              the right direction.
            </p>

          </div>
        </section>


        {/* =========================
            SUPPORT CATEGORIES
        ========================== */}

        <section className="support-categories">
          <div className="support-container">

            <div className="support-section-heading">
              <span>GET HELP</span>

              <h2>
                Choose a support area.
              </h2>
            </div>


            <div className="support-category-grid">

              {supportCategories.map((item) => (
                <article
                  className="support-category-card"
                  key={item.number}
                >

                  <span className="support-card-number">
                    {item.number}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </article>
              ))}

            </div>

          </div>
        </section>


        {/* =========================
            SUPPORT FORM
        ========================== */}

        <section className="support-form-section">
          <div className="support-container support-form-layout">

            <div className="support-form-intro">

              <span className="support-eyebrow">
                CONTACT SUPPORT
              </span>

              <h2>
                Send us a
                <span> request.</span>
              </h2>

              <p>
                Tell us what you're experiencing. Include
                enough detail for us to understand the issue
                and respond appropriately.
              </p>

              <div className="support-response-note">
                <strong>Before submitting</strong>

                <p>
                  Please check that your email address is
                  correct so we can respond to your request.
                </p>
              </div>

            </div>


            <div className="support-form-wrapper">

              {submitted ? (
                <div className="support-success">

                  <div className="support-success-icon">
                    ✓
                  </div>

                  <h3>
                    Request received.
                  </h3>

                  <p>
                    Your support request has been recorded
                    successfully.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Request
                  </button>

                </div>
              ) : (
                <form
                  className="support-form"
                  onSubmit={handleSubmit}
                >
                  {/* Invisible bot honeypot input */}
                  <input
                    type="text"
                    name="company_reference_hp"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />

                  <div className="support-field-grid">

                    <div className="support-field">
                      <label htmlFor="name">
                        Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        maxLength={100}
                        required
                      />
                    </div>


                    <div className="support-field">
                      <label htmlFor="email">
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        maxLength={254}
                        required
                      />
                    </div>

                  </div>


                  <div className="support-field">
                    <label htmlFor="category">
                      Support Category
                    </label>

                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">
                        Select a category
                      </option>

                      <option value="Internship Support">
                        Internship Support
                      </option>

                      <option value="Job Application Support">
                        Job Application Support
                      </option>

                      <option value="Certificate Support">
                        Certificate Support
                      </option>

                      <option value="Technical Support">
                        Technical Support
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>


                  <div className="support-field">
                    <label htmlFor="subject">
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What do you need help with?"
                      maxLength={150}
                      required
                    />
                  </div>


                  <div className="support-field">
                    <label htmlFor="message">
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your issue or question..."
                      rows="7"
                      maxLength={3000}
                      required
                    />
                  </div>


                  <button
                    type="submit"
                    className="support-submit-button"
                  >
                    Submit Request
                  </button>

                </form>
              )}

            </div>

          </div>
        </section>


        {/* =========================
            QUICK HELP
        ========================== */}

        <section className="support-help">
          <div className="support-container">

            <div className="support-help-card">

              <div>
                <span className="support-eyebrow">
                  QUICK HELP
                </span>

                <h2>
                  Looking for something specific?
                </h2>
              </div>

              <div className="support-help-links">

                <a href="/careers">
                  Internship &amp; Careers
                  <span>↗</span>
                </a>

                <a href="/certificate/verify">
                  Certificate Verification
                  <span>↗</span>
                </a>

                <a href="/privacy-policy">
                  Privacy Policy
                  <span>↗</span>
                </a>

                <a href="/terms-conditions">
                  Terms &amp; Conditions
                  <span>↗</span>
                </a>

              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}