import fetch from 'node-fetch';

const PHP_API_URL = 'https://www.barkatkamran.com/api.php';

// Disable Next.js body parser to handle multipart/form-data correctly
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    // Set CORS headers dynamically based on environment
    const allowedOrigin =
      process.env.NODE_ENV === 'production'
        ? 'https://www.thestylishmama.com'
        : 'http://localhost:3000';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    // Handle preflight CORS requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Extract all query parameters
    const {
      page,
      limit,
      offset,
      method,
      postId,
      id,
      title,
      content,
      creator_uid,
      imageUrl,
      backgroundColor,
      titleStyle,
      category,
      tags,
    } = req.query;

    // Construct the backend API URL with all query parameters
    const queryParams = new URLSearchParams({
      page: page || 'all',
      limit: limit || '10',
      offset: offset || '0',
      method: method || '',
      postId: postId || '',
      id: id || '',
      title: title || '',
      content: content || '',
      creator_uid: creator_uid || '',
      imageUrl: imageUrl || '',
      backgroundColor: backgroundColor || '',
      titleStyle: titleStyle || '',
      category: category || '',
      tags: tags || '',
    });
    const url = `${PHP_API_URL}?${queryParams.toString()}`;
    console.log('Proxying request to:', url);

    // Log the headers being sent to the backend
    const headers = {
      ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      // Forward the Content-Type header for multipart/form-data
      ...(req.headers['content-type'] && { 'Content-Type': req.headers['content-type'] }),
    };
    console.log('Headers sent to backend:', headers);

    // Forward the request to the PHP API
    const response = await fetch(url, {
      method: req.method,
      headers,
      // Forward the raw body for POST requests (e.g., FormData for image uploads)
      body: req.method !== 'GET' && req.method !== 'DELETE' ? req : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Backend error response:', errorText);
      return res.status(response.status).json({ error: `PHP API error: ${errorText}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to PHP API:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
