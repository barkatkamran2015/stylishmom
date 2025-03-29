import { useState } from 'react';
import styles from '../styles/Contact.module.css'; // Use module CSS for Next.js

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { name, email, message };

        try {
            const response = await fetch('/api/sendmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setStatus(result.success ? 'Message sent successfully!' : 'Error sending message.');
            
            if (result.success) {
                setName('');
                setEmail('');
                setMessage('');
            }
        } catch (error) {
            setStatus('Error: Unable to send message.');
        }
    };

    return (
        <div className={styles.contactPage}>
            <div className={styles.contactFormContainer}>
                <h2>Contact Me</h2>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here"
                            rows="6"
                            required
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Send Message</button>
                </form>
                {status && <p className={styles.status}>{status}</p>}
            </div>
        </div>
    );
}
