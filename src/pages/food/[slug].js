// pages/food/[slug].js
import { useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Food.module.css";

const API_URL = "https://www.thestylishmama.com/api/posts";

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return "";
  return htmlContent.replace(/<[^>]+>/g, "").trim();
};

// Robust slugify: lowercase, hyphens, remove unsafe chars
const slugify = (input) => {
  if (!input) return "";
  return input
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFKD") // helps with accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export default function FoodPost({ post, canonicalSlug }) {
  // If post is missing, show your 404 content (Next will usually serve 404 page if notFound:true)
  if (!post) {
    return (
      <div className={styles.foodPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta
            name="description"
            content="The food recipe you are looking for could not be found."
          />
        </Head>
        <section className={styles.heroSection}>
          <h1 className={styles.notFoundTitle}>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = "https://www.thestylishmama.com";

  // Use canonicalSlug everywhere for URL/canonical/OG/schema
  const canonicalUrl = `${baseUrl}/food/${canonicalSlug}`;

  const metaDescription = useMemo(() => {
    const text = sanitizeText(post.content);
    return (text || post.title || "Food recipe on The Stylish Mama").substring(0, 160);
  }, [post]);

  // Next/Image fallback (don’t set e.currentTarget.src — it won’t work reliably with next/image)
  const [imgSrc, setImgSrc] = useState(post.imageUrl || "/default-food-image.jpg");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: post.title || "Untitled",
    description: metaDescription,
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { "@type": "Person", name: "The Stylish Mama" },
    publisher: { "@type": "Organization", name: "The Stylish Mama" },
    image: post.imageUrl || "/default-food-image.jpg",
    url: canonicalUrl,
    recipeCategory: "Food",
  };

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{`${post.title || "Untitled"} | The Stylish Mama`}</title>
        <meta name="description" content={metaDescription} />

        {/* Canonical is CRITICAL to “permanently” fix SEO + duplicate URLs */}
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={post.title || "Untitled"} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || "/default-food-image.jpg"} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={post.title || "Food recipe"}
            fill
            className={styles.heroImage}
            priority
            onError={() => setImgSrc("/default-food-image.jpg")}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}

        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{post.title || "Untitled"}</h1>
          {post.createdAt && (
            <p className={styles.heroDate}>
              Published on{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${API_URL}?page=Recipe&limit=1000&offset=0`);
    const data = await res.json();
    const posts = data?.posts || [];

    const paths = posts
      .filter((p) => p?.slug)
      .map((p) => ({
        params: { slug: p.slug.toString() }, // keep as-is; Next will handle encoding for static paths
      }));

    return { paths, fallback: "blocking" };
  } catch {
    return { paths: [], fallback: "blocking" };
  }
}

export async function getStaticProps({ params }) {
  // params.slug is the decoded route segment (Next handles decoding)
  const incomingSlug = (params?.slug || "").toString();

  // 1) Always try API fetch-by-slug first (encoded query string)
  // This is the key fix for commas/parentheses breaking query parsing.
  const encodedIncomingSlug = encodeURIComponent(incomingSlug);

  try {
    const directRes = await fetch(`${API_URL}?page=Recipe&slug=${encodedIncomingSlug}`);

    if (directRes.ok) {
      const directData = await directRes.json();
      const post = directData?.post || directData?.posts?.[0] || null;

      if (post) {
        // Canonical slug should be clean & stable
        const canonicalSlug = slugify(post.slug || post.title || incomingSlug);

        // If user visited an ugly/legacy slug, 301 redirect to the canonical clean URL
        if (incomingSlug !== canonicalSlug) {
          return {
            redirect: {
              destination: `/food/${canonicalSlug}`,
              permanent: true,
            },
          };
        }

        return {
          props: { post, canonicalSlug },
          revalidate: 60,
        };
      }
    }

    // 2) Fallback: fetch list and try to match
    const listRes = await fetch(`${API_URL}?page=Recipe&limit=2000&offset=0`);
    if (!listRes.ok) {
      return { notFound: true, revalidate: 60 };
    }

    const listData = await listRes.json();
    const posts = listData?.posts || [];

    // Try exact match first
    let post = posts.find((p) => (p?.slug || "").toString() === incomingSlug);

    // If not found, try matching by canonicalized slug (handles legacy slugs -> clean slugs)
    if (!post) {
      post = posts.find((p) => slugify(p?.slug || p?.title) === incomingSlug);
    }

    if (!post) {
      return { notFound: true, revalidate: 60 };
    }

    const canonicalSlug = slugify(post.slug || post.title || incomingSlug);

    // Redirect to canonical clean slug if needed
    if (incomingSlug !== canonicalSlug) {
      return {
        redirect: {
          destination: `/food/${canonicalSlug}`,
          permanent: true,
        },
      };
    }

    return {
      props: { post, canonicalSlug },
      revalidate: 60,
    };
  } catch {
    return { notFound: true, revalidate: 60 };
  }
}
