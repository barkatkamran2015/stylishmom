// pages/api/posts.js
import fetch from 'node-fetch';
import getRawBody from 'raw-body';

const PHP_API_URL = 'https://www.barkatkamran.com/api.php';

export default async function handler(req, res) {
  try {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001', // Add this if your frontend is running on port 3001
      'http://127.0.0.1:3000',
      'https://www.barkatkamran.com',
      'https://stylishmom.vercel.app',
      'https://thestylishmama.com',
      // Add your deployed frontend domain here, e.g., 'https://your-app.vercel.app'
    ];

    const origin = req.headers.origin || '';
    console.log('Incoming Request Origin:', origin);

    // Allow empty origins in development mode for testing
    const isDev = process.env.NODE_ENV !== 'production';
    if (isDev && !origin) {
      console.log('Allowing empty origin in development mode');
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    } else if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    } else {
      console.log('Origin not allowed:', origin);
      console.log('Allowed origins:', allowedOrigins);
      return res.status(403).json({ error: 'Origin not allowed' });
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Cache-Control', 'no-store, max-age=0');

    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS preflight request');
      return res.status(200).end();
    }

    let body;
    let contentType = req.headers['content-type'] || '';
    console.log('Content-Type:', contentType);

    if (req.method !== 'GET' && req.method !== 'DELETE') {
      if (contentType.includes('application/json')) {
        const rawBody = await getRawBody(req);
        body = rawBody.length ? JSON.parse(rawBody.toString()) : {};
        console.log('Parsed JSON Body:', body);
        contentType = 'application/json';
      } else if (contentType.includes('multipart/form-data')) {
        body = await getRawBody(req);
        console.log('Forwarding multipart/form-data body');
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        body = await getRawBody(req);
        console.log('Forwarding form data body:', body.toString());
      } else {
        console.log('Unsupported Content-Type:', contentType);
        return res.status(400).json({ error: 'Unsupported Content-Type' });
      }
    }

    console.log('Incoming Request Method:', req.method);
    console.log('Incoming Request Query:', req.query);
    console.log('Incoming Request Body:', body);
    console.log('Incoming Request Headers:', req.headers);

    const queryString = new URLSearchParams(req.query).toString();
    const url = `${PHP_API_URL}${queryString ? `?${queryString}` : ''}`;
    console.log('Forwarding to PHP API URL:', url);

    const headers = {
      ...(req.headers.authorization && { Authorization: req.headers.authorization }),
    };

    if (req.method !== 'GET' && req.method !== 'DELETE') {
      if (contentType.includes('multipart/form-data')) {
        // Do not set Content-Type; let the PHP API handle it
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else {
        headers['Content-Type'] = 'application/json';
        body = body ? JSON.stringify(body) : undefined;
        console.log('Forwarding JSON body:', body);
      }
    }

    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const responseText = await response.text();
    console.log('PHP API Response Status:', response.status);
    console.log('PHP API Response Text:', responseText);

    if (!response.ok) {
      let errorData;
      try {
        errorData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse PHP API error response:', responseText);
        return res.status(response.status).json({ error: `PHP API error: ${responseText}` });
      }
      return res.status(response.status).json({ error: `PHP API error: ${errorData.message || responseText}` });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse PHP API response as JSON:', responseText);
      return res.status(500).json({ error: 'Invalid response from PHP API', details: responseText });
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error proxying to PHP API:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};