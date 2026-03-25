'use client';
import { useState, useEffect } from 'react';
import styles from './UpdateNote.module.css';

// ← Change this date whenever you update the site
const LAST_UPDATED = 'March 25, 2026';
const NOTE_TEXT = 'Added a new professional CV section and improved CV synchronization.';

export default function UpdateNote() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Show once per session (hides if already dismissed this session)
        const dismissed = sessionStorage.getItem('updateNoteDismissed');
        if (!dismissed) setVisible(true);
    }, []);

    function dismiss() {
        sessionStorage.setItem('updateNoteDismissed', '1');
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className={styles.note} role="status" aria-live="polite">
            <div className={styles.noteHeader}>
                <span className={styles.noteIcon}>📌</span>
                <span className={styles.noteTitle}>Site Update</span>
                <button className={styles.close} onClick={dismiss} aria-label="Dismiss">✕</button>
            </div>
            <p className={styles.noteBody}>{NOTE_TEXT}</p>
            <p className={styles.noteDate}>Last updated: <strong>{LAST_UPDATED}</strong></p>
        </div>
    );
}
