import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Drinks.module.css';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://stylishmom.vercel.app/api/posts'
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

export default function DrinkPost({ post, error }) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://stylishmom.vercel.app'
      : 'http://localhost:3000';

  if (error || !post) {
    return (
      <div className={styles.drinksPage}>
        <Head>
          <title>Error - Drink Recipe | The Stylish Mama</title>
          <meta name="description" content="Failed to load the drink recipe." />
        </Head>
        <section className={styles.drinksPageContentWrapper}>
          <h1 className={styles.drinksPageHeading}>Error</h1>
          <p className={styles.drinksPageErrorMessage}>{error || 'Post not found.'}</p>
        </section>
      </div>
    );
  }

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
              e.target.src = '/default-drinks-image.jpg';
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

export async function getServerSideProps({ params }) {
  const { slug } = params;
  try {
    const response = await fetch(`${API_URL}?page=Drinks&slug=${slug}`);
    const responseText = await response.text();
    console.log('Raw API Response for Drink Post:', responseText);

    if (!response.ok) {
      console.error('Error fetching drink post:', responseText);
      throw new Error(`HTTP Error! Status: ${response.status} - ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed Drink Post:', data);
    } catch (parseErr) {
      console.error('Error parsing API response:', parseErr.message);
      throw new Error('Invalid API response format');
    }

    const { post } = data;
    if (!post) {
      throw new Error('Post not found');
    }

    return {
      props: {
        post: {
          ...post,
          id: post.id || null,
          slug: post.slug || null,
          title: post.title || 'Untitled',
          content: post.content || '',
          imageUrl: post.imageUrl?.startsWith('http')
            ? post.imageUrl
            : post.imageUrl
            ? `https://stylishmom.vercel.app${post.imageUrl}`
            : null,
          createdAt: post.createdAt || new Date().toISOString(),
          updated_at: post.updated_at || post.createdAt || new Date().toISOString(),
          titleStyle: post.titleStyle
            ? typeof post.titleStyle === 'string'
              ? JSON.parse(post.titleStyle)
              : post.titleStyle
            : { color: '#000', fontSize: '2.5rem', textAlign: 'center' },
        },
        error: '',
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for Drink Post:', err.message);
    return {
      props: {
        post: null,
        error: `Failed to load drink post: ${err.message}`,
      },
    };
  }
}