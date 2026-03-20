'use client'

import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './ThemeParks.module.css';

// Load map only on client
const ParkMap = dynamic(() => import('@/components/ParkMap'), { ssr: false });

export default function ThemeParks({ parks }) {
    const [selectedPark, setSelectedPark] = useState(null);

    if (!parks || parks.length === 0) return null;

    // Convert string lat/lng to numbers for the map
    const mapParks = parks.map(p => ({
        ...p,
        lat: parseFloat(p.lat),
        lng: parseFloat(p.lng)
    }));

    // Center map between the two parks if both exist
    const center = mapParks.length >= 2 
        ? [(mapParks[0].lat + mapParks[1].lat) / 2, (mapParks[0].lng + mapParks[1].lng) / 2]
        : [mapParks[0]?.lat || 41.3114, mapParks[0]?.lng || -105.5911];

    return (
        <section className={styles.themeParks}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionEmoji}>🎢</span>
                <h2>Theme Parks &amp; Fun Centers</h2>
                <p>Laramie's top spots for adrenaline-packed adventure and immersive entertainment.</p>
            </div>

            <div className={styles.mapWrap}>
                <ParkMap
                    parks={mapParks}
                    center={center}
                    zoom={9}
                    selectedPark={selectedPark}
                />
            </div>

            <div className={styles.grid}>
                {mapParks.map((park) => (
                    <div 
                        key={park.name} 
                        className={`${styles.card} ${selectedPark?.name === park.name ? styles.cardActive : ''}`}
                        onClick={() => setSelectedPark(park)}
                    >
                        <div className={styles.cardHeader}>
                            {park.emoji && <span className={styles.emoji}>{park.emoji}</span>}
                            <h3 className={styles.name}>{park.name}</h3>
                        </div>
                        
                        <p className={styles.description}>{park.description}</p>

                        <div className={styles.info}>
                            {park.phone && (
                                <div className={styles.infoRow}>
                                    <span className={styles.icon}>📞</span>
                                    <a href={`tel:${park.phone.replace(/\D/g, '')}`}>{park.phone}</a>
                                </div>
                            )}
                            {park.email && (
                                <div className={styles.infoRow}>
                                    <span className={styles.icon}>✉️</span>
                                    <a href={`mailto:${park.email}`}>{park.email}</a>
                                </div>
                            )}
                            {park.location && (
                                <div className={styles.infoRow}>
                                    <span className={styles.icon}>📍</span>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(park.location)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {park.location}
                                    </a>
                                </div>
                            )}
                        </div>

                        {park.website && (
                            <a href={park.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Visit Website →
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
