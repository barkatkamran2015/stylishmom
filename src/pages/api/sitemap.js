export default async function handler(req, res) {
  try {
    // Fetch the sitemap from the backend
    const response = await fetch('https://www.thestylishmama.com/sitemap.xml', { signal: AbortSignal.timeout(10000) });
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    }
    const sitemap = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error proxying sitemap:', error);

    // Generate a dynamic sitemap as a fallback
    const baseUrl = 'https://www.thestylishmama.com';
    const staticPages = [
      { loc: `${baseUrl}/`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
      { loc: `${baseUrl}/about`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { loc: `${baseUrl}/contact`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: `${baseUrl}/food`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: `${baseUrl}/drinks`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: `${baseUrl}/dessert`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { loc: `${baseUrl}/productsreview`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
    ];

    const sections = [
      { section: 'Blog', table: 'Blog', urlPath: 'blog' },
      { section: 'ProductsReview', table: 'ProductsReview', urlPath: 'productsreview' },
      { section: 'Food', table: 'Recipe', urlPath: 'food' },
      { section: 'Drinks', table: 'Drinks', urlPath: 'drinks' },
      { section: 'Dessert', table: 'Dessert', urlPath: 'dessert' },
    ];

    // Fetch dynamic posts from the API
    const dynamicPages = [];
    for (const { section, table, urlPath } of sections) {
      try {
        const apiUrl = `${baseUrl}/api/posts?page=${table}`; // Use table name in API call
        console.log(`Fetching posts for ${section} (table: ${table}) from ${apiUrl}`);
        const response = await fetch(apiUrl, { signal: AbortSignal.timeout(5000) });
        if (!response.ok) {
          console.error(`Failed to fetch posts for ${section}: ${response.status} ${response.statusText}`);
          continue;
        }
        const data = await response.json();
        const posts = data.posts || [];
        if (posts.length === 0) {
          console.log(`No posts found for section ${section} (table: ${table})`);
        } else {
          console.log(`Found ${posts.length} posts for section ${section} (table: ${table})`);
        }

        posts.forEach(post => {
          if (post.slug) {
            const lastmodRaw = post.updated_at || post.createdAt || new Date().toISOString();
            // Format lastmod as W3C Datetime
            const lastmod = new Date(lastmodRaw).toISOString();
            dynamicPages.push({
              loc: `${baseUrl}/${urlPath}/${post.slug}`,
              lastmod,
              changefreq: 'weekly',
              priority: '0.7',
            });
          } else {
            console.log(`Post in ${section} missing slug:`, post);
          }
        });
      } catch (err) {
        console.error(`Error fetching posts for ${section} (table: ${table}):`, err.message);
      }
    }

    // Generate the sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach(page => {
      sitemap += `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
    });

    // Add dynamic pages
    dynamicPages.forEach(page => {
      sitemap += `
    <url>
      <loc>${page.loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>`;
    });

    sitemap += `
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  }
}
