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

/**
 * Extract slug from whatever key your API uses.
 * Add keys here if your API returns different naming.
 */
function extractSlug(post) {
  return (
    post?.slug ||
    post?.post_slug ||
    post?.postSlug ||
    post?.slug_text ||
    post?.slugText ||
    post?.seo_slug ||
    post?.seoSlug ||
    ""
  );
}

/**
 * Some of your backend slugs preserve commas as ",-".
 * If homepage API returns a cleaned slug, we can correct it
 * ONLY when the title actually contains a comma.
 */
function normalizeSlugToBackendStyle({ slug, title }) {
  if (!slug) return "";

  // Only try to fix if the title actually contains commas
  const hasCommaInTitle = (title || "").includes(",");
  if (!hasCommaInTitle) return slug;

  // If slug already contains ",-" then it's already backend-style
  if (slug.includes(",-")) return slug;

  // If title contains comma, backend seems to insert ",-" at that comma position
  // Most common scenario: cleaned slug removed comma completely.
  // We can insert ",-" at the first comma spot by matching the title segments.
  const titleParts = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  if (titleParts.length < 2) return slug;

  // Convert those title parts into slug-like segments
  const partToSlug = (s) =>
    s
      .replace(/[\u2018\u2019]/g, "")
      .replace(/['"]/g, "")
      .replace(/[^\w\s&()-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

  const left = partToSlug(titleParts[0]);
  const right = partToSlug(titleParts[1]);

  // If slug contains left-right contiguous, replace that join with left + ",-" + right
  const joined = `${left}-${right}`;
  if (slug.includes(joined)) {
    return slug.replace(joined, `${left},-${right}`);
  }

  // Fallback: if we can't confidently reconstruct, keep slug as is
  return slug;
}

export async function getStaticProps() {
  const limit = 100;
  const offset = 0;

  try {
    const response = await fetch(
      `${API_URL}?page=all&limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      return {
        props: {
          initialPosts: [],
          error: `Failed to fetch posts: ${response.status}`,
        },
        revalidate: 60,
      };
    }

    const { posts = [] } = await response.json();

    const parsedPosts = posts.map((post) => {
      const contentHtml = post.content || post.post_content || post.body || "";

      const imageMatch = contentHtml.match(/<img[^>]+src=["'](.*?)["']/i);
      const thumbnailUrl =
        post.imageUrl ||
        post.image_url ||
        (imageMatch ? imageMatch[1] : "/default-image.jpg");

      const rawSlug = extractSlug(post);
      const title = post.title || "Untitled";

      // If backend has comma behavior, normalize to match it
      const slug = normalizeSlugToBackendStyle({ slug: rawSlug, title });

      const permalink = post.permalink || post.url || post.path || "";

      // Debug only in dev
      if (process.env.NODE_ENV !== "production") {
        if (!slug) {
          console.warn("Post missing slug in HOME API:", {
            id: post.id,
            title,
            page: post.page,
          });
        }
      }

      return {
        id: post.id,
        title,
        slug,
        permalink,
        contentHtml,
        thumbnailUrl,
        createdAt: post.createdAt || post.created_at || new Date().toISOString(),
        page: post.page,
        titleStyle:
          post.titleStyle || {
            color: "#000",
            fontSize: "1.8rem",
            textAlign: "left",
          },
        userId: post.creator_uid,
      };
    });

    return {
      props: {
        initialPosts: parsedPosts,
        error: null,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        initialPosts: [],
        error: error?.message || "Unknown error",
      },
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

  const pagePaths = useMemo(
    () => ({
      Recipe: "/food",
      Drinks: "/drinks",
      Dessert: "/dessert",
      Blog: "/blog",
      ProductsReview: "/productsreview",
    }),
    []
  );

  const navigateToPost = (post) => {
    const categoryPath = pagePaths[post.page] || "/blog";

    // Best: use permalink if provided
    if (post.permalink) {
      router.push(post.permalink);
      return;
    }

    // Use slug only (no title generation)
    const slug = post.slug;

    if (!slug) {
      console.error("Cannot navigate: slug missing for post", post);
      return;
    }

    router.push(`${categoryPath}/${encodeURIComponent(slug)}`);
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
            description: (post.contentHtml || "")
              .replace(/<[^>]+>/g, "")
              .substring(0, 160),
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
                <h3 className={styles.homePage__sliderText}>
                  Meals That Bring Everyone Together
                </h3>
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
                <h3 className={styles.homePage__sliderText}>
                  Quick, Delicious, Stress-Free Cooking
                </h3>
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
                <h3 className={styles.homePage__sliderText}>
                  Comfort Food Made Simple
                </h3>
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
                <h3 className={styles.homePage__sliderText}>
                  Delicious Recipes for Busy Parents!
                </h3>
              </div>
            </div>
          </Slider>

          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for blogs, reviews, or recipes..."
          />

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
                      {(post.contentHtml || "")
                        .replace(/<[^>]+>/g, "")
                        .slice(0, 250)}
                      ...
                    </p>
                    <button
                      className={styles.cardButton}
                      onClick={() => navigateToPost(post)}
                    >
                      Read More
                    </button>
                  </div>

                  <div className={styles.cardImageSide}>
                    {post.thumbnailUrl &&
                    post.thumbnailUrl !== "/default-image.jpg" ? (
                      <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        fill
                        className={styles.cardImage}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className={styles.viewMoreContainer}>
              <button
                className={styles.viewMoreButton}
                onClick={loadMorePosts}
                disabled={loading}
              >
                {loading ? "Loading..." : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
