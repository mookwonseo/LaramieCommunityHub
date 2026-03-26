'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './AboutMe.module.css';

export default function AboutMe() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>Mookwon’s Portfolio</h1>
                        <p>Bridging the gap between complex mathematical theory and high-performance engineering solutions.</p>
                        <div style={{ marginTop: '20px' }}>
                            <Link href="/about-me/cv" className="btn btn-primary">
                                View Full CV &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <section className={styles.introSection}>
                    <div className={styles.introContent}>
                        <div className={styles.introText}>
                            <div className={styles.summaryHighlight}>
                                <p className={styles.summaryText}>
                                    Software Engineer & Data Scientist specializing in real-time embedded systems, 
                                    motor control, and high-performance physical simulations. 
                                    With a PhD in Mathematics and over 8 years of industry experience, 
                                    I build reliable, data-driven firmware and optimization models for Next-Gen 
                                    energy and environmental systems.
                                </p>
                            </div>
                        </div>
                        <div className={styles.introImageWrapper}>
                            <img 
                                src="/images/mookwon-profile.jpg" 
                                alt="Mookwon Seo" 
                                className={styles.profileImage}
                            />
                        </div>
                    </div>
                </section>

                <section className={styles.portfolioSection}>
                    <h2 className={styles.sectionTitle}>Featured Projects</h2>
                    <div className={styles.projectGrid}>
                        {/* Project 1: Wind Energy */}
                        <div className={styles.projectCard}>
                            <div className={styles.projectImageWrapper}>
                                <Image 
                                    src="/images/project-wind.png" 
                                    alt="Wind Energy Simulation" 
                                    fill
                                    className={styles.projectImage}
                                />
                            </div>
                            <div className={styles.projectContent}>
                                <h3>Real-time Wind Energy Control</h3>
                                <p>
                                    Developed bare-metal firmware and motor control algorithms for an innovative 
                                    wind energy system. Conducted structural fatigue analysis and managed 
                                    large-scale data pipelines for turbine optimization.
                                </p>
                                <div className={styles.projectTags}>
                                    <span className={styles.tag}>C/C++</span>
                                    <span className={styles.tag}>ARM Cortex</span>
                                    <span className={styles.tag}>IAR</span>
                                    <span className={styles.tag}>Python</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 2: GPU SQP */}
                        <div className={styles.projectCard}>
                            <div className={styles.projectImageWrapper}>
                                <Image 
                                    src="/images/project-gpu.png" 
                                    alt="GPU Parallel Computing" 
                                    fill
                                    className={styles.projectImage}
                                />
                            </div>
                            <div className={styles.projectContent}>
                                <h3>GPU-Accelerated Optimization</h3>
                                <p>
                                    Engineered a custom Parallel Sequential Quadratic Programming (SQP) algorithm 
                                    using CUDA and C#. Outperformed commercial solvers in high-variable 
                                    physical simulations for energy output maximization.
                                </p>
                                <div className={styles.projectTags}>
                                    <span className={styles.tag}>CUDA</span>
                                    <span className={styles.tag}>C#</span>
                                    <span className={styles.tag}>Parallel Computing</span>
                                    <span className={styles.tag}>SQP</span>
                                </div>
                            </div>
                        </div>

                        {/* Project 3: Hydrology */}
                        <div className={styles.projectCard}>
                            <div className={styles.projectImageWrapper}>
                                <Image 
                                    src="/images/project-hydrology.png" 
                                    alt="Hydrological Modeling" 
                                    fill
                                    className={styles.projectImage}
                                />
                            </div>
                            <div className={styles.projectContent}>
                                <h3>High-Performance Eco-Modeling</h3>
                                <p>
                                    Optimized hydrological models for the Upper Colorado Basin. Reduced 
                                    computational processing time by 30% through advanced parallel 
                                    algorithms and numerical scheme refinements.
                                </p>
                                <div className={styles.projectTags}>
                                    <span className={styles.tag}>High-Performance Computing</span>
                                    <span className={styles.tag}>Julia</span>
                                    <span className={styles.tag}>MATLAB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <h2 className={styles.studyTitle}>Technical Expertise & Studies</h2>
                <div className={styles.studyGrid}>
                    <div className={styles.studyCard}>
                        <div>
                            <h3>Project Management Professional (PMP)</h3>
                            <p>Advanced lifecycle management, strategic leadership, and resource optimization for large-scale engineering projects.</p>
                        </div>
                        <Link href="/about-me/pmp" className="btn btn-outline btn-sm viewBtn">Details &rarr;</Link>
                    </div>

                    <div className={styles.studyCard}>
                        <div>
                            <h3>Digital Signal Processing (DSP)</h3>
                            <p>Specialized research in FFT algorithms, real-time spectral analysis, and high-precision digital filtering.</p>
                        </div>
                        <Link href="/about-me/dsp" className="btn btn-outline btn-sm viewBtn">Details &rarr;</Link>
                    </div>

                    <div className={styles.studyCard}>
                        <div>
                            <h3>Embedded Systems Engineering</h3>
                            <p>Hardware-software co-design, firmware optimization, and RTOS implementation for mission-critical systems.</p>
                        </div>
                        <Link href="/about-me/embedded" className="btn btn-outline btn-sm viewBtn">Details &rarr;</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
