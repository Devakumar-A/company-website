import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Send,
  UploadCloud,
  FileText,
  X,
  AlertCircle,
  ShieldCheck,
  Briefcase,
  Sparkles,
  Zap,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

import "../../styles/JobApply.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function JobApply() {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    position: "",
    qualification: "",
    experience: "",
    company: "",
    skills: "",
    linkedin: "",
    portfolio: "",
    expectedSalary: "",
    noticePeriod: "",
    introduction: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  /* =========================
     HANDLE INPUT CHANGES
  ========================= */

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

  /* =========================
     HANDLE RESUME
  ========================= */

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
      setError("Please upload your resume in PDF, DOC, or DOCX format.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setError("Resume size must be 5 MB or less.");
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

  /* =========================
     FORM VALIDATION
  ========================= */

  const validateForm = () => {
    const experienceStr =
      formData.experience !== null && formData.experience !== undefined
        ? String(formData.experience).trim()
        : "";

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return false;
    }

    if (!formData.position.trim()) {
      setError("Please specify the position you are applying for.");
      return false;
    }

    if (!formData.qualification.trim()) {
      setError("Please enter your highest qualification.");
      return false;
    }

    if (!experienceStr) {
      setError("Years of experience is required.");
      return false;
    }

    const expNumber = Number(experienceStr);
    if (Number.isNaN(expNumber) || expNumber < 1) {
      setError("Experience should be equal to or greater than 1 year.");
      return false;
    }

    if (!formData.skills.trim()) {
      setError("Please provide your key technical or professional skills.");
      return false;
    }

    if (!resumeFile) {
      setError("Please upload your resume (PDF, DOC or DOCX).");
      return false;
    }

    if (!formData.introduction.trim()) {
      setError("Please write a short introduction about yourself.");
      return false;
    }

    if (formData.linkedin.trim()) {
      try {
        new URL(formData.linkedin.trim());
      } catch {
        setError("Please enter a valid LinkedIn URL (e.g. https://linkedin.com/in/username).");
        return false;
      }
    }

    if (formData.portfolio.trim()) {
      try {
        new URL(formData.portfolio.trim());
      } catch {
        setError("Please enter a valid GitHub or Portfolio URL (e.g. https://github.com/username).");
        return false;
      }
    }

    return true;
  };

  /* =========================
     SUBMIT APPLICATION (BACKEND EXACT PRESERVED)
  ========================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    const valid = validateForm();
    if (!valid) {
      const errorElement = document.getElementById("job-error-banner");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setSubmitting(true);

    try {
      console.log("Starting job application submission...");

      /* Create unique, safe file path */
      const fileExtension =
        resumeFile.name.split(".").pop()?.toLowerCase() || "pdf";

      const safeName = formData.fullName
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const uniqueId = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;

      const resumePath = `jobs/${safeName || "applicant"}-${uniqueId}.${fileExtension}`;

      console.log("Uploading resume:", resumePath);

      /* STEP 1: Upload resume to Supabase storage bucket 'resumes' */
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(resumePath, resumeFile, {
          cacheControl: "3600",
          upsert: false,
          contentType: resumeFile.type,
        });

      if (uploadError) {
        console.error("Resume upload error:", uploadError);
        throw new Error(
          uploadError.message ||
            "Unable to upload your resume. Please try again."
        );
      }

      console.log("Resume uploaded successfully.");

      /* STEP 2: Insert application into Supabase table 'job_applications' */
      const applicationData = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        position: formData.position.trim(),
        qualification: formData.qualification.trim(),
        experience_years: Number(formData.experience),
        company: formData.company.trim() || null,
        skills: formData.skills.trim(),
        linkedin: formData.linkedin.trim() || null,
        portfolio: formData.portfolio.trim() || null,
        expected_salary: formData.expectedSalary.trim() || null,
        notice_period: formData.noticePeriod || null,
        resume_url: resumePath,
        introduction: formData.introduction.trim(),
        status: "submitted",
      };

      console.log("Sending application to Supabase...", applicationData);

      const { error: databaseError } = await supabase
        .from("job_applications")
        .insert(applicationData);

      if (databaseError) {
        console.error("Database error:", databaseError);
        if (resumePath) {
          await supabase.storage.from("resumes").remove([resumePath]);
        }
        throw new Error(
          databaseError.message ||
            "Unable to save your application. Please try again."
        );
      }

      console.log("Job application submitted successfully.");

      /* STEP 3: Save submitted preview data and show success */
      setSubmittedData({
        name: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        position: formData.position.trim(),
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
        city: "",
        position: "",
        qualification: "",
        experience: "",
        company: "",
        skills: "",
        linkedin: "",
        portfolio: "",
        expectedSalary: "",
        noticePeriod: "",
        introduction: "",
      });

      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (submissionError) {
      console.error(
        "Job application submission failed:",
        submissionError
      );

      setError(
        submissionError?.message ||
          "Something went wrong while submitting your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================
     SUCCESS SCREEN
  ========================= */

  if (submitted) {
    return (
      <>
        <SEO {...seoData["/careers/job"]} />
        <main className="job-apply-page">
          <section className="job-apply-success">
            <div className="job-success-container">
              <div className="job-success-icon">
                <Check size={40} strokeWidth={2.6} />
              </div>

              <div className="job-apply-label" style={{ justifyContent: "center" }}>
                <span className="job-eyebrow-pill">APPLICATION CONFIRMED</span>
                <span className="job-eyebrow-dot" />
                <span>COGNOLYNX CAREERS</span>
              </div>

              <h1>
                Application <span>Received!</span>
              </h1>

              <p className="job-success-desc">
                Thank you, <strong>{submittedData?.name || "Applicant"}</strong>. Your application for the{" "}
                <strong>{submittedData?.position}</strong> role has been successfully submitted to Cognolynx.
              </p>

              {submittedData && (
                <div className="job-success-details">
                  <div className="job-success-row">
                    <span className="label">Position Applied:</span>
                    <span className="value">{submittedData.position}</span>
                  </div>
                  <div className="job-success-row">
                    <span className="label">Registered Email:</span>
                    <span className="value">{submittedData.email}</span>
                  </div>
                  <div className="job-success-row">
                    <span className="label">Submission Date:</span>
                    <span className="value">{submittedData.date}</span>
                  </div>
                  <div className="job-success-row">
                    <span className="label">Status:</span>
                    <span className="value" style={{ color: "#16a34a" }}>Under Technical Review</span>
                  </div>
                </div>
              )}

              <div className="job-next-steps">
                <div className="job-next-steps-title">
                  <Sparkles size={16} />
                  What happens next?
                </div>
                <div className="job-step-item">
                  <div className="job-step-bullet">1</div>
                  <div>
                    <strong>Profile & Portfolio Review:</strong> Our engineering leads and hiring team review your experience and past project track record within 2–3 business days.
                  </div>
                </div>
                <div className="job-step-item">
                  <div className="job-step-bullet">2</div>
                  <div>
                    <strong>Technical Discussion:</strong> Qualified candidates receive an official invitation via email with interview schedule and assessment details.
                  </div>
                </div>
                <div className="job-step-item">
                  <div className="job-step-bullet">3</div>
                  <div>
                    <strong>Check Inbox & Spam Folder:</strong> Please keep an eye on your email inbox ({submittedData?.email || "provided"}) and remember to check your spam/junk folder so you never miss an update.
                  </div>
                </div>
              </div>

              <div className="job-success-actions">
                <Link to="/careers" className="job-btn-primary">
                  <ArrowLeft size={16} />
                  Back to Careers
                </Link>

                <button
                  type="button"
                  className="job-btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setError("");
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  Submit Another Application
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  /* =========================
     MAIN APPLICATION FORM
  ========================= */

  return (
    <>
      <SEO {...seoData["/careers/job"]} />
      <main className="job-apply-page">
        {/* =================================================
            HERO
        ================================================= */}
        <section className="job-apply-hero">
          <div className="job-apply-grid" aria-hidden="true" />

          <div className="job-apply-container">
            <Link to="/careers" className="job-back-link">
              <ArrowLeft size={15} />
              <span>Back to Careers</span>
            </Link>

            <div className="job-apply-label">
              <span className="job-eyebrow-pill">CAREER OPPORTUNITIES</span>
              <span className="job-eyebrow-dot" />
              <span>COGNOLYNX ENGINEERING</span>
            </div>

            <h1>
              Build the Future with <br />
              <span>Cognolynx.</span>
            </h1>

            <p className="job-apply-desc">
              Work alongside forward-thinking engineers and architects. Build mission-critical software,
              solve deep technical problems, and elevate your professional career in an ambitious engineering culture.
            </p>

            <div className="job-badges-strip">
              <div className="job-badge-item">
                <span className="job-badge-icon"><Briefcase size={15} /></span>
                <span>High-Impact Systems</span>
              </div>
              <div className="job-badge-item">
                <span className="job-badge-icon"><Sparkles size={15} /></span>
                <span>Rapid Engineering Growth</span>
              </div>
              <div className="job-badge-item">
                <span className="job-badge-icon"><Zap size={15} /></span>
                <span>Competitive Compensation</span>
              </div>
              <div className="job-badge-item">
                <span className="job-badge-icon"><Globe size={15} /></span>
                <span>Remote / Hybrid Friendly</span>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FORM SECTION
        ================================================= */}
        <section className="job-form-section">
          <div className="job-form-container">
            {error && (
              <div
                id="job-error-banner"
                className="job-form-error"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form
              className="job-application-form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* CARD 1: ROLE & PERSONAL DETAILS */}
              <div className="job-form-card">
                <div className="job-section-header">
                  <div className="job-step-num">01</div>
                  <div className="job-step-title">
                    <h2>Personal & Role Details</h2>
                    <p>Enter your contact details and the specific technical position you are applying for.</p>
                  </div>
                </div>

                <div className="job-grid-2">
                  {/* FULL NAME */}
                  <div className="job-field">
                    <label htmlFor="jobFullName" className="job-label">
                      <span>Full Name <span className="required">*</span></span>
                    </label>
                    <input
                      id="jobFullName"
                      name="fullName"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="job-input"
                      autoComplete="name"
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="job-field">
                    <label htmlFor="jobEmail" className="job-label">
                      <span>Email Address <span className="required">*</span></span>
                    </label>
                    <input
                      id="jobEmail"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="job-input"
                      autoComplete="email"
                      required
                    />
                  </div>

                  {/* PHONE */}
                  <div className="job-field">
                    <label htmlFor="jobPhone" className="job-label">
                      <span>Phone Number <span className="required">*</span></span>
                    </label>
                    <input
                      id="jobPhone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="job-input"
                      autoComplete="tel"
                      required
                    />
                  </div>

                  {/* CITY */}
                  <div className="job-field">
                    <label htmlFor="jobCity" className="job-label">
                      <span>City <span className="required">*</span></span>
                    </label>
                    <input
                      id="jobCity"
                      name="city"
                      type="text"
                      placeholder="e.g. Bengaluru / San Francisco"
                      value={formData.city}
                      onChange={handleChange}
                      className="job-input"
                      autoComplete="address-level2"
                      required
                    />
                  </div>

                  {/* POSITION */}
                  <div className="job-field">
                    <label htmlFor="position" className="job-label">
                      <span>Position Applying For <span className="required">*</span></span>
                    </label>
                    <input
                      id="position"
                      name="position"
                      type="text"
                      placeholder="e.g. Senior Full Stack Engineer"
                      value={formData.position}
                      onChange={handleChange}
                      className="job-input"
                      required
                    />
                  </div>

                  {/* QUALIFICATION */}
                  <div className="job-field">
                    <label htmlFor="qualification" className="job-label">
                      <span>Highest Qualification <span className="required">*</span></span>
                    </label>
                    <input
                      id="qualification"
                      name="qualification"
                      type="text"
                      placeholder="e.g. B.Tech / M.S. in Computer Science"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="job-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: EXPERIENCE & TECHNICAL BACKGROUND */}
              <div className="job-form-card">
                <div className="job-section-header">
                  <div className="job-step-num">02</div>
                  <div className="job-step-title">
                    <h2>Experience & Background</h2>
                    <p>Highlight your industry experience, current organization, and core technical skillsets.</p>
                  </div>
                </div>

                <div className="job-grid-2">
                  {/* EXPERIENCE */}
                  <div className="job-field">
                    <label htmlFor="experience" className="job-label">
                      <span>Years of Experience <span className="required">*</span></span>
                      <span className="optional">Min. 1 year</span>
                    </label>
                    <input
                      id="experience"
                      name="experience"
                      type="number"
                      min="1"
                      step="0.1"
                      placeholder="e.g. 3.5"
                      value={formData.experience}
                      onChange={handleChange}
                      className="job-input"
                      required
                    />
                    <p className="job-field-hint">
                      Requires at least 1 year of professional work experience.
                    </p>
                  </div>

                  {/* COMPANY */}
                  <div className="job-field">
                    <label htmlFor="company" className="job-label">
                      <span>Current / Previous Company</span>
                      <span className="optional">Optional</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="e.g. Acme Tech Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className="job-input"
                    />
                  </div>

                  {/* NOTICE PERIOD */}
                  <div className="job-field">
                    <label htmlFor="notice" className="job-label">
                      <span>Notice Period</span>
                      <span className="optional">Availability</span>
                    </label>
                    <select
                      id="notice"
                      name="noticePeriod"
                      value={formData.noticePeriod}
                      onChange={handleChange}
                      className="job-select"
                    >
                      <option value="">Select notice period</option>
                      <option value="Immediate">Immediate / Serving Notice</option>
                      <option value="15 days">15 Days</option>
                      <option value="30 days">30 Days</option>
                      <option value="60 days">60 Days</option>
                      <option value="90 days">90 Days</option>
                    </select>
                  </div>

                  {/* SALARY */}
                  <div className="job-field">
                    <label htmlFor="salary" className="job-label">
                      <span>Expected Salary</span>
                      <span className="optional">CTC per annum</span>
                    </label>
                    <input
                      id="salary"
                      name="expectedSalary"
                      type="text"
                      placeholder="e.g. ₹8,00,000 / $90,000"
                      value={formData.expectedSalary}
                      onChange={handleChange}
                      className="job-input"
                    />
                  </div>

                  {/* SKILLS */}
                  <div className="job-field job-field-full">
                    <label htmlFor="skills" className="job-label">
                      <span>Key Technical Skills <span className="required">*</span></span>
                      <span className="optional">Comma-separated</span>
                    </label>
                    <textarea
                      id="skills"
                      name="skills"
                      rows="3"
                      placeholder="e.g. React, Node.js, TypeScript, PostgreSQL, AWS, Docker, GraphQL, System Design"
                      value={formData.skills}
                      onChange={handleChange}
                      className="job-textarea"
                      required
                    />
                    <p className="job-field-hint">
                      Include frameworks, databases, cloud tools, or methodologies you specialize in.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: LINKS, RESUME & SUBMIT */}
              <div className="job-form-card">
                <div className="job-section-header">
                  <div className="job-step-num">03</div>
                  <div className="job-step-title">
                    <h2>Links, Resume & Introduction</h2>
                    <p>Share your professional profiles, upload your latest resume, and add a short introduction.</p>
                  </div>
                </div>

                <div className="job-grid-2">
                  {/* LINKEDIN */}
                  <div className="job-field">
                    <label htmlFor="jobLinkedin" className="job-label">
                      <span>LinkedIn Profile</span>
                      <span className="optional">Recommended</span>
                    </label>
                    <input
                      id="jobLinkedin"
                      name="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="job-input"
                    />
                  </div>

                  {/* PORTFOLIO */}
                  <div className="job-field">
                    <label htmlFor="jobPortfolio" className="job-label">
                      <span>GitHub / Portfolio</span>
                      <span className="optional">Recommended</span>
                    </label>
                    <input
                      id="jobPortfolio"
                      name="portfolio"
                      type="url"
                      placeholder="https://github.com/yourhandle"
                      value={formData.portfolio}
                      onChange={handleChange}
                      className="job-input"
                    />
                  </div>

                  {/* RESUME UPLOAD */}
                  <div className="job-field job-field-full" style={{ marginTop: "4px" }}>
                    <label htmlFor="jobResume" className="job-label">
                      <span>
                        Resume / CV <span className="required">*</span>
                      </span>
                      <span className="optional">PDF, DOC, DOCX up to 5 MB</span>
                    </label>

                    {!resumeFile ? (
                      <div className="job-upload-box">
                        <input
                          ref={fileInputRef}
                          id="jobResume"
                          name="resume"
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleResumeChange}
                          className="job-upload-input"
                          aria-label="Upload your resume"
                        />
                        <div className="job-upload-content">
                          <div className="job-upload-icon-circle">
                            <UploadCloud size={24} strokeWidth={2} />
                          </div>
                          <div className="job-upload-text">
                            <span>Click to upload</span> or drag and drop your resume
                          </div>
                          <div className="job-upload-subtext">
                            PDF, DOC, or DOCX files accepted (Max size 5 MB)
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="job-file-selected-card">
                        <div className="job-file-info">
                          <div className="job-file-badge">
                            <FileText size={20} />
                          </div>
                          <div className="job-file-details">
                            <div className="job-file-name" title={resumeFile.name}>
                              {resumeFile.name}
                            </div>
                            <div className="job-file-size">
                              {formatFileSize(resumeFile.size)} • Ready for submission
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="job-file-remove-btn"
                          onClick={handleRemoveResume}
                          title="Remove and select different file"
                          aria-label="Remove uploaded file"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* INTRODUCTION */}
                  <div className="job-field job-field-full" style={{ marginTop: "4px" }}>
                    <label htmlFor="introduction" className="job-label">
                      <span>Short Introduction <span className="required">*</span></span>
                    </label>
                    <textarea
                      id="introduction"
                      name="introduction"
                      rows="4"
                      placeholder="Briefly tell us about yourself, key career accomplishments, and what you can bring to Cognolynx."
                      value={formData.introduction}
                      onChange={handleChange}
                      className="job-textarea"
                      required
                    />
                  </div>
                </div>

                {/* FOOTER & SUBMIT BUTTON */}
                <div className="job-form-footer">
                  <div className="job-footer-info">
                    <ShieldCheck size={20} />
                    <span>
                      Applications are kept strictly confidential and reviewed directly by Cognolynx technical leadership.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="job-submit-button"
                    disabled={submitting}
                    id="job-form-submit-btn"
                    aria-label={submitting ? "Submitting application" : "Submit job application"}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={18}
                          className="job-submit-spinner"
                        />
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