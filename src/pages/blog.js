import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../pages/header'; // Ensure this path is correct
import styles from '../styles/Blog.module.css';

const API_URL = 'https://www.barkatkamran.com/api.php'; // Updated to match homepage
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://www.thestylishmama.com' : 'http://localhost:3000';

export default function Blog({ initialPosts, initialCategories, initialTags, initialError, pagination }) {
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
        const element = document.getElementById(`blog-post-${postIdFromQuery}`);
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
    const postUrl = `${BASE_URL}/blog?id=${post.id}`;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: 'Check out this blog post from The Stylish Mama!',
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
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=Blog`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const handlePageChange = (newOffset) => {
    router.push(`/blog?limit=${pagination.limit}&offset=${newOffset}`, undefined, { shallow: true });
  };

  const structuredData = filteredPosts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.content.replace(/<[^>]+>/g, '').substring(0, 160),
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { '@type': 'Person', name: 'Admin' },
    image: post.imageUrl || `${BASE_URL}/default-blog-image.jpg`,
    url: `${BASE_URL}/blog?id=${post.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo1.png` }, // Add logo if available
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog`,
    },
  }));

  return (
    <div className={styles.blogPage}>
      <Head>
        <title>Blog | The Stylish Mama</title>
        <meta
          name="description"
          content="Explore insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama."
        />
        <meta name="keywords" content="blog, motherhood, lifestyle, parenting, stylish mama" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${BASE_URL}/blog`} />
        <meta property="og:title" content="Blog | The Stylish Mama" />
        <meta
          property="og:description"
          content="Explore insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama."
        />
        <meta property="og:url" content={`${BASE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/default-blog-image.jpg`} />
        <meta property="og:site_name" content="The Stylish Mama" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | The Stylish Mama" />
        <meta
          name="twitter:description"
          content="Explore insightful blog posts on motherhood, lifestyle, and more at The Stylish Mama."
        />
        <meta name="twitter:image" content={`${BASE_URL}/default-blog-image.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {pagination.offset > 0 && (
          <link rel="prev" href={`${BASE_URL}/blog?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`} />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link rel="next" href={`${BASE_URL}/blog?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`} />
        )}
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <link rel="preload" href="/default-blog-image.jpg" as="image" /> {/* Preload default image */}
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
              <p className={styles.blogPageErrorMessage}>Unable to load posts at this time.</p>
            ) : filteredPosts.length === 0 ? (
              <p className={styles.blogPageNoPostsMessage}>No posts available</p>
            ) : (
              <>
                <div className={styles.blogPageGrid}>
                  {filteredPosts.map((post, index) => (
                    <article
                      key={post.id}
                      id={`blog-post-${post.id}`}
                      className={styles.blogPageCard}
                      style={{
                        backgroundColor: post.backgroundColor || '#fafafa',
                        '--index': index,
                      }}
                      onMouseEnter={() => incrementViewCount(post.id)}
                    >
                      <h1
                        className={styles.blogPageTitle}
                        style={{
                          color: post.titleStyle?.color || '#000',
                          fontSize: post.titleStyle?.fontSize || '1.5rem',
                          textAlign: post.titleStyle?.textAlign || 'left',
                        }}
                      >
                        {post.title}
                      </h1>

                      <div
                        className={styles.blogPageContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                      />

                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={`Image for ${post.title}`}
                          className={styles.blogPageImage}
                          width={600}
                          height={337}
                          onError={(e) => (e.target.src = '/default-blog-image.jpg')}
                          loading="lazy"
                        />
                      ) : (
                        <div className={styles.blogPageImagePlaceholder}>No Image Available</div>
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
                    <button
                      className={styles.paginationLink}
                      onClick={() => handlePageChange(pagination.offset - pagination.limit)}
                    >
                      Previous
                    </button>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <button
                      className={styles.paginationLink}
                      onClick={() => handlePageChange(pagination.offset + pagination.limit)}
                    >
                      Next
                    </button>
                  )}
                  <p>Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}</p>
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
  const { limit = 10, offset = 0 } = query;
  try {
    const response = await fetch(`${API_URL}?page=Blog&limit=${limit}&offset=${offset}`, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' }, // Cache for 1 hour, revalidate 24 hours
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching posts (Server-Side):', errorText);
      return {
        props: {
          initialPosts: [],
          initialCategories: [],
          initialTags: [],
          initialError: 'Unable to load posts at this time.',
          pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
        },
      };
    }

    const { posts, pagination } = await response.json();
    const blogPosts = posts.map((post) => ({
      ...post,
      titleStyle: post.titleStyle
        ? typeof post.titleStyle === 'string'
          ? JSON.parse(post.titleStyle)
          : post.titleStyle
        : { color: '#000', fontSize: '1.5rem', textAlign: 'left' },
    }));

    const uniqueCategories = [...new Set(blogPosts.map((post) => post.category).filter(Boolean))];
    const uniqueTags = [...new Set(blogPosts.flatMap((post) => post.tags || []).filter(Boolean))];

    return {
      props: {
        initialPosts: blogPosts,
        initialCategories: uniqueCategories,
        initialTags: uniqueTags,
        initialError: blogPosts.length === 0 ? 'No posts found for the Blog page.' : '',
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
        initialError: 'Unable to load posts at this time.',
        pagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
      },
    };
  }
}
