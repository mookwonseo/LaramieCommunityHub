'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import DonateModal from './DonateModal';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const [isDonateOpen, setIsDonateOpen] = useState(false);

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

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo}>
                        <img src="/images/logo.png" alt="Laramie Community Hub" className={styles.logoImg} />
                        Laramie Community Hub
                    </Link>
                    <nav className={styles.nav}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button 
                            onClick={() => setIsDonateOpen(true)}
                            className={styles.donateBtn}
                            aria-label="Donate"
                        >
                            Donate
                        </button>
                    </nav>
                </div>
            </div>
            <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
        </header>
    );
}
