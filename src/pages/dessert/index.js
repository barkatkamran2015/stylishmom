import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header'; // Use the same Header component
import styles from '../../styles/Dessert.module.css';

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

export default function Dessert({ posts, initialCategories, initialTags, error, pagination }) {
  const [postsState] = useState(posts || []);
  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories] = useState(initialCategories || []);
  const [tags] = useState(initialTags || []);

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.thestylishmama.com'
      : 'http://localhost:3000';

  const dynamicDescription =
    filteredPosts.length > 0
      ? `Explore dessert recipes like "${filteredPosts[0].title}" and more on The Stylish Mama.`
      : 'Discover a variety of delicious dessert recipes and ideas on The Stylish Mama.';

  const dynamicTitle =
    filteredPosts.length > 0
      ? `${filteredPosts[0].title} - Dessert Recipes | The Stylish Mama`
      : 'Delicious Dessert Recipes and Ideas | The Stylish Mama';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Dessert Recipes | The Stylish Mama',
    description: dynamicDescription,
    url: `${baseUrl}/dessert`,
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
          image: post.imageUrl || '/default-dessert-image.jpg',
          recipeCategory: 'Dessert',
          url: `${baseUrl}/dessert/${post.slug}`,
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
      console.log('Filtered Dessert Slugs:', filtered.map(p => p.slug)); // Debug filtered slugs
    }
  }, [postsState]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = postsState.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
    console.log('Filtered Dessert Slugs after Filter:', filtered.map(p => p.slug)); // Debug filtered slugs
  }, [postsState]);

  return (
    <div className={styles.dessertPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="desserts, recipes, sweets, motherhood, lifestyle" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/dessert`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/dessert`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={filteredPosts[0]?.imageUrl || '/default-dessert-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta
          name="twitter:image"
          content={filteredPosts[0]?.imageUrl || '/default-dessert-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${baseUrl}/dessert?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${baseUrl}/dessert?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      <div className={styles.dessertPageSearchContainer}>
        <Header
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          categories={categories}
          tags={tags}
        />
      </div>

      <section className={styles.dessertPageContentWrapper}>
        <h1 className={styles.dessertPageHeading}>Dessert Recipes</h1> {/* Added heading for consistency */}
        {error && <p className={styles.dessertPageErrorMessage}>{error}</p>}
        {!error && filteredPosts.length === 0 && (
          <p className={styles.dessertPageNoPostsMessage}>No posts available</p>
        )}
        <div className={styles.dessertPageGrid}>
          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.dessertPageCard}>
              {post.imageUrl ? (
                <Link href={`/dessert/${post.slug}`}>
                
                    <Image
                      src={post.imageUrl}
                      alt={`Thumbnail for ${post.title || 'Untitled'} - Dessert Recipe`}
                      className={styles.dessertPageImage}
                      width={300}
                      height={200}
                      onError={(e) => {
                        console.error('Image failed to load:', post.imageUrl);
                        e.target.src = '/default-dessert-image.jpg';
                      }}
                      loading="lazy"
                    />
                
                </Link>
              ) : (
                <Link href={`/dessert/${post.slug}`}>
        
                    <div className={styles.dessertPageImagePlaceholder}>No Image Available</div>
                
                </Link>
              )}
              <Link href={`/dessert/${post.slug}`} className={styles.dessertPageTitle}>
                <h2>{post.title || 'Untitled'}</h2>
              </Link>
              <p className={styles.dessertPageExcerpt}>
                {sanitizeText(post.content).substring(0, 200) || 'No content available...'}
              </p>
              <Link href={`/dessert/${post.slug}`} >
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {pagination.offset > 0 && (
            <a
              href={`/dessert?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
              className={styles.paginationLink}
            >
              Previous
            </a>
          )}
          {pagination.offset + pagination.limit < pagination.total && (
            <a
              href={`/dessert?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
              className={styles.paginationLink}
            >
              Next
            </a>
          )}
          <p>
            Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}
          </p>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { limit = 10, offset = 0 } = query;
  try {
    const response = await fetch(`${API_URL}?page=Dessert&limit=${limit}&offset=${offset}`);
    const responseText = await response.text();
    console.log('Raw API Response for Dessert:', responseText);

    if (!response.ok) {
      console.error('Error fetching Dessert posts:', responseText);
      throw new Error(`HTTP Error! Status: ${response.status} - ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed API Response for Dessert:', data);
    } catch (parseErr) {
      console.error('Error parsing API response:', parseErr.message);
      throw new Error('Invalid API response format');
    }

    const { posts, pagination } = data;
    if (!posts || !Array.isArray(posts)) {
      throw new Error('Posts array is missing or invalid');
    }

    const uniqueCategories = [
      ...new Set(posts.map((post) => post.category).filter((cat) => cat !== undefined)),
    ];
    const uniqueTags = [
      ...new Set(posts.flatMap((post) => post.tags || []).filter((tag) => tag !== undefined)),
    ];

    return {
      props: {
        posts: posts.map((post) => ({
          ...post,
          id: post.id || null,
          slug: post.slug || null,
          title: post.title || 'Untitled',
          content: post.content || '',
          imageUrl: post.imageUrl?.startsWith('http')
            ? post.imageUrl
            : post.imageUrl
            ? `https://www.thestylishmama.com${post.imageUrl}`
            : null,
          createdAt: post.createdAt || new Date().toISOString(),
          updated_at: post.updated_at || post.createdAt || new Date().toISOString(),
        })),
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        error: '',
        pagination,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for Dessert:', err.message);
    return {
      props: {
        posts: [],
        initialCategories: [],
        initialTags: [],
        error: `Failed to load posts: ${err.message}`,
        pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
      },
    };
  }
}