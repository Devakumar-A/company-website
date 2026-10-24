import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, ArrowUpRight, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
import "../styles/ContactForm.css";

const SERVICE_OPTIONS = [
  "Custom Software Development",
  "Web Applications & SaaS",
  "AI & Machine Learning Solutions",
  "Mobile App Development",
  "Cloud Architecture & DevOps",
  "UI/UX & Product Design",
  "Other Technology Consultation",
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const nextErrors = {};
    const trimmedName = formData.fullName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      nextErrors.fullName = "Please enter your full name (at least 2 characters).";
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      nextErrors.email = "Please enter a valid work email address.";
    }

    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        nextErrors.phone = "Please enter a valid telephone number.";
      }
    }

    if (!formData.service) {
      nextErrors.service = "Please select the primary service area.";
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      nextErrors.message = "Please share a brief summary of your requirements (min 10 characters).";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Spam honeypot detection: bot filled hidden input
    if (honeypot) {
      setIsSuccess(true);
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      if (supabase) {
        const { error: dbError } = await supabase
          .from("contact_submissions")
          .insert({
            full_name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim() || null,
            service: formData.service,
            message: formData.message.trim(),
            status: "new",
          });

        if (dbError) {
          // If the table hasn't been created yet in the user's DB, log note but don't crash
          console.warn("Contact submission database status:", dbError.message);
        }
      }
      setIsSuccess(true);
    } catch {
      setErrors({ form: "Failed to send proposal. Please email info@cognolynx.tech directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: "", email: "", phone: "", service: "", message: "" });
    setErrors({});
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="contact-form-success" role="alert" aria-live="polite">
        <div className="contact-success-icon" aria-hidden="true">
          <CheckCircle2 size={44} />
        </div>
        <h3>Project Request Received</h3>
        <p>
          Thank you, <strong>{formData.fullName}</strong>. Our engineering team has received your project details and will review the architectural scope. You will receive an initial response within 24 business hours.
        </p>
        <div className="contact-success-actions">
          <button type="button" onClick={handleReset} className="contact-form-reset-btn">
            Submit Another Request
          </button>
          <a href="mailto:cognolynxforge@gmail.com" className="contact-fallback-email">
            <span>Direct Email Fallback</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Anti-spam honeypot (visually hidden from human users) */}
      <div className="contact-honeypot" aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="contact_hp_field">Do not fill this field</label>
        <input
          type="text"
          id="contact_hp_field"
          name="_gotcha"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.form && (
        <div className="contact-form-alert" role="alert">
          <AlertCircle size={18} />
          <span>{errors.form}</span>
        </div>
      )}

      <div className="contact-form-grid">
        {/* Full Name */}
        <div className="contact-form-field">
          <label htmlFor="contact-fullName">
            Your Name <span className="contact-req">*</span>
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            placeholder="Devakumar A"
            value={formData.fullName}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={errors.fullName ? "contact-input-error" : ""}
          />
          {errors.fullName && (
            <span id="fullName-error" className="contact-field-error" role="alert">
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Work Email */}
        <div className="contact-form-field">
          <label htmlFor="contact-email">
            Work Email <span className="contact-req">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="alex@company.com"
            value={formData.email}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={errors.email ? "contact-input-error" : ""}
          />
          {errors.email && (
            <span id="email-error" className="contact-field-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="contact-form-grid">
        {/* Phone (Optional) */}
        <div className="contact-form-field">
          <label htmlFor="contact-phone">
            Phone / WhatsApp <span className="contact-opt">(Optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000 / +91"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={errors.phone ? "contact-input-error" : ""}
          />
          {errors.phone && (
            <span id="phone-error" className="contact-field-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        {/* Service Selection */}
        <div className="contact-form-field">
          <label htmlFor="contact-service">
            Primary Service Area <span className="contact-req">*</span>
          </label>
          <div className="contact-select-wrapper">
            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "service-error" : undefined}
              className={errors.service ? "contact-input-error" : ""}
            >
              <option value="">Select a service category...</option>
              {SERVICE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="contact-select-arrow" size={18} aria-hidden="true" />
          </div>
          {errors.service && (
            <span id="service-error" className="contact-field-error" role="alert">
              {errors.service}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="contact-form-field">
        <label htmlFor="contact-message">
          Project Goals & Requirements <span className="contact-req">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Briefly describe what you are looking to build, expected timeline, or technical challenges..."
          value={formData.message}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={errors.message ? "contact-input-error" : ""}
        />
        {errors.message && (
          <span id="message-error" className="contact-field-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit & Fallback */}
      <div className="contact-form-footer">
        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-form-submit-btn"
          aria-label="Send Project Proposal to Cognolynx"
        >
          <span>{isSubmitting ? "Transmitting..." : "Send Proposal"}</span>
          <Send size={16} />
        </button>

        <p className="contact-form-fallback">
          Prefer direct email? Reach us at{" "}
          <a href="mailto:info@cognolynx.tech" className="contact-form-mailto">
            info@cognolynx.tech
          </a>{" "}
          or{" "}
          <a href="mailto:cognolynxforge@gmail.com" className="contact-form-mailto">
            cognolynxforge@gmail.com
          </a>
        </p>
      </div>
    </form>
  );
}
