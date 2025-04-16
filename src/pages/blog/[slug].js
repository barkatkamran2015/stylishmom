import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Blog.module.css';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.thestylishmama.com/api/posts'
    : 'http://localhost:3000/api/posts';

const sanitizeText = (htmlContent) => {
  if (!htmlContent) return '';
  let text = htmlContent.replace(/<[^>]+>/g, '');
  text = text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/\//g, '/');
  return text.trim();
};

export default function BlogPost({ post, error }) {
  if (!post) {
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

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.thestylishmama.com'
      : 'http://localhost:3000';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || 'Untitled',
    description: sanitizeText(post.content).substring(0, 160),
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'The Stylish Mama',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    image: post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg',
    url: `${baseUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slug}`,
    },
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
        <meta
          property="og:image"
          content={post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta
          name="twitter:image"
          content={post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'}
        />
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
            alt={`Image for ${post.title || 'Untitled'} - Blog Post`}
            className={styles.blogPageImage}
            width={800}
            height={450}
            onError={(e) => {
              console.error('Image failed to load:', post.imageUrl);
              e.target.src = 'https://www.thestylishmama.com/default-blog-image.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className={styles.blogPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.blogPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.blogPageMeta}>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  console.log('Requested Slug in blog/[slug].js:', slug);

  try {
    // Normalize slug to avoid comparison issues
    const normalizedSlug = decodeURIComponent(slug).toLowerCase();
    console.log('Normalized Slug:', normalizedSlug);

    // Fetch the list of posts to find the post with the matching slug
    const listResponse = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
    const listResponseText = await listResponse.text();
    console.log('Raw API Response for Blog List in [slug].js:', listResponseText);

    if (!listResponse.ok) {
      console.error('Error fetching post list (Server-Side):', listResponseText);
      throw new Error(`HTTP Error! Status: ${listResponse.status}`);
    }

    let listData;
    try {
      listData = JSON.parse(listResponseText);
      console.log('Parsed API Response for Blog List:', listData);
    } catch (parseErr) {
      console.error('Error parsing API list response:', parseErr.message);
      throw new Error('Invalid API response format for list');
    }

    const { posts } = listData;
    if (!posts || !Array.isArray(posts)) {
      console.error('Posts array is invalid:', posts);
      throw new Error('Posts array is missing or invalid');
    }

    console.log('Posts array from API:', posts);
    const targetPost = posts.find((post) => {
      const postSlug = post.slug ? decodeURIComponent(post.slug).toLowerCase() : '';
      console.log('Comparing slug:', postSlug, 'with requested slug:', normalizedSlug);
      return postSlug === normalizedSlug;
    });

    if (!targetPost) {
      console.error('Post not found in list for slug:', normalizedSlug);
      return {
        props: {
          post: null,
          error: 'Post not found in list',
        },
      };
    }

    console.log('Found post in list:', targetPost);

    // Use the post from the list directly
    const blogPost = {
      ...targetPost,
      id: targetPost.id || null,
      slug: targetPost.slug || null,
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
      content: targetPost.content || '',
      title: targetPost.title || 'Untitled',
      author: targetPost.author || 'The Stylish Mama',
      createdAt: targetPost.createdAt || new Date().toISOString(),
      updated_at: targetPost.updated_at || targetPost.createdAt || new Date().toISOString(),
      tags: targetPost.tags || [],
    };

    console.log('Formatted blog post:', blogPost);

    return {
      props: {
        post: blogPost,
        error: '',
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps:', err.message);
    return {
      props: {
        post: null,
        error: `Failed to load post: ${err.message}`,
      },
    };
  }
}