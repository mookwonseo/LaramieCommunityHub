import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { birthdayVenues } from '@/data/content'

export const metadata = {
    title: 'Birthday Party Venues | Laramie Community Hub',
    description: 'Find the perfect birthday party venue in Laramie for your child.',
}

export default function BirthdayParty() {
    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Birthday Party Venues</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Make your child's birthday unforgettable at one of these amazing Laramie venues!
                    </p>

                    <div className="grid grid-2">
                        {birthdayVenues.map(venue => (
                            <div key={venue.id} className="card">
                                <h3>{venue.name}</h3>
                                <p className="text-muted mb-md">{venue.description}</p>
                                <div style={{
                                    padding: 'var(--spacing-sm)',
                                    background: 'var(--color-secondary)',
                                    borderRadius: 'var(--radius-sm)',
                                    marginTop: 'var(--spacing-md)'
                                }}>
                                    <strong>Capacity:</strong> {venue.capacity}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card text-center mt-xl" style={{ background: 'var(--gradient-hero)', color: 'white' }}>
                        <h3 style={{ color: 'white' }}>🎂 Planning Tips</h3>
                        <p style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Book venues 4-6 weeks in advance, especially for weekends.
                            Many venues offer package deals that include decorations, food, and activities.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
