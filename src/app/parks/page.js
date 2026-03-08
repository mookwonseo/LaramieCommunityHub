import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { parks } from '@/data/content'
import styles from './parks.module.css'

export const metadata = {
    title: 'Parks | Laramie Community Hub',
    description: 'Discover parks and playgrounds in Laramie for family fun and outdoor activities.',
}

export default function Parks() {
    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Laramie Parks & Playgrounds</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Explore Laramie's beautiful parks perfect for family outings, picnics, and outdoor play.
                    </p>

                    <div className={styles.parkGrid}>
                        {parks.map(park => (
                            <div key={park.id} className="card">
                                <div className={styles.parkImage}>
                                    <div className={styles.imagePlaceholder}>
                                        🏞️
                                    </div>
                                </div>
                                <h3>{park.name}</h3>
                                <p className="text-muted mb-md">{park.description}</p>
                                <div className={styles.amenities}>
                                    <strong>Amenities:</strong>
                                    <div className={styles.amenityTags}>
                                        {park.amenities.map((amenity, index) => (
                                            <span key={index} className={styles.amenityTag}>
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
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
