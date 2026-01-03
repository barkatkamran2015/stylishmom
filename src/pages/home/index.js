// pages/index.js
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import styles from "../../styles/Dash.module.css";

import imageBlog from "../Assets/family.jpg";
import imageNature from "../Assets/lotto.jpg";
import imageRecipe from "../Assets/make.jpg";
import imageBurger from "../Assets/burger.jpg";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

if (typeof window !== "undefined") {
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
}

const API_URL = "https://www.barkatkamran.com/api.php";

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

// If home API doesn’t provide slug, we’ll generate a “best guess”
// ONLY to query the backend resolver (not to route directly).
const generateSlugGuess = (title) => {
  if (!title) return "";
  return title
    .replace(/[\u2018\u2019]/g, "") // curly apostrophes
    .replace(/['"]/g, "") // straight quotes/apostrophes
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .toLowerCase()
    .trim()
    // NOTE: do NOT force comma style here; we want to test either way via backend fallback
    .replace(/[^\w\s&(),-]/g, "") // keep comma too
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Try many keys (until backend is fully consistent everywhere)
const extractSlugFromList = (post) =>
  post?.slug ??
  post?.post_slug ??
  post?.postSlug ??
  post?.slugText ??
  post?.slug_text ??
  "";

const extractContentHtml = (post) => post.content || post.post_content || post.body || "";

/**
 * 🔥 Resolver: asks backend for the canonical slug using GET by slug.
 * Your backend fallback will resolve commas/apostrophes differences and return DB slug.
 */
async function resolveCanonicalSlug({ page, slugGuess }) {
  const res = await fetch(
    `${API_URL}?page=${encodeURIComponent(page)}&slug=${encodeURIComponent(slugGuess)}`
  );
  const data = await res.json();
  // Expect: { post: { slug: "canonical-db-slug", ... } } or { post: null }
  return data?.post?.slug || null;
}

/** ------------------------- */

export async function getStaticProps() {
  const limit = 100;
  const offset = 0;

  try {
    const response = await fetch(
      `${API_URL}?page=all&limit=${limit}&offset=${offset}`
    );

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
        // ✅ Use slug if the API provides it; if not, we’ll resolve on click
        slug: extractSlugFromList(post) || "",
        contentHtml,
        thumbnailUrl,
        createdAt: post.createdAt || post.created_at || new Date().toISOString(),
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
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(initialError);
  const [isClient, setIsClient] = useState(false);

  // For click resolving state
  const [resolvingId, setResolvingId] = useState(null);

  const INITIAL_LOAD = 6;
  const LOAD_MORE = 3;

  useEffect(() => {
    setIsClient(true);
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

  const navigateToPost = async (post) => {
    const categoryPath = getCategoryPath(post.page);
    const page = (post.page || "").toString();

    try {
      setResolvingId(post.id);

      // ✅ If we already have a slug from the list, go directly
      if (post.slug) {
        router.push(`${categoryPath}/${encodeURIComponent(post.slug)}`);
        return;
      }

      // ❗ If slug missing from home list, resolve canonical slug from backend
      const guess = generateSlugGuess(post.title);

      // Try guess as-is
      let canonical = await resolveCanonicalSlug({ page, slugGuess: guess });

      // If not found, try comma backend style variant quickly (your known pattern)
      if (!canonical && guess.includes(",")) {
        const commaVariant = guess.replace(/,/g, ",-");
        canonical = await resolveCanonicalSlug({ page, slugGuess: commaVariant });
      }

      // If still not found, try removing commas (another common)
      if (!canonical) {
        const noComma = guess.replace(/,/g, "");
        canonical = await resolveCanonicalSlug({ page, slugGuess: noComma });
      }

      if (!canonical) {
        console.error("Could not resolve canonical slug for:", post);
        return;
      }

      router.push(`${categoryPath}/${encodeURIComponent(canonical)}`);
    } finally {
      setResolvingId(null);
    }
  };

  const incrementViewCount = async (postId, page) => {
    try {
      await fetch(
        `${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=${page}`,
        { method: "POST" }
      );
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

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Barkat Kamran | Lifestyle Blog, Reviews & Recipes",
      description:
        "Discover Barkat Kamran's lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!",
      url: "https://www.thestylishmama.com/",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: displayedPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "BlogPosting",
            headline: post.title,
            description: (post.contentHtml || "").replace(/<[^>]+>/g, "").substring(0, 160),
            datePublished: post.createdAt || new Date().toISOString(),
            author: { "@type": "Person", name: "Admin" },
            image: post.thumbnailUrl || "/default-image.jpg",
          },
        })),
      },
    }),
    [displayedPosts]
  );

  if (!isClient) return <p>Loading...</p>;

  const hasMore = displayedPosts.length < allPosts.length;

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Barkat Kamran | Lifestyle Blog, Reviews & Recipes</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover Barkat Kamran's lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!"
        />
        <link rel="canonical" href="https://www.thestylishmama.com/" />
        <link rel="icon" href="/favicon.ico" />

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
                        <p className={styles.cardDate}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className={styles.cardExcerpt}>
                          {(post.contentHtml || "").replace(/<[^>]+>/g, "").slice(0, 250)}...
                        </p>

                        <button
                          className={styles.cardButton}
                          onClick={() => navigateToPost(post)}
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
                        <p className={styles.cardDate}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className={styles.cardExcerpt}>
                          {(post.contentHtml || "").replace(/<[^>]+>/g, "").slice(0, 250)}...
                        </p>

                        <button
                          className={styles.cardButton}
                          onClick={() => navigateToPost(post)}
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
