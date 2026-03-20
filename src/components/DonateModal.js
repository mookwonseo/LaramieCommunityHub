'use client';

import React from 'react';
import styles from './DonateModal.module.css';

export default function DonateModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                    &times;
                </button>
                <div className={styles.modalContent}>
                    <h2>Support Laramie Community Hub</h2>
                    <p>Scan the QR code below to donate via PayPal. Thank you for your support!</p>
                    <div className={styles.qrWrapper}>
                        <img 
                            src="/images/donate-qr.png" 
                            alt="PayPal Donation QR Code" 
                            className={styles.qrImage}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300?text=Scan+QR+to+Donate';
                            }}
                        />
                    </div>
                    <p className={styles.note}>Your donation helps keep this hub free for all families.</p>
                </div>
            </div>
        </div>
    );
}
