// pages/productsreview/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/ProductsReview.module.css';
import { SITE_NAME, SITE_URL, absoluteImage, excerpt } from '../../lib/seo';

const API_URL = process.env.PHP_API_URL || 'https://www.barkatkamran.com/api.php';

const sanitizeText = (htmlContent) => excerpt(htmlContent, 5000);

export default function ProductsReviewPost({ post }) {
  if (!post) {
    return (
      <div className={styles.productsReviewPage}>
        <Head>
          <title>Review Not Found | The Stylish Mama</title>
          <meta name="description" content="The product review you are looking for could not be found." />
        </Head>
        <section className={styles.heroSection}>
          <h1 className={styles.notFoundTitle}>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = SITE_URL;
  const description = excerpt(post.content, 160) || 'Read this product review from The Stylish Mama.';
  const pageUrl = `${baseUrl}/productsreview/${encodeURIComponent(post.slug)}`;
  const imageUrl = absoluteImage(post.imageUrl);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": post.title,
    "url": pageUrl,
    "datePublished": post.createdAt,
    "author": { "@type": "Person", "name": post.author || SITE_NAME },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": absoluteImage('/logo2.png') }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": post.rating || "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "itemReviewed": {
      "@type": "Product",
      "name": (post.title || '').replace(/review:/gi, '').trim(),
      "image": imageUrl,
      "description": excerpt(post.content, 200)
    },
    "reviewBody": sanitizeText(post.content)
  };

  return (
    <div className={styles.productsReviewPage}>
      <Head>
        <title>{`${post.title} | The Stylish Mama`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className={styles.heroImage}
            priority
            onError={(e) => (e.currentTarget.src = '/default-product-image.jpg')}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          <p className={styles.heroDate}>
            Published on {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(`${API_URL}?page=ProductsReview&limit=1000&offset=0`);
    const { posts = [] } = await res.json();
    const paths = posts
      .filter(post => post.slug)
      .map((post) => ({
        params: { slug: post.slug.toString() },
      }));
    return { paths, fallback: 'blocking' };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    // Try direct single post fetch first
    const res = await fetch(`${API_URL}?page=ProductsReview&slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (data.post) {
        return { props: { post: data.post }, revalidate: 60 };
      }
    }

    // Fallback to list if needed
    const listRes = await fetch(`${API_URL}?page=ProductsReview&limit=1000&offset=0`);
    if (!listRes.ok) throw new Error();
    const { posts = [] } = await listRes.json();
    const targetPost = posts.find(p => p.slug === slug);

    if (!targetPost) return { notFound: true };

    return { props: { post: targetPost }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
}
