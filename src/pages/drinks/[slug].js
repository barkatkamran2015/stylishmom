// pages/drinks/[slug].js
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Drinks.module.css';

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

export default function DrinkPost({ post }) {
  if (!post) {
    return (
      <div className={styles.drinksPage}>
        <Head>
          <title>Error - Drink Recipe | The Stylish Mama</title>
        </Head>
        <section className={styles.drinksPageContentWrapper}>
          <h1 className={styles.drinksPageHeading}>Error</h1>
          <p className={styles.drinksPageErrorMessage}>Post not found.</p>
        </section>
      </div>
    );
  }

  const baseUrl = 'https://www.thestylishmama.com';

  const dynamicDescription = sanitizeText(post.content).substring(0, 160) || 'A refreshing drink recipe from The Stylish Mama.';
  const dynamicTitle = `${post.title} - Drink Recipe | The Stylish Mama`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: post.title || 'Untitled',
    description: dynamicDescription,
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { '@type': 'Person', name: 'The Stylish Mama' },
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo1.png`,
      },
    },
    image: post.imageUrl || '/default-drinks-image.jpg',
    recipeCategory: post.category || 'Beverage',
    recipeCuisine: post.tags?.includes('cocktail') ? 'Cocktail' : 'Non-Alcoholic',
    prepTime: 'PT15M',
    recipeYield: '1 serving',
    recipeInstructions: sanitizeText(post.content)
      .split('. ')
      .filter((step) => step.trim() !== '')
      .map((step, index) => ({
        '@type': 'HowToStep',
        text: step,
        name: `Step ${index + 1}`,
      })),
    keywords: post.tags?.join(', ') || 'drinks, beverages',
    url: `${baseUrl}/drinks/${post.slug}`,
  };

  return (
    <div className={styles.drinksPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="drinks, recipes, beverages, cocktails, mocktails" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/drinks/${post.slug}`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/drinks/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.imageUrl || '/default-drinks-image.jpg'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={post.imageUrl || '/default-drinks-image.jpg'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <section className={styles.drinksPageContentWrapper}>
        <h1
          className={styles.drinksPageTitle}
          style={{
            color: post.titleStyle?.color || '#000',
            fontSize: post.titleStyle?.fontSize || '2.5rem',
            textAlign: post.titleStyle?.textAlign || 'center',
          }}
        >
          {post.title || 'Untitled'}
        </h1>

        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={`Image for ${post.title} - Drink Recipe`}
            className={styles.drinksPageImage}
            width={800}
            height={450}
            onError={(e) => {
              console.error('Image failed to load:', post.imageUrl);
              e.currentTarget.src = '/default-drinks-image.jpg';
            }}
            loading="lazy"
          />
        ) : (
          <div className={styles.drinksPageImagePlaceholder}>No Image Available</div>
        )}

        <div
          className={styles.drinksPageContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className={styles.drinksPageMeta}>
          <p>Published on: {new Date(post.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(post.updated_at).toLocaleDateString()}</p>
          {post.category && <p>Category: {post.category}</p>}
          {post.tags && post.tags.length > 0 && <p>Tags: {post.tags.join(', ')}</p>}
        </div>
      </section>
    </div>
  );
}

// THIS MAKES EVERY DRINK RECIPE INSTANT
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}?page=Drinks&limit=1000&offset=0`);
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
    const res = await fetch(`${API_URL}?page=Drinks&limit=1000&offset=0`);
    if (!res.ok) throw new Error('API error');

    const { posts = [] } = await res.json();

    const targetPost = posts.find((p) => p.slug === slug);

    if (!targetPost) {
      return { notFound: true };
    }

    const drinkPost = {
      ...targetPost,
      titleStyle: targetPost.titleStyle
        ? typeof targetPost.titleStyle === 'string'
          ? JSON.parse(targetPost.titleStyle)
          : targetPost.titleStyle
        : { color: '#000', fontSize: '2.5rem', textAlign: 'center' },
      imageUrl: targetPost.imageUrl?.startsWith('http')
        ? targetPost.imageUrl
        : targetPost.imageUrl
        ? `https://www.thestylishmama.com${targetPost.imageUrl}`
        : null,
    };

    return {
      props: { post: drinkPost },
      revalidate: 60,
    };
  } catch (err) {
    console.error('getStaticProps error:', err);
    return { notFound: true };
  }
}
