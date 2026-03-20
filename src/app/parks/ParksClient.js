'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './parks.module.css'

// Load map only on client (no SSR) to avoid Leaflet window errors
const ParkMap = dynamic(() => import('@/components/ParkMap'), { ssr: false })

export default function ParksClient({ cities }) {
    const [activeCity, setActiveCity] = useState('Laramie')
    const [selectedPark, setSelectedPark] = useState(null)
    const city = cities[activeCity]

    const handleCityChange = (c) => {
        setActiveCity(c)
        setSelectedPark(null)
    }

    return (
        <div className="container">
            {/* City Tabs */}
            <div className={styles.tabs}>
                {Object.keys(cities).map(c => (
                    <button
                        key={c}
                        className={`${styles.tab} ${activeCity === c ? styles.tabActive : ''}`}
                        onClick={() => handleCityChange(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Map */}
            <div className={styles.mapWrap}>
                <ParkMap
                    key={activeCity}
                    parks={city.parks}
                    center={city.center}
                    zoom={city.zoom}
                    selectedPark={selectedPark}
                />
            </div>

            {/* Park Cards */}
            <div className={styles.cardGrid}>
                {city.parks.map(park => (
                    <div
                        key={park.name}
                        className={`${styles.parkCard} ${selectedPark?.name === park.name ? styles.parkCardActive : ''}`}
                        onClick={() => setSelectedPark(park)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className={styles.pin}>📍</span>
                        <div>
                            <strong className={styles.parkName}>{park.name}</strong>
                            <p className={styles.parkDesc}>{park.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
