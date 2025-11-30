import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/ProductsReview.module.css';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.thestylishmama.com/api/posts'
    : 'http://localhost:3000/api/posts';

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return '';
  return htmlContent
    .replace(/<[^>]+>/g, '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .trim();
};

export default function ProductsReviewPost({ post, error }) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.thestylishmama.com'
      : 'http://localhost:3000';

  if (!post || error) {
    return (
      <div className={styles.productsReviewPage}>
        <Head>
          <title>Review Not Found | The Stylish Mama</title>
        </Head>
        <section className={styles.productsReviewPageContentWrapper}>
          <h1>404 - This page could not be found</h1>
          {error && <p className={styles.productsReviewPageErrorMessage}>{error}</p>}
        </section>
      </div>
    );
  }

  // ← THIS IS THE FIXED STRUCTURED DATA (Google loves this)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": post.title || "Product Review",
    "url": `${baseUrl}/productsreview/${post.slug}`,
    "datePublished": post.createdAt || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author || "The Stylish Mama"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Stylish Mama",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": post.rating || "5",        // ← Change per post if you store it, or keep 5
      "bestRating": "5",
      "worstRating": "1"
    },
    "itemReviewed": {
      "@type": "Product",
      "name": (post.title || '').replace(/review:/gi, '').trim(),
      "image": post.imageUrl || "https://www.thestylishmama.com/default-product-image.jpg",
      "description": sanitizeText(post.content).substring(0, 200)
    },
    "reviewBody": sanitizeText(post.content)
  };

  return (
    <div className={styles.productsReviewPage}>
      <Head>
        <title>{`${post.title || 'Product Review'} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="keywords" content={post.tags?.join(', ') || 'product review, mom approved, stylish mama'} />
        <link rel="canonical" href={`${baseUrl}/productsreview/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title || 'Product Review'} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/productsreview/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || 'https://www.thestylishmama.com/default-product-image.jpg'} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Product Review'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="twitter:image" content={post.imageUrl || 'https://www.thestylishmama.com/default-product-image.jpg'} />

        {/* PERFECT STRUCTURED DATA – NO MORE ERRORS */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.productsReviewPageContentWrapper}>
        <h1
          className={styles.productsReviewPageTitle}
          style={{
            color: post.titleStyle?.color || '#000',
            fontSize: post.titleStyle?.fontSize || '2rem',
            textAlign: post.titleStyle?.textAlign || 'left',
          }}
        >
          {post.title || 'Untitled'}
        </h1>

        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title || 'Product review'}
            className={styles.productsReviewPageImage}
            width={800}
            height={450}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://www.thestylishmama.com/default-product-image.jpg';
            }}
          />
        ) : (
          <div className={styles.productsReviewPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.productsReviewPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.productsReviewPageMeta}>
          Published on: {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${API_URL}?page=ProductsReview&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');

    const { posts = [] } = await res.json();

    const targetPost = posts.find((p) => p.slug === slug);

    if (!targetPost) {
      return { props: { post: null, error: 'Post not found' } };
    }

    const formatted = {
      ...targetPost,
      slug: targetPost.slug,
      titleStyle: targetPost.titleStyle
        ? typeof targetPost.titleStyle === 'string'
          ? JSON.parse(targetPost.titleStyle)
          : targetPost.titleStyle
        : { color: '#000', fontSize: '2rem', textAlign: 'left' },
      imageUrl: targetPost.imageUrl?.startsWith('http')
        ? targetPost.imageUrl
        : targetPost.imageUrl
        ? `https://www.thestylishmama.com${targetPost.imageUrl}`
        : null,
      rating: targetPost.rating || "5", // ← optional: store real rating in DB later
    };

    return { props: { post: formatted } };

  } catch (err) {
    console.error(err);
    return { props: { post: null, error: 'Failed to load review' } };
  }
}
