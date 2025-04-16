import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header';
import styles from '../../styles/ProductsReview.module.css';

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

export default function ProductsReview({ posts, initialCategories, initialTags, error, pagination }) {
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
      ? `Discover detailed product reviews like "${filteredPosts[0].title}" at The Stylish Mama.`
      : 'Explore product reviews and lifestyle tips at The Stylish Mama.';

  const dynamicTitle =
    filteredPosts.length > 0
      ? `${filteredPosts[0].title} - Product Reviews | The Stylish Mama`
      : 'Product Reviews | The Stylish Mama';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Product Reviews | The Stylish Mama',
    description: dynamicDescription,
    url: `${baseUrl}/productsreview`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          name: post.title || 'Untitled Review',
          description: sanitizeText(post.content).substring(0, 160),
          datePublished: post.createdAt || new Date().toISOString(),
          dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
          author: { '@type': 'Person', name: 'The Stylish Mama' },
          publisher: {
            '@type': 'Organization',
            name: 'The Stylish Mama',
            logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
          },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.5',
            bestRating: '5',
            worstRating: '1',
          },
          itemReviewed: {
            '@type': 'Product',
            name: (post.title || '').replace(/Review:/i, '').trim() || 'Unnamed Product',
            image: post.imageUrl || 'https://www.thestylishmama.com/default-product-image.jpg',
            description: sanitizeText(post.content).substring(0, 160),
          },
          url: `${baseUrl}/productsreview/${post.slug}`,
          keywords: post.tags?.join(', ') || 'product reviews, buying guide',
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
      console.log('Filtered ProductsReview Slugs:', filtered.map(p => p.slug)); // Debug filtered slugs
    }
  }, [postsState]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = postsState.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
    console.log('Filtered ProductsReview Slugs after Filter:', filtered.map(p => p.slug)); // Debug filtered slugs
  }, [postsState]);

  return (
    <div className={styles.productsReviewPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="product reviews, buying guide, lifestyle tips" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/productsreview`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/productsreview`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={filteredPosts[0]?.imageUrl || 'https://www.thestylishmama.com/default-product-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta
          name="twitter:image"
          content={filteredPosts[0]?.imageUrl || 'https://www.thestylishmama.com/default-product-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${baseUrl}/productsreview?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${baseUrl}/productsreview?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      <div className={styles.productsReviewPageSearchContainer}>
        <Header
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          categories={categories}
          tags={tags}
        />
      </div>

      <section className={styles.productsReviewPageContentWrapper}>
        <h1 className={styles.productsReviewPageHeading}>Product Reviews</h1>
        {error && <p className={styles.productsReviewPageErrorMessage}>{error}</p>}
        {!error && filteredPosts.length === 0 && (
          <p className={styles.productsReviewPageNoPostsMessage}>No posts available</p>
        )}
        <div className={styles.productsReviewPageGrid}>
          {filteredPosts.map((post, index) => (
            <div key={post.id} className={styles.productsReviewPageCard} style={{ '--index': index }}>
              {post.imageUrl ? (
                <Link href={`/productsreview/${post.slug}`}>
                 
                    <Image
                      src={post.imageUrl}
                      alt={`Thumbnail for ${post.title} - Product Review`}
                      className={styles.productsReviewPageImage}
                      width={300}
                      height={200}
                      onError={(e) => {
                        console.error('Image failed to load:', post.imageUrl);
                        e.target.src = 'https://www.thestylishmama.com/default-product-image.jpg';
                      }}
                      loading="lazy"
                    />
                 
                </Link>
              ) : (
                <Link href={`/productsreview/${post.slug}`}>
              
                    <div className={styles.productsReviewPageImagePlaceholder}>
                      No Image Available
                    </div>
                 
                </Link>
              )}
              <Link href={`/productsreview/${post.slug}`}>
                  <h2
                    className={styles.productsReviewPageTitle}
                    style={{
                      color: post.titleStyle?.color || '#000',
                      fontSize: post.titleStyle?.fontSize || '1.5rem',
                      textAlign: post.titleStyle?.textAlign || 'left',
                    }}
                  >
                    {post.title || 'Untitled'}
                  </h2>
              </Link>
              <p className={styles.productsReviewPageExcerpt}>
                {sanitizeText(post.content).substring(0, 200) || 'No content available...'}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          {pagination.offset > 0 && (
            <a
              href={`/productsreview?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
              className={styles.paginationLink}
            >
              Previous
            </a>
          )}
          {pagination.offset + pagination.limit < pagination.total && (
            <a
              href={`/productsreview?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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
    const response = await fetch(`${API_URL}?page=ProductsReview&limit=${limit}&offset=${offset}`);
    const responseText = await response.text();
    console.log('Raw API Response for ProductsReview:', responseText);

    if (!response.ok) {
      console.error('Error fetching ProductsReview posts:', responseText);
      throw new Error(`HTTP Error! Status: ${response.status} - ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed API Response for ProductsReview:', data);
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
          titleStyle: post.titleStyle
            ? typeof post.titleStyle === 'string'
              ? JSON.parse(post.titleStyle)
              : post.titleStyle
            : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
        })),
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        error: '',
        pagination,
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps for ProductsReview:', err.message);
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