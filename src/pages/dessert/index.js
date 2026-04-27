// pages/dessert/index.js
import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header';
import styles from '../../styles/Dessert.module.css';
import { SITE_NAME, SITE_URL, absoluteImage, fetchWithTimeout, pageSeo } from '../../lib/seo';

const API_URL = process.env.PHP_API_URL || 'https://api.barkatkamran.com/api.php';

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

  const baseUrl = SITE_URL;

  const dynamicDescription = pageSeo.dessert.description;
  const dynamicTitle = pageSeo.dessert.title;

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
          ...(post.createdAt ? { datePublished: post.createdAt } : {}),
          ...(post.updated_at || post.createdAt ? { dateModified: post.updated_at || post.createdAt } : {}),
          author: { '@type': 'Person', name: SITE_NAME },
          image: post.imageUrl || absoluteImage('/logo2.png'),
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
    }
  }, [postsState]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = postsState.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
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
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={absoluteImage('/logo2.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={absoluteImage('/logo2.png')} />
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
        <h1 className={styles.dessertPageHeading}>Dessert Recipes</h1>
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
                      e.currentTarget.src = '/default-dessert-image.jpg';
                    }}
                    loading="lazy"
                  />
                </Link>
              ) : (
                <Link href={`/dessert/${post.slug}`}>
                  <div className={styles.dessertPageImagePlaceholder}>No Image Available</div>
                </Link>
              )}
              <Link href={`/dessert/${post.slug}`}>
                <h2 className={styles.dessertPageTitle}>{post.title || 'Untitled'}</h2>
              </Link>
              <p className={styles.dessertPageExcerpt}>
                {sanitizeText(post.content).substring(0, 200) || 'No content available...'}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {pagination.offset > 0 && (
            <Link
              href={`/dessert?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
              className={styles.paginationLink}
              scroll={false}
            >
              Previous
            </Link>
          )}
          {pagination.offset + pagination.limit < pagination.total && (
            <Link
              href={`/dessert?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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

// THIS MAKES THE DESSERT LISTING PAGE INSTANT
export async function getStaticProps() {
  const limit = 10;
  const offset = 0;

  try {
    const response = await fetchWithTimeout(`${API_URL}?page=Dessert&limit=${limit}&offset=${offset}`);
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
