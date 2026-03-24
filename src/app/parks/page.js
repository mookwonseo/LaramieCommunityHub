import fs from 'fs'
import path from 'path'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParksClient from './ParksClient'
import ThemeParks from '@/components/ThemeParks'
import AdBanner from '@/components/AdBanner'
import styles from './parks.module.css'

export const metadata = {
    title: 'Parks & Playgrounds',
    description: 'Explore parks and playgrounds in Laramie, Cheyenne, and Fort Collins for families and kids.',
    openGraph: {
        title: 'Parks & Playgrounds | Laramie Community Hub',
        description: 'Explore parks and playgrounds in Laramie, Cheyenne, and Fort Collins for families and kids.',
        url: 'https://laramiecommunityhub.com/parks',
    },
    twitter: {
        title: 'Parks & Playgrounds | Laramie Community Hub',
        description: 'Explore parks and playgrounds in Laramie, Cheyenne, and Fort Collins for families and kids.',
    },
}

const CITIES = {
    Laramie: {
        center: [41.3114, -105.5911],
        zoom: 13,
        parks: [
            { name: 'LaBonte Park', lat: 41.3063, lng: -105.5762, description: 'Skate park, soccer/softball fields, playgrounds, and picnic shelters' },
            { name: 'Scout Park', lat: 41.3170, lng: -105.5850, description: 'Open fields, walking path, playground, and picnic tables' },
            { name: 'Kiowa Park', lat: 41.3220, lng: -105.5780, description: 'Modern playground, synthetic turf, and open space for play' },
            { name: 'Optimist Park', lat: 41.3080, lng: -105.6010, description: 'River Greenbelt trails, picnic tables, and relaxing waterfront views' },
            { name: 'Washington Park', lat: 41.3140, lng: -105.5870, description: 'Playgrounds, tennis courts, picnic shelters, and mature trees' },
            { name: 'Undine Park', lat: 41.3200, lng: -105.5920, description: 'Playground, seasonal splash pad, athletic courts, and shaded picnic areas' },
            { name: 'Harbon Park', lat: 41.3250, lng: -105.5830, description: 'Small neighborhood park with playground and open green space' },
            { name: 'LaPrele Park', lat: 41.3010, lng: -105.5950, description: "Huck Finn Kids' Fishing Pond, playground, and family picnic areas" },
            { name: 'Kiwanis Park', lat: 41.3300, lng: -105.5900, description: 'Grassy areas, playground, picnic tables, and plenty of shade trees' },
        ],
    },
    Cheyenne: {
        center: [41.1400, -104.8200],
        zoom: 12,
        parks: [
            { name: 'Lion Park', lat: 41.1553, lng: -104.8266, description: 'Walking paths, paddle boating, fishing, and Botanic Gardens access' },
            { name: 'Cheyenne Botanic Garden', lat: 41.1560, lng: -104.8240, description: 'Gardens, conservatory, walking paths, and educational exhibits' },
            { name: 'Holliday Park', lat: 41.1380, lng: -104.8350, description: 'Grassy areas, playgrounds, and the famous Big Boy Steam Engine display' },
            { name: 'Mylar Park', lat: 41.1200, lng: -104.8100, description: 'Fishing lake, open lawns, playground, and walking paths' },
            { name: 'Cahill Park', lat: 41.1450, lng: -104.7950, description: 'Playgrounds, soccer fields, and picnic spaces for families' },
            { name: 'Curt Gowdy State Park', lat: 41.1820, lng: -105.1670, description: 'Mountain trails, reservoirs for fishing and boating, and scenic views' },
            { name: 'Clear Creek Park', lat: 41.1300, lng: -104.8050, description: 'Open grassy space, playground, and walking path' },
        ],
    },
    'Fort Collins': {
        center: [40.5853, -105.0844],
        zoom: 12,
        parks: [
            { name: 'City Park', lat: 40.5730, lng: -105.0940, description: 'Historic park with lawns, athletic fields, tennis courts, and playground' },
            { name: 'Edora Park', lat: 40.5680, lng: -105.0600, description: 'Skate park, sports fields, disc golf, and Spring Creek trail access' },
            { name: 'Fossil Creek Park', lat: 40.5050, lng: -105.0700, description: 'Splash pad, skate park, fishing pond, and wide open spaces' },
            { name: 'Rolland Moore Park', lat: 40.5600, lng: -105.1100, description: 'Sports fields, tennis courts, playground, and Spring Creek Trail access' },
            { name: 'Spring Canyon Park', lat: 40.5580, lng: -105.1350, description: 'Playground, splash pad, courts, and natural open areas' },
            { name: 'Twin Silo Park', lat: 40.5300, lng: -105.0400, description: 'Iconic twin silos, massive playground, gardens, and bike trails' },
            { name: 'Avery Park', lat: 40.5780, lng: -105.0880, description: 'Splash pad, playground, and shady picnic spots near CSU' },
            { name: 'Lee Martinez Park', lat: 40.6020, lng: -105.0880, description: 'Playgrounds, The Farm attraction, and Poudre River Trail access' },
            { name: 'Horsetooth Mountain Open Space', lat: 40.5280, lng: -105.1700, description: 'Scenic hiking, mountain views, and the iconic Horsetooth Rock' },
            { name: 'Lory State Park', lat: 40.6050, lng: -105.1700, description: 'Hiking, mountain biking, and horseback riding near Horsetooth Reservoir' },
        ],
    },
}

function parseThemeParksMd(content) {
    const parks = []
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
        parks.push({ name, ...fields })
    }
    return parks
}

export default async function Parks() {
    const filePath = path.join(process.cwd(), 'public', 'theme-parks.md')
    let themeParks = []
    
    try {
        const content = fs.readFileSync(filePath, 'utf-8')
        themeParks = parseThemeParksMd(content)
    } catch (error) {
        console.error('Error reading theme-parks.md:', error)
    }

    return (
        <>
            <Header />
            <main>
                {/* Hero */}
                <div className={styles.hero}>
                    <h1>Parks &amp; Playgrounds</h1>
                    <p>Explore parks in Laramie, Cheyenne, and Fort Collins — click a pin to learn more!</p>
                </div>

                <ParksClient cities={CITIES} />

                {/* Ad Banner 1 */}
                <div className="container"><AdBanner slot="9029253338" /></div>

                <div className="container">
                    <ThemeParks parks={themeParks} />
                </div>

                {/* Ad Banner 2 */}
                <div className="container"><AdBanner slot="5002378411" /></div>
            </main>
            <Footer />
        </>
    )
}
