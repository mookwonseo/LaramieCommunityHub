'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Programs', path: '/programs' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Parks', path: '/parks' },
        { name: 'Birthday Party', path: '/birthday-party' },
        { name: 'Summer Camps', path: '/summer-camps' },
        { name: 'Forum', path: '/forum' },
        { name: 'Contact', path: '/contact' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo} onClick={closeMenu}>
                        <img src="/images/logo.png" alt="Laramie Community Hub" className={styles.logoImg} />
                        <span className={styles.logoText}>Laramie Community Hub</span>
                    </Link>

                    <button 
                        className={styles.hamburger} 
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ''}`}></span>
                        <span className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ''}`}></span>
                        <span className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ''}`}></span>
                    </button>

                    <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                                onClick={closeMenu}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <a 
                        href="https://paypal.me/mookwonseo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.donateBtn}
                        aria-label="Donate"
                        onClick={closeMenu}
                    >
                        Donate
                    </a>
                </div>
            </div>
        </header>
    );
}
