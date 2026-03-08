import styles from './SchoolCalendar.module.css'

// Color map matching the categories in school-calendar.md
const COLOR_MAP = {
    yellow: '#F5C518',
    green: '#3CB371',
    purple: '#8A2BE2',
    red: '#E53935',
    orange: '#FF6D00',
    pink: '#E91E8C',
    blue: '#1565C0',
    gray: '#9E9E9E',
};

// Build a lookup: "YYYY-MM-DD" → [{ color, icon, label }]
function buildDateLookup(categories) {
    const lookup = {};
    for (const cat of categories) {
        for (const item of cat.dates) {
            if (!item.fullDate) continue;
            if (!lookup[item.fullDate]) lookup[item.fullDate] = [];
            lookup[item.fullDate].push({
                color: COLOR_MAP[cat.color] || COLOR_MAP.gray,
                icon: cat.icon,
                label: cat.name,
            });
        }
    }
    return lookup;
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const DAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function MonthGrid({ year, month, dateLookup }) {
    // month is 0-indexed
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    // leading blanks
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    return (
        <div className={styles.monthGrid}>
            <div className={styles.monthName}>
                {MONTH_NAMES[month]} {year}
            </div>
            <div className={styles.dayHeaders}>
                {DAY_HEADERS.map((d, i) => (
                    <span key={i} className={styles.dayHeader}>{d}</span>
                ))}
            </div>
            <div className={styles.dayGrid}>
                {cells.map((day, idx) => {
                    if (!day) return <span key={idx} className={styles.emptyCell} />;
                    const mm = String(month + 1).padStart(2, '0');
                    const dd = String(day).padStart(2, '0');
                    const key = `${year}-${mm}-${dd}`;
                    const events = dateLookup[key] || [];

                    return (
                        <span
                            key={idx}
                            className={`${styles.dayCell} ${events.length ? styles.hasEvent : ''}`}
                            title={events.map(e => e.label).join(', ')}
                        >
                            <span className={styles.dayNum}>{day}</span>
                            {events.length > 0 && (
                                <span className={styles.eventDots}>
                                    {events.map((e, ei) =>
                                        e.icon === 'triangle' ? (
                                            <span
                                                key={ei}
                                                className={styles.dotTriangle}
                                                style={{ borderBottomColor: e.color }}
                                                title={e.label}
                                            />
                                        ) : (
                                            <span
                                                key={ei}
                                                className={styles.dotRect}
                                                style={{ background: e.color }}
                                                title={e.label}
                                            />
                                        )
                                    )}
                                </span>
                            )}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default function SchoolCalendar({ categories }) {
    const dateLookup = buildDateLookup(categories);

    // Show Aug 2025 – Jun 2026
    const months = [
        { year: 2025, month: 7 },  // Aug
        { year: 2025, month: 8 },  // Sep
        { year: 2025, month: 9 },  // Oct
        { year: 2025, month: 10 }, // Nov
        { year: 2025, month: 11 }, // Dec
        { year: 2026, month: 0 },  // Jan
        { year: 2026, month: 1 },  // Feb
        { year: 2026, month: 2 },  // Mar
        { year: 2026, month: 3 },  // Apr
        { year: 2026, month: 4 },  // May
        { year: 2026, month: 5 },  // Jun
    ];

    // Legend from categories
    const legend = categories.map(cat => ({
        name: cat.name,
        color: COLOR_MAP[cat.color] || COLOR_MAP.gray,
        icon: cat.icon,
    }));

    return (
        <div className={styles.calendarWrap}>
            <h3 className={styles.calendarTitle}>2025–2026 School Calendar</h3>
            <div className={styles.monthsGrid}>
                {months.map(({ year, month }) => (
                    <MonthGrid
                        key={`${year}-${month}`}
                        year={year}
                        month={month}
                        dateLookup={dateLookup}
                    />
                ))}
            </div>
            <div className={styles.legend}>
                {legend.map(item => (
                    <span key={item.name} className={styles.legendItem} title={item.name}>
                        {item.icon === 'triangle' ? (
                            <span
                                className={styles.legendTriangle}
                                style={{ borderBottomColor: item.color }}
                            />
                        ) : (
                            <span
                                className={styles.legendRect}
                                style={{ background: item.color }}
                            />
                        )}
                        <span className={styles.legendLabel}>{item.name}</span>
                    </span>
                ))}
            </div>
            <div className="text-center mt-sm">
                <a
                    href="https://www.acsd1.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-primary)', fontWeight: '600' }}
                >
                    www.acsd1.org
                </a>
            </div>
        </div>
    );
}
