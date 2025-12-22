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

      <section className={styles.contentSection}>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </section>
    </div>
  );
}

// Pre-render all known paths at build time
export async function getStaticPaths() {
  try {
    const res = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
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

// Fetch ONLY the single post by slug — fast and efficient
export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    // Direct single post fetch — replace with your actual single-post endpoint if available
    // If your API supports ?slug=..., use that. Otherwise, fallback to list and find.
    const res = await fetch(`${API_URL}?page=Dessert&slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (data.post) {
        return { props: { post: data.post }, revalidate: 60 };
      }
    }

    // Fallback: fetch list and find (safe if no single endpoint)
    const listRes = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
    if (!listRes.ok) throw new Error();
    const { posts = [] } = await listRes.json();
    const targetPost = posts.find(p => p.slug === slug);

    if (!targetPost) return { notFound: true };

    return { props: { post: targetPost }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
}
