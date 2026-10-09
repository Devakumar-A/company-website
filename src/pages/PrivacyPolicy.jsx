import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <main className="privacy-page">
        {/* Hero */}
        <section className="privacy-hero">
          <div className="privacy-container">
            <span className="privacy-eyebrow">
              LEGAL
            </span>

            <h1>Privacy Policy</h1>

            <p>
              We respect your privacy and are committed to
              handling your personal information responsibly,
              transparently, and securely.
            </p>

            <div className="privacy-meta">
              <span>
                Effective Date: 08 October 2026
              </span>
              <span>
                Last Updated: 08 October 2026
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="privacy-content">
          <div className="privacy-container privacy-layout">

            <aside className="privacy-sidebar">
              <p>ON THIS PAGE</p>

              <a href="#information">
                Information We Collect
              </a>

              <a href="#usage">
                How We Use Information
              </a>

              <a href="#applications">
                Applications & Resumes
              </a>

              <a href="#certificates">
                Certificate Verification
              </a>

              <a href="#sharing">
                Information Sharing
              </a>

              <a href="#storage">
                Data Storage & Security
              </a>

              <a href="#retention">
                Data Retention
              </a>

              <a href="#rights">
                Your Rights
              </a>

              <a href="#cookies">
                Cookies & Technologies
              </a>

              <a href="#third-party">
                Third-Party Services
              </a>

              <a href="#children">
                Children's Privacy
              </a>

              <a href="#changes">
                Policy Changes
              </a>

              <a href="#contact">
                Contact Us
              </a>
            </aside>

            <article className="privacy-article">

              <section>
                <h2>1. Introduction</h2>

                <p>
                  This Privacy Policy explains how
                  Cognolynx collects, uses, stores, and
                  protects personal information when you
                  visit our website, apply for an internship
                  or job, use our certificate verification
                  service, or contact us through our website.
                </p>

                <p>
                  By using our website or submitting
                  information through our forms, you
                  acknowledge that you have read and
                  understood this Privacy Policy.
                </p>
              </section>

              <section id="information">
                <h2>2. Information We Collect</h2>

                <p>
                  Depending on how you interact with
                  Cognolynx, we may collect the following
                  information:
                </p>

                <h3>Information you provide</h3>

                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>College or university</li>
                  <li>City and state</li>
                  <li>LinkedIn profile</li>
                  <li>Portfolio or personal website</li>
                  <li>Job position applied for</li>
                  <li>Educational qualifications</li>
                  <li>Professional experience</li>
                  <li>Skills and professional information</li>
                  <li>Expected salary and notice period</li>
                  <li>Resume or CV</li>
                  <li>Information submitted through support requests</li>
                </ul>

                <h3>Certificate information</h3>

                <p>
                  When a certificate is issued, we may store
                  information such as the certificate ID,
                  recipient name, internship domain, issue
                  date, completion date, certificate status,
                  and the associated certificate file.
                </p>

                <h3>Technical information</h3>

                <p>
                  We may also receive basic technical
                  information such as browser type, device
                  information, IP address, approximate
                  location derived from technical data, and
                  website interaction information where
                  necessary for security, operation, and
                  analytics.
                </p>
              </section>

              <section id="usage">
                <h2>3. How We Use Information</h2>

                <p>
                  We use collected information only for
                  appropriate business and operational
                  purposes, including:
                </p>

                <ul>
                  <li>
                    Processing internship applications
                  </li>
                  <li>
                    Processing job applications
                  </li>
                  <li>
                    Reviewing candidate qualifications
                  </li>
                  <li>
                    Communicating with applicants
                  </li>
                  <li>
                    Managing internship activities and
                    submissions
                  </li>
                  <li>
                    Issuing and verifying certificates
                  </li>
                  <li>
                    Responding to support requests
                  </li>
                  <li>
                    Maintaining website security
                  </li>
                  <li>
                    Improving our website and services
                  </li>
                  <li>
                    Preventing fraud, abuse, and unauthorized
                    activity
                  </li>
                  <li>
                    Complying with applicable legal
                    obligations
                  </li>
                </ul>
              </section>

              <section id="applications">
                <h2>4. Internship & Job Applications</h2>

                <p>
                  If you apply for an internship or job
                  through our website, the information you
                  submit may be reviewed by authorized
                  Cognolynx personnel for recruitment,
                  selection, internship administration, and
                  related communication.
                </p>

                <p>
                  Resumes and other application materials
                  may be stored securely and accessed only by
                  authorized personnel who require the
                  information for legitimate business
                  purposes.
                </p>

                <p>
                  Please do not submit passwords, financial
                  account credentials, government secrets, or
                  other information that is not required for
                  your application.
                </p>
              </section>

              <section id="certificates">
                <h2>5. Certificate Verification</h2>

                <p>
                  Cognolynx provides an online certificate
                  verification service.
                </p>

                <p>
                  When a certificate ID is entered, the
                  verification system may display limited
                  certificate information necessary to
                  confirm its authenticity, such as:
                </p>

                <ul>
                  <li>Certificate ID</li>
                  <li>Recipient name</li>
                  <li>Internship domain</li>
                  <li>Issue date</li>
                  <li>Completion date</li>
                  <li>Certificate status</li>
                </ul>

                <p>
                  Certificate files are stored separately
                  from the public verification information.
                  Access to certificate files may be provided
                  through temporary, secured links.
                </p>
              </section>

              <section id="sharing">
                <h2>6. Information Sharing</h2>

                <p>
                  Cognolynx does not sell personal information
                  to third parties.
                </p>

                <p>
                  Information may be shared with authorized
                  service providers when reasonably necessary
                  to operate our website and services. These
                  providers may support areas such as
                  database hosting, file storage, email
                  delivery, website hosting, payment
                  processing, analytics, or security.
                </p>

                <p>
                  We may also disclose information where
                  required by applicable law, legal process,
                  regulatory requirements, or to protect the
                  rights, security, and property of Cognolynx,
                  our users, or others.
                </p>
              </section>

              <section id="storage">
                <h2>7. Data Storage & Security</h2>

                <p>
                  We use reasonable technical and
                  organizational measures designed to protect
                  personal information against unauthorized
                  access, alteration, disclosure, loss, or
                  destruction.
                </p>

                <p>
                  Application information and uploaded files
                  may be stored using trusted infrastructure
                  and cloud service providers.
                </p>

                <p>
                  However, no internet transmission or
                  electronic storage system can be guaranteed
                  to be completely secure.
                </p>
              </section>

              <section id="retention">
                <h2>8. Data Retention</h2>

                <p>
                  We retain personal information only for as
                  long as reasonably necessary for the
                  purposes for which it was collected,
                  including recruitment, internship
                  administration, certificate verification,
                  legal obligations, dispute resolution, and
                  legitimate business requirements.
                </p>

                <p>
                  Retention periods may vary depending on the
                  type of information and the purpose for
                  which it is processed.
                </p>
              </section>

              <section id="rights">
                <h2>9. Your Privacy Rights</h2>

                <p>
                  Subject to applicable law and its
                  implementation, you may have rights
                  relating to your personal information,
                  including the ability to request access to,
                  correction of, or deletion of personal
                  information and to exercise other applicable
                  data protection rights.
                </p>

                <p>
                  Requests can be submitted using the contact
                  information provided below. We may need to
                  verify your identity before processing a
                  request.
                </p>
              </section>

              <section id="cookies">
                <h2>10. Cookies & Similar Technologies</h2>

                <p>
                  Our website may use cookies or similar
                  technologies where necessary for website
                  functionality, security, preferences, or
                  analytics.
                </p>

                <p>
                  Your browser may allow you to control or
                  disable cookies. Disabling certain cookies
                  may affect some website functionality.
                </p>
              </section>

              <section id="third-party">
                <h2>11. Third-Party Services</h2>

                <p>
                  Our website may use third-party services
                  and infrastructure providers to support
                  functions such as hosting, database
                  management, file storage, email delivery,
                  payments, analytics, and security.
                </p>

                <p>
                  These providers may process information
                  according to their own privacy policies and
                  applicable contractual or legal obligations.
                </p>
              </section>

              <section id="children">
                <h2>12. Children's Privacy</h2>

                <p>
                  Our services are not intentionally designed
                  to collect personal information from
                  children in circumstances where such
                  collection is not permitted by applicable
                  law.
                </p>

                <p>
                  If you believe that personal information
                  belonging to a child has been submitted to
                  us improperly, please contact us so that we
                  can review the situation and take
                  appropriate action.
                </p>
              </section>

              <section id="changes">
                <h2>13. Changes to This Privacy Policy</h2>

                <p>
                  We may update this Privacy Policy from time
                  to time to reflect changes to our services,
                  technology, legal requirements, or business
                  practices.
                </p>

                <p>
                  The updated version will be published on
                  this page with a revised "Last Updated"
                  date.
                </p>
              </section>

              <section id="contact">
                <h2>14. Contact Us</h2>

                <p>
                  If you have questions, concerns, or
                  requests regarding this Privacy Policy or
                  your personal information, please contact
                  Cognolynx through the contact details
                  provided on our website.
                </p>

                <div className="privacy-contact-card">
                  <strong>COGNOLYNX</strong>

                  <p>
                    Email: Use the official Cognolynx
                    contact email published on our website.
                  </p>

                  <p>
                    Location: India
                  </p>
                </div>
              </section>

              <div className="privacy-notice">
                <strong>Important:</strong> This Privacy
                Policy is intended as a website privacy-policy
                draft and should be reviewed by a qualified
                legal professional before final publication,
                especially once Cognolynx begins processing
                personal data at production scale.
              </div>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}