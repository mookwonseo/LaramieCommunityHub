import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SchoolCalendar from '@/components/SchoolCalendar'
import UpdateNote from '@/components/UpdateNote'
import AdBanner from '@/components/AdBanner'
import styles from './page.module.css'
import fs from 'fs'
import path from 'path'

export const metadata = {
    title: 'Find Youth Programs & Family Resources in Laramie, WY',
    description: "Discover Laramie's best afterschool programs, summer camps, parks, and family events — all in one place.",
    openGraph: {
        title: 'Laramie Community Hub',
        description: "Discover Laramie's best afterschool programs, summer camps, parks, and family resources.",
        url: 'https://laramiecommunityhub.com',
    },
    twitter: {
        title: 'Laramie Community Hub',
        description: "Discover Laramie's best afterschool programs, summer camps, parks, and family resources.",
    },
}

// Category config: color and icon per section heading
const CATEGORY_CONFIG = {
    'No School': { color: 'yellow', icon: 'rect' },
    'No School – Staff Development': { color: 'green', icon: 'rect' },
    'Early Release – All Students': { color: 'purple', icon: 'rect' },
    'Early Release – Elementary Only': { color: 'red', icon: 'rect' },
    'Parent Teacher Conferences': { color: 'orange', icon: 'triangle' },
    'New Teacher Orientation': { color: 'pink', icon: 'rect' },
    'Last Day for Teachers': { color: 'blue', icon: 'rect' },
};

function parseCalendarMd(mdContent) {
    const lines = mdContent.split('\n');
    const categories = [];
    let currentCategory = null;

    for (const rawLine of lines) {
        const line = rawLine.trim();

        // Skip the title or blank lines or comments
        if (!line || line.startsWith('#!') || line.startsWith('<!--') || line.startsWith('-->')) continue;

        // Section heading
        if (line.startsWith('## ')) {
            const name = line.replace('## ', '').trim();
            const config = CATEGORY_CONFIG[name] || { color: 'gray', icon: 'rect' };
            currentCategory = { name, color: config.color, icon: config.icon, dates: [] };
            categories.push(currentCategory);
            continue;
        }

        // Skip metadata lines (color:, icon:) inside a section
        if (line.startsWith('color:') || line.startsWith('icon:')) continue;

        // Date item
        if (line.startsWith('- ') && currentCategory) {
            // Extract fullDate from (YYYY-MM-DD)
            const fullDateMatch = line.match(/\((\d{4}-\d{2}-\d{2})\)/);
            const fullDate = fullDateMatch ? fullDateMatch[1] : null;
            // Strip the parenthesized date from display text
            const display = line.replace(/^-\s*/, '').replace(/\s*\(\d{4}-\d{2}-\d{2}\)/, '').trim();
            currentCategory.dates.push({ display, fullDate });
        }
    }

    // Mark the next upcoming date in each category
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const cat of categories) {
        let minDiff = Infinity;
        let upcomingIdx = -1;
        cat.dates.forEach((item, idx) => {
            if (!item.fullDate) return;
            const d = new Date(item.fullDate + 'T12:00:00'); // noon to avoid TZ shifts
            if (d >= today) {
                const diff = d - today;
                if (diff < minDiff) { minDiff = diff; upcomingIdx = idx; }
            }
        });
        cat.dates = cat.dates.map((item, idx) => ({ ...item, isUpcoming: idx === upcomingIdx }));
    }

    return categories;
}

function loadCalendar() {
    const filePath = path.join(process.cwd(), 'public', 'school-calendar.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    return parseCalendarMd(content);
}

// Format a fullDate string (YYYY-MM-DD) as "Mon DD" e.g. "Dec 22"
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function fmtDate(fullDate) {
    if (!fullDate) return '';
    const [, m, d] = fullDate.split('-');
    return `${SHORT_MONTHS[parseInt(m, 10) - 1]} ${parseInt(d, 10)}`;
}

// Group consecutive entries that share the same event label into range rows
// Returns [{ label, startDate, endDate, isUpcoming }]
function groupDatesIntoRanges(dates) {
    if (!dates.length) return [];
    const groups = [];
    let cur = { ...dates[0], endDate: dates[0].fullDate };

    for (let i = 1; i < dates.length; i++) {
        const item = dates[i];
        // Same label AND consecutive calendar day?
        const curEnd = new Date(cur.endDate + 'T12:00:00');
        const next = new Date(item.fullDate + 'T12:00:00');
        const dayDiff = (next - curEnd) / 86400000;

        if (item.display.split(':').slice(1).join(':').trim() ===
            cur.display.split(':').slice(1).join(':').trim() &&
            dayDiff <= 3) {
            // extend the range
            cur.endDate = item.fullDate;
            if (item.isUpcoming) cur.isUpcoming = true;
        } else {
            groups.push(cur);
            cur = { ...item, endDate: item.fullDate };
        }
    }
    groups.push(cur);

    return groups.map(g => {
        const label = g.display.includes(':') ? g.display.split(':').slice(1).join(':').trim() : g.display;
        const dateRange = g.endDate && g.endDate !== g.fullDate
            ? `${fmtDate(g.fullDate)} – ${fmtDate(g.endDate)}`
            : fmtDate(g.fullDate);
        return { label, dateRange, isUpcoming: g.isUpcoming };
    });
}

function BadgeIcon({ color, icon }) {
    const cls = `${styles.badge} ${styles[`badge_${color}`]}`;
    if (icon === 'triangle') {
        return (
            <span className={cls} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} aria-hidden="true" />
        );
    }
    return <span className={cls} aria-hidden="true" />;
}

export default function Home() {
    const calendarCategories = loadCalendar();

    return (
        <>
            <Header />
            <main>
                <UpdateNote />
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>Find Your Perfect Program</h1>
                                <p className={styles.heroSubtitle}>
                                    Discover Laramie's Best Afterschool Programs for Your Kids
                                </p>
                                <div className={styles.heroRating}>
                                    <span className={styles.stars}>★★★★★</span>
                                    <span className={styles.ratingText}>Rated Excellent by Parents</span>
                                </div>
                                <a href="/programs" className="btn btn-primary">
                                    Get Started
                                </a>
                            </div>
                            <div className={styles.heroImage}>
                                <img src="/images/gallery/main_picture.jpeg" alt="Downtown Laramie" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ad Banner 1 */}
                <div className="container">
                    <AdBanner slot="Ad1" />
                </div>

                {/* Calendar Section */}
                <section className="section">
                    <div className="container">
                        <h2 className="text-center mb-xl">Calendar</h2>
                        <div className={styles.calendarGrid}>
                            <div className={styles.calendarImage}>
                                <SchoolCalendar categories={calendarCategories} />
                            </div>

                            {/* Column 2: No School + Early Release groups */}
                            <div className={styles.calendarCol}>
                                {calendarCategories
                                    .filter(cat => [
                                        'No School',
                                        'Early Release – All Students',
                                        'Early Release – Elementary Only',
                                    ].includes(cat.name))
                                    .map((cat) => {
                                        const rows = groupDatesIntoRanges(cat.dates);
                                        return (
                                            <div key={cat.name} className={`card ${styles.calendarCard}`}>
                                                <div className={styles.calendarCardHeader}>
                                                    <BadgeIcon color={cat.color} icon={cat.icon} />
                                                    <h3 className={styles.calendarCardTitle}>{cat.name}</h3>
                                                </div>
                                                <ul className={styles.dateList}>
                                                    {rows.map((row, idx) => (
                                                        <li
                                                            key={idx}
                                                            className={`${styles.dateItem} ${row.isUpcoming ? styles.dateItemUpcoming : ''}`}
                                                        >
                                                            {row.isUpcoming && <span className={styles.upcomingDot} title="Next upcoming" />}
                                                            <span className={styles.dateRange}>{row.dateRange}:</span>
                                                            <span>{row.label}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                            </div>

                            {/* Column 3: Staff Dev, Conferences, Orientation, Last Day */}
                            <div className={styles.calendarCol}>
                                {calendarCategories
                                    .filter(cat => [
                                        'No School – Staff Development',
                                        'Parent Teacher Conferences',
                                        'New Teacher Orientation',
                                        'Last Day for Teachers',
                                    ].includes(cat.name))
                                    .map((cat) => {
                                        const rows = groupDatesIntoRanges(cat.dates);
                                        return (
                                            <div key={cat.name} className={`card ${styles.calendarCard}`}>
                                                <div className={styles.calendarCardHeader}>
                                                    <BadgeIcon color={cat.color} icon={cat.icon} />
                                                    <h3 className={styles.calendarCardTitle}>{cat.name}</h3>
                                                </div>
                                                <ul className={styles.dateList}>
                                                    {rows.map((row, idx) => (
                                                        <li
                                                            key={idx}
                                                            className={`${styles.dateItem} ${row.isUpcoming ? styles.dateItemUpcoming : ''}`}
                                                        >
                                                            {row.isUpcoming && <span className={styles.upcomingDot} title="Next upcoming" />}
                                                            <span className={styles.dateRange}>{row.dateRange}:</span>
                                                            <span>{row.label}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>

                    </div>
                </section>

                {/* School Meal Plan Banner */}
                <section className={styles.mealBanner}>
                    <div className="container">
                        <div className={styles.mealBannerInner}>
                            <div className={styles.mealBannerText}>
                                <span className={styles.mealBannerIcon}>🍽️</span>
                                <div>
                                    <h2 className={styles.mealBannerTitle}>School Lunch &amp; Breakfast Menu</h2>
                                    <p className={styles.mealBannerSub}>ACSD #1 daily menus powered by Nutrislice</p>
                                </div>
                            </div>
                            <a
                                href="https://acsd1.nutrislice.com/menu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mealBannerBtn}
                            >
                                View Menu →
                            </a>
                        </div>
                    </div>
                </section>

                {/* Quick Links Section */}
                <section className={`section ${styles.quickLinks}`}>
                    <div className="container">
                        <h2 className="text-center mb-xl">Explore Laramie</h2>
                        <div className="grid grid-3">
                            <a href="/programs" className="card text-center">
                                <div className={styles.iconPlaceholder}>📚</div>
                                <h3>Programs</h3>
                                <p className="text-muted">Find afterschool programs perfect for your child</p>
                            </a>
                            <a href="/parks" className="card text-center">
                                <div className={styles.iconPlaceholder}>🏞️</div>
                                <h3>Parks</h3>
                                <p className="text-muted">Discover local parks and playgrounds</p>
                            </a>
                            <a href="/birthday-party" className="card text-center">
                                <div className={styles.iconPlaceholder}>🎂</div>
                                <h3>Birthday Party</h3>
                                <p className="text-muted">Plan an unforgettable birthday celebration</p>
                            </a>
                        </div>
                    </div>
                </section>
                {/* Ad Banner 2 */}
                <div className="container">
                    <AdBanner slot="Ad2" />
                </div>
            </main>
            <Footer />
        </>
    )
}
