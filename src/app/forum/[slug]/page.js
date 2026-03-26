import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from '../forum.module.css'

export const dynamic = 'force-dynamic';

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

// Minimal Markdown → HTML renderer (no external dependency)
function mdToHtml(md) {
    let html = md
        // Headings
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        // Bold / italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        // HR
        .replace(/^---$/gm, '<hr />')
        // Unordered list items
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Blockquote
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        // Wrap consecutive <li> in <ul>
        .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
        // Paragraphs: blank-line-separated blocks that aren't block elements
        .replace(/\n{2,}(?!<(?:h[1-6]|ul|ol|li|blockquote|hr))/g, '\n</p><p>')

    return `<p>${html}</p>`
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<(?:h[1-6]|ul|ol|blockquote|hr)[^>]*>)/g, '$1')
        .replace(/(<\/(?:h[1-6]|ul|ol|blockquote)>)<\/p>/g, '$1')
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr + 'T12:00:00')
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export async function generateStaticParams() {
    if (!fs.existsSync(POSTS_DIR)) return []
    return fs.readdirSync(POSTS_DIR)
        .filter(f => f.endsWith('.md') && !f.startsWith('.'))
        .map(f => ({ slug: f.replace(/\.md$/, '') }))
}

export async function generateMetadata({ params }) {
    const { slug } = await params
    const filePath = path.join(POSTS_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) return {}
    const { meta } = parseFrontmatter(fs.readFileSync(filePath, 'utf-8'))
    return { title: `${meta.title || slug} | Forum | Laramie Community Hub` }
}

export default async function ForumPost({ params }) {
    const { slug } = await params
    const filePath = path.join(POSTS_DIR, `${slug}.md`)
    if (!fs.existsSync(filePath)) notFound()

    const content = fs.readFileSync(filePath, 'utf-8')
    const { meta, body } = parseFrontmatter(content)
    const html = mdToHtml(body)

    return (
        <>
            <Header />
            <main>
                <div className={styles.postPage}>
                    <div className={styles.breadcrumb}>
                        <Link href="/forum">← Back to Forum</Link>
                    </div>

                    <div className={styles.postPageMeta}>
                        {meta.category && (
                            <span className={`${styles.catPill} ${styles[CAT_MAP[meta.category] || 'catAnnouncements']}`}>
                                {meta.category}
                            </span>
                        )}
                    </div>

                    <h1 className={styles.postPageTitle}>{meta.title}</h1>

                    <div className={styles.postPageInfo}>
                        {formatDate(meta.date)}{meta.author && ` · ${meta.author}`}
                    </div>

                    <div
                        className={styles.postBody}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </div>
            </main>
            <Footer />
        </>
    )
}
