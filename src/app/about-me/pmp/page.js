'use client';

import styles from '../AboutMe.module.css';
import Link from 'next/link';

export default function PMP() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>Project Management Professional (PMP)</h1>
                        <p>Strategic Leadership & Engineering Lifecycle Management</p>
                    </div>
                </div>
            </section>

            <section className="container mt-xl">
                <Link href="/about-me" className="btn btn-secondary mb-xl">
                    &larr; Back to Portfolio
                </Link>
                
                <div className={styles.professionalContent}>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#334155', marginBottom: '2rem' }}>
                        Specialized in strategic lifecycle management and resource optimization for complex engineering and software development projects.
                    </p>
                    
                    <div className={styles.contentSection}>
                        <p>
                            My approach to project management integrates traditional Waterfall methodologies with Agile frameworks, 
                            ensuring flexibility and precision in high-stakes industrial environments. Key areas of expertise include:
                        </p>
                        <ul className={styles.professionalList}>
                            <li><strong>Stakeholder Management:</strong> Aligning technical requirements with business objectives.</li>
                            <li><strong>Risk Mitigation:</strong> Proactive identification and handling of technical and operational bottlenecks.</li>
                            <li><strong>Resource Planning:</strong> Optimizing human and technical capital for maximum efficiency.</li>
                            <li><strong>Quality Assurance:</strong> Implementing rigorous testing and validation protocols throughout the project lifecycle.</li>
                        </ul>
                    </div>

                    <div className={styles.contentSection}>
                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: '#0f172a' }}>Core Competencies</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <ul className={styles.professionalList}>
                                <li>Waterfall & Agile Methodologies</li>
                                <li>Risk Management & Mitigation</li>
                            </ul>
                            <ul className={styles.professionalList}>
                                <li>Resource Allocation & Scheduling</li>
                                <li>Stakeholder Communication</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
