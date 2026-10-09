import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../../components/SEO";
import { seoData } from "../../data/seoData";

import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabase";
import "../../styles/CertificateVerify.css";

export default function CertificateVerify() {
  const [searchParams] = useSearchParams();

  const urlCertificateId = (
    searchParams.get("id") ||
    searchParams.get("certId") ||
    ""
  )
    .trim()
    .toUpperCase();

  const [certificateId, setCertificateId] =
    useState(urlCertificateId);

  const [certificate, setCertificate] = useState(null);

  const [loading, setLoading] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);

  const [searched, setSearched] = useState(false);

  const [error, setError] = useState("");
  const [viewError, setViewError] = useState("");

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
   * Verify certificate against Supabase.
   */
  const verifyCertificate = useCallback(async (id) => {
    const cleanId = String(id || "")
      .trim()
      .toUpperCase();

    setError("");
    setViewError("");
    setCertificate(null);
    setSearched(false);

    if (!cleanId) {
      setError("Please enter a certificate ID.");
      return;
    }

    setLoading(true);

    try {
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

      if (supabaseError) {
        console.error(
          "Certificate verification error:",
          supabaseError
        );

        throw new Error(
          supabaseError.message ||
            "Unable to verify the certificate."
        );
      }

      setSearched(true);

      /*
       * Certificate ID does not exist.
       */
      if (!data) {
        setCertificate(null);
        setError("Certificate ID not found.");
        return;
      }

      /*
       * Only valid certificates can be verified.
       */
      if (
        String(data.status || "").toLowerCase() !==
        "valid"
      ) {
        setCertificate(null);
        setError(
          "This certificate is not currently valid."
        );
        return;
      }

      setCertificate(data);
    } catch (verificationError) {
      console.error(
        "Certificate verification failed:",
        verificationError
      );

      setCertificate(null);
      setSearched(true);

      setError(
        verificationError?.message ||
          "Something went wrong while verifying the certificate."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * Automatically verify certificate when
   * certificate ID exists in the URL.
   *
   * Example:
   * /certificate/verify?id=CGLX-INT-2026-000001
   */
  useEffect(() => {
    if (urlCertificateId) {
      verifyCertificate(urlCertificateId);
    }
  }, [urlCertificateId, verifyCertificate]);

  /*
   * Manual verification form.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    await verifyCertificate(certificateId);
  };

  /*
   * Clear current verification.
   */
  const handleClear = () => {
    setCertificateId("");
    setCertificate(null);
    setError("");
    setViewError("");
    setSearched(false);
  };

  /*
   * Generate a fresh signed URL and open
   * the certificate PDF in a new browser tab.
   */
  const handleViewCertificate = async () => {
    if (!certificate?.certificate_url) {
      setViewError(
        "Certificate file is not available."
      );
      return;
    }

    setViewLoading(true);
    setViewError("");

    try {
      /*
       * The database stores only the path
       * inside the certificates bucket.
       *
       * Example:
       * Cognolynx_Sample_Certificate_CGLX-INT-2026-000001.pdf
       */
      const filePath =
        String(certificate.certificate_url).trim();

      if (!filePath) {
        throw new Error(
          "Certificate file path is empty."
        );
      }

      console.log(
        "Certificate bucket:",
        "certificates"
      );

      console.log(
        "Certificate file path:",
        filePath
      );

      /*
       * Generate a temporary signed URL.
       * Valid for 5 minutes.
       */
      const { data, error: storageError } =
        await supabase.storage
          .from("certificates")
          .createSignedUrl(
            filePath,
            60 * 5
          );

      console.log(
        "Signed URL data:",
        data
      );

      console.log(
        "Signed URL error:",
        storageError
      );

      if (storageError) {
        throw new Error(
          storageError.message ||
            "Unable to generate certificate URL."
        );
      }

      if (!data?.signedUrl) {
        throw new Error(
          "Certificate URL could not be generated."
        );
      }

      /*
       * Open PDF in a new browser tab.
       */
      window.open(
        data.signedUrl,
        "_blank",
        "noopener,noreferrer"
      );
    } catch (certificateError) {
      console.error(
        "Certificate viewing failed:",
        certificateError
      );

      setViewError(
        certificateError?.message ||
          "Unable to open the certificate."
      );
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

          <h1>
            Certificate Verification
          </h1>

          <p>
            Verify a certificate issued by
            Cognolynx using the certificate ID.
          </p>

          <form
            className="cert-verify-form"
            onSubmit={handleSubmit}
          >

            <label htmlFor="certificateId">
              Certificate ID
            </label>

            <input
              id="certificateId"
              type="text"
              value={certificateId}
              onChange={(event) => {
                setCertificateId(
                  event.target.value.toUpperCase()
                );

                setError("");
                setViewError("");
                setCertificate(null);
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
                disabled={
                  loading ||
                  !certificateId.trim()
                }
              >
                {loading
                  ? "Verifying..."
                  : "Verify Certificate"}
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
            <p>
              Checking certificate records...
            </p>
          </section>
        )}


        {/* =========================
            VERIFICATION ERROR
        ========================== */}

        {!loading &&
          error &&
          searched && (
            <section className="cert-verify-error">

              <div className="cert-verify-error-card">

                <h2>
                  Certificate Not Verified
                </h2>

                <p>
                  {error}
                </p>

                <div className="cert-verify-error-id-badge">
                  Certificate ID:{" "}
                  <strong>
                    {certificateId}
                  </strong>
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

              <h2>
                Certificate Verified
              </h2>

              <p className="cert-verify-result-subtitle">
                This certificate has been successfully
                verified against the Cognolynx
                certificate database.
              </p>


              {/* CERTIFICATE DETAILS */}

              <div className="cert-details-grid">

                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Certificate ID
                    </strong>
                  </p>

                  <p>
                    {certificate.certificate_id}
                  </p>

                </div>


                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Recipient Name
                    </strong>
                  </p>

                  <p>
                    {certificate.recipient_name}
                  </p>

                </div>


                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Internship Domain
                    </strong>
                  </p>

                  <p>
                    {certificate.internship_domain ||
                      "—"}
                  </p>

                </div>


                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Issue Date
                    </strong>
                  </p>

                  <p>
                    {formatDate(
                      certificate.issue_date
                    )}
                  </p>

                </div>


                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Completion Date
                    </strong>
                  </p>

                  <p>
                    {formatDate(
                      certificate.completion_date
                    )}
                  </p>

                </div>


                <div className="cert-detail-cell">

                  <p>
                    <strong>
                      Status
                    </strong>
                  </p>

                  <p className="cert-status-badge">
                    VALID
                  </p>

                </div>

              </div>


              {/* =========================
                  VIEW CERTIFICATE
              ========================== */}

              {certificate.certificate_url && (
                <div className="cert-view-action">

                  <button
                    type="button"
                    className="cert-view-button"
                    onClick={
                      handleViewCertificate
                    }
                    disabled={viewLoading}
                  >

                    {viewLoading
                      ? "Opening Certificate..."
                      : "View Certificate"}

                  </button>


                  {viewError && (
                    <p className="cert-view-error">
                      {viewError}
                    </p>
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