// pages/productsreview/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/ProductsReview.module.css';

const API_URL = 'https://www.thestylishmama.com/api/posts';

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

export default function ProductsReviewPost({ post }) {
  if (!post) {
    return (
      <div className={styles.productsReviewPage}>
        <Head>
          <title>Review Not Found | The Stylish Mama</title>
        </Head>
        <section className={styles.productsReviewPageContentWrapper}>
          <h1>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = 'https://www.thestylishmama.com';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": post.title,
    "url": `${baseUrl}/productsreview/${post.slug}`,
    "datePublished": post.createdAt,
    "author": { "@type": "Person", "name": post.author || "The Stylish Mama" },
    "publisher": {
      "@type": "Organization",
      "name": "The Stylish Mama",
      "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
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
      "image": post.imageUrl || `${baseUrl}/default-product-image.jpg`,
      "description": sanitizeText(post.content).substring(0, 200)
    },
    "reviewBody": sanitizeText(post.content)
  };

  return (
    <div className={styles.productsReviewPage}>
      <Head>
        <title>{`${post.title} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="keywords" content={post.tags?.join(', ') || 'product review, mom approved, stylish mama'} />
        <link rel="canonical" href={`${baseUrl}/productsreview/${post.slug}`} />

        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/productsreview/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || `${baseUrl}/default-product-image.jpg`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="twitter:image" content={post.imageUrl || `${baseUrl}/default-product-image.jpg`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.productsReviewPageContentWrapper}>
        <h1 className={styles.productsReviewPageTitle} style={{
          color: post.titleStyle?.color || '#000',
          fontSize: post.titleStyle?.titleStyle?.fontSize || '2rem',
          textAlign: post.titleStyle?.textAlign || 'left',
        }}>
          {post.title}
        </h1>

        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            className={styles.productsReviewPageImage}
            width={800}
            height={450}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = '/default-product-image.jpg'; }}
          />
        ) : (
          <div className={styles.productsReviewPageImagePlaceholder}>No Image Available</div>
        )}

        <div className={styles.productsReviewPageContent} dangerouslySetInnerHTML={{ __html: post.content }} />

        <p className={styles.productsReviewPageMeta}>
          Published on: {new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
        </p>
      </section>
    </div>
  );
}

// THIS MAKES EVERY POST INSTANT
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}?page=ProductsReview&limit=1000&offset=0`);
  const { posts = [] } = await res.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug.toString() },
  }));

  return {
    paths,
    fallback: 'blocking', // new posts load instantly + get built in background
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API_URL}?page=ProductsReview&limit=1000&offset=0`);
  const { posts = [] } = await res.json();

  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return { notFound: true };
  }

  // Format exactly like before
  const formattedPost = {
    ...post,
    titleStyle: post.titleStyle
      ? typeof post.titleStyle === 'string'
        ? JSON.parse(post.titleStyle)
        : post.titleStyle
      : { color: '#000', fontSize: '2rem', textAlign: 'left' },
    imageUrl: post.imageUrl?.startsWith('http')
      ? post.imageUrl
      : post.imageUrl
      ? `https://www.thestylishmama.com${post.imageUrl}`
      : null,
    rating: post.rating || "5",
  };

  return {
    props: {
      post: formattedPost,
    },
    revalidate: 60, // revalidate every 60 seconds — new posts appear in 1 minute
  };
}
