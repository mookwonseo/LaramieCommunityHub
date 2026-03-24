'use client';

import { useEffect } from 'react';
import styles from './AdBanner.module.css';

/**
 * GoogleAdBanner — renders one auto-sized AdSense unit.
 * Usage: <AdBanner slot="XXXXXXXXXX" />
 * If no slot is passed it shows a placeholder in development.
 */
export default function AdBanner({ slot, style = {} }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // AdSense not loaded yet — safe to ignore
        }
    }, []);

    if (!slot) {
        // Dev placeholder so layout is visible without a real slot ID
        return (
            <div className={styles.placeholder}>
                <span>Ad Space</span>
            </div>
        );
    }

    return (
        <div className={styles.adWrapper} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client="ca-pub-2548683738600386"
                data-ad-slot={slot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
