import { useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../header';
import styles from '../../styles/Blog.module.css';

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

const getExcerpt = (content, maxLength = 150) => {
  const text = sanitizeText(content);
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function Blog({ initialPosts, initialCategories, initialTags, initialError, pagination }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [categories, setCategories] = useState(initialCategories || []);
  const [tags, setTags] = useState(initialTags || []);
  const [error, setError] = useState(initialError || '');
  const [loading, setLoading] = useState(false);

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
      console.log('Filtered Posts Slugs:', filtered.map(p => p.slug)); // Debug filtered slugs
    }
  }, [posts]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = posts.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setFilteredPosts(filtered);
    console.log('Filtered Posts Slugs after Filter:', filtered.map(p => p.slug)); // Debug filtered slugs
  }, [posts]);

  const incrementViewCount = useCallback(async (postId) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=Blog`, {
        method: 'POST',
      });
      console.log(`View count incremented for post ${postId}`);
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  }, []);

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://www.thestylishmama.com'
      : 'http://localhost:3000';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog | The Stylish Mama',
    description: filteredPosts.length > 0
      ? `Explore insightful blog posts like "${filteredPosts[0].title || 'Untitled'}" on motherhood, lifestyle, and more at The Stylish Mama.`
      : 'Discover insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama.',
    url: `${baseUrl}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredPosts.map((post, index) => {
        const sanitizedContent = sanitizeText(post.content);
        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'BlogPosting',
            headline: post.title || 'Untitled',
            description: sanitizedContent.substring(0, 160),
            datePublished: post.createdAt || new Date().toISOString(),
            dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
            author: {
              '@type': 'Person',
              name: post.author || 'The Stylish Mama',
            },
            publisher: {
              '@type': 'Organization',
              name: 'The Stylish Mama',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
              },
            },
            image: post.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg',
            url: `${baseUrl}/blog/${post.slug}`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/blog/${post.slug}`,
            },
            keywords: post.tags?.join(', ') || 'blog, motherhood, lifestyle',
          },
        };
      }),
    },
  };

  const primaryPost = filteredPosts[0];

  const dynamicDescription = primaryPost
    ? `${sanitizeText(primaryPost.content).substring(0, 120)}... Read more on The Stylish Mama!`
    : 'Discover insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama.';

  const dynamicTitle = primaryPost
    ? `${primaryPost.title || 'Untitled'} | The Stylish Mama`
    : 'Blog | The Stylish Mama';

  const keywords = filteredPosts
    .slice(0, 3)
    .map((post) => (post.title || '').toLowerCase().split(' ').slice(0, 3).join(','))
    .join(',')
    .concat(',blog,motherhood,lifestyle');

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={primaryPost?.author || 'The Stylish Mama'} />
        <link rel="canonical" href={`${baseUrl}/blog`} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:url" content={`${baseUrl}/blog`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={primaryPost?.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta
          name="twitter:image"
          content={primaryPost?.imageUrl || 'https://www.thestylishmama.com/default-blog-image.jpg'}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${baseUrl}/blog?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${baseUrl}/blog?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.heartLoader}></div>
        </div>
      ) : (
        <>
          <div className={styles.blogPageSearchContainer}>
            <Header
              onSearch={handleSearch}
              onFilterApply={handleFilterApply}
              categories={categories}
              tags={tags}
            />
          </div>

          <section className={styles.blogPageContentWrapper}>
            {error ? (
              <p className={styles.blogPageErrorMessage}>{error}</p>
            ) : filteredPosts.length === 0 ? (
              <p className={styles.blogPageNoPostsMessage}>No posts available</p>
            ) : (
              <>
                <div className={styles.blogPageGrid}>
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.slug}
                      id={`blog-post-${post.slug}`}
                      className={styles.blogPageCard}
                      style={{
                        backgroundColor: post.backgroundColor || 'transparent',
                        '--index': index,
                      }}
                      onMouseEnter={() => incrementViewCount(post.id)}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={`Image for ${post.title || 'Untitled'} - Blog Post`}
                            className={styles.blogPageImage}
                            width={300}
                            height={300}
                            onError={(e) => {
                              console.error('Image failed to load:', post.imageUrl);
                              e.target.src = 'https://www.thestylishmama.com/default-blog-image.jpg';
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <div className={styles.blogPageImagePlaceholder}>No Image Available</div>
                        )}
                      </Link>

                      <h2
                        className={styles.blogPageTitle}
                        style={{
                          color: post.titleStyle?.color || '#000',
                          fontSize: post.titleStyle?.fontSize || '1.5rem',
                          textAlign: post.titleStyle?.textAlign || 'left',
                        }}
                      >
                        <Link href={`/blog/${post.slug}`} className={styles.blogPageTitleLink}>
                          {console.log('Rendering Slug for Link:', post.slug)} {/* Debug the slug */}
                          {post.title || 'Untitled'}
                        </Link>
                      </h2>

                      <p className={styles.blogPageContent}>{getExcerpt(post.content, 150)}</p>
                    </article>
                  ))}
                </div>

                <nav className={styles.pagination} aria-label="Pagination">
                  {pagination.offset > 0 && (
                    <Link
                      href={`/blog?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                      className={styles.paginationLink}
                      aria-label="Previous page"
                    >
                      Previous
                    </Link>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <Link
                      href={`/blog?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { limit = 10, offset = 0 } = query;
  try {
    const response = await fetch(`${API_URL}?page=Blog&limit=${limit}&offset=${offset}`);
    const responseText = await response.text();
    console.log('Raw API Response for Blog (List):', responseText);

    if (!response.ok) {
      console.error('Error fetching posts (Server-Side):', responseText);
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Error parsing API response:', parseErr.message);
      throw new Error('Invalid API response format');
    }

    const { posts, pagination } = data;

    if (!Array.isArray(posts)) {
      console.error('Posts is not an array:', posts);
      throw new Error('Invalid posts data');
    }

    const blogPosts = posts.map((post) => {
      console.log('Post Slug from API Response:', post.slug); // Debug the slug from API
      return {
        ...post,
        id: post.id || null,
        slug: post.slug || null, // Use the slug directly from the API response
        titleStyle: post.titleStyle
          ? typeof post.titleStyle === 'string'
            ? JSON.parse(post.titleStyle)
            : post.titleStyle
          : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
        imageUrl: post.imageUrl?.startsWith('http')
          ? post.imageUrl
          : post.imageUrl
          ? `https://www.thestylishmama.com${post.imageUrl}`
          : null,
        content: post.content || '',
        title: post.title || 'Untitled',
        author: post.author || 'The Stylish Mama',
      };
    });

    const uniqueCategories = [
      ...new Set(blogPosts.map((post) => post.category).filter((cat) => cat !== undefined)),
    ];
    const uniqueTags = [
      ...new Set(blogPosts.flatMap((post) => post.tags || []).filter((tag) => tag !== undefined)),
    ];

    return {
      props: {
        initialPosts: blogPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        initialError: blogPosts.length === 0 ? 'No posts found for the Blog page.' : '',
        pagination: {
          total: pagination?.total || 0,
          limit: pagination?.limit || 10,
          offset: pagination?.offset || 0,
          totalPages: pagination?.totalPages || 0,
        },
      },
    };
  } catch (err) {
    console.error('Error in getServerSideProps:', err.message);
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