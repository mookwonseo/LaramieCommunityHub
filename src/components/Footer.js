'use client';

import styles from './Footer.module.css';

export default function Footer() {

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3>Laramie Community Hub</h3>
                        <p className="text-muted">
                            Connecting families with the best afterschool programs, events, and resources in Laramie.
                        </p>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Quick Links</h4>
                        <ul className={styles.footerLinks}>
                            <li><a href="/programs">Programs</a></li>
                            <li><a href="/schedule">Schedule</a></li>
                            <li><a href="/parks">Parks</a></li>
                            <li><a href="/about-me">About Me</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Resources</h4>
                        <ul className={styles.footerLinks}>
                            <li><a href="https://www.acsd1.org" target="_blank" rel="noopener noreferrer">ACSD #1</a></li>
                            <li><a href="https://www.visitlaramie.org/events/annual-events-and-festivals/" target="_blank" rel="noopener noreferrer">Events</a></li>
                            <li><a href="/summer-camps">Summer Camps</a></li>
                        </ul>
                    </div>
                    <div className={styles.footerSection}>
                        <h4>Support the Hub</h4>
                        <p className={styles.supportText}>Help us keep the Hub running and free for all families.</p>
                        <a 
                            href="https://paypal.me/mookwonseo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.donateBtnFooter}
                            aria-label="Donate with PayPal"
                        >
                            Donate with PayPal
                        </a>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                  <p>&copy; {new Date().getFullYear()} Laramie Community Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
