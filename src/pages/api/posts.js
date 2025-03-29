import fetch from 'node-fetch';

const PHP_API_URL = 'https://www.barkatkamran.com/api.php';

export default async function handler(req, res) {
  try {
    // Set CORS headers dynamically based on environment
    const allowedOrigin =
      process.env.NODE_ENV === 'production'
        ? 'https://www.barkatkamran.com'
        : 'http://localhost:3000';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    // Handle preflight CORS requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Always fetch with page=all
    const query = new URLSearchParams(req.query);
    const pageFilter = query.get('page'); // Get the requested page (e.g., Blog, Recipe)
    query.set('page', 'all'); // Override to fetch all posts
    const queryString = query.toString();
    const url = `${PHP_API_URL}${queryString ? `?${queryString}` : ''}`;

    console.log(`Proxying request to: ${url}`);

    const response = await fetch(url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      },
      body: req.method !== 'GET' && req.method !== 'DELETE' ? JSON.stringify(req.body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error response from external API: ${errorText}`);
      return res.status(response.status).json({ error: `PHP API error: ${errorText}` });
    }

    const data = await response.json();

    // Filter posts based on the requested page (if not 'all')
    let filteredData = data;
    if (pageFilter && pageFilter !== 'all') {
      filteredData = {
        ...data,
        posts: data.posts.filter(post => post.page === pageFilter),
      };
    }

    res.status(200).json(filteredData);
  } catch (error) {
    console.error('Error proxying to PHP API:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
