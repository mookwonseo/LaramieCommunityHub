'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './contact.module.css';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real implementation, this would send to a backend API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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

                            {submitted ? (
                                <div className={styles.successMessage}>
                                    <h4>✓ Thank you!</h4>
                                    <p>Your message has been sent successfully.</p>
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
                                            onChange={handleChange}
                                            required
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={styles.input}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="6"
                                            className={styles.input}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary">
                                        Send Message
                                    </button>
                                </form>
                            )}
                        </div>

                        <div>
                            <div className="card mb-lg">
                                <h3>📍 Location</h3>
                                <p className="text-muted">
                                    Laramie, Wyoming
                                </p>
                            </div>

                            <div className="card mb-lg">
                                <h3>📧 Email</h3>
                                <p className="text-muted">
                                    info@laramiecommunityhub.com
                                </p>
                            </div>

                            <div className="card">
                                <h3>🕒 Hours</h3>
                                <p className="text-muted">
                                    Website available 24/7<br />
                                    Response time: 1-2 business days
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
