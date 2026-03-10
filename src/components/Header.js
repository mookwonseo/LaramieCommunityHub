'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Programs', path: '/programs' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Parks', path: '/parks' },
        { name: 'Birthday Party', path: '/birthday-party' },
        // { name: 'Upcoming Events', path: '/upcoming-events' }, // hidden — uncomment to re-enable
        { name: 'Summer Camps', path: '/summer-camps' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo}>
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
                    </nav>
                </div>
            </div>
        </header>
    );
}
