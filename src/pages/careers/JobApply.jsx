import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";

import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";

import "../../styles/JobApply.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function JobApply() {
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
    const file = event.target.files?.[0];

    setError("");

    if (!file) {
      setResumeFile(null);
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setResumeFile(null);
      event.target.value = "";

      setError("Please upload your resume in PDF, DOC, or DOCX format.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);
      event.target.value = "";

      setError("Resume size must be 5 MB or less.");
      return;
    }

    setResumeFile(file);
  };

  /* =========================
     FORM VALIDATION
  ========================= */

  const validateForm = () => {
    /* =========================
       EXPERIENCE VALIDATION (Immediate check if < 1)
    ========================= */

    const experienceStr =
      formData.experience !== null && formData.experience !== undefined
        ? String(formData.experience).trim()
        : "";

    if (experienceStr !== "") {
      const expNumber = Number(experienceStr);
      if (Number.isNaN(expNumber) || expNumber < 1) {
        setError("Experience should be equal to or greater than 1 year.");
        return false;
      }
    }

    if (!formData.fullName.trim()) {
      setError("Full Name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email Address is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!formData.phone.trim()) {
      setError("Phone Number is required.");
      return false;
    }

    if (!formData.city.trim()) {
      setError("City is required.");
      return false;
    }

    if (!formData.position.trim()) {
      setError("Position Applying For is required.");
      return false;
    }

    if (!formData.qualification.trim()) {
      setError("Highest Qualification is required.");
      return false;
    }

    if (!experienceStr) {
      setError("Years of Experience is required.");
      return false;
    }

    const expNumber = Number(experienceStr);

    if (Number.isNaN(expNumber) || expNumber < 1) {
      setError("Experience should be equal to or greater than 1 year.");
      return false;
    }

    if (!formData.skills.trim()) {
      setError("Key Skills is required.");
      return false;
    }

    if (!resumeFile) {
      setError("Please upload your resume.");
      return false;
    }

    if (!formData.introduction.trim()) {
      setError("Short Introduction is required.");
      return false;
    }

    /* =========================
       URL VALIDATION
    ========================= */

    if (formData.linkedin.trim()) {
      try {
        new URL(formData.linkedin.trim());
      } catch {
        setError("Please enter a valid LinkedIn URL.");
        return false;
      }
    }

    if (formData.portfolio.trim()) {
      try {
        new URL(formData.portfolio.trim());
      } catch {
        setError("Please enter a valid GitHub or Portfolio URL.");
        return false;
      }
    }

    return true;
  };

  /* =========================
     SUBMIT APPLICATION
  ========================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    /* Validate before doing anything */
    const valid = validateForm();

    if (!valid) {
      return;
    }

    setSubmitting(true);

    try {
      console.log("Starting job application submission...");

      /* =========================
         CREATE UNIQUE FILE NAME
      ========================= */

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

      /* =========================
         UPLOAD RESUME
      ========================= */

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
            "Unable to upload the resume. Please try again."
        );
      }

      console.log("Resume uploaded successfully.");

      /* =========================
         INSERT APPLICATION
      ========================= */

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

      console.log("Sending application to Supabase...");
      console.log(applicationData);

      const { error: databaseError } = await supabase
        .from("job_applications")
        .insert(applicationData);

      if (databaseError) {
        console.error("Database error:", databaseError);

        throw new Error(
          databaseError.message ||
            "Unable to save your application."
        );
      }

      console.log("Job application submitted successfully.");

      /* =========================
         SUCCESS
      ========================= */

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

      const resumeInput = document.getElementById("jobResume");

      if (resumeInput) {
        resumeInput.value = "";
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
                <Check size={30} strokeWidth={2} />
              </div>

              <span className="job-apply-label">
                CAREERS <span>/</span> APPLICATION RECEIVED
              </span>

              <h1>
                Thank you for
                <br />
                <span>applying.</span>
              </h1>

              <p>
                Your application has been successfully submitted to
                Cognolynx. Our team will review your profile and
                contact you if your experience matches a suitable
                opportunity.
              </p>

              <div className="job-success-actions">
                <Link to="/careers" className="job-back-link">
                  <ArrowLeft size={16} />
                  Back to Careers
                </Link>

                <button
                  type="button"
                  className="job-submit-button"
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
                  <ArrowRight size={17} />
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
     MAIN FORM
  ========================= */

  return (
    <>
      <SEO {...seoData["/careers/job"]} />
      <main className="job-apply-page">
        <section className="job-apply-hero">
          <div className="job-apply-grid" />

          <div className="job-apply-container">
            <Link to="/careers" className="job-back-link">
              <ArrowLeft size={16} />
              Careers
            </Link>

            <div className="job-apply-label">
              CAREERS <span>/</span> JOB APPLICATION
            </div>

            <h1>
              Work with
              <br />
              <span>Cognolynx.</span>
            </h1>

            <p>
              Tell us about your experience, skills and the role you
              are interested in.
            </p>
          </div>
        </section>

        <section className="job-form-section">
          <div className="job-form-container">
            <div className="job-form-heading">
              <span>01 / APPLICATION</span>
              <h2>Professional details.</h2>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div
                className="job-form-error"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <form
              className="job-application-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="job-form-grid">

                {/* FULL NAME */}

                <div className="job-field">
                  <label htmlFor="jobFullName">
                    Full Name <span>*</span>
                  </label>

                  <input
                    id="jobFullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>

                {/* EMAIL */}

                <div className="job-field">
                  <label htmlFor="jobEmail">
                    Email Address <span>*</span>
                  </label>

                  <input
                    id="jobEmail"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>

                {/* PHONE */}

                <div className="job-field">
                  <label htmlFor="jobPhone">
                    Phone Number <span>*</span>
                  </label>

                  <input
                    id="jobPhone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />
                </div>

                {/* CITY */}

                <div className="job-field">
                  <label htmlFor="jobCity">
                    City <span>*</span>
                  </label>

                  <input
                    id="jobCity"
                    name="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleChange}
                    autoComplete="address-level2"
                  />
                </div>

                {/* POSITION */}

                <div className="job-field">
                  <label htmlFor="position">
                    Position Applying For <span>*</span>
                  </label>

                  <input
                    id="position"
                    name="position"
                    type="text"
                    placeholder="e.g. Full Stack Developer"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>

                {/* QUALIFICATION */}

                <div className="job-field">
                  <label htmlFor="qualification">
                    Highest Qualification <span>*</span>
                  </label>

                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    placeholder="e.g. B.Tech Computer Science"
                    value={formData.qualification}
                    onChange={handleChange}
                  />
                </div>

                {/* EXPERIENCE */}

                <div className="job-field">
                  <label htmlFor="experience">
                    Years of Experience <span>*</span>
                  </label>

                  <input
                    id="experience"
                    name="experience"
                    type="number"
                    min="1"
                    step="0.1"
                    placeholder="e.g. 2"
                    value={formData.experience}
                    onChange={handleChange}
                  />

                  <small>
                    Minimum 1 year of professional experience
                    required.
                  </small>
                </div>

                {/* COMPANY */}

                <div className="job-field">
                  <label htmlFor="company">
                    Current / Previous Company
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                {/* SKILLS */}

                <div className="job-field job-field-full">
                  <label htmlFor="skills">
                    Key Skills <span>*</span>
                  </label>

                  <textarea
                    id="skills"
                    name="skills"
                    rows="4"
                    placeholder="List your key technical or professional skills"
                    value={formData.skills}
                    onChange={handleChange}
                  />
                </div>

                {/* LINKEDIN */}

                <div className="job-field">
                  <label htmlFor="jobLinkedin">
                    LinkedIn Profile
                  </label>

                  <input
                    id="jobLinkedin"
                    name="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </div>

                {/* PORTFOLIO */}

                <div className="job-field">
                  <label htmlFor="jobPortfolio">
                    GitHub / Portfolio
                  </label>

                  <input
                    id="jobPortfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://github.com/username"
                    value={formData.portfolio}
                    onChange={handleChange}
                  />
                </div>

                {/* SALARY */}

                <div className="job-field">
                  <label htmlFor="salary">
                    Expected Salary
                  </label>

                  <input
                    id="salary"
                    name="expectedSalary"
                    type="text"
                    placeholder="e.g. ₹4,00,000 per annum"
                    value={formData.expectedSalary}
                    onChange={handleChange}
                  />
                </div>

                {/* NOTICE PERIOD */}

                <div className="job-field">
                  <label htmlFor="notice">
                    Notice Period
                  </label>

                  <select
                    id="notice"
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select notice period
                    </option>

                    <option value="Immediate">
                      Immediate
                    </option>

                    <option value="15 days">
                      15 Days
                    </option>

                    <option value="30 days">
                      30 Days
                    </option>

                    <option value="60 days">
                      60 Days
                    </option>

                    <option value="90 days">
                      90 Days
                    </option>
                  </select>
                </div>

                {/* RESUME */}

                <div className="job-field job-field-full">
                  <label htmlFor="jobResume">
                    Resume <span>*</span>
                  </label>

                  <input
                    id="jobResume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />

                  <small>
                    PDF, DOC or DOCX · Maximum 5 MB
                  </small>

                  {resumeFile && (
                    <small className="job-file-selected">
                      Selected: {resumeFile.name}
                    </small>
                  )}
                </div>

                {/* INTRODUCTION */}

                <div className="job-field job-field-full">
                  <label htmlFor="introduction">
                    Short Introduction <span>*</span>
                  </label>

                  <textarea
                    id="introduction"
                    name="introduction"
                    rows="6"
                    placeholder="Briefly tell us about yourself, your experience and what you can bring to the role."
                    value={formData.introduction}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* FOOTER */}

              <div className="job-form-footer">
                <p>
                  Applications are reviewed based on the role,
                  experience and information provided.
                </p>

                <button
                  type="submit"
                  className="job-submit-button"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2
                        size={17}
                        className="job-submit-spinner"
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={17} />
                    </>
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