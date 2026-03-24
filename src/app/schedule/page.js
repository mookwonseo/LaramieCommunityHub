// Server component wrapper — exports metadata for SEO.
// The actual interactive schedule lives in ScheduleClient.js.
import ScheduleClient from './ScheduleClient';
import AdBanner from '@/components/AdBanner';

export const metadata = {
    title: 'Program Schedule',
    description: 'Weekly schedule of all Laramie youth programs — afterschool care, sports, music, and dance.',
    openGraph: {
        title: 'Program Schedule | Laramie Community Hub',
        description: 'Weekly schedule of all Laramie youth programs — afterschool care, sports, music, and dance.',
        url: 'https://laramiecommunityhub.com/schedule',
    },
    twitter: {
        title: 'Program Schedule | Laramie Community Hub',
        description: 'Weekly schedule of all Laramie youth programs — afterschool care, sports, music, and dance.',
    },
};

export default function SchedulePage() {
    return (
        <>
            <div className="container" style={{ marginTop: '20px' }}>
                <AdBanner slot="Ad1" />
            </div>
            <ScheduleClient />
            <div className="container" style={{ marginBottom: '20px' }}>
                <AdBanner slot="Ad2" />
            </div>
        </>
    );
}
