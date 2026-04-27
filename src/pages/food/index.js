// pages/food/index.js
import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Header from "../header";
import styles from "../../styles/Food.module.css";
import { SITE_NAME, SITE_URL, absoluteImage, fetchWithTimeout, pageSeo } from "../../lib/seo";

const API_URL = process.env.PHP_API_URL || "https://api.barkatkamran.com/api.php";

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return "";
  let text = htmlContent.replace(/<[^>]+>/g, "");
  text = text
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/\//g, "/");
  return text.trim();
};

export default function Food({ posts, initialCategories, initialTags, error }) {
  const [allPosts] = useState(posts || []);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const INITIAL_LOAD = 6;
  const LOAD_MORE = 3;

  useEffect(() => {
    setDisplayedPosts(allPosts.slice(0, INITIAL_LOAD));
  }, [allPosts]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedPosts((prev) => allPosts.slice(0, prev.length + LOAD_MORE));
      setLoading(false);
    }, 300);
  };

  const handleSearch = useCallback(
    (searchTerm) => {
      if (!searchTerm.trim()) {
        setDisplayedPosts(allPosts.slice(0, INITIAL_LOAD));
      } else {
        const filtered = allPosts.filter(
          (post) =>
            (post.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (post.content || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedPosts(filtered.slice(0, INITIAL_LOAD));
        console.log("Filtered Food Slugs:", filtered.map((p) => p.slug));
      }
    },
    [allPosts]
  );

  const handleFilterApply = useCallback(
    (selectedCategories, selectedTags) => {
      const filtered = allPosts.filter(
        (post) =>
          (!selectedCategories.length || selectedCategories.includes(post.category)) &&
          (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
      );
      setDisplayedPosts(filtered.slice(0, INITIAL_LOAD));
      console.log("Filtered Food Slugs after Filter:", filtered.map((p) => p.slug));
    },
    [allPosts]
  );

  const baseUrl = SITE_URL;
  const pageUrl = `${baseUrl}/food`;

  const hasMore = displayedPosts.length < allPosts.length;

  // ✅ Stable SEO (does not change based on first post)
  const dynamicTitle = pageSeo.food.title;
  const dynamicDescription = pageSeo.food.description;

  // ✅ Absolute OG image (safe fallback)
  const ogImage = (() => {
    const img = displayedPosts?.[0]?.imageUrl;
    if (img && typeof img === "string" && img.startsWith("http")) return img;
    return absoluteImage("/logo2.png");
  })();

  // ✅ Correct category schema: CollectionPage + ItemList of BlogPosting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Food Recipes | The Stylish Mama",
    description: dynamicDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: (displayedPosts || []).map((post, index) => {
        const postUrl = `${baseUrl}/food/${encodeURIComponent(post.slug)}`;
        const image =
          post.imageUrl && typeof post.imageUrl === "string" && post.imageUrl.startsWith("http")
            ? post.imageUrl
            : `${baseUrl}/default-food-image.jpg`;

        return {
          "@type": "ListItem",
          position: index + 1,
          url: postUrl,
          item: {
            "@type": "BlogPosting",
            headline: post.title,
            description: sanitizeText(post.content).substring(0, 160),
            ...(post.createdAt ? { datePublished: post.createdAt } : {}),
            ...(post.updated_at || post.createdAt ? { dateModified: post.updated_at || post.createdAt } : {}),
            author: { "@type": "Organization", name: SITE_NAME },
            image,
            mainEntityOfPage: postUrl,
          },
        };
      }),
    },
  };

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className={styles.foodPageSearchContainer}>
        <Header
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          categories={initialCategories}
          tags={initialTags}
        />
      </div>

      <section className={styles.foodPageContentWrapper}>
        <div className={styles.foodPageIntro}>
          <h1 className={styles.foodPageHeading}>Easy Family Recipes for Busy Moms</h1>
          <p>
            Find quick weeknight dinners, air fryer recipes, comforting family meals, and simple
            home cooking ideas made for real busy-mom days.
          </p>
          <nav aria-label="Related mom life topics" className={styles.foodPageTopicLinks}>
            <Link href="/blog">Mom life stories</Link>
            <Link href="/productsreview">Busy mom product reviews</Link>
            <Link href="/dessert">Easy desserts</Link>
            <Link href="/drinks">Simple drinks</Link>
          </nav>
        </div>

        {error && <p className={styles.foodPageErrorMessage}>{error}</p>}
        {displayedPosts.length === 0 && !error && (
          <p className={styles.foodPageNoPostsMessage}>No posts available</p>
        )}

        <div className={styles.foodPageGrid}>
          {displayedPosts.map((post, index) => (
            <div key={post.id} className={styles.foodPageCard} style={{ "--index": index }}>
              {post.imageUrl ? (
                <Link href={`/food/${encodeURIComponent(post.slug)}`}>
                  <Image
                    src={post.imageUrl}
                    alt={`Thumbnail for ${post.title} - Food Recipe`}
                    className={styles.foodPageImage}
                    width={300}
                    height={200}
                    loading="lazy"
                  />
                </Link>
              ) : (
                <Link href={`/food/${encodeURIComponent(post.slug)}`}>
                  <div className={styles.foodPageImagePlaceholder}>No Image Available</div>
                </Link>
              )}

              <Link href={`/food/${encodeURIComponent(post.slug)}`}>
                <h2 className={styles.foodPageTitle}>{post.title}</h2>
              </Link>

              <p className={styles.foodPageExcerpt}>
                {sanitizeText(post.content).substring(0, 200) || "No content available..."}
              </p>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className={styles.viewMoreContainer}>
            <button className={styles.viewMoreButton} onClick={loadMore} disabled={loading}>
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  const limit = 100; // Load plenty for "View More"
  const offset = 0;

  try {
    const response = await fetchWithTimeout(`${API_URL}?page=Recipe&limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const { posts = [] } = data;

    const uniqueCategories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
    const uniqueTags = [...new Set(posts.flatMap((p) => p.tags || []).filter(Boolean))];

    const formattedPosts = posts.map((post) => ({
      ...post,
      imageUrl: post.imageUrl?.startsWith("http")
        ? post.imageUrl
        : post.imageUrl
        ? `https://www.thestylishmama.com${post.imageUrl}`
        : null,
    }));

    return {
      props: {
        posts: formattedPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        error: "",
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("getStaticProps error:", err);
    return {
      props: {
        posts: [],
        initialCategories: [],
        initialTags: [],
        error: "Failed to load posts",
      },
      revalidate: 60,
    };
  }
}
