// pages/dessert/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Dessert.module.css';

const API_URL = 'https://www.thestylishmama.com/api/posts';

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return '';
  return htmlContent.replace(/<[^>]+>/g, '').trim();
};

export default function DessertPost({ post }) {
  if (!post) {
    return (
      <div className={styles.dessertPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta name="description" content="The dessert recipe you are looking for could not be found." />
        </Head>
        <section className={styles.heroSection}>
          <h1 className={styles.notFoundTitle}>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = 'https://www.thestylishmama.com';
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: post.title || 'Untitled',
    description: sanitizeText(post.content).substring(0, 160),
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { '@type': 'Person', name: post.author || 'The Stylish Mama' },
    publisher: { '@type': 'Organization', name: 'The Stylish Mama' },
    image: post.imageUrl || '/default-dessert-image.jpg',
    url: `${baseUrl}/dessert/${post.slug}`,
    recipeCategory: 'Dessert',
  };

  return (
    <div className={styles.dessertPage}>
      <Head>
        <title>{`${post.title || 'Untitled'} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:title" content={post.title || 'Untitled'} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/dessert/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || '/default-dessert-image.jpg'} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      {/* Hero Section with Overlay Title */}
      <section className={styles.heroSection}>
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className={styles.heroImage}
            priority
            onError={(e) => (e.currentTarget.src = '/default-dessert-image.jpg')}
          />
        ) : (
          <div className={styles.heroPlaceholder} />
        )}
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{post.title || 'Untitled'}</h1>
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
  const res = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
  const { posts = [] } = await res.json();
  const paths = posts
    .filter(post => post.slug)
    .map((post) => ({
      params: { slug: post.slug },
    }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  try {
    const res = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');
    const { posts = [] } = await res.json();
    const targetPost = posts.find((p) => p.slug === slug);
    if (!targetPost) return { notFound: true };

    const dessertPost = {
      ...targetPost,
      imageUrl: targetPost.imageUrl?.startsWith('http')
        ? targetPost.imageUrl
        : targetPost.imageUrl
        ? `https://www.thestylishmama.com${targetPost.imageUrl}`
        : null,
    };
    return { props: { post: dessertPost }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
}
