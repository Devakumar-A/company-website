import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { getJsonLdForRoute } from "../data/seoData";

const SITE_URL = "https://cognolynx.com";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`;

export default function SEO({
  title,
  description,
  path = "",
  canonical,
  noindex = false,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd,
}) {
  const resolvedCanonical = canonical === null
    ? null
    : (canonical
        ? (canonical.startsWith("http")
            ? canonical
            : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical.replace(/\/$/, "")}`)
        : (path
            ? (path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path.replace(/\/$/, "")}`)
            : SITE_URL));

  const fullImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  const resolvedJsonLd = jsonLd !== undefined
    ? jsonLd
    : (noindex ? null : getJsonLdForRoute(path, { title, description, canonical: resolvedCanonical, noindex }));

  // Keep JSON-LD in <head> synced on client-side route transitions without causing hydration mismatches
  useEffect(() => {
    if (typeof document === "undefined") return;
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (resolvedJsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(resolvedJsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [resolvedJsonLd]);

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}
      <meta name="robots" content={robotsContent} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Cognolynx" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}
