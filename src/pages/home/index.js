import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import SearchBar from "../components/SearchBar";
import styles from "../../styles/Dash.module.css";

import imageBlog from "../Assets/kitchen.jpeg";
import imageNature from "../Assets/parenting.jpeg";
import imageRecipe from "../Assets/bedroom.jpeg";
import imageGarden from "../Assets/garden.JPG";
import imageFall from "../Assets/fall.jpg";
import imageTulip from "../Assets/tulip.JPEG";

const Slider = dynamic(() => import('react-slick'), {
  ssr: false,
  loading: () => <p>Loading slider...</p>,
});

if (typeof window !== 'undefined') {
  import('slick-carousel/slick/slick.css');
  import('slick-carousel/slick/slick-theme.css');
}

const API_URL = 'https://www.barkatkamran.com/api.php';

export async function getServerSideProps(context) {
  const { query } = context;
  const { limit = 10, offset = 0 } = query;

  try {
    const response = await fetch(`${API_URL}?page=all&limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body in getServerSideProps:', errorText);
      return {
        props: {
          initialPosts: [],
          initialPagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
          error: `Failed to fetch posts: ${response.status} - ${errorText}`,
        },
      };
    }

    const { posts, pagination } = await response.json();
    console.log('Fetched Home Posts (Server-Side):', posts);

    const parsedPosts = posts.map((post) => {
      const imageMatch = (post.content || post.post_content || post.body) ? (post.content || post.post_content || post.body).match(/<img[^>]+src=["'](.*?)["']/i) : null;
      const thumbnailUrl = post.imageUrl || post.image_url || (imageMatch ? imageMatch[1] : '/default-image.jpg');
      const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
      const now = new Date();
      const isRecentlyUpdated = createdAt ? (now - createdAt) < 24 * 60 * 60 * 1000 : false;
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
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialPosts: [],
        initialPagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
        error: error.message || 'An unexpected error occurred while fetching posts',
      },
    };
  }
}

export default function Home({ initialPosts, initialPagination, error: initialError }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts || []);
  const [pagination, setPagination] = useState(initialPagination || { total: 0, limit: 10, offset: 0, totalPages: 0 }); // Add pagination state
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
    setIsClient(true);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log(`Fetching posts from ${API_URL}?page=all&limit=${limit}&offset=${offset}`);
      const response = await fetch(`${API_URL}?page=all&limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body in fetchPosts:', errorText);
        setError(`Failed to fetch posts: ${response.status} - ${errorText}`);
        setPosts([]);
        setFilteredPosts([]);
        return;
      }

      const { posts: fetchedPosts, pagination: fetchedPagination } = await response.json();
      console.log("Raw API response posts:", fetchedPosts);

      if (fetchedPosts.length === 0) {
        console.warn('No posts found in fetchPosts');
      }

      const parsedPosts = fetchedPosts.map((post) => {
        const imageMatch = (post.content || post.post_content || post.body) ? (post.content || post.post_content || post.body).match(/<img[^>]+src=["'](.*?)["']/i) : null;
        const thumbnailUrl = post.imageUrl || post.image_url || (imageMatch ? imageMatch[1] : '/default-image.jpg');
        const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
        const now = new Date();
        const isRecentlyUpdated = createdAt ? (now - createdAt) < 24 * 60 * 60 * 1000 : false;
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

      console.log("Fetched and parsed posts:", parsedPosts);
      setPosts(parsedPosts);
      setFilteredPosts(parsedPosts);
      setPagination((prev) => ({
        ...prev,
        total: fetchedPagination.total,
        totalPages: fetchedPagination.totalPages,
      }));
      setError(null);
    } catch (err) {
      console.error("Error fetching posts in fetchPosts:", err);
      setError(`Failed to load posts: ${err.message}`);
      setPosts([]);
      setFilteredPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    if (initialError) {
      console.log('Initial error detected, fetching posts on client side');
      fetchPosts();
    }

    const handleRouteChange = () => {
      console.log('Route changed, fetching all posts');
      fetchPosts();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [isClient, router.events, initialError, limit, offset, fetchPosts]); // Added fetchPosts to dependencies

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        (post.contentHtml && post.contentHtml.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredPosts(results);
  };

  const navigateToPost = (postId, page) => {
    if (!page || !pagePaths[page]) {
      console.error(`Invalid page for post ${postId}: ${page}`);
      router.push(`/blog?id=${postId}`);
      return;
    }
    const path = `${pagePaths[page]}?id=${postId}`;
    console.log(`Navigating to ${path}`);
    router.push(path);
  };

  const incrementViewCount = async (postId, page) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=${page}`, {
        method: 'POST',
      });
      console.log(`View count incremented for post ${postId}`);
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

  const structuredData = filteredPosts.map((post) => {
    const contentHtml = post.contentHtml || '';
    return {
      '@context': 'https://schema.org',
      '@type': post.page === 'Recipe' ? 'Recipe' : post.page === 'ProductsReview' ? 'Review' : 'BlogPosting',
      ...(post.page === 'Recipe'
        ? {
            name: post.title,
            description: contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
            recipeCategory: post.category || 'General',
            recipeInstructions: contentHtml
              .replace(/<[^>]+>/g, '')
              .split('. ')
              .filter((step) => step.trim() !== '')
              .map((step, index) => ({
                '@type': 'HowToStep',
                text: step,
                name: `Step ${index + 1}`,
              })),
          }
        : post.page === 'ProductsReview'
        ? {
            itemReviewed: {
              '@type': 'Product',
              name: post.title,
            },
            reviewBody: contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
          }
        : {
            headline: post.title,
            description: contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
          }),
      datePublished: post.createdAt || new Date().toISOString(),
      dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: 'Admin',
      },
      image: post.thumbnailUrl || '/default-image.jpg',
      url: `${
        process.env.NODE_ENV === 'production'
          ? 'https://www.barkatkamran.com'
          : 'http://localhost:3000'
      }${pagePaths[post.page] || '/blog'}?id=${post.id}`,
    };
  });

  if (!isClient) return <p>Loading...</p>;

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Barkat Kamran | Blogs, Reviews, Recipes & More</title>
        <meta
          name="description"
          content="Explore Barkat Kamran for inspiring blogs, product reviews, and delicious recipes. Find the best in lifestyle, parenting, and more."
        />
        <meta name="keywords" content="blogs, product reviews, recipes, lifestyle, parenting, barkat kamran" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.barkatkamran.com'
              : 'http://localhost:3000'
          }/`}
        />
        <meta property="og:title" content="Barkat Kamran | Blogs, Reviews, Recipes & More" />
        <meta
          property="og:description"
          content="Explore Barkat Kamran for inspiring blogs, product reviews, and delicious recipes. Find the best in lifestyle, parenting, and more."
        />
        <meta
          property="og:url"
          content={`${
            process.env.NODE_ENV === 'production'
              ? 'https://www.barkatkamran.com'
              : 'http://localhost:3000'
          }/`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/default-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Barkat Kamran | Blogs, Reviews, Recipes & More" />
        <meta
          name="twitter:description"
          content="Explore Barkat Kamran for inspiring blogs, product reviews, and delicious recipes. Find the best in lifestyle, parenting, and more."
        />
        <meta name="twitter:image" content="/default-image.jpg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {pagination.offset > 0 && (
          <link
            rel="prev"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.barkatkamran.com'
                : 'http://localhost:3000'
            }/?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
          />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link
            rel="next"
            href={`${
              process.env.NODE_ENV === 'production'
                ? 'https://www.barkatkamran.com'
                : 'http://localhost:3000'
            }/?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
          />
        )}
      </Head>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.heartLoader}></div>
        </div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          <Slider {...sliderSettings} className={styles.homePage__featuredSlider}>
            <div>
              <img src={imageBlog.src} alt="Blog" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Explore Inspiring Blogs</h3>
            </div>
            <div>
              <img src={imageNature.src} alt="Natures Beauty" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Discover Natures Beauty</h3>
            </div>
            <div>
              <img src={imageRecipe.src} alt="Recipe" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Healthy Recipe Ideas</h3>
            </div>
            <div>
              <img src={imageGarden.src} alt="Garden" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Butcher Garden Visit</h3>
            </div>
            <div>
              <img src={imageTulip.src} alt="Tulip" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Tulip Festival BC</h3>
            </div>
            <div>
              <img src={imageFall.src} alt="Fall" className={styles.homePage__sliderImage} />
              <h3 className={styles.homePage__sliderText}>Beautiful Fall Season</h3>
            </div>
          </Slider>

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
                        onError={(e) => {
                          console.error('Thumbnail image failed to load on home page:', post.thumbnailUrl);
                          e.target.src = '/default-image.jpg';
                        }}
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
                        onClick={() => navigateToPost(post.id, post.page)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}

                <div className={styles.pagination}>
                  {pagination.offset > 0 && (
                    <a
                      href={`/?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`}
                      className={styles.paginationLink}
                    >
                      Previous
                    </a>
                  )}
                  {pagination.offset + pagination.limit < pagination.total && (
                    <a
                      href={`/?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`}
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
          </div>
        </>
      )}
    </div>
  );
}