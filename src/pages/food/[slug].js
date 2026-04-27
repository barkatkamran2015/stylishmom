// pages/food/[slug].js
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Food.module.css";
import { SITE_NAME } from "../../lib/seo";

const API_URL = process.env.PHP_API_URL || "https://www.barkatkamran.com/api.php";
const baseUrl = "https://www.thestylishmama.com";

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return "";
  return htmlContent.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
};

const absoluteImage = (url) => {
  if (!url) return `${baseUrl}/default-food-image.jpg`;
  if (typeof url === "string" && url.startsWith("http")) return url;
  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
};

export default function FoodPost({ post, canonicalSlug }) {
  // 404 page (SEO-safe)
  if (!post) {
    return (
      <div className={styles.foodPage}>
        <Head>
          <title>Recipe Not Found | The Stylish Mama</title>
          <meta
            name="description"
            content="The recipe you are looking for could not be found."
          />
          <meta name="robots" content="noindex, follow" />
        </Head>

        <section className={styles.heroSection}>
          <h1 className={styles.notFoundTitle}>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const slug = canonicalSlug || post.slug; // canonicalSlug is safer if provided
  const pageUrl = `${baseUrl}/food/${encodeURIComponent(slug)}`;

  const description = sanitizeText(post.content).substring(0, 160) || "A delicious recipe from The Stylish Mama.";
  const ogImage = absoluteImage(post.imageUrl);

  // ✅ Recipe JSON-LD (safe + absolute URLs)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: post.title || "Untitled",
    description,
    ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    ...(post.updated_at || post.createdAt ? { dateModified: post.updated_at || post.createdAt } : {}),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    image: [ogImage],
    url: pageUrl,
    recipeCategory: "Food",
  };

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{`${post.title || "Untitled"} | The Stylish Mama`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title || "Untitled"} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || "Untitled"} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {post.imageUrl ? (
          <Image
            src={ogImage}
            alt={post.title || "Recipe image"}
            fill
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{post.title || "Untitled"}</h1>
          <p className={styles.heroDate}>
            Published on{" "}
            {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.content || "" }} />
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  // ✅ Do NOT prebuild 1000 paths; let Next build on demand
  return { paths: [], fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const slugParam = params?.slug ? String(params.slug) : "";
  const encodedSlug = encodeURIComponent(slugParam);

  try {
    // ✅ Primary: fetch post by slug (backend should handle commas/apostrophes)
    const res = await fetch(`${API_URL}?page=Recipe&slug=${encodedSlug}`);
    if (res.ok) {
      const data = await res.json();
      if (data?.post) {
        const post = data.post;

        // ✅ Canonical redirect if backend slug differs
        const canonicalSlug = post.slug;
        if (canonicalSlug && canonicalSlug !== slugParam) {
          return {
            redirect: {
              destination: `/food/${encodeURIComponent(canonicalSlug)}`,
              permanent: true,
            },
          };
        }

        return {
          props: { post, canonicalSlug: canonicalSlug || slugParam },
          revalidate: 60,
        };
      }
    }

    // If not found
    return { notFound: true, revalidate: 60 };
  } catch (err) {
    return { notFound: true, revalidate: 60 };
  }
}
