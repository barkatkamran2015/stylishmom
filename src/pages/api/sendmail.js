export default async function handler(req, res) {
    console.log('=== API Route Hit ===');

    if (req.method !== 'POST') {
        console.log('Method not allowed');
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    console.log('Request body:', req.body);

    // Check environment variables
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    console.log('Environment variables:', {
        EMAIL_USER: emailUser || 'undefined',
        EMAIL_PASS: emailPass ? '[hidden]' : 'undefined'
    });

    if (!emailUser || !emailPass) {
        console.log('Missing email credentials');
        return res.status(500).json({ 
            success: false, 
            message: 'Server configuration error: missing email credentials' 
        });
    }

    // Try to load nodemailer
    let nodemailer;
    try {
        nodemailer = require('nodemailer');
        console.log('Nodemailer loaded successfully');
    } catch (error) {
        console.error('Failed to load nodemailer:', error.message);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error: Nodemailer not available' 
        });
    }

    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });
        console.log('Transporter created');

        await transporter.sendMail({
            from: `"${name}" <${emailUser}>`,
            to: emailUser,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        });

        console.log('Email sent successfully');
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Email error:', {
            message: error.message,
            code: error.code,
            response: error.response || 'N/A',
            responseCode: error.responseCode || 'N/A'
        });
        return res.status(500).json({ 
            success: false, 
            message: 'Failed to send email', 
            error: error.message 
        });
    }
}