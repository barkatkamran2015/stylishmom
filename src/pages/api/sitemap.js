export default async function handler(req, res) {
    try {
      const response = await fetch('https://www.barkatkamran.com/sitemap.xml', { signal: AbortSignal.timeout(10000) });
      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
      }
      const sitemap = await response.text();
      res.setHeader('Content-Type', 'application/xml');
      res.status(200).send(sitemap);
    } catch (error) {
      console.error('Error proxying sitemap:', error);
      // Generate a static sitemap as a fallback
      const baseUrl = 'https://www.thestylishmama.com';
      const staticPages = [
        { loc: `${baseUrl}/`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: '1.0' },
        { loc: `${baseUrl}/about`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
        { loc: `${baseUrl}/contact`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
        { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
        { loc: `${baseUrl}/food`, lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      ];
  
      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
      staticPages.forEach(page => {
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