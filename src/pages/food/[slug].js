import Head from "next/head";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import styles from "../../styles/Food.module.css";

export default function FoodPost({ post, canonicalSlug }) {
  const safePost = post || null;

  // ✅ Hooks must ALWAYS run
  const baseUrl = "https://www.thestylishmama.com";

  const metaDescription = useMemo(() => {
    const text = safePost?.content ? safePost.content.replace(/<[^>]+>/g, "").trim() : "";
    return (text || safePost?.title || "Food recipe on The Stylish Mama").substring(0, 160);
  }, [safePost?.content, safePost?.title]);

  const [imgSrc, setImgSrc] = useState(
    safePost?.imageUrl || "/default-food-image.jpg"
  );

  // Keep imgSrc in sync when navigating between posts client-side
  useEffect(() => {
    setImgSrc(safePost?.imageUrl || "/default-food-image.jpg");
  }, [safePost?.imageUrl]);

  // ✅ After hooks, it's safe to early return
  if (!safePost) {
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

  const canonicalUrl = `${baseUrl}/food/${canonicalSlug || safePost.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: safePost.title || "Untitled",
    description: metaDescription,
    datePublished: safePost.createdAt || new Date().toISOString(),
    dateModified: safePost.updated_at || safePost.createdAt || new Date().toISOString(),
    author: { "@type": "Person", name: "The Stylish Mama" },
    publisher: { "@type": "Organization", name: "The Stylish Mama" },
    image: safePost.imageUrl || "/default-food-image.jpg",
    url: canonicalUrl,
    recipeCategory: "Food",
  };

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{`${safePost.title || "Untitled"} | The Stylish Mama`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={safePost.title || "Untitled"} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={safePost.imageUrl || "/default-food-image.jpg"} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.heroSection}>
        <Image
          src={imgSrc}
          alt={safePost.title || "Food recipe"}
          fill
          className={styles.heroImage}
          priority
          onError={() => setImgSrc("/default-food-image.jpg")}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{safePost.title || "Untitled"}</h1>
          {safePost.createdAt && (
            <p className={styles.heroDate}>
              Published on{" "}
              {new Date(safePost.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          )}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: safePost.content || "" }}
        />
      </section>
    </div>
  );
}
