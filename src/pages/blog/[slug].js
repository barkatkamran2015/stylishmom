import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.thestylishmama.com/api/posts'
    : 'http://localhost:3000/api/posts';

// ──────────────────────────────────────────────────────────────
// Super robust slug normalizer – fixes 99% of "not found" bugs
// ──────────────────────────────────────────────────────────────
const normalizeSlug = (slug) => {
  if (!slug) return '';
  return decodeURIComponent(slug)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // spaces → dashes
    .replace(/%20/g, '-')           // %20 → dash
    .replace(/[_]+/g, '-')          // underscores → dash
    .replace(/[^\w-]+/g, '')        // remove all special chars except letters, numbers, dash
    .replace(/-+/g, '-')            // collapse multiple dashes
    .replace(/^-+|-+$/g, '');       // trim dashes from start/end
};

// ──────────────────────────────────────────────────────────────
// Sanitize HTML → plain text (for meta description)
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────
export default function BlogPost({ post, error }) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.thestylishmama.com'
      : 'http://localhost:3000';

  if (!post || error) {
    return (
      <div className={styles.blogPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta name="description" content="The blog post you are looking for could not be found." />
        </Head>
        <section className={styles.blogPageSingle}>
          <h1>404 - This page could not be found</h1>
          {error && <p className={styles.blogPageErrorMessage}>{error}</p>}
        </section>
      </div>
    );
  }

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}  // ← FIXED: "structuredData"
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
            alt={`Image for ${post.title || 'Untitled'} - The Stylish Mama`}  // ← FIXED: Added fallback
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
// getServerSideProps – now completely bulletproof
// ──────────────────────────────────────────────────────────────
export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
    if (!res.ok) {
      const text = await res.text();
      console.error('API fetch failed:', res.status, text);
      return { props: { post: null, error: 'Failed to fetch posts from server' } };
    }

    const data = await res.json();
    const posts = data.posts || [];

    const requestedSlug = normalizeSlug(slug);

    const targetPost = posts.find((post) => normalizeSlug(post.slug) === requestedSlug);

    if (!targetPost) {
      console.log('Post not found for slug:', slug, '(normalized:', requestedSlug, ')');
      console.log('Available normalized slugs:', posts.map(p => normalizeSlug(p.slug)));
      return {
        props: {
          post: null,
          error: 'Post not found in list',
        },
      };
    }

    // Format the post exactly like before
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
      props: {
        post: blogPost,
        error: null,
      },
    };
  } catch (err) {
    console.error('getServerSideProps crashed:', err);
    return {
      props: {
        post: null,
        error: 'Something went wrong loading this post',
      },
    };
  }
}
