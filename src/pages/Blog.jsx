import React, { useMemo, useState } from "react";
import { ArrowUpRight, Search, Clock3 } from "lucide-react";
import SEO from "../components/SEO";
import { seoData } from "../data/seoData";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/Blog.css";

const categories = [
  "All",
  "Technology",
  "AI & ML",
  "Engineering",
  "Business",
  "Projects",
];

const posts = [
  {
    id: 1,
    category: "AI & ML",
    type: "FEATURED",
    title: "Building AI Systems That Solve Real-World Problems",
    excerpt:
      "Artificial intelligence becomes valuable when it moves beyond experimentation and addresses a meaningful problem. A practical look at how we approach AI-driven systems at Cognolynx.",
    date: "08 OCT 2026",
    readTime: "6 MIN READ",
    featured: true,
    visual: "ai",
  },
  {
    id: 2,
    category: "Projects",
    type: "PROJECT INSIGHT",
    title: "Designing a Tamil Voice-Based Customer Registration Experience",
    excerpt:
      "How voice interaction can reduce typing and language barriers in everyday business applications, with a focus on Tamil-first user experience.",
    date: "06 OCT 2026",
    readTime: "5 MIN READ",
    visual: "voice",
  },
  {
    id: 3,
    category: "Engineering",
    type: "ENGINEERING",
    title: "From Business Requirement to a Scalable Digital Platform",
    excerpt:
      "A practical framework for turning a business requirement into an architecture that can evolve as the product and organization grow.",
    date: "03 OCT 2026",
    readTime: "7 MIN READ",
    visual: "architecture",
  },
  {
    id: 4,
    category: "Projects",
    type: "PROJECT INSIGHT",
    title: "What It Takes to Build a Modern Hotel Booking Experience",
    excerpt:
      "A look at the product thinking behind hotel discovery, room selection, guest information, booking workflows and operational systems.",
    date: "30 SEP 2026",
    readTime: "6 MIN READ",
    visual: "hotel",
  },
  {
    id: 5,
    category: "Technology",
    type: "TECHNOLOGY",
    title: "Why Technology Should Follow the Problem",
    excerpt:
      "Choosing a technology stack should begin with understanding the problem, not with selecting the newest framework.",
    date: "26 SEP 2026",
    readTime: "4 MIN READ",
    visual: "technology",
  },
  {
    id: 6,
    category: "AI & ML",
    type: "AI / ML",
    title: "Understanding Multi-Modal AI Through MovieVerse",
    excerpt:
      "How text, image and video information can be combined to build a richer understanding of complex content.",
    date: "21 SEP 2026",
    readTime: "6 MIN READ",
    visual: "multimodal",
  },
  {
    id: 7,
    category: "Engineering",
    type: "ENGINEERING",
    title: "Designing Better Digital Experiences for Everyday Users",
    excerpt:
      "Good interfaces are not only visually polished. They reduce friction, clarify decisions and make the next action obvious.",
    date: "18 SEP 2026",
    readTime: "5 MIN READ",
    visual: "ux",
  },
  {
    id: 8,
    category: "Business",
    type: "BUSINESS",
    title: "Why a Business Website Should Be More Than a Digital Brochure",
    excerpt:
      "A modern business website should support discovery, credibility, communication and conversion rather than simply displaying information.",
    date: "14 SEP 2026",
    readTime: "5 MIN READ",
    visual: "business",
  },
  {
    id: 9,
    category: "AI & ML",
    type: "AI / ML",
    title: "Semantic Matching: A Better Approach to Resume Screening",
    excerpt:
      "Keyword matching can miss context. Semantic similarity provides another way to understand the relationship between a resume and a job description.",
    date: "10 SEP 2026",
    readTime: "6 MIN READ",
    visual: "resume",
  },
];

function ArticleVisual({ type }) {
  return (
    <div className={`article-visual article-visual-${type}`}>
      <div className="article-grid" />

      <div className="article-visual-top">
        <span>COGNOLYNX</span>
        <span>INSIGHTS</span>
      </div>

      {type === "ai" && (
        <div className="ai-visual">
          <div className="ai-node node-1">AI</div>
          <div className="ai-node node-2">DATA</div>
          <div className="ai-node node-3">MODEL</div>
          <div className="ai-node node-4">SYSTEM</div>

          <div className="ai-line line-1" />
          <div className="ai-line line-2" />
          <div className="ai-line line-3" />
          <div className="ai-line line-4" />

          <div className="ai-center">C</div>
        </div>
      )}

      {type === "voice" && (
        <div className="voice-visual">
          <div className="voice-circle">
            <span>தமிழ்</span>
          </div>
          <div className="sound-wave">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}

      {type === "architecture" && (
        <div className="architecture-visual">
          <div className="arch-layer">
            <span>USER</span>
          </div>
          <div className="arch-connector" />
          <div className="arch-layer">
            <span>PRODUCT</span>
          </div>
          <div className="arch-connector" />
          <div className="arch-layer">
            <span>API</span>
          </div>
          <div className="arch-connector" />
          <div className="arch-layer">
            <span>DATA</span>
          </div>
        </div>
      )}

      {type === "hotel" && (
        <div className="hotel-visual">
          <div className="hotel-building">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hotel-line" />
        </div>
      )}

      {type === "technology" && (
        <div className="tech-visual">
          <div className="tech-ring ring-1" />
          <div className="tech-ring ring-2" />
          <div className="tech-ring ring-3" />
          <div className="tech-core">TECH</div>
        </div>
      )}

      {type === "multimodal" && (
        <div className="multi-visual">
          <div className="multi-box">TEXT</div>
          <div className="multi-box">IMAGE</div>
          <div className="multi-box">VIDEO</div>
          <div className="multi-fusion">FUSION</div>
        </div>
      )}

      {type === "ux" && (
        <div className="ux-visual">
          <div className="ux-screen">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="ux-cursor" />
        </div>
      )}

      {type === "business" && (
        <div className="business-visual">
          <div className="business-column column-a" />
          <div className="business-column column-b" />
          <div className="business-column column-c" />
          <div className="business-arrow">
            <ArrowUpRight size={42} />
          </div>
        </div>
      )}

      {type === "resume" && (
        <div className="resume-visual">
          <div className="resume-paper">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="resume-match">87%</div>
        </div>
      )}

      <div className="article-visual-bottom">
        <span>BUILD</span>
        <span>THINK</span>
        <span>EVOLVE</span>
      </div>
    </div>
  );
}

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <ArticleVisual type={post.visual} />

      <div className="blog-card-content">
        <div className="blog-meta">
          <span>{post.category}</span>
          <span>{post.date}</span>
        </div>

        <h3>{post.title}</h3>

        <p>{post.excerpt}</p>

        <div className="blog-card-footer">
          <span className="read-time">
            <Clock3 size={14} />
            {post.readTime}
          </span>

          <button type="button" className="read-button">
            Read Article
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch =
        activeCategory === "All" || post.category === activeCategory;

      const searchMatch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const featuredPost = posts.find((post) => post.featured);

  const normalPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="blog-page">
      <SEO {...seoData["/blog"]} />
      <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Blog" }]} />
      {/* HERO */}
      <section className="blog-hero">
        <div className="blog-container">
          <div className="blog-eyebrow">
            <span />
            COGNOLYNX JOURNAL
          </div>

          <div className="blog-hero-layout">
            <div>
              <h1>
                Ideas,
                <br />
                <em>insights & engineering.</em>
              </h1>
            </div>

            <div className="blog-hero-side">
              <p>
                Perspectives on technology, product engineering, artificial
                intelligence and the ideas behind the systems we build.
              </p>

              <div className="blog-hero-stats">
                <div>
                  <strong>09</strong>
                  <span>ARTICLES</span>
                </div>

                <div>
                  <strong>05</strong>
                  <span>TOPICS</span>
                </div>

                <div>
                  <strong>01</strong>
                  <span>JOURNAL</span>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-hero-bottom">
            <span>TECHNOLOGY · PRODUCT · AI · ENGINEERING</span>
            <span>UPDATED OCTOBER 2026</span>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-article-section">
        <div className="blog-container">
          <div className="blog-section-label">
            <span>01 / FEATURED</span>
          </div>

          <article className="featured-article">
            <ArticleVisual
              type={featuredPost.visual}
              featured
            />

            <div className="featured-article-content">
              <div className="featured-label">
                <span>FEATURED ARTICLE</span>
                <span>{featuredPost.date}</span>
              </div>

              <h2>{featuredPost.title}</h2>

              <p>{featuredPost.excerpt}</p>

              <div className="featured-bottom">
                <span>
                  <Clock3 size={15} />
                  {featuredPost.readTime}
                </span>

                <button type="button" className="featured-read">
                  Read Article
                  <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="articles-section">
        <div className="blog-container">
          <div className="articles-heading">
            <div>
              <span className="blog-section-label">02 / ALL ARTICLES</span>

              <h2>
                Explore the
                <br />
                <span>journal.</span>
              </h2>
            </div>

            <div className="search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search articles"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>

          <div className="category-bar">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {normalPosts.length > 0 ? (
            <div className="blog-grid">
              {normalPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <span>NO ARTICLES FOUND</span>
              <h3>Try another search.</h3>
              <p>
                We couldn't find an article matching your current filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* TOPICS */}
      <section className="topics-section">
        <div className="blog-container">
          <div className="topics-layout">
            <div>
              <span className="blog-section-label">03 / TOPICS</span>

              <h2>
                What we're
                <br />
                <span>thinking about.</span>
              </h2>
            </div>

            <div className="topic-list">
              <button
                type="button"
                onClick={() => setActiveCategory("Technology")}
              >
                <span>01</span>
                <strong>Technology</strong>
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("AI & ML")}
              >
                <span>02</span>
                <strong>AI & Machine Learning</strong>
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("Engineering")}
              >
                <span>03</span>
                <strong>Engineering</strong>
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("Business")}
              >
                <span>04</span>
                <strong>Business & Digital</strong>
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("Projects")}
              >
                <span>05</span>
                <strong>Projects & Case Insights</strong>
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="blog-cta">
        <div className="blog-container">
          <div className="blog-cta-line" />

          <div className="blog-cta-content">
            <span className="blog-section-label">COGNOLYNX JOURNAL</span>

            <h2>
              Stay curious.
              <br />
              <span>Keep building.</span>
            </h2>

            <p>
              More technical insights, project stories and ideas from
              Cognolynx are on the way.
            </p>
          </div>

          <div className="blog-cta-footer">
            <span>COGNOLYNX</span>
            <span>BUILD · SOLVE · EVOLVE</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}