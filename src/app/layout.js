import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
    metadataBase: new URL('https://laramiecommunityhub.com'),
    title: {
        default: 'Laramie Community Hub',
        template: '%s | Laramie Community Hub',
    },
    description: "Discover Laramie's best afterschool programs, summer camps, parks, and family resources.",
    keywords: ['Laramie', 'afterschool programs', 'summer camps', 'family resources', 'Wyoming', 'kids activities'],
    authors: [{ name: 'Laramie Community Hub' }],
    openGraph: {
        type: 'website',
        siteName: 'Laramie Community Hub',
        locale: 'en_US',
        url: 'https://laramiecommunityhub.com',
        title: 'Laramie Community Hub',
        description: "Discover Laramie's best afterschool programs, summer camps, parks, and family resources.",
        images: [{ url: '/images/logo.png', width: 512, height: 512, alt: 'Laramie Community Hub' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Laramie Community Hub',
        description: "Discover Laramie's best afterschool programs, summer camps, parks, and family resources.",
        images: ['/images/logo.png'],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2548683738600386"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    )
}
