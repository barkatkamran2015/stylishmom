import fetch from 'node-fetch';
import getRawBody from 'raw-body';

const PHP_API_URL = process.env.PHP_API_URL || 'https://www.barkatkamran.com/api.php';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {
        const allowedOrigin =
            process.env.NODE_ENV === 'production'
                ? 'https://stylishmom.vercel.app'
                : 'http://localhost:3000';
        res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
        res.setHeader('Cache-Control', 'no-store, max-age=0');

        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

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
            slug,
        } = req.query;

        let body;
        let contentType = req.headers['content-type'] || '';
        console.log('Content-Type:', contentType);

        if (req.method !== 'GET' && req.method !== 'DELETE') {
            if (contentType.includes('application/json')) {
                const rawBody = await getRawBody(req);
                body = rawBody.length ? JSON.parse(rawBody.toString()) : {};
                console.log('Parsed JSON Body:', body);
            } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
                body = req;
                console.log('Forwarding raw body for:', contentType);
            } else {
                console.log('Unsupported Content-Type:', contentType);
                return res.status(400).json({ error: 'Unsupported Content-Type' });
            }
        }

        const queryParams = new URLSearchParams();
        const params = {
            page: page || (body?.page) || 'all',
            limit: limit || '10',
            offset: offset || '0',
            method: method || (body?.method) || '',
            postId: postId || (body?.postId) || '',
            id: id || (body?.id) || '',
            title: title || (body?.title) || '',
            content: content || (body?.content) || '',
            creator_uid: creator_uid || (body?.creator_uid) || '',
            imageUrl: imageUrl || (body?.imageUrl) || '',
            backgroundColor: backgroundColor || (body?.backgroundColor) || '',
            titleStyle: titleStyle || (body?.titleStyle) || '',
            category: category || (body?.category) || '',
            tags: tags || (body?.tags) || '',
            slug: slug || (body?.slug) || '',
        };

        for (const [key, value] of Object.entries(params)) {
            if (value) {
                queryParams.set(key, value);
            }
        }

        if (req.method === 'POST' && !queryParams.get('method')) {
            console.log('Missing method parameter in POST request');
            return res.status(400).json({ error: 'Missing method parameter' });
        }

        const url = `${PHP_API_URL}?${queryParams.toString()}`;
        console.log('Proxying request to:', url);

        const headers = {
            ...(req.headers.authorization && { Authorization: req.headers.authorization }),
            ...(req.headers['content-type'] && { 'Content-Type': req.headers['content-type'] }),
        };
        console.log('Headers sent to backend:', headers);

        const response = await fetch(url, {
            method: req.method,
            headers,
            body: req.method !== 'GET' && req.method !== 'DELETE' && contentType.includes('multipart/form-data') ? body : undefined,
        });

        const responseText = await response.text();
        console.log('Backend response for slug query:', responseText); // Debug the backend response

        if (!response.ok) {
            console.log('Backend error response:', responseText);
            return res.status(response.status).json({ error: `PHP API error: ${responseText}` });
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseErr) {
            console.error('Error parsing backend response:', parseErr.message);
            return res.status(500).json({ error: 'Invalid backend response format' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Error proxying to PHP API:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}