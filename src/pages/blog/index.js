// pages/blog/index.js
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../header';
import styles from '../../styles/Blog.module.css';

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

const getExcerpt = (content, maxLength = 150) => {
  const text = sanitizeText(content);
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

export default function Blog({ initialPosts, initialCategories, initialTags, initialError }) {
  const [allPosts] = useState(initialPosts || []);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(initialError || '');

  const INITIAL_LOAD = 6;
  const LOAD_MORE = 3;

  useEffect(() => {
    setDisplayedPosts(allPosts.slice(0, INITIAL_LOAD));
  }, [allPosts]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setDisplayedPosts(prev => allPosts.slice(0, prev.length + LOAD_MORE));
      setLoading(false);
    }, 300);
  };

  const handleSearch = useCallback((searchTerm) => {
    if (!searchTerm.trim()) {
      setDisplayedPosts(allPosts.slice(0, INITIAL_LOAD));
    } else {
      const filtered = allPosts.filter(
        (post) =>
          (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedPosts(filtered.slice(0, INITIAL_LOAD));
      console.log('Filtered Posts Slugs:', filtered.map(p => p.slug));
    }
  }, [allPosts]);

  const handleFilterApply = useCallback((selectedCategories, selectedTags) => {
    const filtered = allPosts.filter(
      (post) =>
        (!selectedCategories.length || selectedCategories.includes(post.category)) &&
        (!selectedTags.length || (post.tags || []).some((tag) => selectedTags.includes(tag)))
    );
    setDisplayedPosts(filtered.slice(0, INITIAL_LOAD));
    console.log('Filtered Posts Slugs after Filter:', filtered.map(p => p.slug));
  }, [allPosts]);

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

  const baseUrl = 'https://www.thestylishmama.com';
  const hasMore = displayedPosts.length < allPosts.length;

  const primaryPost = displayedPosts[0];
  const dynamicDescription = primaryPost
    ? `${sanitizeText(primaryPost.content).substring(0, 120)}... Read more on The Stylish Mama!`
    : 'Discover insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama.';
  const dynamicTitle = primaryPost
    ? `${primaryPost.title || 'Untitled'} | The Stylish Mama`
    : 'Blog | The Stylish Mama';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog | The Stylish Mama',
    description: dynamicDescription,
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
      itemListElement: displayedPosts.map((post, index) => {
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

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>{dynamicTitle}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="blog,motherhood,lifestyle" />
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
      </Head>

      <div className={styles.blogPageSearchContainer}>
        <Header
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          categories={initialCategories}
          tags={initialTags}
        />
      </div>

      <section className={styles.blogPageContentWrapper}>
        {error ? (
          <p className={styles.blogPageErrorMessage}>{error}</p>
        ) : displayedPosts.length === 0 ? (
          <p className={styles.blogPageNoPostsMessage}>No posts available</p>
        ) : (
          <>
            <div className={styles.blogPageGrid}>
              {displayedPosts.map((post, index) => (
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
                      {post.title || 'Untitled'}
                    </Link>
                  </h2>
                  <p className={styles.blogPageContent}>{getExcerpt(post.content, 150)}</p>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className={styles.viewMoreContainer}>
                <button className={styles.viewMoreButton} onClick={loadMore} disabled={loading}>
                  {loading ? 'Loading...' : 'View More'}
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(`${API_URL}?page=Blog&limit=1000&offset=0`);
    const data = await response.json();
    const { posts = [] } = data;

    const blogPosts = posts.map((post) => {
      return {
        ...post,
        id: post.id || null,
        slug: post.slug || null,
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
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error('Error in getStaticProps:', err.message);
    return {
      props: {
        initialPosts: [],
        initialCategories: [],
        initialTags: [],
        initialError: `Failed to load posts: ${err.message}`,
      },
      revalidate: 60,
    };
  }
}
