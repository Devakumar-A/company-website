import React, { useEffect } from "react";
import Footer from "../components/Footer";
import "../styles/TermsConditions.css";

export default function TermsConditions() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <main className="terms-page">
        {/* HERO */}
        <section className="terms-hero">
          <div className="terms-container">
            <span className="terms-eyebrow">LEGAL</span>

            <h1>Terms &amp; Conditions</h1>

            <p>
              These terms explain the rules and conditions
              that apply when you access or use the Cognolynx
              website and its services.
            </p>

            <div className="terms-meta">
              <span>Effective Date: 08 October 2026</span>
              <span>Last Updated: 08 October 2026</span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="terms-content">
          <div className="terms-container terms-layout">
            {/* SIDEBAR */}
            <aside className="terms-sidebar">
              <p>ON THIS PAGE</p>

              <a href="#acceptance">
                Acceptance of Terms
              </a>

              <a href="#website-use">
                Website Use
              </a>

              <a href="#applications">
                Applications
              </a>

              <a href="#internships">
                Internship Programme
              </a>

              <a href="#jobs">
                Job Applications
              </a>

              <a href="#certificates">
                Certificates
              </a>

              <a href="#user-content">
                User Submissions
              </a>

              <a href="#intellectual-property">
                Intellectual Property
              </a>

              <a href="#third-party">
                Third-Party Services
              </a>

              <a href="#availability">
                Availability
              </a>

              <a href="#liability">
                Limitation of Liability
              </a>

              <a href="#termination">
                Termination
              </a>

              <a href="#changes">
                Changes to Terms
              </a>

              <a href="#contact">
                Contact
              </a>
            </aside>

            {/* ARTICLE */}
            <article className="terms-article">
              <section id="acceptance">
                <h2>1. Acceptance of Terms</h2>

                <p>
                  By accessing or using the Cognolynx
                  website, you agree to comply with these
                  Terms &amp; Conditions and all applicable
                  laws and regulations.
                </p>

                <p>
                  If you do not agree with these terms, please
                  do not use the website or submit information
                  through our online services.
                </p>
              </section>

              <section id="website-use">
                <h2>2. Website Use</h2>

                <p>
                  You may use the Cognolynx website for
                  legitimate purposes, including learning
                  about our services, exploring career
                  opportunities, applying for internships or
                  jobs, requesting support, and verifying
                  certificates.
                </p>

                <p>
                  You must not use the website to:
                </p>

                <ul>
                  <li>
                    Violate any applicable law or regulation.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to our
                    systems or data.
                  </li>
                  <li>
                    Upload malicious code, files, or content.
                  </li>
                  <li>
                    Interfere with the operation or security
                    of the website.
                  </li>
                  <li>
                    Submit false, misleading, or fraudulent
                    information.
                  </li>
                  <li>
                    Misuse our certificate verification
                    service.
                  </li>
                </ul>
              </section>

              <section id="applications">
                <h2>3. Applications</h2>

                <p>
                  Cognolynx may provide online application
                  forms for internships, employment
                  opportunities, training programmes, or other
                  opportunities.
                </p>

                <p>
                  By submitting an application, you confirm
                  that the information provided by you is
                  accurate and complete to the best of your
                  knowledge.
                </p>

                <p>
                  Cognolynx reserves the right to contact you
                  regarding your application and to request
                  additional information where reasonably
                  necessary.
                </p>

                <p>
                  Submission of an application does not
                  guarantee selection, employment, internship
                  admission, or any other outcome.
                </p>
              </section>

              <section id="internships">
                <h2>4. Internship Programme</h2>

                <p>
                  Internship opportunities offered through
                  Cognolynx may include practical tasks,
                  assignments, learning activities,
                  submissions, evaluations, and other
                  programme requirements.
                </p>

                <p>
                  Participation requirements, task
                  instructions, deadlines, submission
                  requirements, and other programme conditions
                  may be communicated separately to selected
                  participants.
                </p>

                <p>
                  Completion of an internship is subject to
                  fulfilling the applicable programme
                  requirements.
                </p>

                <p>
                  Cognolynx may modify, postpone, suspend, or
                  discontinue an internship programme where
                  reasonably necessary.
                </p>
              </section>

              <section id="jobs">
                <h2>5. Job Applications</h2>

                <p>
                  Job listings and employment opportunities
                  displayed on the Cognolynx website are
                  subject to availability and may change
                  without notice.
                </p>

                <p>
                  Submitting a job application does not create
                  an employment relationship between the
                  applicant and Cognolynx.
                </p>

                <p>
                  Any employment relationship will be governed
                  by the applicable employment documentation
                  provided by Cognolynx.
                </p>
              </section>

              <section id="certificates">
                <h2>6. Certificates &amp; Verification</h2>

                <p>
                  Cognolynx may issue certificates to eligible
                  participants who successfully complete
                  applicable programmes or requirements.
                </p>

                <p>
                  Each certificate may contain a unique
                  certificate ID that can be used through the
                  Cognolynx certificate verification service.
                </p>

                <p>
                  Certificate information displayed through
                  the verification service is intended to
                  confirm the authenticity and status of a
                  certificate.
                </p>

                <p>
                  Cognolynx reserves the right to correct,
                  update, suspend, or revoke a certificate
                  where there is a legitimate reason,
                  including inaccurate information,
                  unauthorized issuance, fraud, or failure to
                  satisfy applicable requirements.
                </p>

                <p>
                  A certificate must not be altered,
                  reproduced in a misleading manner, or
                  represented as authentic if it has been
                  revoked or otherwise invalidated.
                </p>
              </section>

              <section id="user-content">
                <h2>7. User Submissions</h2>

                <p>
                  Information, documents, resumes, portfolio
                  links, application responses, and other
                  materials submitted through the website
                  remain the responsibility of the person
                  submitting them.
                </p>

                <p>
                  You agree not to submit content that is
                  unlawful, fraudulent, defamatory,
                  misleading, malicious, or that infringes
                  another person's rights.
                </p>

                <p>
                  By submitting information or materials, you
                  confirm that you have the right to provide
                  them and that their submission does not
                  knowingly violate applicable laws or
                  third-party rights.
                </p>
              </section>

              <section id="intellectual-property">
                <h2>8. Intellectual Property</h2>

                <p>
                  Unless otherwise stated, the Cognolynx
                  website and its contents, including text,
                  branding, logos, graphics, layouts, designs,
                  images, software, and other materials, are
                  owned by or licensed to Cognolynx.
                </p>

                <p>
                  You may not reproduce, distribute, modify,
                  publish, sell, or commercially exploit
                  website content without prior written
                  permission from Cognolynx, except where
                  permitted by applicable law.
                </p>

                <p>
                  Cognolynx trademarks, logos, and brand
                  elements must not be used in a way that
                  suggests unauthorized affiliation,
                  sponsorship, or endorsement.
                </p>
              </section>

              <section id="third-party">
                <h2>9. Third-Party Services &amp; Links</h2>

                <p>
                  The website may contain links to third-party
                  websites, platforms, tools, or services.
                </p>

                <p>
                  Third-party services operate independently
                  and may have their own terms, privacy
                  policies, and practices. Cognolynx is not
                  responsible for the content, availability,
                  security, or policies of third-party
                  services that are outside our control.
                </p>
              </section>

              <section id="availability">
                <h2>10. Website Availability</h2>

                <p>
                  We aim to keep the website available and
                  functional, but we do not guarantee that the
                  website will always be available,
                  uninterrupted, error-free, or free from
                  technical issues.
                </p>

                <p>
                  Website features may occasionally be
                  unavailable due to maintenance, upgrades,
                  security measures, infrastructure issues, or
                  circumstances beyond our reasonable control.
                </p>
              </section>

              <section id="liability">
                <h2>11. Limitation of Liability</h2>

                <p>
                  To the extent permitted by applicable law,
                  Cognolynx shall not be responsible for
                  losses or damages arising from your use of,
                  or inability to use, the website or
                  third-party services accessed through the
                  website.
                </p>

                <p>
                  This includes, where legally permitted,
                  indirect, incidental, consequential, or
                  business-related losses resulting from
                  website interruptions, technical failures,
                  unauthorized access, or reliance on
                  information provided through the website.
                </p>

                <p>
                  Nothing in these terms is intended to exclude
                  or limit liability that cannot legally be
                  excluded or limited.
                </p>
              </section>

              <section id="termination">
                <h2>12. Suspension &amp; Termination</h2>

                <p>
                  Cognolynx may restrict or suspend access to
                  website features where reasonably necessary
                  to protect the website, users, systems, or
                  legitimate business interests.
                </p>

                <p>
                  This may include situations involving
                  misuse, fraudulent activity, security
                  concerns, violation of these terms, or
                  unlawful activity.
                </p>
              </section>

              <section id="changes">
                <h2>13. Changes to These Terms</h2>

                <p>
                  Cognolynx may update these Terms &amp;
                  Conditions from time to time to reflect
                  changes to our website, services, business
                  practices, or applicable legal requirements.
                </p>

                <p>
                  The updated version will be published on
                  this page with a revised "Last Updated"
                  date.
                </p>

                <p>
                  Your continued use of the website after
                  changes are published constitutes continued
                  use subject to the updated terms, to the
                  extent permitted by applicable law.
                </p>
              </section>

              <section id="contact">
                <h2>14. Contact</h2>

                <p>
                  If you have questions regarding these Terms
                  &amp; Conditions, please contact Cognolynx
                  using the official contact information
                  published on our website.
                </p>

                <div className="terms-contact-card">
                  <strong>COGNOLYNX</strong>

                  <p>
                    Location: India
                  </p>

                  <p>
                    Contact: Use the official Cognolynx
                    contact details published on the website.
                  </p>
                </div>
              </section>

              <div className="terms-notice">
                <strong>Important:</strong>{" "}
                These Terms &amp; Conditions are a
                website-ready draft and should be reviewed by
                a qualified legal professional before final
                publication.
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}