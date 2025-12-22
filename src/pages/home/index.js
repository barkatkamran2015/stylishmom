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

const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .trim()
    .replace(/'/g, '')
    .replace(/[^\w\s-()!]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
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
    if (router.isReady) {
      fetchPosts();
    }
  }, [router.isReady, limit, offset]);

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

  const navigateToPost = (post) => {
    const categoryPath = pagePaths[post.page] || '/blog';
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
          <div className={styles.sliderWithLights}>
            <div className={styles.merryChristmas}>
              <span>M</span><span>e</span><span>r</span><span>r</span><span>y</span>
              <span className={styles.space}></span>
              <span>C</span><span>h</span><span>r</span><span>i</span>
              <span>s</span><span>t</span><span>m</span><span>a</span><span>s</span>
            </div>
            <div className={styles.christmasLights}>
              <ul>
                {Array.from({ length: 40 }, (_, i) => (
                  <li key={i} style={{ '--delay': i }} />
                ))}
              </ul>
            </div>
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
                <h3 className={styles.homePage__sliderText}>
                  Love Does not Divide, It Multiplies
                </h3>
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
                <h3 className={styles.homePage__sliderText}>
                  Every family is Unique
                </h3>
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
                <h3 className={styles.homePage__sliderText}>
                  I carry Hope in here. And half a granola bar
                </h3>
              </div>
            </Slider>
          </div>

          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for blogs, reviews, or recipes..."
          />

          <div className={styles.colorfulCardsContainer}>
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className={`${styles.colorfulCard} ${index % 3 === 0 ? styles.cardGreen : index % 3 === 1 ? styles.cardPurple : styles.cardOrange}`}
                onMouseEnter={() => incrementViewCount(post.id, post.page)}
              >
                <div className={styles.cardContentWrapper}>
                  {index % 2 === 0 ? (
                    <>
                      <div className={styles.cardTextSide}>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.cardDate}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                        <p className={styles.cardExcerpt}>
                          {post.contentHtml.replace(/<[^>]+>/g, '').slice(0, 250)}...
                        </p>
                        <button className={styles.cardButton} onClick={() => navigateToPost(post)}>
                          Read More
                        </button>
                      </div>
                      <div className={styles.cardImageSide}>
                        {post.thumbnailUrl && post.thumbnailUrl !== '/default-image.jpg' ? (
                          <Image
                            src={post.thumbnailUrl}
                            alt={post.title}
                            fill
                            className={styles.cardImage}
                            onError={(e) => (e.target.src = '/default-image.jpg')}
                          />
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.cardImageSide}>
                        {post.thumbnailUrl && post.thumbnailUrl !== '/default-image.jpg' ? (
                          <Image
                            src={post.thumbnailUrl}
                            alt={post.title}
                            fill
                            className={styles.cardImage}
                            onError={(e) => (e.target.src = '/default-image.jpg')}
                          />
                        ) : null}
                      </div>
                      <div className={styles.cardTextSide}>
                        <h2 className={styles.cardTitle}>{post.title}</h2>
                        <p className={styles.cardDate}>
                          {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                        <p className={styles.cardExcerpt}>
                          {post.contentHtml.replace(/<[^>]+>/g, '').slice(0, 250)}...
                        </p>
                        <button className={styles.cardButton} onClick={() => navigateToPost(post)}>
                          Read More
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

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
  );
}
