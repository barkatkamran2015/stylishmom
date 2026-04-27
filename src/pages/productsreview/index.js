// pages/productsreview/index.js
import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../header';
import styles from '../../styles/ProductsReview.module.css';
import { SITE_NAME, SITE_URL, absoluteImage, collectionJsonLd, fetchWithTimeout, normalizeContentHtml, normalizeImageUrl, pageSeo } from '../../lib/seo';

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

export default function ProductsReview({ posts, initialCategories, initialTags, error, pagination }) {
  const [postsState] = useState(posts || []);
  const [filteredPosts, setFilteredPosts] = useState(posts || []);
  const [categories] = useState(initialCategories || []);
  const [tags] = useState(initialTags || []);

  const baseUrl = SITE_URL;

  const structuredData = collectionJsonLd({
    section: 'productsreview',
    seo: pageSeo.productsreview,
    posts: filteredPosts
  });

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
    <div className={styles.productsReviewPage}>
      <Head>
        <title>{pageSeo.productsreview.title}</title>
        <meta name="description" content={pageSeo.productsreview.description} />
        <meta name="keywords" content="product reviews, buying guide, lifestyle tips" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/productsreview`} />
        <meta property="og:title" content={pageSeo.productsreview.title} />
        <meta property="og:description" content={pageSeo.productsreview.description} />
        <meta property="og:url" content={`${baseUrl}/productsreview`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={absoluteImage('/logo2.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageSeo.productsreview.title} />
        <meta name="twitter:description" content={pageSeo.productsreview.description} />
        <meta name="twitter:image" content={absoluteImage('/logo2.png')} />
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
        <div className={styles.productsReviewPageIntro}>
          <h1 className={styles.productsReviewPageHeading}>Product Reviews for Busy Moms</h1>
          <p>
            Practical beauty finds, travel essentials, budget-friendly mom products, and everyday
            favorites reviewed for style, time savings, and real family life.
          </p>
          <nav aria-label="Related Stylish Mama topics" className={styles.productsReviewPageTopicLinks}>
            <Link href="/food">Easy family recipes</Link>
            <Link href="/blog">Mom life blog</Link>
            <Link href="/dessert">Easy desserts</Link>
            <Link href="/drinks">Simple drinks</Link>
          </nav>
        </div>

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

// THIS IS THE ONLY CHANGE — getStaticProps instead of getServerSideProps
export async function getStaticProps() {
  const limit = 10;
  const offset = 0;

  try {
    const response = await fetchWithTimeout(`${API_URL}?page=ProductsReview&limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const { posts = [], pagination = {} } = data;

    const uniqueCategories = [...new Set(posts.map(p => p.category).filter(Boolean))];
    const uniqueTags = [...new Set(posts.flatMap(p => p.tags || []).filter(Boolean))];

    const formattedPosts = posts.map(post => ({
      ...post,
      content: normalizeContentHtml(post.content || ''),
      imageUrl: normalizeImageUrl(post.imageUrl) || null,
      titleStyle: post.titleStyle
        ? typeof post.titleStyle === 'string' ? JSON.parse(post.titleStyle) : post.titleStyle
        : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
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
