'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            // Using Formspree ID for complete privacy (hides email/name)
            const res = await fetch('https://formspree.io/f/xdawjyby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    message: formData.message,
                    _subject: `New message from ${formData.name} — Laramie Community Hub`
                }),
            });
            
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                const data = await res.json();
                setErrorMsg(data.error || 'Something went wrong.')
                setStatus('error');
            }
        } catch {
            setErrorMsg('Could not connect. Please try again.');
            setStatus('error');
        }
    };

    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Contact Us</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Have questions or suggestions? We'd love to hear from you!
                    </p>

                    <div className={styles.contactGrid}>
                        <div className="card">
                            <h3>Get in Touch</h3>
                            <p className="text-muted mb-lg">
                                Fill out the form and we'll get back to you as soon as possible.
                            </p>

                            {status === 'success' ? (
                                <div className={styles.successMessage}>
                                    <h4>✓ Message sent!</h4>
                                    <p>Thank you — we'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            className={styles.input}
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows="6"
                                            className={styles.input}
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <p className={styles.errorMsg}>⚠️ {errorMsg}</p>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? 'Sending…' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>

                        <div>
                            <div className="card mb-lg">
                                <h3>📍 Location</h3>
                                <p className="text-muted">Laramie, Wyoming</p>
                            </div>

                            <div className="card">
                                <h3>🕒 Response Time</h3>
                                <p className="text-muted">
                                    Website available 24/7<br />
                                    Response time: 1–2 business days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
