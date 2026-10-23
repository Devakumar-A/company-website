import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";

import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";
import "../../styles/CertificateVerify.css";

/**
 * Normalizes and sanitizes a Supabase storage path by trimming whitespace
 * and stripping any redundant 'certificates/' bucket prefix or leading slashes.
 */
function getCleanStoragePath(rawPath) {
  if (!rawPath) return "";
  return String(rawPath)
    .trim()
    .replace(/^certificates\//i, "")
    .replace(/^\/+/, "");
}

export default function CertificateVerify() {
  const [searchParams] = useSearchParams();

  const urlCertificateId = (
    searchParams.get("id") ||
    searchParams.get("certId") ||
    ""
  )
    .trim()
    .toUpperCase();

  const [certificateId, setCertificateId] = useState(urlCertificateId);
  const [certificate, setCertificate] = useState(null);
  const [certificatePdfUrl, setCertificatePdfUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [viewError, setViewError] = useState("");

  // Track the sequence ID of the latest verification request to prevent race conditions
  const activeRequestIdRef = useRef(0);

  /*
   * Scroll to top when page loads.
   */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  /*
   * Verify certificate against Supabase and generate its dedicated signed PDF URL.
   */
  const verifyCertificate = useCallback(async (id) => {
    const cleanId = String(id || "")
      .trim()
      .toUpperCase();

    // Increment request ID to invalidate any prior in-flight verification requests
    const currentRequestId = ++activeRequestIdRef.current;

    // Immediately clear all previous state and previous PDF URLs before starting new search
    setError("");
    setViewError("");
    setCertificate(null);
    setCertificatePdfUrl(null);
    setSearched(false);

    if (!cleanId) {
      setError("Please enter a certificate ID.");
      return;
    }

    setLoading(true);

    try {
      // 1. Fetch exact certificate record from database
      const { data, error: supabaseError } = await supabase
        .from("certificates")
        .select(`
          certificate_id,
          recipient_name,
          internship_domain,
          issue_date,
          completion_date,
          certificate_url,
          status
        `)
        .eq("certificate_id", cleanId)
        .maybeSingle();

      // Check if a newer request was dispatched while this query was running
      if (activeRequestIdRef.current !== currentRequestId) {
        return;
      }

      if (supabaseError) {
        console.error("Certificate verification error:", supabaseError);
        throw new Error(supabaseError.message || "Unable to verify the certificate.");
      }

      setSearched(true);

      // Certificate ID does not exist in database
      if (!data) {
        setCertificate(null);
        setCertificatePdfUrl(null);
        setError("Certificate ID not found. Please verify the ID and try again.");
        return;
      }

      // Check certificate status (handle revoked vs invalid)
      const normalizedStatus = String(data.status || "").toLowerCase().trim();
      if (normalizedStatus === "revoked") {
        setCertificate(null);
        setCertificatePdfUrl(null);
        setError("This certificate has been revoked and is no longer valid.");
        return;
      }

      if (normalizedStatus !== "valid" && normalizedStatus !== "active" && normalizedStatus !== "verified") {
        setCertificate(null);
        setCertificatePdfUrl(null);
        setError("This certificate is not currently valid.");
        return;
      }

      // 2. Validate and retrieve storage object path
      const cleanPath = getCleanStoragePath(data.certificate_url);

      if (!cleanPath) {
        setCertificate(data);
        setCertificatePdfUrl(null);
        setViewError("Certificate PDF document path is not registered.");
        return;
      }

      // 3. Generate a pre-authenticated signed URL for this exact record (valid for 15 minutes)
      const { data: storageData, error: storageError } = await supabase.storage
        .from("certificates")
        .createSignedUrl(cleanPath, 60 * 15);

      // Ensure request is still the active one before committing to state
      if (activeRequestIdRef.current !== currentRequestId) {
        return;
      }

      if (storageError || !storageData?.signedUrl) {
        console.warn("Storage signed URL warning for path:", cleanPath, storageError);
        const isNotFound =
          storageError?.statusCode === "404" ||
          storageError?.status === 400 ||
          storageError?.code === "NoSuchKey" ||
          (storageError?.message && storageError.message.toLowerCase().includes("not found"));

        setCertificate(data);
        setCertificatePdfUrl(null);
        setViewError(
          isNotFound
            ? "Certificate PDF document was not found in storage. Please contact Cognolynx support."
            : (storageError?.message || "Unable to generate certificate download link.")
        );
      } else {
        setCertificate(data);
        setCertificatePdfUrl(storageData.signedUrl);
        setViewError("");
      }
    } catch (verificationError) {
      if (activeRequestIdRef.current !== currentRequestId) {
        return;
      }

      console.error("Certificate verification failed:", verificationError);
      setCertificate(null);
      setCertificatePdfUrl(null);
      setSearched(true);
      setError(
        verificationError?.message ||
          "Something went wrong while verifying the certificate."
      );
    } finally {
      if (activeRequestIdRef.current === currentRequestId) {
        setLoading(false);
      }
    }
  }, []);

  /*
   * Automatically verify certificate when certificate ID exists in URL query.
   */
  useEffect(() => {
    if (urlCertificateId) {
      verifyCertificate(urlCertificateId);
    }
  }, [urlCertificateId, verifyCertificate]);

  /*
   * Manual verification form submission.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    await verifyCertificate(certificateId);
  };

  /*
   * Clear current verification state and input.
   */
  const handleClear = () => {
    activeRequestIdRef.current += 1;
    setCertificateId("");
    setCertificate(null);
    setCertificatePdfUrl(null);
    setError("");
    setViewError("");
    setSearched(false);
  };

  /*
   * Open the certificate PDF in a new browser tab using the verified signed URL.
   */
  const handleViewCertificate = async () => {
    if (!certificate) {
      setViewError("No verified certificate is currently active.");
      return;
    }

    // If pre-generated signed URL is available, open it immediately
    if (certificatePdfUrl) {
      window.open(certificatePdfUrl, "_blank", "noopener,noreferrer");
      return;
    }

    // Fallback: Generate fresh signed URL on demand for the current certificate record
    const cleanPath = getCleanStoragePath(certificate.certificate_url);
    if (!cleanPath) {
      setViewError("Certificate PDF document path is not registered.");
      return;
    }

    setViewLoading(true);
    setViewError("");

    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("certificates")
        .createSignedUrl(cleanPath, 60 * 15);

      if (storageError || !storageData?.signedUrl) {
        const isNotFound =
          storageError?.statusCode === "404" ||
          storageError?.status === 400 ||
          storageError?.code === "NoSuchKey" ||
          (storageError?.message && storageError.message.toLowerCase().includes("not found"));

        throw new Error(
          isNotFound
            ? "Certificate PDF document was not found in storage. Please contact Cognolynx support."
            : (storageError?.message || "Unable to open the certificate.")
        );
      }

      setCertificatePdfUrl(storageData.signedUrl);
      window.open(storageData.signedUrl, "_blank", "noopener,noreferrer");
    } catch (certificateError) {
      console.error("Certificate viewing failed:", certificateError);
      setViewError(certificateError?.message || "Unable to open the certificate.");
    } finally {
      setViewLoading(false);
    }
  };

  /*
   * Format database dates.
   */
  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <SEO {...seoData["/certificate/verify"]} />
      <main className="cert-verify-page">

        {/* =========================
            SEARCH SECTION
        ========================== */}
        <section className="cert-verify-hero">
          <h1>Certificate Verification</h1>
          <p>
            Verify a certificate issued by Cognolynx using the certificate ID.
          </p>

          <form className="cert-verify-form" onSubmit={handleSubmit}>
            <label htmlFor="certificateId">Certificate ID</label>
            <input
              id="certificateId"
              type="text"
              value={certificateId}
              onChange={(event) => {
                // Invalidate any in-flight requests and clear stale data immediately
                activeRequestIdRef.current += 1;
                setCertificateId(event.target.value.toUpperCase());
                setError("");
                setViewError("");
                setCertificate(null);
                setCertificatePdfUrl(null);
                setSearched(false);
              }}
              placeholder="Enter certificate ID"
              autoComplete="off"
              spellCheck="false"
            />

            <div className="cert-verify-form-actions">
              <button
                type="submit"
                className="cert-btn-submit"
                disabled={loading || !certificateId.trim()}
              >
                {loading ? "Verifying..." : "Verify Certificate"}
              </button>

              {certificateId && (
                <button
                  type="button"
                  className="cert-btn-clear"
                  onClick={handleClear}
                  disabled={loading}
                >
                  Clear
                </button>
              )}
            </div>
          </form>
        </section>

        {/* =========================
            VERIFICATION LOADING
        ========================== */}
        {loading && (
          <section className="cert-verify-loading">
            <p>Checking certificate records...</p>
          </section>
        )}

        {/* =========================
            VERIFICATION ERROR
        ========================== */}
        {!loading && error && searched && (
          <section className="cert-verify-error">
            <div className="cert-verify-error-card">
              <h2>Certificate Not Verified</h2>
              <p>{error}</p>
              <div className="cert-verify-error-id-badge">
                Certificate ID: <strong>{certificateId}</strong>
              </div>
            </div>
          </section>
        )}

        {/* =========================
            VERIFIED CERTIFICATE
        ========================== */}
        {!loading && certificate && (
          <section className="cert-verify-result">
            <div className="cert-verify-result-card">
              <h2>Certificate Verified</h2>
              <p className="cert-verify-result-subtitle">
                This certificate has been successfully verified against the Cognolynx
                certificate database.
              </p>

              {/* CERTIFICATE DETAILS */}
              <div className="cert-details-grid">
                <div className="cert-detail-cell">
                  <p><strong>Certificate ID</strong></p>
                  <p>{certificate.certificate_id}</p>
                </div>

                <div className="cert-detail-cell">
                  <p><strong>Recipient Name</strong></p>
                  <p>{certificate.recipient_name}</p>
                </div>

                <div className="cert-detail-cell">
                  <p><strong>Internship Domain</strong></p>
                  <p>{certificate.internship_domain || "—"}</p>
                </div>

                <div className="cert-detail-cell">
                  <p><strong>Issue Date</strong></p>
                  <p>{formatDate(certificate.issue_date)}</p>
                </div>

                <div className="cert-detail-cell">
                  <p><strong>Completion Date</strong></p>
                  <p>{formatDate(certificate.completion_date)}</p>
                </div>

                <div className="cert-detail-cell">
                  <p><strong>Status</strong></p>
                  <p className="cert-status-badge">VALID</p>
                </div>
              </div>

              {/* =========================
                  VIEW CERTIFICATE ACTION
              ========================== */}
              {certificate.certificate_url && (
                <div className="cert-view-action">
                  <button
                    type="button"
                    className="cert-view-button"
                    onClick={handleViewCertificate}
                    disabled={viewLoading}
                  >
                    {viewLoading ? "Opening Certificate..." : "View Certificate"}
                  </button>

                  {viewError && (
                    <p className="cert-view-error">{viewError}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
