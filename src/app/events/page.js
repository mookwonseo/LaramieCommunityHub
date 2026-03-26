import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './events.module.css';

export const dynamic = 'force-dynamic';

function parseEventsMd(content) {
    const lines = content.split('\n');
    const events = [];
    let currentEvent = null;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        if (trimmed.startsWith('## ')) {
            if (currentEvent) events.push(currentEvent);
            currentEvent = {
                title: trimmed.replace('## ', '').trim(),
                date: '',
                location: '',
                image: '',
                description: '',
                website: ''
            };
        } else if (currentEvent) {
        if (trimmed.startsWith('## ')) {
            if (currentEvent) events.push(currentEvent);
            currentEvent = {
                title: trimmed.replace('## ', '').trim(),
                date: '',
                location: '',
                image: '',
                description: '',
                website: ''
            };
        } else if (currentEvent) {
            const colonIndex = trimmed.indexOf(':');
            if (colonIndex !== -1) {
                const key = trimmed.substring(0, colonIndex).trim().toLowerCase();
                const value = trimmed.substring(colonIndex + 1).trim();
                
                if (key === 'date') currentEvent.date = value;
                else if (key === 'location') currentEvent.location = value;
                else if (key === 'image') currentEvent.image = value;
                else if (key === 'description') currentEvent.description = value;
                else if (key === 'website') currentEvent.website = value;
            }
        }
        }
    }
    if (currentEvent) events.push(currentEvent);
    return events;
}

export default async function EventsPage() {
    const filePath = path.join(process.cwd(), 'public/events/events.md');
    let events = [];
    
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        events = parseEventsMd(fileContent);

        // Sort events by date
        events.sort((a, b) => {
            const parseFirstDate = (dateStr) => {
                if (!dateStr) return new Date(8640000000000000); // Far future
                // Extract "Month Day, Year" or "Month Day-Day, Year"
                // For simplicity, we search for the first month and day mentioned
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                const monthMatch = dateStr.match(/(January|February|March|April|May|June|July|August|September|October|November|December)/i);
                if (!monthMatch) return new Date(8640000000000000);
                
                const monthIndex = months.findIndex(m => m.toLowerCase() === monthMatch[0].toLowerCase());
                const dayMatch = dateStr.match(/\d+/);
                const yearMatch = dateStr.match(/\d{4}/);
                
                const day = dayMatch ? parseInt(dayMatch[0]) : 1;
                const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear();
                
                return new Date(year, monthIndex, day);
            };

            return parseFirstDate(a.date) - parseFirstDate(b.date);
        });
    } catch (error) {
        console.error('Error loading events:', error);
    }

    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Events in Laramie</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Discover what's happening in our vibrant community. From festivals to local gatherings, find all the details here.
                    </p>

                    <div className={styles.eventsGrid}>
                        {events.map((event, index) => (
                            <div key={index} className={`card ${styles.eventCard}`}>
                                {event.image && (
                                    <div className={styles.eventImage}>
                                        <img src={event.image} alt={event.title} />
                                    </div>
                                )}
                                <div className={styles.eventContent}>
                                    <h3 className={styles.eventTitle}>{event.title}</h3>
                                    <div className={styles.eventMeta}>
                                        {event.date && <span className={styles.eventDate}>📅 {event.date}</span>}
                                        {event.location && <span className={styles.eventLocation}>📍 {event.location}</span>}
                                    </div>
                                    <p className={styles.eventDescription}>{event.description}</p>
                                    
                                    {event.website && (
                                        <div className={styles.eventAction}>
                                            <a 
                                                href={event.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="btn btn-primary"
                                                style={{ marginTop: 'var(--spacing-md)', fontSize: '0.9rem' }}
                                            >
                                                Learn More →
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {events.length === 0 && (
                        <div className="text-center py-xl">
                            <p className="text-muted">No events found. Check back soon!</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
