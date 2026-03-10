'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './parks.module.css'

// Load map only on client (no SSR) to avoid Leaflet window errors
const ParkMap = dynamic(() => import('@/components/ParkMap'), { ssr: false })

const CITIES = {
    Laramie: {
        center: [41.3114, -105.5911],
        zoom: 13,
        parks: [
            { name: 'LaBonte Park', lat: 41.3063, lng: -105.5762, description: 'Skate park, soccer/softball fields, playgrounds, and picnic shelters' },
            { name: 'Scout Park', lat: 41.3170, lng: -105.5850, description: 'Open fields, walking path, playground, and picnic tables' },
            { name: 'Kiowa Park', lat: 41.3220, lng: -105.5780, description: 'Modern playground, synthetic turf, and open space for play' },
            { name: 'Optimist Park', lat: 41.3080, lng: -105.6010, description: 'River Greenbelt trails, picnic tables, and relaxing waterfront views' },
            { name: 'Washington Park', lat: 41.3140, lng: -105.5870, description: 'Playgrounds, tennis courts, picnic shelters, and mature trees' },
            { name: 'Undine Park', lat: 41.3200, lng: -105.5920, description: 'Playground, seasonal splash pad, athletic courts, and shaded picnic areas' },
            { name: 'Harbon Park', lat: 41.3250, lng: -105.5830, description: 'Small neighborhood park with playground and open green space' },
            { name: 'LaPrele Park', lat: 41.3010, lng: -105.5950, description: "Huck Finn Kids' Fishing Pond, playground, and family picnic areas" },
            { name: 'Kiwanis Park', lat: 41.3300, lng: -105.5900, description: 'Grassy areas, playground, picnic tables, and plenty of shade trees' },
        ],
    },
    Cheyenne: {
        center: [41.1400, -104.8200],
        zoom: 12,
        parks: [
            { name: 'Lion Park', lat: 41.1553, lng: -104.8266, description: 'Walking paths, paddle boating, fishing, and Botanic Gardens access' },
            { name: 'Cheyenne Botanic Garden', lat: 41.1560, lng: -104.8240, description: 'Gardens, conservatory, walking paths, and educational exhibits' },
            { name: 'Holliday Park', lat: 41.1380, lng: -104.8350, description: 'Grassy areas, playgrounds, and the famous Big Boy Steam Engine display' },
            { name: 'Mylar Park', lat: 41.1200, lng: -104.8100, description: 'Fishing lake, open lawns, playground, and walking paths' },
            { name: 'Cahill Park', lat: 41.1450, lng: -104.7950, description: 'Playgrounds, soccer fields, and picnic spaces for families' },
            { name: 'Curt Gowdy State Park', lat: 41.1820, lng: -105.1670, description: 'Mountain trails, reservoirs for fishing and boating, and scenic views' },
            { name: 'Clear Creek Park', lat: 41.1300, lng: -104.8050, description: 'Open grassy space, playground, and walking path' },
        ],
    },
    'Fort Collins': {
        center: [40.5853, -105.0844],
        zoom: 12,
        parks: [
            { name: 'City Park', lat: 40.5730, lng: -105.0940, description: 'Historic park with lawns, athletic fields, tennis courts, and playground' },
            { name: 'Edora Park', lat: 40.5680, lng: -105.0600, description: 'Skate park, sports fields, disc golf, and Spring Creek trail access' },
            { name: 'Fossil Creek Park', lat: 40.5050, lng: -105.0700, description: 'Splash pad, skate park, fishing pond, and wide open spaces' },
            { name: 'Rolland Moore Park', lat: 40.5600, lng: -105.1100, description: 'Sports fields, tennis courts, playground, and Spring Creek Trail access' },
            { name: 'Spring Canyon Park', lat: 40.5580, lng: -105.1350, description: 'Playground, splash pad, courts, and natural open areas' },
            { name: 'Twin Silo Park', lat: 40.5300, lng: -105.0400, description: 'Iconic twin silos, massive playground, gardens, and bike trails' },
            { name: 'Avery Park', lat: 40.5780, lng: -105.0880, description: 'Splash pad, playground, and shady picnic spots near CSU' },
            { name: 'Lee Martinez Park', lat: 40.6020, lng: -105.0880, description: 'Playgrounds, The Farm attraction, and Poudre River Trail access' },
            { name: 'Horsetooth Mountain Open Space', lat: 40.5280, lng: -105.1700, description: 'Scenic hiking, mountain views, and the iconic Horsetooth Rock' },
            { name: 'Lory State Park', lat: 40.6050, lng: -105.1700, description: 'Hiking, mountain biking, and horseback riding near Horsetooth Reservoir' },
        ],
    },
}

export default function Parks() {
    const [activeCity, setActiveCity] = useState('Laramie')
    const [selectedPark, setSelectedPark] = useState(null)
    const city = CITIES[activeCity]

    const handleCityChange = (c) => {
        setActiveCity(c)
        setSelectedPark(null)
    }

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1>Parks &amp; Playgrounds</h1>
                    <p>Explore parks in Laramie, Cheyenne, and Fort Collins — click a pin to learn more!</p>
                </div>

                <div className="container">
                    {/* City Tabs */}
                    <div className={styles.tabs}>
                        {Object.keys(CITIES).map(c => (
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
            </main>
            <Footer />
        </>
    )
}
