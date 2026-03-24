import fs from 'fs'
import path from 'path'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import styles from './birthday.module.css'

export const metadata = {
    title: 'Birthday Party Venues',
    description: 'Find the perfect birthday party venue in Laramie, Wyoming for your child — from inflatables to sports, arts, and more.',
    openGraph: {
        title: 'Birthday Party Venues | Laramie Community Hub',
        description: 'Find the perfect birthday party venue in Laramie, Wyoming for your child.',
        url: 'https://laramiecommunityhub.com/birthday-party',
    },
    twitter: {
        title: 'Birthday Party Venues | Laramie Community Hub',
        description: 'Find the perfect birthday party venue in Laramie, Wyoming for your child.',
    },
}

function parseBirthdayMd(content) {
    const venues = []
    // Split on --- separators or ### headings
    const blocks = content.split(/\n---\n/)
    for (const block of blocks) {
        const lines = block.trim().split('\n')
        const nameMatch = lines.find(l => l.startsWith('### '))
        if (!nameMatch) continue
        const name = nameMatch.replace('### ', '').trim()
        const fields = {}
        for (const line of lines) {
            const m = line.match(/^(\w+[\w\s-]*):\s*(.+)/)
            if (m) fields[m[1].trim().toLowerCase()] = m[2].trim()
        }
        venues.push({ name, ...fields })
    }
    return venues
}

export default function BirthdayParty() {
    const filePath = path.join(process.cwd(), 'public', 'birthday-parties.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    const venues = parseBirthdayMd(content)

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <div className={styles.hero}>
                    <div className={styles.heroEmoji}>🎂</div>
                    <h1>Birthday Party Venues</h1>
                    <p>Looking for a great place to celebrate in Laramie? Here are the top spots for fun, easy, and stress-free parties.</p>
                </div>

                <div className="container">
                    {/* Ad Banner 1 */}
                    <AdBanner slot="9029253338" />
                    <div className={styles.venueGrid}>
                        {venues.map(venue => (
                            <div key={venue.name} className={styles.venueCard}>
                                {venue.logo ? (
                                    <div className={styles.venueLogoWrapper}>
                                        <img src={venue.logo} alt={`${venue.name} logo`} className={styles.venueLogo} />
                                    </div>
                                ) : (
                                    venue.emoji && <div className={styles.venueEmoji}>{venue.emoji}</div>
                                )}
                                <h2 className={styles.venueName}>{venue.name}</h2>
                                {venue.description && <p className={styles.venueDesc}>{venue.description}</p>}

                                <div className={styles.details}>
                                    {venue.phone && (
                                        <div className={styles.detailRow}>
                                            <span>📞</span>
                                            <a href={`tel:${venue.phone.replace(/\D/g, '')}`}>{venue.phone}</a>
                                        </div>
                                    )}
                                    {venue.email && (
                                        <div className={styles.detailRow}>
                                            <span>✉️</span>
                                            <a href={`mailto:${venue.email}`}>{venue.email}</a>
                                        </div>
                                    )}
                                    {venue.location && (
                                        <div className={styles.detailRow}>
                                            <span>📍</span>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {venue.location}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {venue.website && (
                                    <a href={venue.website} target="_blank" rel="noopener noreferrer" className={styles.learnMore}>
                                        Learn More →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Tips Banner */}
                    <div className={styles.tipsBanner}>
                        <span className={styles.tipsEmoji}>💡</span>
                        <p><strong>Planning Tip:</strong> Book venues 4–6 weeks in advance, especially for weekends. Many venues offer package deals that include decorations, food, and activities.</p>
                    </div>
                    {/* Ad Banner 2 */}
                    <AdBanner slot="5002378411" />
                </div>
            </main>
            <Footer />
        </>
    )
}
