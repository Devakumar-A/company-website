import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  Loader2,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  ShieldCheck,
  Award,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";
import {
  INTERNSHIP_DOMAINS,
  DOMAIN_SPECIALIZATIONS_MAP,
} from "../../data/internshipDomains";

import "../../styles/CareerApply.css";

/* =========================================================
   FILE CONFIGURATION
========================================================= */

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CareerApply() {
  const fileInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    domain: "",
    specialization: "",
    college: "",
    city: "",
    state: "",
    portfolioUrl: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  const availableSpecializations = formData.domain
    ? DOMAIN_SPECIALIZATIONS_MAP[formData.domain] || []
    : [];

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

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setFormData((previous) => ({
      ...previous,
      domain: selectedDomain,
      specialization: "", // Requirement 4: Immediately reset previously selected specialization
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

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setError("Only PDF, DOC, and DOCX files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setError("Resume size must be 5 MB or smaller.");
      return;
    }

    setResumeFile(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =======================================================
     VALIDATE FORM
  ======================================================= */

  const validateForm = () => {
    if (!formData.domain) {
      return "Please select an internship domain.";
    }

    if (!formData.specialization) {
      return "Please select your specialization.";
    }

    if (!formData.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      return "Please enter your phone or WhatsApp number.";
    }

    if (!formData.college.trim()) {
      return "Please enter your college or university name.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.state.trim()) {
      return "Please enter your state.";
    }

    if (!resumeFile) {
      return "Please upload your resume (PDF, DOC or DOCX).";
    }

    return "";
  };

  /* =======================================================
     SUBMIT APPLICATION
  ======================================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      const errorElement = document.getElementById("intern-error-banner");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);
    let uploadedResumePath = null;

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured correctly.");
      }

      /* Step 1: Create clean file name */
      const originalFileName = resumeFile.name;
      const cleanFileName = originalFileName
        .replace(/[^a-zA-Z0-9._-]/g, "_")
        .replace(/\s+/g, "_")
        .toLowerCase();

      const uniqueFileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}-${cleanFileName}`;

      const resumePath = `internship/${uniqueFileName}`;

      /* Step 2: Upload Resume to Supabase Storage */
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(resumePath, resumeFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: resumeFile.type,
        });

      if (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`);
      }

      uploadedResumePath = resumePath;

      /* Step 3: Insert Application into Database */
      const combinedDomain = `${formData.domain} - ${formData.specialization}`;
      const applicationPayload = {
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
        domain: combinedDomain,
        college: formData.college.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        linkedin: formData.portfolioUrl.trim() || null,
        portfolio: formData.portfolioUrl.trim() || null,
        resume_url: uploadedResumePath,
        status: "submitted",
      };

      let { error: databaseError } = await supabase
        .from("internship_applications")
        .insert({
          ...applicationPayload,
          specialization: formData.specialization,
        });

      if (databaseError) {
        if (
          databaseError.message?.toLowerCase().includes("specialization") ||
          databaseError.code === "PGRST204" ||
          databaseError.code === "42703"
        ) {
          const { error: fallbackError } = await supabase
            .from("internship_applications")
            .insert(applicationPayload);
          databaseError = fallbackError;
        }
      }

      if (databaseError) {
        if (uploadedResumePath) {
          await supabase.storage
            .from("resumes")
            .remove([uploadedResumePath]);
        }
        throw new Error(
          `Application submission failed: ${databaseError.message}`
        );
      }

      /* Step 4: Success */
      setSubmittedData({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        domain: formData.domain,
        specialization: formData.specialization,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });

      setSubmitted(true);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        domain: "",
        specialization: "",
        college: "",
        city: "",
        state: "",
        portfolioUrl: "",
      });

      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (submitError) {
      console.error("Cognolynx internship submission error:", submitError);
      setError(
        submitError?.message ||
          "Unable to submit your application. Please check your internet connection and try again."
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
        <SEO {...seoData["/careers/apply"]} />
        <main className="intern-page">
          <section className="intern-hero" style={{ minHeight: "auto", paddingBottom: "70px" }}>
            <div className="intern-hero-grid" aria-hidden="true" />
            <div className="intern-hero-container">
              <div className="intern-success-card">
                <div className="intern-success-icon-wrap">
                  <Check size={40} strokeWidth={2.6} />
                </div>

                <div className="intern-eyebrow" style={{ justifyContent: "center" }}>
                  <span className="intern-eyebrow-pill">APPLICATION CONFIRMED</span>
                  <span className="intern-eyebrow-dot" />
                  <span>COGNOLYNX INNOVATION</span>
                </div>

                <h1>
                  Application <span>Received!</span>
                </h1>

                <p className="intern-success-desc">
                  Thank you, <strong>{submittedData?.name || "Applicant"}</strong>. Your application for the{" "}
                  <strong>{submittedData?.domain} ({submittedData?.specialization})</strong> internship has been submitted successfully to Cognolynx.
                </p>

                {submittedData && (
                  <div className="intern-success-details">
                    <div className="intern-success-row">
                      <span className="label">Selected Domain:</span>
                      <span className="value">{submittedData.domain}</span>
                    </div>
                    <div className="intern-success-row">
                      <span className="label">Specialization:</span>
                      <span className="value">{submittedData.specialization}</span>
                    </div>
                    <div className="intern-success-row">
                      <span className="label">Registered Email:</span>
                      <span className="value">{submittedData.email}</span>
                    </div>
                    <div className="intern-success-row">
                      <span className="label">Submission Date:</span>
                      <span className="value">{submittedData.date}</span>
                    </div>
                    <div className="intern-success-row">
                      <span className="label">Status:</span>
                      <span className="value" style={{ color: "#16a34a" }}>Under Technical Review</span>
                    </div>
                  </div>
                )}

                <div className="intern-next-steps">
                  <div className="intern-next-steps-title">
                    <Sparkles size={16} />
                    What happens next?
                  </div>
                  <div className="intern-step-item">
                    <div className="intern-step-bullet">1</div>
                    <div>
                      <strong>Application Screening within 24 Hours:</strong> Our technical team will review and screen your application within 24 hours.
                    </div>
                  </div>
                  <div className="intern-step-item">
                    <div className="intern-step-bullet">2</div>
                    <div>
                      <strong>Offer Letter via Email:</strong> Check your given email address ({submittedData?.email || "registered email"}). If you are shortlisted, your official internship offer letter will be sent directly to your mail.
                    </div>
                  </div>
                  <div className="intern-step-item">
                    <div className="intern-step-bullet">3</div>
                    <div>
                      <strong>Check Inbox & Spam Folder:</strong> Please keep an eye on your email inbox and make sure to check your spam/junk folder as well so you don't miss the offer letter or any updates.
                    </div>
                  </div>
                </div>

                <div className="intern-success-actions">
                  <Link to="/careers" className="intern-btn-primary">
                    <ArrowLeft size={16} />
                    Back to Careers
                  </Link>
                  <button
                    type="button"
                    className="intern-btn-secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setError("");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Submit Another Application
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  /* =======================================================
     MAIN APPLICATION PAGE
  ======================================================= */

  return (
    <>
      <SEO {...seoData["/careers/apply"]} />
      <main className="intern-page">
        {/* =================================================
            HERO
        ================================================= */}
        <section className="intern-hero">
          <div className="intern-hero-grid" aria-hidden="true" />
          <div className="intern-hero-container">
            <Link to="/careers" className="intern-back-btn">
              <ArrowLeft size={15} />
              <span>Back to Careers</span>
            </Link>

            <div className="intern-eyebrow">
              <span className="intern-eyebrow-pill">INTERNSHIP PROGRAM</span>
              <span className="intern-eyebrow-dot" />
              <span>COGNOLYNX INNOVATION LABS</span>
            </div>

            <h1>
              Apply for <br />
              <span>Internship.</span>
            </h1>

            <p className="intern-hero-desc">
              Accelerate your engineering journey. Collaborate with experienced mentors on real-world production
              systems, gain hands-on technical mastery, and earn verifiable industry credentials.
            </p>

            <div className="intern-badges-strip">
              <div className="intern-badge-item">
                <span className="intern-badge-icon"><Award size={15} /></span>
                <span>Verified Certificate</span>
              </div>
              <div className="intern-badge-item">
                <span className="intern-badge-icon"><Sparkles size={15} /></span>
                <span>Live Industry Projects</span>
              </div>
              <div className="intern-badge-item">
                <span className="intern-badge-icon"><GraduationCap size={15} /></span>
                <span>Senior Mentorship</span>
              </div>
              <div className="intern-badge-item">
                <span className="intern-badge-icon"><ShieldCheck size={15} /></span>
                <span>100% Free Application</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FORM
        ================================================= */}
        <section className="intern-form-section">
          <div className="intern-form-wrapper">
            {error && (
              <div
                id="intern-error-banner"
                className="intern-error-alert"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* CARD 1: DOMAIN & SPECIALIZATION SELECTION */}
              <div className="intern-form-card">
                <div className="intern-section-header">
                  <div className="intern-step-num">01</div>
                  <div className="intern-step-title">
                    <h2>Choose Your Domain &amp; Specialization</h2>
                    <p>Select your primary technical discipline, then choose your focused specialization track.</p>
                  </div>
                </div>

                <div className="intern-grid-2">
                  {/* Dropdown 1: Main Internship Domain */}
                  <div className="intern-field">
                    <label htmlFor="internDomain" className="intern-label">
                      <span>
                        Select Internship Domain <span className="required">*</span>
                      </span>
                      <span className="optional">{INTERNSHIP_DOMAINS.length} domains</span>
                    </label>

                    <select
                      id="internDomain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleDomainChange}
                      className="intern-select"
                      required
                      aria-label="Select Internship Domain"
                      aria-required="true"
                    >
                      <option value="">Select Internship Domain</option>
                      {INTERNSHIP_DOMAINS.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                    <p className="intern-field-hint">
                      Choose your primary technical discipline.
                    </p>
                  </div>

                  {/* Dropdown 2: Dependent Specialization */}
                  <div className="intern-field">
                    <label htmlFor="internSpecialization" className="intern-label">
                      <span>
                        Select Specialization <span className="required">*</span>
                      </span>
                      <span className="optional">
                        {formData.domain
                          ? `${availableSpecializations.length} tracks`
                          : "Select domain first"}
                      </span>
                    </label>

                    <select
                      id="internSpecialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="intern-select"
                      disabled={!formData.domain}
                      required
                      aria-label="Select Specialization"
                      aria-required="true"
                    >
                      <option value="">
                        {formData.domain ? "Choose a specialization" : "Select a domain first"}
                      </option>
                      {availableSpecializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    <p className="intern-field-hint">
                      {formData.domain
                        ? "Projects and mentor assignments will be tailored to this track."
                        : "Select an internship domain above to unlock specialization options."}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: CANDIDATE INFORMATION */}
              <div className="intern-form-card">
                <div className="intern-section-header">
                  <div className="intern-step-num">02</div>
                  <div className="intern-step-title">
                    <h2>Personal & Academic Details</h2>
                    <p>Please enter your contact information and educational background accurately.</p>
                  </div>
                </div>

                <div className="intern-grid-2">
                  {/* Full Name */}
                  <div className="intern-field">
                    <label htmlFor="internFullName" className="intern-label">
                      <span>Full Name <span className="required">*</span></span>
                    </label>
                    <input
                      id="internFullName"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="intern-input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="intern-field">
                    <label htmlFor="internEmail" className="intern-label">
                      <span>Email Address <span className="required">*</span></span>
                    </label>
                    <input
                      id="internEmail"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="intern-input"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="intern-field">
                    <label htmlFor="internPhone" className="intern-label">
                      <span>Phone / WhatsApp <span className="required">*</span></span>
                    </label>
                    <input
                      id="internPhone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="intern-input"
                      autoComplete="tel"
                      required
                    />
                  </div>

                  {/* College */}
                  <div className="intern-field">
                    <label htmlFor="internCollege" className="intern-label">
                      <span>College / University <span className="required">*</span></span>
                    </label>
                    <input
                      id="internCollege"
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="e.g. Stanford University / IIT"
                      className="intern-input"
                      required
                    />
                  </div>

                  {/* City */}
                  <div className="intern-field">
                    <label htmlFor="internCity" className="intern-label">
                      <span>City <span className="required">*</span></span>
                    </label>
                    <input
                      id="internCity"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Bengaluru / San Francisco"
                      className="intern-input"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  {/* State */}
                  <div className="intern-field">
                    <label htmlFor="internState" className="intern-label">
                      <span>State / Province <span className="required">*</span></span>
                    </label>
                    <input
                      id="internState"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Karnataka / California"
                      className="intern-input"
                      autoComplete="address-level1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: LINKS & RESUME */}
              <div className="intern-form-card">
                <div className="intern-section-header">
                  <div className="intern-step-num">03</div>
                  <div className="intern-step-title">
                    <h2>Portfolio & Resume</h2>
                    <p>Provide your online profile link and upload an updated resume.</p>
                  </div>
                </div>

                <div className="intern-grid-1">
                  {/* Portfolio URL */}
                  <div className="intern-field">
                    <label htmlFor="internPortfolio" className="intern-label">
                      <span>LinkedIn, GitHub, or Portfolio Link</span>
                      <span className="optional">Optional</span>
                    </label>
                    <input
                      id="internPortfolio"
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourname or github.com/yourname"
                      className="intern-input"
                    />
                    <p className="intern-field-hint">
                      Adding your GitHub profile or live project links increases selection probability.
                    </p>
                  </div>

                  {/* Resume Upload */}
                  <div className="intern-field" style={{ marginTop: "8px" }}>
                    <label htmlFor="internResume" className="intern-label">
                      <span>
                        Resume / CV <span className="required">*</span>
                      </span>
                      <span className="optional">PDF, DOC, DOCX up to 5 MB</span>
                    </label>

                    {!resumeFile ? (
                      <div className="intern-upload-box">
                        <input
                          ref={fileInputRef}
                          id="internResume"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleResumeChange}
                          className="intern-upload-input"
                          aria-label="Upload your resume"
                        />
                        <div className="intern-upload-content">
                          <div className="intern-upload-icon-circle">
                            <UploadCloud size={24} strokeWidth={2} />
                          </div>
                          <div className="intern-upload-text">
                            <span>Click to upload</span> or drag and drop your resume
                          </div>
                          <div className="intern-upload-subtext">
                            PDF, DOC, or DOCX files accepted (Max size 5 MB)
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="intern-file-selected-card">
                        <div className="intern-file-info">
                          <div className="intern-file-badge">
                            <FileText size={20} />
                          </div>
                          <div className="intern-file-details">
                            <div className="intern-file-name" title={resumeFile.name}>
                              {resumeFile.name}
                            </div>
                            <div className="intern-file-size">
                              {formatFileSize(resumeFile.size)} • Ready for submission
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="intern-file-remove-btn"
                          onClick={handleRemoveResume}
                          title="Remove and select different file"
                          aria-label="Remove uploaded file"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUBMIT FOOTER */}
                <div className="intern-form-footer">
                  <div className="intern-footer-info">
                    <ShieldCheck size={20} />
                    <span>
                      Your submission is private and protected. Cognolynx reviews every candidate profile individually.
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="internship-submit-btn"
                    id="internship-form-submit-btn"
                    aria-label={submitting ? "Submitting application" : "Submit internship application"}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="intern-btn-spinner" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}