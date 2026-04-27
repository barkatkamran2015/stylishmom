// pages/blog/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';
import { SITE_NAME, SITE_URL, absoluteImage, excerpt } from '../../lib/seo';

const API_URL = process.env.PHP_API_URL || 'https://www.barkatkamran.com/api.php';

const sanitizeText = (htmlContent) => excerpt(htmlContent, 5000);

// Slug normalizer for compatibility with existing links
const normalizeSlug = (slug) => {
  if (!slug) return '';
  return decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/%20/g, '-')
    .replace(/[_]+/g, '-')
    .replace(/[?.,!()&'":;]/g, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function BlogPost({ post }) {
  if (!post) {
    return (
      <div className={styles.blogPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta name="description" content="The blog post you are looking for could not be found." />
        </Head>
        <section className={styles.heroSection}>
          <h1 className={styles.notFoundTitle}>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = SITE_URL;
  const description = excerpt(post.content, 160) || 'Read this motherhood story from The Stylish Mama.';
  const pageUrl = `${baseUrl}/blog/${encodeURIComponent(post.slug)}`;
  const imageUrl = absoluteImage(post.imageUrl);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || 'Untitled',
    description,
    ...(post.createdAt ? { datePublished: post.createdAt } : {}),
    ...(post.updated_at || post.createdAt ? { dateModified: post.updated_at || post.createdAt } : {}),
    author: { '@type': 'Person', name: post.author || SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    image: imageUrl,
    url: pageUrl,
    keywords: post.tags?.join(', ') || 'blog, motherhood, lifestyle',
  };

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>{`${post.title || 'Untitled'} | The Stylish Mama`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={post.title || 'Untitled'} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
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
            onError={(e) => (e.currentTarget.src = 'https://www.thestylishmama.com/default-blog-image.jpg')}
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
  try {
    const res = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
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
    const res = await fetch(`${API_URL}?page=Blog&slug=${slug}`);
    if (res.ok) {
      const data = await res.json();
      if (data.post) {
        return { props: { post: data.post }, revalidate: 60 };
      }
    }

    // Fallback to list if needed
    const listRes = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
    if (!listRes.ok) throw new Error();
    const { posts = [] } = await listRes.json();

    const requestedSlug = normalizeSlug(slug);
    let targetPost = posts.find(post => normalizeSlug(post.slug) === requestedSlug);

    if (!targetPost) return { notFound: true };

    return { props: { post: targetPost }, revalidate: 60 };
  } catch (err) {
    return { notFound: true };
  }
}
