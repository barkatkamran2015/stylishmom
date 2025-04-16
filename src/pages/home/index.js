import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from "../components/SearchBar";
import styles from "../../styles/Dash.module.css";

import imageBlog from "../Assets/kitchen.jpeg";
import imageNature from "../Assets/parenting.jpeg";
import imageRecipe from "../Assets/bedroom.jpeg";
import imageGarden from "../Assets/garden.JPG";
import imageFall from "../Assets/fall.jpg";
import imageTulip from "../Assets/tulip.JPEG";

const Slider = dynamic(() => import('react-slick'), { ssr: false });

// Ensure slick CSS loads in production
if (typeof window !== 'undefined') {
  require('slick-carousel/slick/slick.css');
  require('slick-carousel/slick/slick-theme.css');
}

const API_URL = 'https://www.barkatkamran.com/api.php';

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

    if (router.isReady && (Number(offset) !== initialPagination.offset || Number(limit) !== initialPagination.limit)) {
      fetchPosts();
    }
  }, [limit, offset, router.isReady, initialPagination.offset, initialPagination.limit]);

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

  const navigateToPost = (postId, page) => {
    const path = pagePaths[page] ? `${pagePaths[page]}#${page.toLowerCase()}-post-${postId}` : `/blog#blog-post-${postId}`;
    router.push(path);
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Barkat Kamran | Lifestyle Blog, Reviews & Recipes',
    description: 'Discover Barkat Kamran\'s lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!',
    url: 'https://www.thestylishmama.com/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: filteredPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
          datePublished: post.createdAt || new Date().toISOString(),
          dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
          author: { '@type': 'Person', name: 'Admin' },
          image: post.thumbnailUrl || '/default-image.jpg',
          url: `https://www.thestylishmama.com${pagePaths[post.page] || '/blog'}#${post.page.toLowerCase()}-post-${post.id}`,
        },
      })),
    },
  };

  if (!isClient) return <p>Loading...</p>;

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Barkat Kamran | Lifestyle Blog, Reviews & Recipes</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover Barkat Kamran's lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!"
        />
        <link rel="canonical" href="https://www.thestylishmama.com/" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Barkat Kamran | Lifestyle Blog, Reviews & Recipes" />
        <meta
          property="og:description"
          content="Discover Barkat Kamran's lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!"
        />
        <meta property="og:url" content="https://www.thestylishmama.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.thestylishmama.com/default-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Barkat Kamran" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Barkat Kamran | Lifestyle Blog, Reviews & Recipes" />
        <meta
          name="twitter:description"
          content="Discover Barkat Kamran's lifestyle blog with inspiring posts, honest product reviews, and tasty recipes. Explore now for parenting tips and more!"
        />
        <meta name="twitter:image" content="https://www.thestylishmama.com/default-image.jpg" />
        <meta name="twitter:site" content="@YourTwitterHandle" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {pagination.offset > 0 && pagination.offset - pagination.limit >= 0 && (
          <link rel="prev" href={`https://www.thestylishmama.com/?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`} />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link rel="next" href={`https://www.thestylishmama.com/?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`} />
        )}
      </Head>

      {loading ? (
        <div className={styles.loadingContainer}><div className={styles.heartLoader}></div></div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          <Slider {...sliderSettings} className={styles.homePage__featuredSlider}>
            <div>
              <Image
                src={imageBlog}
                alt="Blog"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <h3 className={styles.homePage__sliderText}>Explore Inspiring Blogs</h3>
            </div>
            <div>
              <Image
                src={imageNature}
                alt="Natures Beauty"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <h3 className={styles.homePage__sliderText}>Discover Natures Beauty</h3>
            </div>
            <div>
              <Image
                src={imageRecipe}
                alt="Recipe"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <h3 className={styles.homePage__sliderText}>Healthy Recipe Ideas</h3>
            </div>
            <div>
              <Image
                src={imageGarden}
                alt="Garden"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <h3 className={styles.homePage__sliderText}>Butcher Garden Visit</h3>
            </div>
            <div>
              <Image
                src={imageTulip}
                alt="Tulip"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
              <h3 className={styles.homePage__sliderText}>Tulip Festival BC</h3>
            </div>
            <div>
              <Image
                src={imageFall}
                alt="Fall"
                className={styles.homePage__sliderImage}
                width={1200}
                height={600}
                priority
              />
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
                        onClick={() => navigateToPost(post.id, post.page)}
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
                  <p>Page {pagination.offset / pagination.limit + 1} of {pagination.totalPages}</p>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}