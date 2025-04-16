import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header'; // Use the same Header component as other sections
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

export default function Drinks({ initialPosts, initialCategories, initialTags, initialError, pagination }) {
  const [posts] = useState(initialPosts || []);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [categories] = useState(initialCategories || []);
  const [tags] = useState(initialTags || []);
  const [error] = useState(initialError || '');
  const [loading] = useState(false);

  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
      console.log('Filtered Drinks Slugs:', filtered.map(p => p.slug)); // Debug filtered slugs
    }
  }, [posts]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = posts.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
    console.log('Filtered Drinks Slugs after Filter:', filtered.map(p => p.slug)); // Debug filtered slugs
  }, [posts]);

  const handleShare = useCallback((post) => {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://stylishmom.vercel.app'
        : 'http://localhost:3000';
    const postUrl = `${baseUrl}/drinks/${post.slug}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: 'Check out this refreshing drink recipe from The Stylish Mama!',
        url: postUrl,
      })
        .then(() => console.log('Post shared successfully'))
        .catch((error) => {
          console.error('Error sharing:', error);
          alert('Failed to share. Link copied to clipboard instead.');
          navigator.clipboard.writeText(postUrl);
        });
    } else {
      navigator.clipboard
        .writeText(postUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link. Please copy manually: ' + postUrl));
    }
  }, []);

  const incrementViewCount = useCallback(async (postId) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=Drinks`, {
        method: 'POST',
      });
      console.log(`View count incremented for post ${postId}`);
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  }, []);

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://stylishmom.vercel.app'
      : 'http://localhost:3000';

  const dynamicDescription =
    filteredPosts.length > 0
      ? `Discover refreshing drink recipes like "${filteredPosts[0].title}" and more on The Stylish Mama.`
      : 'Explore refreshing drink recipes perfect for any occasion at The Stylish Mama.';

  const dynamicTitle =
    filteredPosts.length > 0
      ? `${filteredPosts[0].title} - Refreshing Drink Recipes | The Stylish Mama`
      : 'Refreshing Drink Recipes | The Stylish Mama';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Refreshing Drink Recipes | The Stylish Mama',
    description: dynamicDescription,
    url: `${baseUrl}/drinks`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: post.title || 'Untitled',
          description: sanitizeText(post.content).substring(0, 160),
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
        },
      })),
    },
  };

  return (
    <div className={styles.drinksPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="drinks, recipes, beverages, cocktails, mocktails" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/drinks`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/drinks`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={filteredPosts[0]?.imageUrl || '/default-drinks-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta
          name="twitter:image"
          content={filteredPosts[0]?.imageUrl || '/default-drinks-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${baseUrl}/drinks?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${baseUrl}/drinks?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.drinkLoader}></div>
        </div>
      ) : (
        <>
          <div className={styles.drinksPageSearchContainer}>
            <Header
              onSearch={handleSearch}
              onFilterApply={handleFilterApply}
              categories={categories}
              tags={tags}
            />
          </div>

          <section className={styles.drinksPageContentWrapper}>
            <h1 className={styles.drinksPageHeading}>Refreshing Drink Recipes</h1>
            {error && <p className={styles.drinksPageErrorMessage}>{error}</p>}
            {!error && filteredPosts.length === 0 && (
              <p className={styles.drinksPageNoPostsMessage}>No posts available</p>
            )}
            <div className={styles.drinksPageGrid}>
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className={styles.drinksPageCard}
                  style={{ '--index': index }}
                  onMouseEnter={() => incrementViewCount(post.id)}
                >
                  {post.imageUrl ? (
                    <Link href={`/drinks/${post.slug}`}>
                      <Image
                        src={post.imageUrl}
                        alt={`Thumbnail for ${post.title || 'Untitled'} - Drink Recipe`}
                        className={styles.drinksPageImage}
                        width={300}
                        height={200}
                        onError={(e) => {
                          console.error('Image failed to load:', post.imageUrl);
                          e.target.src = '/default-drinks-image.jpg';
                        }}
                        loading="lazy"
                      />
                    </Link>
                  ) : (
                    <Link href={`/drinks/${post.slug}`}>
                      <div className={styles.drinksPageImagePlaceholder}>No Image Available</div>
                    </Link>
                  )}
                  <Link href={`/drinks/${post.slug}`}>
                    <h2
                      className={styles.drinksPageTitle}
                      style={{
                        color: post.titleStyle?.color || '#000',
                        fontSize: post.titleStyle?.fontSize || '1.5rem',
                        textAlign: post.titleStyle?.textAlign || 'left',
                      }}
                    >
                      {post.title || 'Untitled'}
                    </h2>
                  </Link>
                  <p className={styles.drinksPageExcerpt}>
                    {sanitizeText(post.content).substring(0, 200) || 'No content available...'}
                  </p>
                  <button
                    className={styles.shareButton}
                    onClick={() => handleShare(post)}
                    aria-label={`Share drink recipe: ${post.title}`}
                  >
                    <span className={styles.shareIcon}>🔗</span> Share
                  </button>
                </article>
              ))}
            </div>

            <nav className={styles.pagination} aria-label="Pagination">
              {pagination.offset > 0 && (
                <Link
                  href={`/drinks?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                  className={styles.paginationLink}
                  aria-label="Previous page"
                >
                  Previous
                </Link>
              )}
              {pagination.offset + pagination.limit < pagination.total && (
                <Link
                  href={`/drinks?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
                  className={styles.paginationLink}
                  aria-label="Next page"
                >
                  Next
                </Link>
              )}
              <p>
                Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}
              </p>
            </nav>
          </section>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { limit = 10, offset = 0 } = query;
  try {
    const response = await fetch(`${API_URL}?page=Drinks&limit=${limit}&offset=${offset}`);
    const responseText = await response.text();
    console.log('Raw API Response for Drinks (List):', responseText);

    if (!response.ok) {
      console.error('Error fetching posts (Server-Side):', responseText);
      throw new Error(`HTTP Error! Status: ${response.status} - ${responseText}`);
    }

    const { posts, pagination } = JSON.parse(responseText);
    console.log('Parsed Drinks Posts (Server-Side):', posts);

    const drinksPosts = posts.map((post) => ({
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
        : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
    }));

    const uniqueCategories = [
      ...new Set(drinksPosts.map((post) => post.category).filter((cat) => cat !== undefined)),
    ];
    const uniqueTags = [
      ...new Set(drinksPosts.flatMap((post) => post.tags || []).filter((tag) => tag !== undefined)),
    ];

    return {
      props: {
        initialPosts: drinksPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        initialError: drinksPosts.length === 0 ? 'No posts found for the Drinks page.' : '',
        pagination: {
          total: pagination.total || 0,
          limit: pagination.limit || 10,
          offset: pagination.offset || 0,
          totalPages: pagination.totalPages || 0,
        },
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for Drinks:', err.message);
    return {
      props: {
        initialPosts: [],
        initialCategories: [],
        initialTags: [],
        initialError: `Failed to load posts: ${err.message}`,
        pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
      },
    };
  }
}