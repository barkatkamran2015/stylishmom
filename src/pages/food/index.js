// pages/food/index.js
import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header';
import styles from '../../styles/Food.module.css';

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

export default function Food({ posts, initialCategories, initialTags, error, pagination }) {
  const [postsState] = useState(posts || []);
  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories] = useState(initialCategories || []);
  const [tags] = useState(initialTags || []);

  const baseUrl = 'https://www.thestylishmama.com';

  const dynamicDescription =
    filteredPosts.length > 0
      ? `Explore delicious food recipes like "${filteredPosts[0].title}" and more on The Stylish Mama.`
      : 'Discover a variety of delicious food recipes and ideas on The Stylish Mama.';
  const dynamicTitle =
    filteredPosts.length > 0
      ? `${filteredPosts[0].title} - Food Recipes | The Stylish Mama`
      : 'Delicious Food Recipes and Ideas | The Stylish Mama';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Food Recipes | The Stylish Mama',
    description: dynamicDescription,
    url: `${baseUrl}/food`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Recipe',
          name: post.title,
          description: sanitizeText(post.content).substring(0, 160),
          datePublished: post.createdAt || new Date().toISOString(),
          dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
          author: { '@type': 'Person', name: 'The Stylish Mama' },
          image: post.imageUrl || '/default-food-image.jpg',
          recipeCategory: 'Food',
          url: `${baseUrl}/food/${post.slug}`,
        },
      })),
    },
  };

  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(postsState);
    } else {
      const filtered = postsState.filter(
        (post) =>
          (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
      console.log('Filtered Food Slugs:', filtered.map(p => p.slug));
    }
  }, [postsState]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = postsState.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
    console.log('Filtered Food Slugs after Filter:', filtered.map(p => p.slug));
  }, [postsState]);

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="food, recipes, cooking, meals, savory" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/food`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/food`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={filteredPosts[0]?.imageUrl || '/default-food-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta
          name="twitter:image"
          content={filteredPosts[0]?.imageUrl || '/default-food-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${baseUrl}/food?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${baseUrl}/food?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      <div className={styles.foodPageSearchContainer}>
        <Header
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          categories={categories}
          tags={tags}
        />
      </div>

      <section className={styles.foodPageContentWrapper}>
        <h1 className={styles.foodPageHeading}>Delicious Food Recipes</h1>
        {error && <p className={styles.foodPageErrorMessage}>{error}</p>}
        {!error && filteredPosts.length === 0 && (
          <p className={styles.foodPageNoPostsMessage}>No posts available</p>
        )}

        <div className={styles.foodPageGrid}>
          {filteredPosts.map((post, index) => (
            <div key={post.id} className={styles.foodPageCard} style={{ '--index': index }}>
              {post.imageUrl ? (
                <Link href={`/food/${post.slug}`}>
                  <Image
                    src={post.imageUrl}
                    alt={`Thumbnail for ${post.title} - Food Recipe`}
                    className={styles.foodPageImage}
                    width={300}
                    height={200}
                    onError={(e) => {
                      console.error('Image failed to load:', post.imageUrl);
                      e.target.src = '/default-food-image.jpg';
                    }}
                    loading="lazy"
                  />
                </Link>
              ) : (
                <Link href={`/food/${post.slug}`}>
                  <div className={styles.foodPageImagePlaceholder}>No Image Available</div>
                </Link>
              )}
              <Link href={`/food/${post.slug}`}>
                <h2 className={styles.foodPageTitle}>{post.title}</h2>
              </Link>
              <p className={styles.foodPageExcerpt}>
                {sanitizeText(post.content).substring(0, 200) || 'No content available...'}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {pagination.offset > 0 && (
            <Link
              href={`/food?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
              className={styles.paginationLink}
              scroll={false}
            >
              Previous
            </Link>
          )}
          {pagination.offset + pagination.limit < pagination.total && (
            <Link
              href={`/food?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
              className={styles.paginationLink}
              scroll={false}
            >
              Next
            </Link>
          )}
          <p>
            Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}
          </p>
        </div>
      </section>
    </div>
  );
}

// THIS MAKES THE FOOD LISTING PAGE INSTANT
export async function getStaticProps() {
  const limit = 10;
  const offset = 0;

  try {
    const response = await fetch(`${API_URL}?page=Recipe&limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const { posts = [], pagination = {} } = data;

    const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    const uniqueTags = [...new Set(posts.flatMap(p => p.tags || []).filter(Boolean))];

    const formattedPosts = posts.map(post => ({
      ...post,
      imageUrl: post.imageUrl?.startsWith('http')
        ? post.imageUrl
        : post.imageUrl ? `https://www.thestylishmama.com${post.imageUrl}` : null,
    }));

    return {
      props: {
        posts: formattedPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        pagination: {
          ...pagination,
          limit,
          offset,
          totalPages: pagination.totalPages || Math.ceil((pagination.total || 0) / limit),
        },
        error: '',
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('getStaticProps error:', err);
    return {
      props: {
        posts: [],
        initialCategories: [],
        initialTags: [],
        error: 'Failed to load posts',
        pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
      },
      revalidate: 60,
    };
  }
}
