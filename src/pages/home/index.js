// pages/index.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from "../components/SearchBar";
import styles from "../../styles/Dash.module.css";
import imageBlog from "../Assets/family.png";
import imageNature from "../Assets/lotto.jpg";
import imageRecipe from "../Assets/make.jpg";

const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Ensure slick CSS loads in production
if (typeof window !== 'undefined') {
  require('slick-carousel/slick/slick.css');
  require('slick-carousel/slick/slick-theme.css');
}

const API_URL = 'https://www.barkatkamran.com/api.php';

// Helper function to generate slug from title (matches your site's pattern)
const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/'/g, '')                    // Remove apostrophes
    .replace(/[^\w\s-()!]/g, '')           // Keep only letters, numbers, spaces, -, (), !
    .replace(/\s+/g, '-')                 // Spaces → dashes
    .replace(/-+/g, '-')                  // Multiple dashes → single
    .replace(/^-+|-+$/g, '');             // Trim dashes from start/end
};

export async function getStaticProps({ params }) {
  const limit = 10;
  const offset = 0;
  try {
    const response = await fetch(`${API_URL}?page=all&limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body in getStaticProps:', errorText);
      return {
        props: {
          initialPosts: [],
          initialPagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
          error: `Failed to fetch posts: ${response.status}`,
        },
        revalidate: 60,
      };
    }
    const { posts, pagination } = await response.json();
    const parsedPosts = posts.map((post) => {
      const imageMatch = (post.content || post.post_content || post.body)?.match(/<img[^>]+src=["'](.*?)["']/i);
      const thumbnailUrl = post.imageUrl || post.image_url || (imageMatch ? imageMatch[1] : '/default-image.jpg');
      const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
      const isRecentlyUpdated = (new Date() - createdAt) < 24 * 60 * 60 * 1000;
      return {
        id: post.id,
        title: post.title || 'Untitled',
        contentHtml: post.content || post.post_content || post.body || '',
        thumbnailUrl,
        createdAt: post.createdAt || new Date().toISOString(),
        page: post.page,
        titleStyle: post.titleStyle || { color: "#000", fontSize: "1.8rem", textAlign: "left" },
        userId: post.creator_uid,
        isRecentlyUpdated,
      };
    });
    return {
      props: {
        initialPosts: parsedPosts,
        initialPagination: pagination,
        error: null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialPosts: [],
        initialPagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
        error: error.message,
      },
      revalidate: 60,
    };
  }
}

export default function Home({ initialPosts, initialPagination, error: initialError }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [pagination, setPagination] = useState(initialPagination || { total: 0, limit: 10, offset: 0, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { limit = 10, offset = 0 } = router.query;

  const pagePaths = {
    Recipe: "/food",
    Drinks: "/drinks",
    Dessert: "/dessert",
    Blog: "/blog",
    ProductsReview: "/productsreview",
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?page=all&limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }
        const { posts, pagination: newPagination } = await response.json();
        const parsedPosts = posts.map((post) => {
          const imageMatch = (post.content || post.post_content || post.body)?.match(/<img[^>]+src=["'](.*?)["']/i);
          const thumbnailUrl = post.imageUrl || post.image_url || (imageMatch ? imageMatch[1] : '/default-image.jpg');
          const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
          const isRecentlyUpdated = (new Date() - createdAt) < 24 * 60 * 60 * 1000;
          return {
            id: post.id,
            title: post.title || 'Untitled',
            contentHtml: post.content || post.post_content || post.body || '',
            thumbnailUrl,
            createdAt: post.createdAt || new Date().toISOString(),
            page: post.page,
            titleStyle: post.titleStyle || { color: "#000", fontSize: "1.8rem", textAlign: "left" },
            userId: post.creator_uid,
            isRecentlyUpdated,
          };
        });
        setPosts(parsedPosts);
        setFilteredPosts(parsedPosts);
        setPagination(newPagination);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady && (Number(offset) !== pagination.offset || Number(limit) !== pagination.limit)) {
      fetchPosts();
    }
  }, [limit, offset, router.isReady]); // ← Fixed: removed pagination.offset/limit from deps

  useEffect(() => {
    setIsClient(true);
    setFilteredPosts(initialPosts);
  }, [initialPosts]);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        (post.contentHtml && post.contentHtml.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredPosts(results);
  };

  // Updated: direct navigation to single post using generated slug
  const navigateToPost = (post) => {
    const categoryPath = pagePaths[post.page] || 'blog';
    const slug = generateSlug(post.title);
    if (slug) {
      router.push(`/${categoryPath}/${slug}`);
    }
  };

  const incrementViewCount = async (postId, page) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=${page}`, {
        method: 'POST',
      });
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  // ... (structuredData remains unchanged – you can keep it as is)

  if (!isClient) return <p>Loading...</p>;

  return (
    <div className={styles.homePage}>
      {/* Head section unchanged – keep your existing <Head> */}

      {loading ? (
        <div className={styles.loadingContainer}><div className={styles.heartLoader}></div></div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          {/* Slider section unchanged – keep your Christmas slider */}

          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for blogs, reviews, or recipes..."
          />

          <div className={styles.homePage__postsContainer}>
            {filteredPosts.length === 0 ? (
              <p>No posts available</p>
            ) : (
              <>
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className={styles.homePage__postItem}
                    onMouseEnter={() => incrementViewCount(post.id, post.page)}
                  >
                    {post.thumbnailUrl && post.thumbnailUrl !== '/default-image.jpg' ? (
                      <Image
                        src={post.thumbnailUrl}
                        alt={post.title}
                        className={styles.homePage__postImage}
                        width={600}
                        height={337}
                        onError={(e) => (e.target.src = '/default-image.jpg')}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles['homePage__postImage--placeholder']}>
                        No Image Available
                      </div>
                    )}
                    <div className={styles.homePage__postDetails}>
                      <h2
                        className={styles.homePage__postTitle}
                        style={{
                          color: post.titleStyle?.color || "#333",
                          fontSize: post.titleStyle?.fontSize || "1.8rem",
                          textAlign: post.titleStyle?.textAlign || "left",
                        }}
                      >
                        {post.title}
                      </h2>
                      {post.createdAt ? (
                        <p className={styles.homePage__postDate}>
                          Posted on:{" "}
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      ) : (
                        <p className={styles.homePage__postDate}>Date not available</p>
                      )}
                      <p className={styles.homePage__postExcerpt}>
                        {post.contentHtml
                          ? post.contentHtml.replace(/<[^>]+>/g, '').slice(0, 200) + '...'
                          : 'No content available'}
                      </p>
                      <button
                        className={styles.homePage__ctaButton}
                        onClick={() => navigateToPost(post)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}

                <div className={styles.pagination}>
                  {pagination.offset > 0 && (
                    <Link
                      href={`/?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Previous
                    </Link>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <Link
                      href={`/?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Next
                    </Link>
                  )}
                  <p>Page {Math.floor(pagination.offset / pagination.limit) + 1} of {pagination.totalPages || 1}</p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
