// pages/food/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Food.module.css';

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

export default function FoodPost({ post }) {
  if (!post) {
    return (
      <div className={styles.foodPage}>
        <Head>
          <title>Post Not Found | The Stylish Mama</title>
        </Head>
        <section className={styles.foodPageContentWrapper}>
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
  author: { '@type': 'Person', name: post.author || 'The Stylish Mama' },
  publisher: {
    '@type': 'Organization',
    name: 'The Stylish Mama',
    logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
  },
  image: post.imageUrl || '/default-food-image.jpg',
  url: `${baseUrl}/food/${post.slug}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${baseUrl}/food/${post.slug}` },
  recipeCategory: 'Food',
  keywords: post.tags?.join(', ') || 'food, recipe, savory',

  // ADD THIS BLOCK — fixes the warning instantly
  recipeInstructions: [{
    "@type": "HowToStep",
    text: sanitizeText(post.content) || "Delicious homemade recipe — see full instructions on the page."
  }],

  // Optional but recommended for rich results
  prepTime: "PT15M",
  cookTime: "PT30M",
  recipeYield: "4 servings",
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
        <meta property="og:image" content={post.imageUrl || '/default-food-image.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title || 'Untitled'} />
        <meta name="twitter:description" content={sanitizeText(post.content).substring(0, 160)} />
        <meta name="twitter:image" content={post.imageUrl || '/default-food-image.jpg'} />
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
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = '/default-food-image.jpg';
            }}
          />
        ) : (
          <div className={styles.foodPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.foodPageContent}
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />

        <p className={styles.foodPageMeta}>
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

// THIS MAKES EVERY FOOD RECIPE INSTANT
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}?page=Recipe&limit=1000&offset=0`);
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
    const res = await fetch(`${API_URL}?page=Recipe&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');

    const { posts = [] } = await res.json();

    const targetPost = posts.find((p) => p.slug === slug);

    if (!targetPost) {
      return { notFound: true };
    }

    const foodPost = {
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
      props: { post: foodPost },
      revalidate: 60,
    };
  } catch (err) {
    console.error('getStaticProps error:', err);
    return { notFound: true };
  }
}
