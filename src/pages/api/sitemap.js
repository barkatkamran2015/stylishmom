// pages/api/sitemap.js
const SITE_URL = 'https://www.thestylishmama.com';
const PHP_API_URL = process.env.PHP_API_URL || 'https://api.barkatkamran.com/api.php';

const pageToPath = {
  Blog: 'blog',
  ProductsReview: 'productsreview',
  Recipe: 'food',
  Food: 'food',
  Drinks: 'drinks',
  Dessert: 'dessert'
};

const xmlEscape = (value = '') =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const formatDate = (value) => {
  if (!value) return new Date().toISOString().split('T')[0];
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().split('T')[0] : date.toISOString();
};

const staticPages = ['/', '/about', '/contact', '/blog', '/food', '/drinks', '/dessert', '/productsreview'];

export default async function handler(req, res) {
  try {
    const response = await fetch(`${PHP_API_URL}?page=all&limit=1000&offset=0`, {
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const { posts = [] } = await response.json();
    const today = new Date().toISOString().split('T')[0];
    const urls = [
      ...staticPages.map((path) => ({
        loc: `${SITE_URL}${path === '/' ? '/' : path}`,
        lastmod: today,
        changefreq: path === '/' ? 'daily' : 'weekly',
        priority: path === '/' ? '1.0' : '0.8'
      })),
      ...posts
        .filter((post) => post?.slug)
        .map((post) => {
          const section = pageToPath[post.page] || pageToPath[post.category] || 'blog';
          return {
            loc: `${SITE_URL}/${section}/${encodeURIComponent(post.slug)}`,
            lastmod: formatDate(post.updated_at || post.createdAt || post.created_at),
            changefreq: 'monthly',
            priority: '0.7'
          };
        })
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${xmlEscape(url.loc)}</loc>
    <lastmod>${xmlEscape(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=3600');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);

    const today = new Date().toISOString().split('T')[0];
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(fallbackSitemap);
  }
}
