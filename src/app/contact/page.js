// Server component wrapper — exports metadata for SEO.
// The actual interactive contact form lives in ContactClient.js.
import ContactClient from './ContactClient';
import AdBanner from '@/components/AdBanner';

export const metadata = {
    title: 'Contact Us',
    description: 'Get in touch with the Laramie Community Hub team. We\'d love to hear your questions, suggestions, or feedback.',
    openGraph: {
        title: 'Contact Us | Laramie Community Hub',
        description: 'Get in touch with the Laramie Community Hub team.',
        url: 'https://laramiecommunityhub.com/contact',
    },
    twitter: {
        title: 'Contact Us | Laramie Community Hub',
        description: 'Get in touch with the Laramie Community Hub team.',
    },
};

export default function ContactPage() {
    return (
        <>
            <div className="container" style={{ marginTop: '20px' }}>
                <AdBanner slot="Ad1" />
            </div>
            <ContactClient />
            <div className="container" style={{ marginBottom: '20px' }}>
                <AdBanner slot="Ad2" />
            </div>
        </>
    );
}
