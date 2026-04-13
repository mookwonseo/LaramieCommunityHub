import fs from 'fs'
import path from 'path'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import styles from './summer-camps.module.css'

export const metadata = {
    title: 'Summer Camps 2026',
    description: 'Discover summer camps in and around Laramie, Wyoming for kids of all ages and interests.',
    openGraph: {
        title: 'Summer Camps 2026 | Laramie Community Hub',
        description: 'Discover summer camps in and around Laramie, Wyoming for kids of all ages and interests.',
        url: 'https://laramiecommunityhub.com/summer-camps',
    },
    twitter: {
        title: 'Summer Camps 2026 | Laramie Community Hub',
        description: 'Discover summer camps in and around Laramie, Wyoming for kids of all ages and interests.',
    },
}

function parseSummerCampsMd(content) {
    const camps = []
    const blocks = content.split(/\n---\n/)
    for (const block of blocks) {
        const lines = block.trim().split('\n')
        const nameMatch = lines.find(l => l.startsWith('### '))
        if (!nameMatch) continue
        const name = nameMatch.replace('### ', '').trim()
        const fields = {}
        const highlights = []
        let inHighlights = false
        for (const line of lines) {
            if (line.startsWith('highlights:')) { inHighlights = true; continue }
            if (inHighlights && line.startsWith('- ')) {
                highlights.push(line.replace(/^-\s*/, '').trim())
                continue
            }
            // Stop highlights on any non-bullet line after starting
            if (inHighlights && !line.startsWith('- ') && line.trim() !== '') inHighlights = false
            const m = line.match(/^([\w &]+):\s*(.+)/)
            if (m) fields[m[1].trim().toLowerCase()] = m[2].trim()
        }
        camps.push({ name, ...fields, highlights })
    }
    return camps
}

export default function SummerCamps() {
    const filePath = path.join(process.cwd(), 'public', 'summer-camps.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    const camps = parseSummerCampsMd(content)

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <div className={styles.hero}>
                    <div className={styles.heroEmoji}>☀️</div>
                    <h1>Summer Camps 2026</h1>
                    <p>Find the perfect summer camp in and around Laramie — explore programs for kids of all ages and interests.</p>
                </div>

                <div className="container">
                    {/* Ad Banner 1 */}
                    <AdBanner slot="9029253338" />
                    <div className={styles.campGrid}>
                        {camps.map(camp => (
                            <div key={camp.name} className={styles.campCard}>
                                <div className={styles.cardTop}>
                                    {camp.logo ? (
                                        <div className={styles.logoWrapper}>
                                            <img src={camp.logo} alt="" className={styles.campLogo} />
                                        </div>
                                    ) : (
                                        camp.emoji && <span className={styles.campEmoji}>{camp.emoji}</span>
                                    )}
                                    <h2 className={styles.campName}>{camp.name}</h2>
                                </div>

                                {camp.image && (
                                    <div className={styles.campImageWrapper}>
                                        <img src={camp.image} alt={camp.name} className={styles.campImage} />
                                    </div>
                                )}

                                <div className={styles.meta}>
                                    {camp.dates && (
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaIcon}>📅</span>
                                            <span>{camp.dates}</span>
                                        </div>
                                    )}
                                    {camp.hours && (
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaIcon}>🕐</span>
                                            <span>{camp.hours}</span>
                                        </div>
                                    )}
                                    {camp.location && (
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaIcon}>📍</span>
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(camp.location)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {camp.location}
                                            </a>
                                        </div>
                                    )}
                                    {camp.ages && (
                                        <div className={styles.metaRow}>
                                            <span className={styles.metaIcon}>👦</span>
                                            <span>Ages {camp.ages}</span>
                                        </div>
                                    )}
                                </div>

                                {camp.highlights?.length > 0 && (
                                    <ul className={styles.highlights}>
                                        {camp.highlights.map((h, i) => (
                                            <li key={i}>{h}</li>
                                        ))}
                                    </ul>
                                )}

                                {camp.website && (
                                    <a href={camp.website} target="_blank" rel="noopener noreferrer" className={styles.learnMore}>
                                        Learn More →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Ad Banner 2 */}
                    <AdBanner slot="5002378411" />
                </div>
            </main>
            <Footer />
        </>
    )
}
