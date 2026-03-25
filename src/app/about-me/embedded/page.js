'use client';

import styles from '../AboutMe.module.css';
import Link from 'next/link';

export default function Embedded() {
    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>Embedded Systems Engineering</h1>
                        <p>High-Reliability Firmware & Hardware Optimization</p>
                    </div>
                </div>
            </section>

            <section className="container mt-xl">
                <Link href="/about-me" className="btn btn-secondary mb-xl">
                    &larr; Back to Portfolio
                </Link>
                
                <div className={styles.professionalContent}>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500', color: '#334155', marginBottom: '2rem' }}>
                        Hardware-software co-design and architectural optimization for mission-critical embedded environments.
                    </p>
                    
                    <div className={styles.contentSection}>
                        <p>
                            I specialize in building the bridge between high-level algorithms and bare-metal hardware. 
                            My expertise spans from low-level driver development to complex SoC integration:
                        </p>
                        <ul className={styles.professionalList}>
                            <li><strong>Firmware Development:</strong> Bare-metal and RTOS-based programming for high-reliability systems.</li>
                            <li><strong>Real-time Control:</strong> Implementation of low-latency motor control and industrial automation loops.</li>
                            <li><strong>Hardware Abstraction:</strong> Designing robust HAL layers for multi-platform compatibility and stability.</li>
                            <li><strong>Power Optimization:</strong> Critical energy management for battery-operated and thermally constrained systems.</li>
                        </ul>
                    </div>

                    <div className={styles.contentSection}>
                        <h2 style={{ fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1.5rem', color: '#0f172a' }}>Core Competencies</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <ul className={styles.professionalList}>
                                <li>C/C++ for Microcontrollers</li>
                                <li>RTOS (FreeRTOS) Implementation</li>
                                <li>Device Driver Development</li>
                            </ul>
                            <ul className={styles.professionalList}>
                                <li>UART, SPI, I2C, CAN</li>
                                <li>ADC/DAC Interfacing</li>
                                <li>DMA Controllers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
