'use client'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './schedule.module.css'

// ── Time constants ─────────────────────────────────────────────────────────
const T_START = 14 * 60       // 2:00 PM
const T_END = 20.5 * 60    // 8:30 PM
const HOUR_PX = 90
const TOTAL_H = (T_END - T_START) / 60 * HOUR_PX

function toMin(s) {
    const [h, m] = s.split(':').map(Number)
    return h * 60 + (m || 0)
}
function toPx(min) { return (min - T_START) / 60 * HOUR_PX }
function durPx(s, e) { return (e - s) / 60 * HOUR_PX }

// ── Category config ────────────────────────────────────────────────────────
const CAT = {
    Afterschool: { color: '#1a3a6b', bg: '#dce5f5', label: 'Afterschool', icon: '🏫' },
    Sports: { color: '#1b6e2e', bg: '#d4edda', label: 'Sports', icon: '🏃' },
    'Music/Dance': { color: '#6a1b9a', bg: '#eddcf7', label: 'Music / Dance', icon: '🎵' },
}

// ── Timed programs ─────────────────────────────────────────────────────────
const TIMED = [
    // Afterschool
    { name: 'LEAF', short: 'LEAF', days: [1, 2, 3, 4, 5], start: '14:30', end: '18:00', cat: 'Afterschool', url: 'https://leaf.wyokids.org/' },
    { name: 'Adventure Kids', short: 'Adv. Kids', days: [1, 2, 3, 4, 5], start: '15:00', end: '17:30', cat: 'Afterschool', url: 'https://www.cityoflaramie.org/1079/Adventure-Kids' },
    { name: 'Laramie Montessori / SOAR', short: 'SOAR', days: [1, 2, 3, 4], start: '15:00', end: '17:30', cat: 'Afterschool', url: 'https://www.bbbswyo.org' },
    { name: 'LEAP Ninja Warrior', short: 'LEAP Ninja', days: [1, 2, 3, 4, 5], start: '15:00', end: '17:30', cat: 'Afterschool', url: 'https://www.leapwyo.com/after-school-program' },
    // Sports – Martial arts
    { name: 'Kids BJJ (Ages 7–9)', short: 'BJJ 7–9', days: [1, 3], start: '16:00', end: '17:00', cat: 'Sports', url: 'https://www.thirdwayjiujitsu.com/', note: 'Waitlist' },
    { name: 'Kids BJJ (Ages 10–14)', short: 'BJJ 10–14', days: [2, 4], start: '16:00', end: '17:00', cat: 'Sports', url: 'https://www.thirdwayjiujitsu.com/', note: 'Waitlist' },
    { name: 'Advanced Kids BJJ', short: 'Adv. BJJ', days: [5], start: '16:00', end: '17:00', cat: 'Sports', url: 'https://www.thirdwayjiujitsu.com/' },
    { name: 'Laramie Kempo Karate', short: 'Kempo', days: [1, 3], start: '18:00', end: '19:00', cat: 'Sports', url: 'https://laramiekempo.com/' },
    { name: 'Kickboxing', short: 'Kickboxing', days: [1, 3, 5], start: '18:30', end: '20:00', cat: 'Sports', url: 'https://www.thirdwayjiujitsu.com/', note: '7th grade+' },
    { name: 'Taekwondo', short: 'Taekwondo', days: [1, 4], start: '18:30', end: '20:00', cat: 'Sports', url: 'http://www.laramiedancecenter.com/taekwondo/' },
    { name: 'Taekwondo (Intro)', short: 'TKD Intro', days: [3], start: '17:30', end: '18:00', cat: 'Sports', url: 'http://www.laramiedancecenter.com/taekwondo/', note: 'White belt' },
    // Sports – Rec Center (seasonal) — startDate/endDate control auto-hide
    { name: 'MLS GO Soccer (K–2nd)', short: 'Soccer K–2', days: [1, 3], start: '16:00', end: '17:00', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 13–May 20', startDate: '2026-04-13', endDate: '2026-05-20' },
    { name: 'MLS GO Soccer (3rd–4th)', short: 'Soccer 3–4', days: [1, 3], start: '16:30', end: '17:30', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 13–May 20', startDate: '2026-04-13', endDate: '2026-05-20' },
    { name: 'MLS GO Soccer (5th–7th)', short: 'Soccer 5–7', days: [1, 3], start: '17:30', end: '18:30', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 13–May 20', startDate: '2026-04-13', endDate: '2026-05-20' },
    { name: 'Little Kickers (3–4)', short: 'Kickers 3–4', days: [2], start: '16:30', end: '17:15', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 14–May 19', startDate: '2026-04-14', endDate: '2026-05-19' },
    { name: 'Little Kickers (4–5)', short: 'Kickers 4–5', days: [2], start: '17:30', end: '18:15', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 14–May 19', startDate: '2026-04-14', endDate: '2026-05-19' },
    { name: 'Jr. Jackalopes Track (5–6)', short: 'Track 5–6', days: [2, 4], start: '17:00', end: '18:15', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 28–Jun 6', startDate: '2026-04-28', endDate: '2026-06-06' },
    { name: 'Track & Field (7–12)', short: 'Track 7–12', days: [2, 4], start: '17:00', end: '18:15', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 28–Jun 6', startDate: '2026-04-28', endDate: '2026-06-06' },
    { name: 'Swim Lessons', short: '🏊 Swim', days: [2, 4], start: '17:50', end: '19:00', cat: 'Sports', url: 'https://cityoflaramie.org/184/Youth-Sports-Leagues-Activities', dates: 'Apr 7–Apr 30', startDate: '2026-04-07', endDate: '2026-04-30', note: 'Multi-level' },
]

// ── Flexible programs (no fixed time) ─────────────────────────────────────
const FLEX = [
    { name: 'Basic Beginning', cat: 'Afterschool', note: 'Before & after school, Mon–Fri · K–6', url: 'https://basicbeginningsinc.com/' },
    { name: 'Abundance Creative Arts', cat: 'Afterschool', note: 'Mobile – travels to schools', url: 'https://www.abundancecreativearts.com/' },
    { name: 'Laramie Swim Club Beavers', cat: 'Sports', note: 'Competitive swim · seasonal schedule', url: 'https://www.teamunify.com/team/wybeavers/page/home' },
    { name: 'Ice Hockey', cat: 'Sports', note: 'Seasonal · all skill levels', url: 'https://laramiehockey.usahockey.com/' },
    { name: 'Laramie Fire Basketball', cat: 'Sports', note: 'Starting Apr 1, 2026', url: 'https://www.facebook.com/p/Laramie-Fire-Youth-Basketball-100057039177068/' },
    { name: 'Laramie Dance & Art Center', cat: 'Music/Dance', note: 'Ballet, Jazz, Tap, Hip-Hop, Modern', url: 'http://www.laramiedancecenter.com/' },
    { name: 'Dance Studio B', cat: 'Music/Dance', note: 'All ages · drop-in or monthly', url: 'https://www.dancestudioblaramie.com/' },
    { name: 'Abundance Creative Arts', cat: 'Music/Dance', note: 'Arts, music, dance & yoga', url: 'https://www.abundancecreativearts.com/' },
    { name: 'Laramie Cello Academy', cat: 'Music/Dance', note: 'Youth cello · UW Cello Festival', url: 'https://www.facebook.com/LaramieCelloAcademy' },
]

const COMING_SOON = [
    { name: 'Laramie Soccer Club', note: 'Season dates TBD', url: 'https://laramiesoccer.org/' },
    { name: 'Laramie Youth Baseball', note: 'Season TBD · typically April–June', url: 'https://laramieyouthbaseball.com/' },
]

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const CATS = ['All', 'Afterschool', 'Sports', 'Music/Dance']

// Build grid lines
const GRID_LINES = []
for (let m = T_START; m < T_END; m += 30) {
    GRID_LINES.push({ top: toPx(m), isHour: m % 60 === 0 })
}
// Build time axis labels
const TIME_LABELS = []
for (let m = T_START; m <= T_END; m += 60) {
    const h = Math.floor(m / 60)
    TIME_LABELS.push({ text: `${h > 12 ? h - 12 : h} ${h >= 12 ? 'PM' : 'AM'}`, top: toPx(m) })
}

// Overlap layout: greedy column packing
function layoutDay(progs) {
    const sorted = [...progs].sort((a, b) => a.sMin - b.sMin)
    const colEnds = []
    const res = sorted.map(b => {
        let col = colEnds.findIndex(e => e <= b.sMin)
        if (col === -1) { col = colEnds.length; colEnds.push(0) }
        colEnds[col] = b.eMin
        return { ...b, _col: col }
    })
    res.forEach(b => {
        let max = b._col
        res.forEach(o => { if (o !== b && o.sMin < b.eMin && o.eMin > b.sMin) max = Math.max(max, o._col) })
        b._ncols = max + 1
    })
    return res
}

// ── Date helpers ─────────────────────────────────────────────────────────────
function daysUntil(dateStr, today) {
    return Math.ceil((new Date(dateStr) - today) / 86400000)
}

// ── Main component ─────────────────────────────────────────────────────────
export default function Schedule() {
    const [filter, setFilter] = useState('All')
    const [today, setToday] = useState(null)

    // Set today client-side to avoid SSR hydration mismatch
    useEffect(() => { setToday(new Date()) }, [])

    const filtered = TIMED.filter(p => {
        if (filter !== 'All' && p.cat !== filter) return false
        if (!today) return true                                    // SSR: show all
        if (p.endDate && new Date(p.endDate) < today) return false // auto-hide expired
        return true
    })
    const flexFiltered = FLEX.filter(p => filter === 'All' || p.cat === filter)

    // Build per-day blocks
    const dayBlocks = [1, 2, 3, 4, 5].map(day => {
        const progs = filtered
            .filter(p => p.days.includes(day))
            .map(p => ({ ...p, sMin: toMin(p.start), eMin: toMin(p.end) }))
        return layoutDay(progs)
    })

    return (
        <>
            <Header />
            <main>
                <div className={styles.hero}>
                    <h1>Program Schedule</h1>
                    <p>Weekly view of all Laramie youth programs — click any block for details</p>
                </div>

                <div className="container">
                    {/* Coming Soon */}
                    <div className={styles.comingSoon}>
                        <span className={styles.comingLabel}>⏳ Coming Soon</span>
                        {COMING_SOON.map(p => (
                            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.comingPill}>
                                {p.name} <span className={styles.comingNote}>{p.note}</span>
                            </a>
                        ))}
                    </div>

                    {/* Filter bar */}
                    <div className={styles.filterBar}>
                        {CATS.map(c => (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className={`${styles.filterBtn} ${filter === c ? styles.filterActive : ''}`}
                                style={filter === c && c !== 'All' ? { background: CAT[c]?.color, borderColor: CAT[c]?.color } : {}}
                            >
                                {c !== 'All' && <span>{CAT[c]?.icon} </span>}
                                {c === 'All' ? 'All Programs' : CAT[c]?.label}
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className={styles.legend}>
                        {Object.entries(CAT).map(([k, v]) => (
                            <span key={k} className={styles.legendItem}>
                                <span className={styles.legendDot} style={{ background: v.color }} />
                                {v.label}
                            </span>
                        ))}
                        <span className={styles.legendItem}>
                            <span className={styles.legendDot} style={{ background: '#ccc', border: '1px dashed #999' }} />
                            Dates listed = seasonal
                        </span>
                    </div>

                    {/* Calendar grid */}
                    <div className={styles.calWrap}>
                        {/* Day headers */}
                        <div className={styles.calHead}>
                            <div className={styles.timeGutter} />
                            {DAY_LABELS.map(d => (
                                <div key={d} className={styles.dayHead}>{d}</div>
                            ))}
                        </div>

                        {/* Grid body */}
                        <div className={styles.calBody}>
                            {/* Time axis */}
                            <div className={styles.timeAxis}>
                                {TIME_LABELS.map(l => (
                                    <span key={l.text} className={styles.timeLabel} style={{ top: l.top }}>
                                        {l.text}
                                    </span>
                                ))}
                            </div>

                            {/* Day columns */}
                            {dayBlocks.map((blocks, di) => (
                                <div key={di} className={styles.dayCol} style={{ height: TOTAL_H }}>
                                    {/* Grid lines */}
                                    {GRID_LINES.map((gl, gi) => (
                                        <div
                                            key={gi}
                                            className={gl.isHour ? styles.hourLine : styles.halfLine}
                                            style={{ top: gl.top }}
                                        />
                                    ))}

                                    {/* Program blocks */}
                                    {blocks.map((b, bi) => {
                                        const cfg = CAT[b.cat]
                                        const top = toPx(b.sMin)
                                        const height = Math.max(durPx(b.sMin, b.eMin) - 3, 18)
                                        const w = `calc(${100 / b._ncols}% - 4px)`
                                        const left = `calc(${(100 / b._ncols) * b._col}% + 2px)`
                                        return (
                                            <a
                                                key={bi}
                                                href={b.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={styles.block}
                                                style={{
                                                    top, height, width: w, left,
                                                    background: cfg.bg,
                                                    borderLeft: `3px solid ${cfg.color}`,
                                                    color: cfg.color,
                                                }}
                                                title={`${b.name}${b.dates ? ' · ' + b.dates : ''}${b.note ? ' · ' + b.note : ''}`}
                                            >
                                                <span className={styles.blockName}>{b.short}</span>
                                                {b.startDate && today && new Date(b.startDate) > today ? (
                                                    <span className={styles.blockUpcoming}>
                                                        Starts in {daysUntil(b.startDate, today)}d
                                                    </span>
                                                ) : (
                                                    b.dates && height > 36 && (
                                                        <span className={styles.blockSub}>{b.dates}</span>
                                                    )
                                                )}
                                                {b.note && height > 50 && (
                                                    <span className={styles.blockNote}>{b.note}</span>
                                                )}
                                            </a>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Flexible schedule programs */}
                    {flexFiltered.length > 0 && (
                        <div className={styles.flexSection}>
                            <h2 className={styles.flexTitle}>📋 Flexible Schedule</h2>
                            <p className={styles.flexSub}>Contact provider for current days &amp; times</p>
                            <div className={styles.flexGrid}>
                                {flexFiltered.map((p, i) => {
                                    const cfg = CAT[p.cat]
                                    return (
                                        <a
                                            key={i}
                                            href={p.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.flexCard}
                                            style={{ borderLeft: `4px solid ${cfg.color}` }}
                                        >
                                            <span className={styles.flexIcon}>{cfg.icon}</span>
                                            <span className={styles.flexName}>{p.name}</span>
                                            <span className={styles.flexNote}>{p.note}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
