import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { SEGMENT_NAMES } from "../data/seoData";
import "../styles/Breadcrumbs.css";

const SITE_URL = "https://cognolynx.tech";

export default function Breadcrumbs({ items }) {
  const location = useLocation();

  let trail = items;
  if (!trail) {
    const rawPath = location.pathname || "";
    const segments = rawPath.split("/").filter(Boolean);
    trail = [{ label: "Home", path: "/" }];

    let curr = "";
    segments.forEach((seg, i) => {
      curr += `/${seg}`;
      const isLast = i === segments.length - 1;
      const label =
        SEGMENT_NAMES[seg] ||
        seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      trail.push({
        label,
        path: isLast ? null : curr,
      });
    });
  }

  if (!trail || trail.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
      <div className="breadcrumbs-container">
        <ol
          className="breadcrumbs-list"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1 || !item.path;
            const position = idx + 1;
            const targetUrl = item.path
              ? item.path === "/"
                ? `${SITE_URL}/`
                : `${SITE_URL}${item.path}`
              : undefined;

            return (
              <li
                key={idx}
                className={`breadcrumb-item ${isLast ? "breadcrumb-current" : ""}`}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {idx > 0 && (
                  <ChevronRight
                    size={14}
                    className="breadcrumb-separator"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="breadcrumb-current-text"
                    aria-current="page"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="breadcrumb-link"
                    itemProp="item"
                  >
                    {idx === 0 && (
                      <Home
                        size={13}
                        className="breadcrumb-home-icon"
                        aria-hidden="true"
                      />
                    )}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(position)} />
                {targetUrl && <meta itemProp="item" content={targetUrl} />}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
