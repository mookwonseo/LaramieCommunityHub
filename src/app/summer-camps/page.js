import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { summerCamps } from '@/data/content'

export const metadata = {
    title: 'Summer Camps | Laramie Community Hub',
    description: 'Explore summer camp opportunities in Laramie for kids.',
}

export default function SummerCamps() {
    return (
        <>
            <Header />
            <main className="section">
                <div className="container">
                    <h1 className="text-center mb-xl">Summer Camps</h1>
                    <p className="text-center text-muted mb-xl" style={{ maxWidth: '700px', margin: '0 auto var(--spacing-xl)' }}>
                        Keep your kids engaged and learning during summer break with these fantastic camp opportunities!
                    </p>

                    <div className="grid grid-2">
                        {summerCamps.map(camp => (
                            <div key={camp.id} className="card">
                                <h3>{camp.name}</h3>
                                <p className="text-muted mb-md">{camp.description}</p>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-xs)',
                                    padding: 'var(--spacing-sm) 0',
                                    borderTop: '1px solid var(--color-border)',
                                    marginTop: 'var(--spacing-md)'
                                }}>
                                    <div><strong>Ages:</strong> {camp.ages}</div>
                                    <div><strong>Dates:</strong> {camp.dates}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card mt-xl" style={{ background: 'var(--color-secondary)' }}>
                        <h3>☀️ Summer 2026 Registration</h3>
                        <p className="text-muted">
                            Registration for summer camps typically opens in March. Many camps fill up quickly,
                            so early registration is recommended. Contact individual programs for specific registration dates and pricing.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
