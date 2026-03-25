'use client';

import styles from '../AboutMe.module.css';
import Link from 'next/link';

export default function DSP() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>Digital Signal Processing (DSP)</h1>
                        <p>Advanced Algorithmic Research & Implementation</p>
                    </div>
                </div>
            </section>

            <section className="container mt-xl">
                <Link href="/about-me" className="btn btn-secondary mb-xl">
                    &larr; Back to Portfolio
                </Link>
                
                <div className={styles.professionalContent}>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#334155', marginBottom: '2rem' }}>
                        Advanced research and implementation of algorithms for real-time signal analysis and digital system optimization.
                    </p>
                    
                    <div className={styles.contentSection}>
                        <p>
                            Leveraging a strong mathematical foundation, I develop highly efficient algorithms for processing 
                            industrial and environmental data. My technical focus includes:
                        </p>
                        <ul className={styles.professionalList}>
                            <li><strong>Real-time Filtering:</strong> FIR/IIR filter design and implementation on low-latency systems.</li>
                            <li><strong>Spectral Analysis:</strong> FFT optimization and frequency-domain feature extraction.</li>
                            <li><strong>Noise Reduction:</strong> Advanced statistical methods for signal enhancement in high-noise environments.</li>
                            <li><strong>Algorithm Optimization:</strong> Minimizing computational complexity for embedded and parallel architectures.</li>
                        </ul>
                    </div>

                    <div className={styles.contentSection}>
                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: '#0f172a' }}>Technical Proficiency</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <ul className={styles.professionalList}>
                                <li>FFT & DFT Algorithms</li>
                                <li>IIR & FIR Filter Design</li>
                            </ul>
                            <ul className={styles.professionalList}>
                                <li>Signal Quantization & Sampling</li>
                                <li>Noise Reduction Techniques</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
