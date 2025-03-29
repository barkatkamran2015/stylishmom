export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    try {
        const response = await fetch('https://barkatkamran.com/stylish-mama/sendmail.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.text();
        res.status(200).json({ success: true, message: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
