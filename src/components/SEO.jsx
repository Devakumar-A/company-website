import { Helmet } from "react-helmet-async";

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
  const resolvedCanonical = canonical
    ? (canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}${canonical.startsWith("/") ? "" : "/"}${canonical.replace(/\/$/, "")}`)
    : (path
        ? (path === "/" ? SITE_URL : `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path.replace(/\/$/, "")}`)
        : SITE_URL);

  const fullImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={resolvedCanonical} />
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

      {/* Optional Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
