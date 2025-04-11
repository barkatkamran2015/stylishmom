import fetch from 'node-fetch';
import getRawBody from 'raw-body';

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
        ? 'https://stylishmom.vercel.app'
        : 'http://localhost:3000';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    // Handle preflight CORS requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Extract query parameters
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

    // Handle the request body for non-GET and non-DELETE requests
    let body;
    let contentType = req.headers['content-type'] || '';
    console.log('Content-Type:', contentType);

    if (req.method !== 'GET' && req.method !== 'DELETE') {
      if (contentType.includes('application/json')) {
        const rawBody = await getRawBody(req);
        body = rawBody.length ? JSON.parse(rawBody.toString()) : {};
        console.log('Parsed JSON Body:', body);
      } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
        body = req; // Forward the raw body for FormData or URL-encoded data
        console.log('Forwarding raw body for:', contentType);
      } else {
        console.log('Unsupported Content-Type:', contentType);
        return res.status(400).json({ error: 'Unsupported Content-Type' });
      }
    }

    // Construct the backend API URL with query parameters
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

    // If the request has a body (e.g., POST with JSON), merge body parameters into queryParams
    if (body && req.method !== 'GET' && req.method !== 'DELETE') {
      Object.entries(body).forEach(([key, value]) => {
        queryParams.set(key, value);
      });
    }

    const url = `${PHP_API_URL}?${queryParams.toString()}`;
    console.log('Proxying request to:', url);

    // Log the headers being sent to the backend
    const headers = {
      ...(req.headers.authorization && { Authorization: req.headers.authorization }),
      ...(req.headers['content-type'] && { 'Content-Type': req.headers['content-type'] }),
    };
    console.log('Headers sent to backend:', headers);

    // Forward the request to the PHP API
    const response = await fetch(url, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'DELETE' && contentType.includes('multipart/form-data') ? body : undefined,
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
