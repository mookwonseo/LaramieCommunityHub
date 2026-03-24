import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import styles from './programs.module.css'
import fs from 'fs'
import path from 'path'

export const metadata = {
    title: 'Programs',
    description: 'Explore afterschool programs, youth sports, and music/dance enrichment in Laramie, Wyoming.',
    openGraph: {
        title: 'Programs | Laramie Community Hub',
        description: 'Explore afterschool programs, youth sports, and music/dance enrichment in Laramie, Wyoming.',
        url: 'https://laramiecommunityhub.com/programs',
    },
    twitter: {
        title: 'Programs | Laramie Community Hub',
        description: 'Explore afterschool programs, youth sports, and music/dance enrichment in Laramie, Wyoming.',
    },
}

// ── Parser ──────────────────────────────────────────────────────────────────

function parseProgramsMd(content) {
    const sections = []
    let currentSection = null
    let currentProgram = null
    let lastKey = null
    const lines = content.split('\n')

    const flush = () => {
        if (currentProgram && currentSection) {
            currentSection.programs.push(currentProgram)
            currentProgram = null
            lastKey = null
        }
    }

    for (const raw of lines) {
        const line = raw.trim()
        if (!line || line.startsWith('<!--') || line.startsWith('-->') || line === '---') continue

        if (line.startsWith('# ')) continue  // title

        if (line.startsWith('## ')) {
            flush()
            if (currentSection) sections.push(currentSection)
            currentSection = { name: line.replace('## ', '').trim(), programs: [] }
            continue
        }

        if (line.startsWith('### ')) {
            flush()
            currentProgram = { name: line.replace('### ', '').trim(), fields: {} }
            continue
        }

        // Bullet line under the last field (e.g. description bullet)
        if (currentProgram && lastKey && line.startsWith('- ')) {
            const value = line.slice(2).trim()
            if (value) {
                if (!Array.isArray(currentProgram.fields[lastKey])) {
                    currentProgram.fields[lastKey] = []
                }
                currentProgram.fields[lastKey].push(value)
            }
            continue
        }

        // Field line: key: value
        if (currentProgram && line.includes(':')) {
            const colon = line.indexOf(':')
            const key = line.slice(0, colon).trim().toLowerCase().replace(/\s+/g, '-')
            const value = line.slice(colon + 1).trim()
            lastKey = key
            if (value) {
                currentProgram.fields[key] = value
            }
            // else: blank value — field declared, bullets may follow
        }
    }

    flush()
    if (currentSection) sections.push(currentSection)
    return sections
}

function loadPrograms() {
    const filePath = path.join(process.cwd(), 'public', 'programs.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    return parseProgramsMd(content)
}

// ── Section icons ───────────────────────────────────────────────────────────

const SECTION_META = {
    'Afterschool Programs': { icon: '🏫', color: '#1a3a6b' },
    'Afterschool Enrichment Sports': { icon: '/icons/sports-section-icon.png', color: '#2e7d32' },
    'Afterschool Enrichment Music/Dance': { icon: '🎵', color: '#6a1b9a' },
}

// ── Component ───────────────────────────────────────────────────────────────

export default function Programs() {
    const sections = loadPrograms()

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1>Afterschool Programs</h1>
                    <p>Find the perfect program for your child — from academic support to sports, arts, and enrichment.</p>
                </div>

                {/* Ad Banner 1 */}
                <div className="container"><AdBanner slot="9029253338" /></div>

                {sections.map(section => {
                    const meta = SECTION_META[section.name] || { icon: '📋', color: '#333' }
                    return (
                        <section key={section.name} className={styles.section}>
                            <div className="container">
                                <div className={styles.sectionHeader} style={{ borderColor: meta.color }}>
                                    {meta.icon.startsWith('/') ? (
                                        <img src={meta.icon} alt={section.name} className={styles.sectionIcon} style={{ width: 40, height: 40, objectFit: 'contain' }} />
                                    ) : (
                                        <span className={styles.sectionIcon}>{meta.icon}</span>
                                    )}
                                    <h2 style={{ color: meta.color }}>{section.name}</h2>
                                </div>

                                <div className={styles.programGrid}>
                                    {section.programs.map(prog => (
                                        <div key={prog.name} className={styles.card}>
                                            {prog.fields.logo && (
                                                <div className={styles.logoWrap}>
                                                    <img
                                                        src={prog.fields.logo}
                                                        alt={`${prog.name} logo`}
                                                        className={styles.logo}
                                                    />
                                                </div>
                                            )}
                                            <h3 className={styles.programName}>{prog.name}</h3>

                                            {prog.fields.description && (
                                                Array.isArray(prog.fields.description) ? (
                                                    <ul className={styles.descList}>
                                                        {prog.fields.description.map((item, i) => (
                                                            <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className={styles.description}>{prog.fields.description}</p>
                                                )
                                            )}

                                            <div className={styles.details}>
                                                {prog.fields.hours && (
                                                    <div className={styles.detailRow}>
                                                        <span className={styles.detailIcon}>🕒</span>
                                                        <span>{prog.fields.hours}</span>
                                                    </div>
                                                )}
                                                {prog.fields.location && (
                                                    <div className={styles.detailRow}>
                                                        <span className={styles.detailIcon}>📍</span>
                                                        <span>{prog.fields.location}</span>
                                                    </div>
                                                )}
                                                {prog.fields.phone && (
                                                    <div className={styles.detailRow}>
                                                        <span className={styles.detailIcon}>📞</span>
                                                        <a href={`tel:${prog.fields.phone.replace(/\D/g, '')}`}>{prog.fields.phone}</a>
                                                    </div>
                                                )}
                                                {prog.fields.email && (
                                                    <div className={styles.detailRow}>
                                                        <span className={styles.detailIcon}>✉️</span>
                                                        <a href={`mailto:${prog.fields.email}`}>{prog.fields.email}</a>
                                                    </div>
                                                )}
                                                {prog.fields.contact && (
                                                    <div className={styles.detailRow}>
                                                        <span className={styles.detailIcon}>👤</span>
                                                        <span>{prog.fields.contact}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.cardLinks}>
                                                {prog.fields.website && (
                                                    <a
                                                        href={prog.fields.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.learnMore}
                                                        style={{ background: meta.color }}
                                                    >
                                                        Learn More →
                                                    </a>
                                                )}
                                                {prog.fields['registration-date-link'] && (
                                                    <a
                                                        href={prog.fields['registration-date-link']}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.learnMore}
                                                        style={{ background: '#e65100' }}
                                                    >
                                                        Registration Dates →
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )
                })}
                {/* Ad Banner 2 */}
                <div className="container"><AdBanner slot="5002378411" /></div>
            </main>
            <Footer />
        </>
    )
}
