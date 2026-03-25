'use client';

import styles from '@/app/about-me/cv/CV.module.css';

export default function CVClient() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <button onClick={handlePrint} className={styles.printButton}>
            Print/Save PDF
        </button>
    );
}
