// pages/dessert/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Dessert.module.css';

const API_URL = 'https://www.thestylishmama.com/api/posts';

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

export default function DessertPost({ post }) {
  if (!post) {
    return (
      <div className={styles.dessertPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
          <meta name="description" content="The dessert recipe you are looking for could not be found." />
        </Head>
        <section className={styles.dessertPageContentWrapper}>
          <h1>404 - This page could not be found</h1>
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
    image: post.imageUrl || '/default-dessert-image.jpg',
    url: `${baseUrl}/dessert/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/dessert/${post.slug}`,
    },
    recipeCategory: 'Dessert',
    keywords: post.tags?.join(', ') || 'dessert, recipe, sweets',
  };

  return (
    <div className={styles.dessertPage}>
      <Head>
        <title>{`${post.title || 'Untitled'} | The Stylish Mama`}</title>
        <meta name="description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="keywords" content={post.tags?.join(', ') || 'dessert, recipe, sweets'} />
        <meta name="author" content={post.author || 'The Stylish Mama'} />
        <link rel="canonical" href={`${baseUrl}/dessert/${post.slug}`} />
        <meta property="og:title" content={post.title || 'Untitled'} />
        <meta property="og:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta property="og:url" content={`${baseUrl}/dessert/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || '/default-dessert-image.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="twitter:image" content={post.imageUrl || '/default-dessert-image.jpg'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.dessertPageContentWrapper}>
        <h1
          className={styles.dessertPageTitle}
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
            alt={`Image for ${post.title || 'Untitled'} - Dessert Recipe`}
            className={styles.dessertPageImage}
            width={800}
            height={450}
            onError={(e) => {
              console.error('Image failed to load:', post.imageUrl);
              e.target.src = '/default-dessert-image.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className={styles.dessertPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.dessertPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.dessertPageMeta}>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </section>
    </div>
  );
}

// THIS MAKES EVERY DESSERT RECIPE INSTANT
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
  const { posts = [] } = await res.json();

  const paths = posts
    .filter(post => post.slug)
    .map((post) => ({
      params: { slug: post.slug },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`${API_URL}?page=Dessert&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');

    const { posts = [] } = await res.json();

    const targetPost = posts.find((p) => p.slug === slug);

    if (!targetPost) {
      return { notFound: true };
    }

    const dessertPost = {
      ...targetPost,
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
    };

    return {
      props: { post: dessertPost },
      revalidate: 60,
    };
  } catch (err) {
    console.error('getStaticProps error:', err);
    return { notFound: true };
  }
}
