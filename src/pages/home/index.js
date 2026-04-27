// pages/index.js
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import styles from "../../styles/Dash.module.css";
import { SITE_NAME, SITE_URL, absoluteImage, fetchWithTimeout, pageSeo } from "../../lib/seo";

import imageBlog from "../Assets/family.jpg";
import imageNature from "../Assets/lotto.jpg";
import imageRecipe from "../Assets/make.jpg";
import imageBurger from "../Assets/burger.jpg";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

if (typeof window !== "undefined") {
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
}

const API_URL = "https://api.barkatkamran.com/api.php";

/** -------- Helpers -------- */

const getCategoryPath = (page) => {
  const p = (page || "").toString().trim().toLowerCase();
  if (p === "recipe" || p === "recipes") return "/food";
  if (p === "drinks" || p === "drink") return "/drinks";
  if (p === "dessert" || p === "desserts") return "/dessert";
  if (p === "productsreview" || p === "productreview" || p === "products review")
    return "/productsreview";
  if (p === "blog" || p === "blogs") return "/blog";
  return "/blog";
};

const generateSlugGuess = (title) => {
  if (!title) return "";
  return title
    .replace(/[\u2018\u2019]/g, "") // curly apostrophes
    .replace(/['"]/g, "") // straight quotes/apostrophes
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .toLowerCase()
    .trim()
    .replace(/[^\w\s&(),-]/g, "") // keep comma too
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const extractSlugFromList = (post) =>
  post?.slug ??
  post?.post_slug ??
  post?.postSlug ??
  post?.slugText ??
  post?.slug_text ??
  "";

const extractContentHtml = (post) => post.content || post.post_content || post.body || "";

// ✅ Hydration-safe, deterministic date display
const formatDateUTC = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Resolver: asks backend for canonical slug using GET by slug guess.
 * (Not used in navigateToPost below right now since you already require post.slug)
 */
async function resolveCanonicalSlug({ page, slugGuess }) {
  const res = await fetch(
    `${API_URL}?page=${encodeURIComponent(page)}&slug=${encodeURIComponent(slugGuess)}`
  );
  const data = await res.json();
  return data?.post?.slug || null;
}

/** ------------------------- */

export async function getStaticProps() {
  const limit = 100;
  const offset = 0;

  try {
    const response = await fetchWithTimeout(`${API_URL}?page=all&limit=${limit}&offset=${offset}`);

    if (!response.ok) {
      return {
        props: { initialPosts: [], error: `Failed to fetch posts: ${response.status}` },
        revalidate: 60,
      };
    }

    const { posts = [] } = await response.json();

    const parsedPosts = posts.map((post) => {
      const contentHtml = extractContentHtml(post);

      const imageMatch = contentHtml.match(/<img[^>]+src=["'](.*?)["']/i);
      const thumbnailUrl =
        post.imageUrl ||
        post.image_url ||
        (imageMatch ? imageMatch[1] : "/default-image.jpg");

      return {
        id: post.id,
        title: post.title || "Untitled",
        slug: extractSlugFromList(post) || "",
        contentHtml,
        thumbnailUrl,
        // ✅ CRITICAL FIX: do NOT use new Date() during SSR/ISR
        createdAt: post.createdAt || post.created_at || "",
        page: post.page,
        titleStyle:
          post.titleStyle || { color: "#000", fontSize: "1.8rem", textAlign: "left" },
        userId: post.creator_uid,
      };
    });

    return {
      props: { initialPosts: parsedPosts, error: null },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: { initialPosts: [], error: error?.message || "Unknown error" },
      revalidate: 60,
    };
  }
}

export default function Home({ initialPosts, error: initialError }) {
  const router = useRouter();

  const [allPosts] = useState(initialPosts || []);
  const [displayedPosts, setDisplayedPosts] = useState((initialPosts || []).slice(0, 6));
  const [loading, setLoading] = useState(false);
  const [error] = useState(initialError);

  const [resolvingId, setResolvingId] = useState(null);

  const INITIAL_LOAD = 6;
  const LOAD_MORE = 3;

  useEffect(() => {
    setDisplayedPosts(allPosts.slice(0, INITIAL_LOAD));
  }, [allPosts]);

  const handleSearch = (query) => {
    const lower = (query || "").toLowerCase();
    const results = allPosts.filter(
      (post) =>
        (post.title || "").toLowerCase().includes(lower) ||
        (post.contentHtml || "").toLowerCase().includes(lower)
    );
    setDisplayedPosts(results.slice(0, INITIAL_LOAD));
  };

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedPosts((prev) => allPosts.slice(0, prev.length + LOAD_MORE));
      setLoading(false);
    }, 300);
  };

  // ✅ Make button click reliable: stop bubbling to card hover handlers, and handle missing slug
  const navigateToPost = async (post, e) => {
    if (e?.preventDefault) e.preventDefault();
    if (e?.stopPropagation) e.stopPropagation();

    const categoryPath = getCategoryPath(post.page);

    // Prefer API slug
    let slug = post.slug;

    // If missing slug, do a best-effort resolver (optional but helps)
    if (!slug) {
      try {
        setResolvingId(post.id);
        const guess = generateSlugGuess(post.title);
        const canonical = await resolveCanonicalSlug({ page: post.page, slugGuess: guess });
        slug = canonical || guess || "";
      } catch (err) {
        console.error("Could not resolve canonical slug for:", post, err);
      } finally {
        setResolvingId(null);
      }
    }

    if (!slug) {
      console.error("Missing slug from API for post:", post);
      return;
    }

    router.push(`${categoryPath}/${encodeURIComponent(slug)}`);
  };

  const incrementViewCount = async (postId, page) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=${page}`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Error incrementing view count:", err);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  // ✅ Hydration-safe JSON-LD: never use new Date() fallback here
  const structuredData = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageSeo.home.title,
      description: pageSeo.home.description,
      url: `${SITE_URL}/`,
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: displayedPosts.map((post, index) => {
          const desc = (post.contentHtml || "").replace(/<[^>]+>/g, "").substring(0, 160);
          const datePublished = post.createdAt || undefined;

          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "BlogPosting",
              headline: post.title,
              description: desc,
              ...(datePublished ? { datePublished } : {}),
              author: { "@type": "Organization", name: SITE_NAME },
              image: absoluteImage(post.thumbnailUrl),
            },
          };
        }),
      },
    };
  }, [displayedPosts]);

  const hasMore = displayedPosts.length < allPosts.length;

  return (
    <div className={styles.homePage}>
      <Head>
        <title>{pageSeo.home.title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pageSeo.home.description}
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={pageSeo.home.title} />
        <meta property="og:description" content={pageSeo.home.description} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={absoluteImage("/logo2.png")} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageSeo.home.title} />
        <meta name="twitter:description" content={pageSeo.home.description} />
        <meta name="twitter:image" content={absoluteImage("/logo2.png")} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {loading && displayedPosts.length === 0 ? (
        <div className={styles.loadingContainer}>
          <div className={styles.heartLoader}></div>
        </div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          <Slider {...sliderSettings} className={styles.homePage__featuredSlider}>
            <div className={styles.slideWrapper}>
              <Image
                src={imageBlog}
                alt="Meals That Bring Everyone Together"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <div className={styles.slideTextOverlay}>
                <h3 className={styles.homePage__sliderText}>Meals That Bring Everyone Together</h3>
              </div>
            </div>

            <div className={styles.slideWrapper}>
              <Image
                src={imageNature}
                alt="Quick, Delicious, Stress-Free Cooking"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <div className={styles.slideTextOverlay}>
                <h3 className={styles.homePage__sliderText}>Quick, Delicious, Stress-Free Cooking</h3>
              </div>
            </div>

            <div className={styles.slideWrapper}>
              <Image
                src={imageRecipe}
                alt="Comfort Food Made Simple"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <div className={styles.slideTextOverlay}>
                <h3 className={styles.homePage__sliderText}>Comfort Food Made Simple</h3>
              </div>
            </div>

            <div className={styles.slideWrapper}>
              <Image
                src={imageBurger}
                alt="Delicious Recipes for Busy Parents!"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <div className={styles.slideTextOverlay}>
                <h3 className={styles.homePage__sliderText}>Delicious Recipes for Busy Parents!</h3>
              </div>
            </div>
          </Slider>

          <SearchBar onSearch={handleSearch} placeholder="Search for blogs, reviews, or recipes..." />

          <div className={styles.colorfulCardsContainer}>
            {displayedPosts.map((post, index) => (
              <div
                key={post.id}
                className={`${styles.colorfulCard} ${
                  index % 6 === 0
                    ? styles.cardColor1
                    : index % 6 === 1
                    ? styles.cardColor2
                    : index % 6 === 2
                    ? styles.cardColor3
                    : index % 6 === 3
                    ? styles.cardColor4
                    : index % 6 === 4
                    ? styles.cardColor5
                    : styles.cardColor6
                }`}
                onMouseEnter={() => incrementViewCount(post.id, post.page)}
              >
                <div className={styles.cardContentWrapper}>
                  {index % 2 === 0 ? (
                    <>
                      <div className={styles.cardTextSide}>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.cardDate}>{formatDateUTC(post.createdAt)}</p>
                        <p className={styles.cardExcerpt}>
                          {(post.contentHtml || "").replace(/<[^>]+>/g, "").slice(0, 250)}...
                        </p>

                        <button
                          type="button"
                          className={styles.cardButton}
                          onClick={(e) => navigateToPost(post, e)}
                          disabled={resolvingId === post.id}
                        >
                          {resolvingId === post.id ? "Opening..." : "Read More"}
                        </button>
                      </div>

                      <div className={styles.cardImageSide}>
                        {post.thumbnailUrl && post.thumbnailUrl !== "/default-image.jpg" ? (
                          <Image src={post.thumbnailUrl} alt={post.title} fill className={styles.cardImage} />
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.cardImageSide}>
                        {post.thumbnailUrl && post.thumbnailUrl !== "/default-image.jpg" ? (
                          <Image src={post.thumbnailUrl} alt={post.title} fill className={styles.cardImage} />
                        ) : null}
                      </div>

                      <div className={styles.cardTextSide}>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.cardDate}>{formatDateUTC(post.createdAt)}</p>
                        <p className={styles.cardExcerpt}>
                          {(post.contentHtml || "").replace(/<[^>]+>/g, "").slice(0, 250)}...
                        </p>

                        <button
                          type="button"
                          className={styles.cardButton}
                          onClick={(e) => navigateToPost(post, e)}
                          disabled={resolvingId === post.id}
                        >
                          {resolvingId === post.id ? "Opening..." : "Read More"}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className={styles.viewMoreContainer}>
              <button className={styles.viewMoreButton} onClick={loadMorePosts} disabled={loading}>
                {loading ? "Loading..." : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
