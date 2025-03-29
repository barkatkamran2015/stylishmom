import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../pages/header';
import styles from '../styles/Drinks.module.css';

// Use the same API URL as blog.js
const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.thestylishmama.com/api/posts'
    : 'http://localhost:3000/api/posts';

export default function Drinks({ initialPosts, initialCategories, initialTags, initialError, pagination }) {
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
        const element = document.getElementById(`drinks-post-${postIdFromQuery}`);
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
    const postUrl = `${baseUrl}/drinks?id=${post.id}`;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: 'Check out this refreshing drink recipe!',
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
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=Drinks`, {
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
    datePublished: post.createdAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Admin',
    },
    image: post.imageUrl || '/default-drinks-image.jpg',
    url: `${
      process.env.NODE_ENV === 'production'
        ? 'https://www.thestylishmama.com'
        : 'http://localhost:3000'
    }/drinks?id=${post.id}`,
  }));

  return (
    <div className={styles.drinksPage}>
      <Head>
        <title>Refreshing Drink Recipes | The Stylish Mama</title>
        <meta
          name="description"
          content="Discover refreshing drink recipes perfect for any occasion at The Stylish Mama."
        />
        <meta name="keywords" content="drinks, recipes, beverages, cocktails, mocktails" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.thestylishmama.com'
              : 'http://localhost:3000'
          }/drinks`}
        />
        <meta property="og:title" content="Refreshing Drink Recipes | The Stylish Mama" />
        <meta
          property="og:description"
          content="Discover refreshing drink recipes perfect for any occasion at The Stylish Mama."
        />
        <meta
          property="og:url"
          content={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.thestylishmama.com'
              : 'http://localhost:3000'
          }/drinks`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/default-drinks-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Refreshing Drink Recipes | The Stylish Mama" />
        <meta
          name="twitter:description"
          content="Discover refreshing drink recipes perfect for any occasion at The Stylish Mama."
        />
        <meta name="twitter:image" content="/default-drinks-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.thestylishmama.com'
                : 'http://localhost:3000'
            }/drinks?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.thestylishmama.com'
                : 'http://localhost:3000'
            }/drinks?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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
            {error ? (
              <p className={styles.drinksPageErrorMessage}>{error}</p>
            ) : filteredPosts.length === 0 ? (
              <p className={styles.drinksPageNoPostsMessage}>No posts available</p>
            ) : (
              <>
                <div className={styles.drinksPageGrid}>
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      id={`drinks-post-${post.id}`}
                      className={styles.drinksPageCard}
                      style={{
                        backgroundColor: post.backgroundColor || '#fafafa',
                        '--index': index,
                      }}
                      onMouseEnter={() => incrementViewCount(post.id)}
                    >
                      <h1
                        className={styles.drinksPageTitle}
                        style={{
                          color: post.titleStyle?.color || '#000',
                          fontSize: post.titleStyle?.fontSize || '1.5rem',
                          textAlign: post.titleStyle?.textAlign || 'left',
                        }}
                      >
                        {post.title}
                      </h1>

                      <div
                        className={styles.drinksPageContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />

                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={`Image for ${post.title}`}
                          className={styles.drinksPageImage}
                          width={600}
                          height={337}
                          onError={(e) => {
                            console.error('Image failed to load:', post.imageUrl);
                            e.target.src = '/default-drinks-image.jpg';
                          }}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.drinksPageImagePlaceholder}>
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

                <div className={styles.pagination}>
                  {pagination.offset > 0 && (
                    <a
                      href={`/drinks?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Previous
                    </a>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <a
                      href={`/drinks?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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
    console.error('Error fetching posts (Server-Side):', err.message);
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