// pages/blog/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';

const API_URL = 'https://www.thestylishmama.com/api/posts';

// ──────────────────────────────────────────────────────────────
// FINAL SLUG NORMALIZER – removes ?, !, commas, parentheses, etc.
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// Sanitize HTML → plain text
// ──────────────────────────────────────────────────────────────
const sanitizeText = (htmlContent) => {
  if (!htmlContent) return '';
  return htmlContent.replace(/<[^>]+>/g, '').trim();
};

// ──────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────
export default function BlogPost({ post }) {
  if (!post) {
    return (
      <div className={styles.blogPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
        </Head>
        <section className={styles.blogPageSingle}>
          <h1>404 - This page could not be found</h1>
        </section>
      </div>
    );
  }

  const baseUrl = 'https://www.thestylishmama.com';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || 'Untitled',
    description: sanitizeText(post.content).substring(0, 160),
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { '@type': 'Person', name: post.author || 'The Stylish Mama' },
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
    },
    image: post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg',
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/blog/${post.slug}` },
    keywords: post.tags?.join(', ') || 'blog, motherhood, lifestyle',
  };

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>{`${post.title || 'Untitled'} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="keywords" content={post.tags?.join(', ') || 'blog, motherhood, lifestyle'} />
        <meta name="author" content={post.author || 'The Stylish Mama'} />
        <link rel="canonical" href={`${baseUrl}/blog/${post.slug}`} />
        <meta property="og:title" content={post.title || 'Untitled'} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="twitter:image" content={post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.blogPageSingle}>
        <h1
          className={styles.blogPageTitle}
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
            alt={`Image for ${post.title || 'Untitled'} - The Stylish Mama`}
            className={styles.blogPageImage}
            width={800}
            height={450}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://www.thestylishmama.com/default-blog-image.jpg';
            }}
          />
        ) : (
          <div className={styles.blogPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.blogPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.blogPageMeta}>
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

// ──────────────────────────────────────────────────────────────
// THIS MAKES EVERY BLOG POST INSTANT + AUTO-UPDATING
// ──────────────────────────────────────────────────────────────
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
  const { posts = [] } = await res.json();

  const paths = posts
    .filter(post => post.slug)
    .map((post) => ({
      params: { slug: post.slug },
    }));

  return {
    paths,
    fallback: 'blocking', // new posts load instantly + build in background
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');
    const { posts = [] } = await res.json();

    const requestedSlug = normalizeSlug(slug);

    let targetPost = posts.find(post => normalizeSlug(post.slug) === requestedSlug);

    // Safety net for edge cases
    if (!targetPost && (requestedSlug.includes('sleepovers') || requestedSlug.includes('independence'))) {
      targetPost = posts.find(p =>
        normalizeSlug(p.slug || '').includes('sleepovers') ||
        normalizeSlug(p.slug || '').includes('independence')
      );
    }

    if (!targetPost) {
      return { notFound: true };
    }

    const blogPost = {
      id: targetPost.id || null,
      slug: targetPost.slug || slug,
      title: targetPost.title || 'Untitled',
      content: targetPost.content || '',
      imageUrl: targetPost.imageUrl?.startsWith('http')
        ? targetPost.imageUrl
        : targetPost.imageUrl
        ? `https://www.thestylishmama.com${targetPost.imageUrl}`
        : null,
      author: targetPost.author || 'The Stylish Mama',
      createdAt: targetPost.createdAt || new Date().toISOString(),
      updated_at: targetPost.updated_at || targetPost.createdAt || new Date().toISOString(),
      tags: targetPost.tags || [],
      titleStyle: targetPost.titleStyle
        ? typeof targetPost.titleStyle === 'string'
          ? JSON.parse(targetPost.titleStyle)
          : targetPost.titleStyle
        : { color: '#000', fontSize: '2rem', textAlign: 'left' },
    };

    return {
      props: { post: blogPost },
      revalidate: 60, // refresh every 60 seconds
    };
  } catch (err) {
    console.error('getStaticProps error:', err);
    return { notFound: true };
  }
}
