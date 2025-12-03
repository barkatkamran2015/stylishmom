import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Food.module.css';

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

export default function FoodPost({ post, error }) {
  if (!post) {
    return (
      <div className={styles.foodPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta name="description" content="The food recipe you are looking for could not be found." />
        </Head>
        <section className={styles.foodPageContentWrapper}>
          <h1>404 - This page could not be found</h1>
          {error && <p className={styles.foodPageErrorMessage}>{error}</p>}
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
    '@type': 'Recipe',
    name: post.title || 'Untitled',
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
    image: post.imageUrl || '/default-food-image.jpg',
    url: `${baseUrl}/food/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/food/${post.slug}`,
    },
    recipeCategory: 'Food',
    keywords: post.tags?.join(', ') || 'food, recipe, savory',
  };

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{`${post.title || 'Untitled'} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="keywords" content={post.tags?.join(', ') || 'food, recipe, savory'} />
        <meta name="author" content={post.author || 'The Stylish Mama'} />
        <link rel="canonical" href={`${baseUrl}/food/${post.slug}`} />
        <meta property="og:title" content={post.title || 'Untitled'} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/food/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={post.imageUrl || '/default-food-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta
          name="twitter:image"
          content={post.imageUrl || '/default-food-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.foodPageContentWrapper}>
        <h1
          className={styles.foodPageTitle}
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
            alt={`Image for ${post.title || 'Untitled'} - Food Recipe`}
            className={styles.foodPageImage}
            width={800}
            height={450}
            onError={(e) => {
              e.target.src = '/default-food-image.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className={styles.foodPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.foodPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.foodPageMeta}>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </section>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const normalizedSlug = encodeURIComponent(slug); // use encoded slug for API

    // Fetch single post by slug
    const response = await fetch(`${API_URL}?page=Recipe&slug=${normalizedSlug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch post. Status: ${response.status}`);
    }

    const data = await response.json();

    const post = Array.isArray(data.posts) && data.posts.length > 0 ? data.posts[0] : null;

    if (!post) {
      return {
        props: {
          post: null,
          error: 'Post not found',
        },
      };
    }

    // Format post like before
    const foodPost = {
      ...post,
      slug: post.slug || (post.title ? post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') : `post-${post.id}`),
      titleStyle:
        post.titleStyle && typeof post.titleStyle === 'string'
          ? JSON.parse(post.titleStyle)
          : post.titleStyle || { color: '#000', fontSize: '2rem', textAlign: 'left' },
      imageUrl:
        post.imageUrl?.startsWith('http')
          ? post.imageUrl
          : post.imageUrl
          ? `https://www.thestylishmama.com${post.imageUrl}`
          : null,
      content: post.content || '',
      title: post.title || 'Untitled',
      author: post.author || 'The Stylish Mama',
      createdAt: post.createdAt || new Date().toISOString(),
      updated_at: post.updated_at || post.createdAt || new Date().toISOString(),
      tags: post.tags || [],
    };

    return {
      props: {
        post: foodPost,
        error: '',
      },
    };
  } catch (err) {
    return {
      props: {
        post: null,
        error: `Failed to load post: ${err.message}`,
      },
    };
  }
}

