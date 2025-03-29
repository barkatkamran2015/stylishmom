// pages/food.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../pages/header';
import styles from '../styles/Food.module.css';

// Use dynamic API URL based on environment
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.thestylishmama.com/api/posts'
    : 'http://localhost:3000/api/posts';

export default function Food({ initialPosts, initialCategories, initialTags, initialError, pagination }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [tags, setTags] = useState(initialTags || []);
  const [error, setError] = useState(initialError || '');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id: postIdFromQuery } = router.query;

  useEffect(() => {
    if (postIdFromQuery) {
      setTimeout(() => {
        const element = document.getElementById(`post-${postIdFromQuery}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [postIdFromQuery]);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const handleFilterApply = (selectedCategories, selectedTags) => {
    const filtered = posts.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
  };

  const handleShare = (post) => {
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://www.thestylishmama.com'
        : 'http://localhost:3000';
    const postUrl = `${baseUrl}/food?id=${post.id}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: 'Check out this delicious recipe post!',
        url: postUrl,
      })
        .then(() => console.log('Post shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      navigator.clipboard
        .writeText(postUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Failed to copy link.'));
    }
  };

  const incrementViewCount = async (postId) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=Recipe`, {
        method: 'POST',
      });
      console.log(`View count incremented for post ${postId}`);
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const structuredData = filteredPosts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: post.title,
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
    datePublished: post.created_at || new Date().toISOString(),
    dateModified: post.updated_at || post.created_at || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Admin', // Replace with actual author name if available
    },
    image: post.imageUrl || '/default-food-image.jpg',
    url: `${
      process.env.NODE_ENV === 'production'
        ? 'https://www.thestylishmama.com'
        : 'http://localhost:3000'
    }/food?id=${post.id}`,
    recipeCategory: post.category || 'General',
    recipeInstructions: post.content
      .replace(/<[^>]+>/g, '')
      .split('. ')
      .filter((step) => step.trim() !== '')
      .map((step, index) => ({
        '@type': 'HowToStep',
        text: step,
        name: `Step ${index + 1}`,
      })),
  }));

  return (
    <div className={styles.foodPage}>
      <Head>
        <title>Delicious Food Recipes and Ideas | The Stylish Mama</title>
        <meta
          name="description"
          content="Explore a variety of delicious food recipes and ideas. From savory dishes to healthy meals, find the perfect recipe for any occasion."
        />
        <meta name="keywords" content="food, recipes, cooking, meals, savory, healthy" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.thestylishmama.com'
              : 'http://localhost:3000'
          }/food`}
        />
        <meta property="og:title" content="Delicious Food Recipes and Ideas | The Stylish Mama" />
        <meta
          property="og:description"
          content="Explore a variety of delicious food recipes and ideas. From savory dishes to healthy meals, find the perfect recipe for any occasion."
        />
        <meta
          property="og:url"
          content={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.thestylishmama.com'
              : 'http://localhost:3000'
          }/food`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/default-food-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Delicious Food Recipes and Ideas | The Stylish Mama" />
        <meta
          name="twitter:description"
          content="Explore a variety of delicious food recipes and ideas. From savory dishes to healthy meals, find the perfect recipe for any occasion."
        />
        <meta name="twitter:image" content="/default-food-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Add pagination links for SEO */}
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.thestylishmama.com'
                : 'http://localhost:3000'
            }/food?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.thestylishmama.com'
                : 'http://localhost:3000'
            }/food?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.heartLoader}></div>
        </div>
      ) : (
        <>
          <div className={styles.foodPageSearchContainer}>
            <Header
              onSearch={handleSearch}
              onFilterApply={handleFilterApply}
              categories={categories}
              tags={tags}
            />
          </div>

          <section className={styles.foodPageContentWrapper}>
            {error ? (
              <p className={styles.foodPageErrorMessage}>{error}</p>
            ) : filteredPosts.length === 0 ? (
              <p className={styles.foodPageNoPostsMessage}>No posts available</p>
            ) : (
              <>
                <div className={styles.foodPageGrid}>
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      id={`post-${post.id}`}
                      className={styles.foodPageCard}
                      style={{
                        backgroundColor: post.backgroundColor || '#fafafa',
                        '--index': index,
                      }}
                      onMouseEnter={() => incrementViewCount(post.id)}
                    >
                      <h1
                        className={styles.foodPageTitle}
                        style={{
                          color: post.titleStyle?.color || '#000',
                          fontSize: post.titleStyle?.fontSize || '1.5rem',
                          textAlign: post.titleStyle?.textAlign || 'left',
                        }}
                      >
                        {post.title}
                      </h1>

                      <div
                        className={styles.foodPageContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />

                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={`Image for ${post.title}`}
                          className={styles.foodPageImage}
                          width={600}
                          height={337}
                          onError={(e) => {
                            console.error('Image failed to load:', post.imageUrl);
                            e.target.src = '/default-food-image.jpg';
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.foodPageImagePlaceholder}>
                          No Image Available
                        </div>
                      )}

                      <button
                        className={styles.shareButton}
                        onClick={() => handleShare(post)}
                        aria-label={`Share post: ${post.title}`}
                      >
                        <span className={styles.shareIcon}>🔗</span> Share
                      </button>
                    </article>
                  ))}
                </div>

                {/* Add pagination controls */}
                <div className={styles.pagination}>
                  {pagination.offset > 0 && (
                    <a
                      href={`/food?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Previous
                    </a>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <a
                      href={`/food?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Next
                    </a>
                  )}
                  <p>
                    Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}
                  </p>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { limit = 10, offset = 0 } = query; // Get pagination params from query
  try {
    const response = await fetch(`${API_URL}?page=Recipe&limit=${limit}&offset=${offset}`, {
      headers: {
        // Optional: Add authentication headers if required
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching posts (Server-Side):', errorText);
      throw new Error(`HTTP Error! Status: ${response.status} - ${errorText}`);
    }

    const { posts, pagination } = await response.json();
    console.log('Fetched Food Posts (Server-Side):', posts);

    const foodPosts = posts.map((post) => ({
      ...post,
      titleStyle: post.titleStyle
        ? typeof post.titleStyle === 'string'
          ? JSON.parse(post.titleStyle)
          : post.titleStyle
        : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
    }));

    const uniqueCategories = [
      ...new Set(foodPosts.map((post) => post.category).filter((cat) => cat !== undefined)),
    ];
    const uniqueTags = [
      ...new Set(foodPosts.flatMap((post) => post.tags || []).filter((tag) => tag !== undefined)),
    ];

    return {
      props: {
        initialPosts: foodPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        initialError: foodPosts.length === 0 ? 'No posts found for the Food page.' : '',
        pagination, // Pass pagination metadata to the component
      },
    };
  } catch (err) {
    console.error('Error fetching posts (Server-Side):', err);
    return {
      props: {
        initialPosts: [],
        initialCategories: [],
        initialTags: [],
        initialError: 'Failed to load posts. Please try again.',
        pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 }, // Fallback pagination
      },
    };
  }
}