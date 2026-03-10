import Header from '@/components/Header'
import Footer from '@/components/Footer'
import fs from 'fs'
import path from 'path'
import styles from './schedule.module.css'

export const metadata = {
    title: 'Schedule | Laramie Community Hub',
    description: 'Monthly calendar of afterschool enrichment sports and music/dance programs in Laramie.',
}

// ── Parser (same as programs page) ──────────────────────────────────────────

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
        if (line.startsWith('# ')) continue
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
        if (currentProgram && lastKey && line.startsWith('- ')) {
            const value = line.slice(2).trim()
            if (value) {
                if (!Array.isArray(currentProgram.fields[lastKey])) currentProgram.fields[lastKey] = []
                currentProgram.fields[lastKey].push(value)
            }
            continue
        }
        if (currentProgram && line.includes(':')) {
            const colon = line.indexOf(':')
            const key = line.slice(0, colon).trim().toLowerCase().replace(/\s+/g, '-')
            const value = line.slice(colon + 1).trim()
            lastKey = key
            if (value) currentProgram.fields[key] = value
        }
    }

    flush()
    if (currentSection) sections.push(currentSection)
    return sections
}

// ── Day parser ───────────────────────────────────────────────────────────────

const DAY_MAP = {
    monday: 1, mon: 1,
    tuesday: 2, tue: 2, tues: 2,
    wednesday: 3, wed: 3,
    thursday: 4, thu: 4, thur: 4, thurs: 4,
    friday: 5, fri: 5,
}

function parseDays(hoursStr) {
    if (!hoursStr) return [1, 2, 3, 4, 5] // default: Mon–Fri
    const lower = hoursStr.toLowerCase()

    // Detect "monday–friday" or "monday-friday" range → all weekdays
    if (/monday[–\-]friday/.test(lower) || /mon[–\-]fri/.test(lower)) return [1, 2, 3, 4, 5]
    // Detect "monday–thursday" range
    if (/monday[–\-]thursday/.test(lower) || /mon[–\-]thu/.test(lower)) return [1, 2, 3, 4]

    // Otherwise scan for individual day mentions
    const found = new Set()
    for (const [token, dayNum] of Object.entries(DAY_MAP)) {
        const re = new RegExp(`\\b${token}\\b`)
        if (re.test(lower)) found.add(dayNum)
    }
    return found.size > 0 ? [...found].sort() : [1, 2, 3, 4, 5]
}

function parseTime(hoursStr) {
    if (!hoursStr) return '3:00–5:30 PM'
    // Try to extract a time range like "3:00–5:30 PM" or "6–7 PM"
    const match = hoursStr.match(/\d{1,2}(?::\d{2})?\s*[–\-]\s*\d{1,2}(?::\d{2})?\s*(?:AM|PM)?/i)
    return match ? match[0] : '3:00–5:30 PM'
}

// ── Calendar helpers ─────────────────────────────────────────────────────────

function buildCalendar(year, month) {
    // month is 0-indexed
    const firstDay = new Date(year, month, 1).getDay() // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const weeks = []
    let currentWeek = Array(firstDay).fill(null)

    for (let d = 1; d <= daysInMonth; d++) {
        currentWeek.push(d)
        if (currentWeek.length === 7) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }
    if (currentWeek.length > 0) {
        while (currentWeek.length < 7) currentWeek.push(null)
        weeks.push(currentWeek)
    }
    return weeks
}

// ── Section config ───────────────────────────────────────────────────────────

const SECTION_CONFIG = {
    'Afterschool Programs': { color: '#1a3a6b', bg: '#e8edf5', label: 'Afterschool' },
    'Afterschool Enrichment Sports': { color: '#2e7d32', bg: '#e8f5e9', label: 'Sports' },
    'Afterschool Enrichment Music/Dance': { color: '#6a1b9a', bg: '#f3e5f5', label: 'Music/Dance' },
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ── Component ────────────────────────────────────────────────────────────────

export default function Schedule() {
    const filePath = path.join(process.cwd(), 'public', 'programs.md')
    const content = fs.readFileSync(filePath, 'utf-8')
    const allSections = parseProgramsMd(content)

    // Only show enrichment sections
    const enrichmentSections = allSections.filter(s => SECTION_CONFIG[s.name])

    // Build event list: { name, days:[1-5], time, color, bg, section, startDate }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const events = []
    const upcomingPrograms = [] // programs not started yet
    for (const section of enrichmentSections) {
        const cfg = SECTION_CONFIG[section.name]
        for (const prog of section.programs) {
            if (!prog.name) continue
            const hoursStr = prog.fields.hours || null
            const days = parseDays(hoursStr)
            const time = parseTime(hoursStr)
            const startDateStr = prog.fields['start-date'] || null
            const startDate = startDateStr ? new Date(startDateStr) : null
            if (startDate && startDate > today) {
                // Not started yet — save for upcoming list
                upcomingPrograms.push({ name: prog.name, startDateStr, color: cfg.color, bg: cfg.bg, section: cfg.label })
                continue
            }
            events.push({ name: prog.name, days, time, color: cfg.color, bg: cfg.bg, section: cfg.label })
        }
    }

    // Current month calendar
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const weeks = buildCalendar(year, month)

    return (
        <>
            <Header />
            <main>
                <div className={styles.hero}>
                    <h1>Program Schedule</h1>
                    <p>Afterschool enrichment sports &amp; music/dance programs — {MONTH_NAMES[month]} {year}</p>
                </div>

                <div className="container">
                    {/* Calendar */}
                    <div className={styles.calendarWrap}>
                        <div className={styles.dayHeaders}>
                            {DAY_LABELS.map(d => <div key={d} className={styles.dayHeader}>{d}</div>)}
                        </div>

                        {weeks.map((week, wi) => (
                            <div key={wi} className={styles.week}>
                                {week.map((day, di) => {
                                    // di: 0=Sun, 1=Mon...5=Fri, 6=Sat
                                    const jsDay = di // 0=Sun,1=Mon...
                                    const isToday = day === now.getDate()
                                    const dayEvents = day ? events.filter(e => e.days.includes(jsDay)) : []

                                    return (
                                        <div
                                            key={di}
                                            className={`${styles.dayCell} ${!day ? styles.empty : ''} ${isToday ? styles.today : ''}`}
                                        >
                                            {day && (
                                                <>
                                                    <span className={styles.dateNum}>{day}</span>
                                                    <div className={styles.eventList}>
                                                        {dayEvents.map((ev, ei) => (
                                                            <div
                                                                key={ei}
                                                                className={styles.eventPill}
                                                                style={{ background: ev.bg, borderLeft: `3px solid ${ev.color}`, color: ev.color }}
                                                                title={`${ev.name} · ${ev.time}`}
                                                            >
                                                                <span className={styles.evName}>{ev.name}</span>
                                                                <span className={styles.evTime}>{ev.time}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Programs */}
                    {upcomingPrograms.length > 0 && (
                        <div className={styles.upcomingWrap}>
                            <h2 className={styles.legendTitle}>Coming Soon</h2>
                            <div className={styles.upcomingGrid}>
                                {upcomingPrograms.map(prog => (
                                    <div key={prog.name} className={styles.legendItem} style={{ borderLeft: `3px solid ${prog.color}`, background: prog.bg }}>
                                        <strong style={{ color: prog.color }}>{prog.name}</strong>
                                        <span>Starting {prog.startDateStr}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Legend */}
                    <div className={styles.legendWrap}>
                        <h2 className={styles.legendTitle}>Programs This Month</h2>
                        <div className={styles.legendGrid}>
                            {Object.entries(SECTION_CONFIG).map(([sectionName, cfg]) => {
                                const section = enrichmentSections.find(s => s.name === sectionName)
                                if (!section) return null
                                return (
                                    <div key={sectionName} className={styles.legendSection}>
                                        <h3 style={{ color: cfg.color }}>{sectionName}</h3>
                                        {section.programs.map(prog => {
                                            const days = parseDays(prog.fields.hours || null)
                                            const time = parseTime(prog.fields.hours || null)
                                            const dayNames = days.map(d => DAY_LABELS[d]).join(', ')
                                            return (
                                                <div key={prog.name} className={styles.legendItem} style={{ borderLeft: `3px solid ${cfg.color}`, background: cfg.bg }}>
                                                    <strong style={{ color: cfg.color }}>{prog.name}</strong>
                                                    <span>{dayNames} · {time}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
