import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

import "../../styles/Career.css";

/* =========================================================
   INTERNSHIP DOMAINS
========================================================= */

const domainOptions = [
  "Python Development",
  "Java Development",
  "C / C++ Development",
  "Full Stack Web Development",
  "Frontend Web Development",
  "Backend Web Development",
  "React.js Development",
  "Node.js Development",
  "Mobile App Development",
  "Artificial Intelligence & Machine Learning",
  "Generative AI & LLM",
  "Data Science & Data Analytics",
  "Computer Vision",
  "Natural Language Processing (NLP)",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity & Ethical Hacking",
  "Database Management",
  "UI/UX Design",
  "Software Testing & QA",
  "Internet of Things (IoT)",
  "Embedded Systems",
  "Blockchain & Web3",
  "Game Development",
];

/* =========================================================
   FILE CONFIGURATION
========================================================= */

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* =========================================================
   COMPONENT
========================================================= */

export default function CareerApply() {
  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    domain: "",
    college: "",
    city: "",
    state: "",
    portfolioUrl: "",
    about: "",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     HANDLE INPUT
  ======================================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     HANDLE RESUME
  ======================================================= */

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0] || null;

    setError("");

    if (!file) {
      setResumeFile(null);
      return;
    }

    /* File type */

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setResumeFile(null);

      event.target.value = "";

      setError(
        "Only PDF, DOC, and DOCX files are allowed."
      );

      return;
    }

    /* File size */

    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);

      event.target.value = "";

      setError(
        "Resume size must be 5 MB or smaller."
      );

      return;
    }

    setResumeFile(file);
  };

  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!formData.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!formData.domain) {
      return "Please select an internship domain.";
    }

    if (!formData.college.trim()) {
      return "Please enter your college or university.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.state.trim()) {
      return "Please enter your state.";
    }

    if (!resumeFile) {
      return "Please upload your resume.";
    }

    if (!ALLOWED_FILE_TYPES.includes(resumeFile.type)) {
      return "Only PDF, DOC, and DOCX files are allowed.";
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return "Resume size must be 5 MB or smaller.";
    }

    return "";
  };

  /* =======================================================
     SUBMIT APPLICATION
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    /* -----------------------------------------------
       Frontend validation
    ------------------------------------------------ */

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    let uploadedResumePath = null;

    try {
      /* =================================================
         STEP 1 — CHECK SUPABASE CLIENT
      ================================================= */

      if (!supabase) {
        throw new Error(
          "Supabase is not configured correctly."
        );
      }

      /* =================================================
         STEP 2 — CREATE SAFE FILE NAME
      ================================================= */

      const originalFileName = resumeFile.name;

      const cleanFileName = originalFileName
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/\s+/g, "_")
        .toLowerCase();

      const uniqueFileName =
        `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 10)}-${cleanFileName}`;

      const resumePath =
        `internship/${uniqueFileName}`;

      /* =================================================
         STEP 3 — UPLOAD RESUME
      ================================================= */

      const {
        error: uploadError,
      } = await supabase.storage
        .from("resumes")
        .upload(
          resumePath,
          resumeFile,
          {
            cacheControl: "3600",
            upsert: false,
            contentType: resumeFile.type,
          }
        );

      if (uploadError) {
        throw new Error(
          `Resume upload failed: ${uploadError.message}`
        );
      }

      uploadedResumePath = resumePath;

      /* =================================================
         STEP 4 — SAVE APPLICATION
      ================================================= */

      const applicationPayload = {
        full_name: formData.fullName.trim(),

        phone: formData.phone.trim(),

        email: formData.email
          .trim()
          .toLowerCase(),

        domain: formData.domain,

        college: formData.college.trim(),

        city: formData.city.trim(),

        state: formData.state.trim(),

        linkedin:
          formData.portfolioUrl.trim() || null,

        portfolio:
          formData.portfolioUrl.trim() || null,

        resume_url: uploadedResumePath,

        status: "submitted",
      };

      const {
        error: databaseError,
      } = await supabase
        .from("internship_applications")
        .insert(applicationPayload);

      /* =================================================
         STEP 5 — DATABASE ERROR
      ================================================= */

      if (databaseError) {
        /* Delete resume if database insert failed */

        if (uploadedResumePath) {
          await supabase.storage
            .from("resumes")
            .remove([uploadedResumePath]);
        }

        throw new Error(
          `Application submission failed: ${databaseError.message}`
        );
      }

      /* =================================================
         STEP 6 — SUCCESS
      ================================================= */

      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        domain: "",
        college: "",
        city: "",
        state: "",
        portfolioUrl: "",
        about: "",
      });

      setResumeFile(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (submitError) {
      console.error(
        "Cognolynx internship submission error:",
        submitError
      );

      setError(
        submitError?.message ||
          "Unable to submit your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

  if (submitted) {
    return (
      <>
        <main className="career-page">

          <section
            className="career-hero"
            style={{
              minHeight: "auto",
              padding: "105px 7vw 60px",
            }}
          >
            <div
              className="career-hero-grid"
              aria-hidden="true"
            />

            <div
              className="career-hero-content"
              style={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: "68px",
                  height: "68px",
                  margin: "0 auto 28px",
                  borderRadius: "50%",
                  background: "#1769e0",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Check
                  size={34}
                  strokeWidth={2.4}
                />
              </div>

              <div className="career-eyebrow">
                <span>APPLICATION RECEIVED</span>
                <i />
                COGNOLYNX
              </div>

              <h1
                style={{
                  fontSize:
                    "clamp(3.2rem, 7vw, 7rem)",
                }}
              >
                Thank
                <br />
                <span>you.</span>
              </h1>

              <p
                style={{
                  maxWidth: "560px",
                  margin:
                    "35px auto 0",
                }}
              >
                Your internship application has
                been submitted successfully.
              </p>

              <Link
                to="/careers"
                className="career-primary-button"
                style={{
                  display: "inline-flex",
                  marginTop: "32px",
                }}
              >
                Back to Careers
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

        </main>

        <Footer />
      </>
    );
  }

  /* =======================================================
     MAIN PAGE
  ======================================================= */

  return (
    <>
      <main className="career-page">

        {/* =================================================
            HERO
        ================================================= */}

        <section
          className="career-hero"
          style={{
            minHeight: "auto",
            paddingBottom: "45px",
          }}
        >
          <div
            className="career-hero-grid"
            aria-hidden="true"
          />

          <div className="career-hero-content">

            <Link
              to="/careers"
              className="career-primary-button"
              style={{
                display: "inline-flex",
                width: "fit-content",
                marginBottom: "24px",
                padding: "10px 18px",
                fontSize: "12px",
              }}
            >
              <ArrowLeft size={16} />
              Back to Careers
            </Link>

            <div className="career-eyebrow">
              <span>INTERNSHIP APPLICATION</span>
              <i />
              COGNOLYNX
            </div>

            <h1
              style={{
                fontSize:
                  "clamp(3.2rem, 7vw, 7.5rem)",
              }}
            >
              Apply for
              <br />
              <span>Internship.</span>
            </h1>

            <p
              style={{
                maxWidth: "650px",
              }}
            >
              Submit your details and select
              the domain you would like to work in.
            </p>

          </div>
        </section>

        {/* =================================================
            FORM
        ================================================= */}

        <section
          style={{
            padding:
              "55px 7vw 70px",
            background: "#ffffff",
            borderTop:
              "1px solid #dfe4ea",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >

            <form
              onSubmit={handleSubmit}
              noValidate
            >

              {/* ===========================================
                  DOMAIN
              =========================================== */}

              <div
                style={{
                  marginBottom: "45px",
                }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#303947",
                    fontSize: "12px",
                    fontWeight: 650,
                  }}
                >
                  Internship Domain{" "}
                  <span style={{ color: "#1769e0" }}>
                    *
                  </span>
                </label>

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    height: "54px",
                    padding: "0 16px",
                    border:
                      "1px solid #dfe4ea",
                    borderRadius: "10px",
                    background: "#fbfcfd",
                    color: formData.domain
                      ? "#11151c"
                      : "#8b95a4",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="">
                    Select your preferred domain
                  </option>

                  {domainOptions.map(
                    (domain) => (
                      <option
                        key={domain}
                        value={domain}
                      >
                        {domain}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* ===========================================
                  PERSONAL INFORMATION
              =========================================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(2, minmax(0, 1fr))",
                  gap: "25px 20px",
                  marginBottom: "45px",
                }}
              >

                {/* Full Name */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    Full Name{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={fieldStyle}
                  />
                </div>

                {/* Email */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    Email Address{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    style={fieldStyle}
                  />
                </div>

                {/* Phone */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    Phone / WhatsApp{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    style={fieldStyle}
                  />
                </div>

                {/* College */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    College / University{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college or university"
                    style={fieldStyle}
                  />
                </div>

                {/* City */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    City{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    style={fieldStyle}
                  />
                </div>

                {/* State */}

                <div>
                  <label
                    style={fieldLabelStyle}
                  >
                    State{" "}
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    style={fieldStyle}
                  />
                </div>

              </div>

              {/* ===========================================
                  ONLINE PROFILE
              =========================================== */}

              <div
                style={{
                  marginBottom: "45px",
                }}
              >
                <label
                  style={fieldLabelStyle}
                >
                  LinkedIn / GitHub /
                  Portfolio
                </label>

                <input
                  type="url"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  style={fieldStyle}
                />
              </div>

              {/* ===========================================
                  RESUME
              =========================================== */}

              <div
                style={{
                  marginBottom: "45px",
                }}
              >
                <label
                  style={fieldLabelStyle}
                >
                  Resume{" "}
                  <span>*</span>
                </label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleResumeChange}
                  style={{
                    width: "100%",
                    padding: "14px",
                    border:
                      "1px solid #dfe4ea",
                    borderRadius: "10px",
                    background: "#fbfcfd",
                    fontFamily: "inherit",
                    fontSize: "13px",
                  }}
                />

                <p
                  style={{
                    margin:
                      "8px 0 0",
                    color: "#8b95a4",
                    fontSize: "11px",
                  }}
                >
                  PDF, DOC or DOCX ·
                  Maximum 5 MB
                </p>
              </div>

              {/* ===========================================
                  INTRODUCTION
              =========================================== */}

              <div
                style={{
                  marginBottom: "45px",
                }}
              >
                <label
                  style={fieldLabelStyle}
                >
                  Brief Introduction
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us briefly about your interests, projects, skills, or what you would like to learn."
                  style={{
                    ...fieldStyle,
                    height: "auto",
                    minHeight: "130px",
                    padding:
                      "14px 16px",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* ===========================================
                  ERROR
              =========================================== */}

              {error && (
                <div
                  role="alert"
                  style={{
                    marginBottom: "25px",
                    padding:
                      "14px 16px",
                    border:
                      "1px solid #f0caca",
                    borderRadius: "10px",
                    background:
                      "#fff6f6",
                    color: "#b42318",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </div>
              )}

              {/* ===========================================
                  SUBMIT
              =========================================== */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  gap: "25px",
                  flexWrap: "wrap",
                  paddingTop: "10px",
                  borderTop:
                    "1px solid #dfe4ea",
                }}
              >

                <p
                  style={{
                    margin: 0,
                    maxWidth: "480px",
                    color: "#7a8493",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Please make sure the information
                  provided is accurate before
                  submitting your application.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="career-primary-button"
                  style={{
                    border: "none",
                    minWidth: "190px",
                    padding:
                      "15px 22px",
                    justifyContent:
                      "center",
                    cursor: submitting
                      ? "not-allowed"
                      : "pointer",
                    opacity: submitting
                      ? 0.65
                      : 1,
                  }}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Application"}

                  {!submitting && (
                    <Send size={16} />
                  )}
                </button>

              </div>

            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* =========================================================
   SHARED INLINE FIELD STYLES
========================================================= */

const fieldLabelStyle = {
  display: "block",
  marginBottom: "9px",
  color: "#303947",
  fontSize: "12px",
  fontWeight: 650,
};

fieldLabelStyle.span = {
  color: "#1769e0",
};

const fieldStyle = {
  width: "100%",
  height: "54px",
  padding: "0 16px",
  border: "1px solid #dfe4ea",
  borderRadius: "10px",
  background: "#fbfcfd",
  color: "#11151c",
  fontFamily: "inherit",
  fontSize: "14px",
  outline: "none",
};