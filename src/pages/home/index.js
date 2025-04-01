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

if (typeof window !== 'undefined') {
  require('slick-carousel/slick/slick.css');
  require('slick-carousel/slick/slick-theme.css');
}

const API_URL = 'https://www.barkatkamran.com/api.php';
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://www.thestylishmama.com' : 'http://localhost:3000';

export async function getServerSideProps(context) {
  const { query } = context;
  const { limit = 10, offset = 0 } = query;

  try {
    const response = await fetch(`${API_URL}?page=all&limit=${limit}&offset=${offset}`, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400' }, // Cache 1 hour, revalidate 24 hours
    });
    if (!response.ok) {
      console.error('Error fetching posts:', response.status);
      return {
        props: {
          initialPosts: [],
          initialPagination: { total: 0, limit: 10, offset: 0, totalPages: 0 },
          error: `Failed to fetch posts: ${response.status}`,
        },
      };
    }

    const { posts, pagination } = await response.json();
    const parsedPosts = posts.map((post) => {
      const imageMatch = (post.content || post.post_content || post.body)?.match(/<img[^>]+src=["'](.*?)["']/i);
      const thumbnailUrl = post.imageUrl || post.image_url || (imageMatch ? imageMatch[1] : '/default-image.jpg');
      const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
      return {
        id: post.id,
        title: post.title || 'Untitled',
        contentHtml: post.content || post.post_content || post.body || '',
        thumbnailUrl,
        createdAt: post.createdAt || new Date().toISOString(),
        page: post.page,
        titleStyle: post.titleStyle || { color: "#000", fontSize: "1.8rem", textAlign: "left" },
        userId: post.creator_uid,
        isRecentlyUpdated: (new Date() - createdAt) < 24 * 60 * 60 * 1000,
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
        error: error.message,
      },
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

  const pagePaths = {
    Recipe: "/food",
    Drinks: "/drinks",
    Dessert: "/dessert",
    Blog: "/blog",
    ProductsReview: "/productsreview",
  };

  useEffect(() => {
    setIsClient(true);
    setFilteredPosts(initialPosts);
    setPosts(initialPosts);
    setPagination(initialPagination);
  }, [initialPosts, initialPagination]);

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
    const path = pagePaths[page] ? `${pagePaths[page]}?id=${postId}` : `/blog?id=${postId}`;
    router.push(path);
  };

  const incrementViewCount = async (postId, page) => {
    try {
      await fetch(`${API_URL}?method=INCREMENT_VIEW_COUNT&postId=${postId}&page=${page}`, { method: 'POST' });
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  const handlePageChange = (newOffset) => {
    router.push(`/?limit=${pagination.limit}&offset=${newOffset}`, undefined, { shallow: true });
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

  const structuredData = filteredPosts.map((post) => ({
    '@context': 'https://schema.org',
    '@type': post.page === 'Recipe' ? 'Recipe' : post.page === 'ProductsReview' ? 'Review' : 'BlogPosting',
    ...(post.page === 'Recipe'
      ? {
          name: post.title,
          description: post.contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
          recipeCategory: post.category || 'General',
          recipeInstructions: post.contentHtml
            .replace(/<[^>]+>/g, '')
            .split('. ')
            .filter((step) => step.trim())
            .map((step, index) => ({
              '@type': 'HowToStep',
              text: step,
              name: `Step ${index + 1}`,
            })),
        }
      : post.page === 'ProductsReview'
      ? {
          itemReviewed: { '@type': 'Product', name: post.title },
          reviewBody: post.contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
        }
      : {
          headline: post.title,
          description: post.contentHtml.replace(/<[^>]+>/g, '').substring(0, 160),
        }),
    datePublished: post.createdAt || new Date().toISOString(),
    dateModified: post.updated_at || post.createdAt || new Date().toISOString(),
    author: { '@type': 'Person', name: 'Admin' },
    image: post.thumbnailUrl || `${BASE_URL}/default-image.jpg`,
    url: `${BASE_URL}${pagePaths[post.page] || '/blog'}?id=${post.id}`,
    publisher: {
      '@type': 'Organization',
      name: 'The Stylish Mama',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo1.png` },
    },
  }));

  return (
    <div className={styles.homePage}>
      <Head>
        <title>The Stylish Mama | Blogs, Reviews, Recipes & More</title>
        <meta
          name="description"
          content="Explore The Stylish Mama for inspiring blogs, product reviews, and delicious recipes on lifestyle, parenting, and more."
        />
        <meta name="keywords" content="blogs, product reviews, recipes, lifestyle, parenting, stylish mama" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`${BASE_URL}/`} />
        <meta property="og:title" content="The Stylish Mama | Blogs, Reviews, Recipes & More" />
        <meta
          property="og:description"
          content="Explore The Stylish Mama for inspiring blogs, product reviews, and delicious recipes on lifestyle, parenting, and more."
        />
        <meta property="og:url" content={`${BASE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE_URL}/default-image.jpg`} />
        <meta property="og:site_name" content="The Stylish Mama" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Stylish Mama | Blogs, Reviews, Recipes & More" />
        <meta
          name="twitter:description"
          content="Explore The Stylish Mama for inspiring blogs, product reviews, and delicious recipes on lifestyle, parenting, and more."
        />
        <meta name="twitter:image" content={`${BASE_URL}/default-image.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {pagination.offset > 0 && (
          <link rel="prev" href={`${BASE_URL}/?limit=${pagination.limit}&offset=${pagination.offset - pagination.limit}`} />
        )}
        {pagination.offset + pagination.limit < pagination.total && (
          <link rel="next" href={`${BASE_URL}/?limit=${pagination.limit}&offset=${pagination.offset + pagination.limit}`} />
        )}
        <link rel="sitemap" type="application/xml" href={`${BASE_URL}/sitemap.xml`} />
        <link rel="preload" href={imageBlog.src} as="image" /> {/* Preload first slider image */}
      </Head>

      {loading && !isClient ? (
        <div className={styles.loadingContainer}><div className={styles.heartLoader}></div></div>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : (
        <>
          <Slider {...sliderSettings} className={styles.homePage__featuredSlider}>
            <div>
              <Image src={imageBlog} alt="Blog" className={styles.homePage__sliderImage} width={1200} height={600} priority />
              <h3 className={styles.homePage__sliderText}>Explore Inspiring Blogs</h3>
            </div>
            <div>
              <Image src={imageNature} alt="Natures Beauty" className={styles.homePage__sliderImage} width={1200} height={600} loading="lazy" />
              <h3 className={styles.homePage__sliderText}>Discover Natures Beauty</h3>
            </div>
            <div>
              <Image src={imageRecipe} alt="Recipe" className={styles.homePage__sliderImage} width={1200} height={600} loading="lazy" />
              <h3 className={styles.homePage__sliderText}>Healthy Recipe Ideas</h3>
            </div>
            <div>
              <Image src={imageGarden} alt="Garden" className={styles.homePage__sliderImage} width={1200} height={600} loading="lazy" />
              <h3 className={styles.homePage__sliderText}>Butcher Garden Visit</h3>
            </div>
            <div>
              <Image src={imageTulip} alt="Tulip" className={styles.homePage__sliderImage} width={1200} height={600} loading="lazy" />
              <h3 className={styles.homePage__sliderText}>Tulip Festival BC</h3>
            </div>
            <div>
              <Image src={imageFall} alt="Fall" className={styles.homePage__sliderImage} width={1200} height={600} loading="lazy" />
              <h3 className={styles.homePage__sliderText}>Beautiful Fall Season</h3>
            </div>
          </Slider>

          <SearchBar onSearch={handleSearch} placeholder="Search for blogs, reviews, or recipes..." />

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
                      <div className={styles['homePage__postImage--placeholder']}>No Image Available</div>
                    )}
                    <div className={styles.homePage__postDetails}>
                      <h2 className={styles.homePage__postTitle} style={post.titleStyle}>{post.title}</h2>
                      <p className={styles.homePage__postDate}>
                        Posted on:{" "}
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date not available"}
                      </p>
                      <p className={styles.homePage__postExcerpt}>
                        {post.contentHtml ? post.contentHtml.replace(/<[^>]+>/g, '').slice(0, 200) + '...' : 'No content available'}
                      </p>
                      <button className={styles.homePage__ctaButton} onClick={() => navigateToPost(post.id, post.page)}>
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
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
          </div>
        </>
      )}
    </div>
  );
}
