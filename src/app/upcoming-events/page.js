import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { events } from '@/data/content'
import styles from './events.module.css'

export const metadata = {
    title: 'Upcoming Events | Laramie Community Hub',
    description: 'Stay updated on upcoming community events in Laramie.',
}

export default function UpcomingEvents() {
    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Upcoming Events</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Don't miss these exciting community events happening in Laramie!
                    </p>

                    <div className={styles.eventsList}>
                        {events.map(event => (
                            <div key={event.id} className="card">
                                <div className={styles.eventHeader}>
                                    <div>
                                        <h3>{event.title}</h3>
                                        <div className={styles.eventMeta}>
                                            <span>📅 {event.date}</span>
                                            <span>📍 {event.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-muted">{event.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="card text-center mt-xl">
                        <h3>Stay Connected</h3>
                        <p className="text-muted">
                            Want to stay updated on new events? Follow us on social media or check back regularly for updates.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
