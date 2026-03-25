'use client';

import styles from './AboutMe.module.css';
import Link from 'next/link';

export default function AboutMe() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>Mookwon’s Portfolio</h1>
                        <p>Bridging the gap between advanced mathematics and high-performance industrial engineering.</p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <Link href="/about-me/cv" className="btn btn-primary">
                                View Full CV &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className={styles.introSection}>
                    <div className={styles.introContent}>
                        <div className={styles.introText}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Professional Summary</h2>
                            <p style={{ fontSize: '1.3rem', fontWeight: '500', color: '#334155', lineHeight: '1.4' }}>
                                Software Engineer and Data Scientist specializing in the transformation of complex mathematical models into robust, real-time embedded systems.
                            </p>
                            <p style={{ fontSize: '1.1rem', color: '#475569', marginTop: '1.5rem' }}>
                                With a PhD in Mathematics and extensive experience in industrial automation, I specialize in 
                                developing high-reliability firmware, real-time motor control algorithms, and parallel 
                                computing architectures. My focus is on optimizing systems for maximum performance 
                                and power efficiency, ensuring technical excellence from bare-metal programming to machine learning.
                            </p>
                        </div>
                        <div className={styles.introImageWrapper}>
                            <img 
                                src="/images/mookwon-profile.jpg" 
                                alt="Mookwon Seo" 
                                className={styles.profileImage}
                            />
                        </div>
                    </div>
                    
                    <div className={styles.studyGrid}>
                        <div className={styles.studyCard}>
                            <div>
                                <h3>Project Management Professional (PMP)</h3>
                                <p>Advanced lifecycle management, strategic leadership, and resource optimization for large-scale engineering projects.</p>
                            </div>
                            <Link href="/about-me/pmp" className="btn btn-secondary">
                                Details &rarr;
                            </Link>
                        </div>

                        <div className={styles.studyCard}>
                            <div>
                                <h3>Digital Signal Processing (DSP)</h3>
                                <p>Specialized research in FFT algorithms, real-time spectral analysis, and high-precision digital filtering.</p>
                            </div>
                            <Link href="/about-me/dsp" className="btn btn-secondary">
                                Details &rarr;
                            </Link>
                        </div>

                        <div className={styles.studyCard}>
                            <div>
                                <h3>Embedded Systems Engineering</h3>
                                <p>Hardware-software co-design, firmware optimization, and RTOS implementation for mission-critical systems.</p>
                            </div>
                            <Link href="/about-me/embedded" className="btn btn-secondary">
                                Details &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
