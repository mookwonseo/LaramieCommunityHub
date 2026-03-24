import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import styles from './forum.module.css'

export const metadata = {
    title: 'Community Forum',
    description: 'Laramie school news, education updates, and community announcements from the Laramie Community Hub.',
    openGraph: {
        title: 'Community Forum | Laramie Community Hub',
        description: 'Laramie school news, education updates, and community announcements.',
        url: 'https://laramiecommunityhub.com/forum',
    },
    twitter: {
        title: 'Community Forum | Laramie Community Hub',
        description: 'Laramie school news, education updates, and community announcements.',
    },
}

const POSTS_DIR = path.join(process.cwd(), 'public', 'forum', 'posts')

const CAT_MAP = {
    'Announcements': 'catAnnouncements',
    'School News': 'catSchoolNews',
    'Community': 'catCommunity',
    'Resources': 'catResources',
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    if (!match) return { meta: {}, body: content }
    const meta = {}
    match[1].split('\n').forEach(line => {
        const [key, ...rest] = line.split(':')
        if (key) meta[key.trim()] = rest.join(':').trim()
    })
    return { meta, body: match[2].trim() }
}

function getExcerpt(body, maxLen = 180) {
    // Strip markdown syntax for a plain-text excerpt
    const plain = body
        .replace(/^#{1,3} .+$/gm, '')    // headings
        .replace(/\*\*(.*?)\*\*/g, '$1') // bold
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/^[-*] /gm, '')          // list bullets
        .replace(/\n+/g, ' ')
        .trim()
    return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + '…' : plain
}

function loadPosts() {
    if (!fs.existsSync(POSTS_DIR)) return []
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md') && !f.startsWith('.'))
        .map(filename => {
            const slug = filename.replace(/\.md$/, '')
            const content = fs.readFileSync(path.join(POSTS_DIR, filename), 'utf-8')
            const { meta, body } = parseFrontmatter(content)
            return { slug, title: meta.title || slug, date: meta.date || '', category: meta.category || '', author: meta.author || '', excerpt: getExcerpt(body) }
        })
        .sort((a, b) => b.date.localeCompare(a.date)) // newest first
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const ALL_CATS = ['All', 'Announcements', 'School News', 'Community', 'Resources']

export default async function Forum({ searchParams }) {
    const posts = loadPosts()
    const { cat } = await searchParams
    const activeFilter = cat || 'All'
    const visible = activeFilter === 'All' ? posts : posts.filter(p => p.category === activeFilter)

    return (
        <>
            <Header />
            <main>
                <div className={styles.hero}>
                    <h1>Community Forum</h1>
                    <p>Laramie school news, education updates &amp; community announcements</p>
                </div>

                <div className="container">
                    {/* Ad Banner 1 */}
                    <AdBanner slot="Ad1" />

                    {/* Category filter */}
                    <div className={styles.filterBar}>
                        {ALL_CATS.map(cat => (
                            <Link
                                key={cat}
                                href={cat === 'All' ? '/forum' : `/forum?cat=${encodeURIComponent(cat)}`}
                                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ''}`}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>

                    {/* Post feed */}
                    <div className={styles.feed}>
                        {visible.length === 0 && (
                            <p style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>
                                No posts in this category yet.
                            </p>
                        )}
                        {visible.map(post => (
                            <Link key={post.slug} href={`/forum/${post.slug}`} className={styles.postCard}>
                                <div className={styles.postMeta}>
                                    {post.category && (
                                        <span className={`${styles.catPill} ${styles[CAT_MAP[post.category] || 'catAnnouncements']}`}>
                                            {post.category}
                                        </span>
                                    )}
                                    <span className={styles.postDate}>{formatDate(post.date)}</span>
                                    {post.author && <span className={styles.postAuthor}>· {post.author}</span>}
                                </div>
                                <div className={styles.postTitle}>{post.title}</div>
                                <p className={styles.postExcerpt}>{post.excerpt}</p>
                                <span className={styles.readMore}>Read more →</span>
                            </Link>
                        ))}
                    </div>

                    {/* Ad Banner 2 */}
                    <AdBanner slot="Ad2" />
                </div>
            </main>
            <Footer />
        </>
    )
}
