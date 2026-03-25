import styles from './CV.module.css';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import CVClient from '@/components/CV/CVClient';

export default function CVPage() {
    const filePath = path.join(process.cwd(), 'public', 'cv.json');
    let data = null;
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        data = JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading cv.json:', error);
        return <div>Error loading CV content.</div>;
    }

    if (!data) return <div>No CV data found.</div>;

    const renderSections = () => {
        return data.sections.map((section, idx) => {
            if (section.type === 'skills') {
                return (
                    <section key={idx} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <ul className={styles.skillList}>
                            {section.items.map((skill, sIdx) => (
                                <li key={sIdx}>
                                    <span className={styles.skillLabel}>{skill.label}:</span> {skill.value}
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            }

            if (section.type === 'experience') {
                return (
                    <section key={idx} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        {section.items.map((exp, eIdx) => (
                            <div key={eIdx} className={styles.experienceItem}>
                                <div className={styles.experienceHeader}>
                                    <span className={styles.companyName}>{exp.company}</span>
                                    <span className={styles.locationDate}>{exp.date}</span>
                                </div>
                                {exp.description && (
                                    <p style={{ fontStyle: 'italic', marginBottom: '10px', color: '#4a5568' }}>
                                        {exp.description}
                                    </p>
                                )}
                                {exp.roles.map((role, rIdx) => (
                                    <div key={rIdx} style={{ marginTop: rIdx > 0 ? '15px' : '0' }}>
                                        <div className={styles.jobTitle}>{role.title}</div>
                                        <ul className={styles.experienceList}>
                                            {role.bullets.map((bullet, bIdx) => (
                                                <li key={bIdx} dangerouslySetInnerHTML={{ __html: marked.parseInline(bullet) }} />
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                );
            }

            if (section.type === 'education') {
                return (
                    <section key={idx} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        {section.items.map((edu, eduIdx) => (
                            <div key={eduIdx} className={styles.experienceItem}>
                                <div className={styles.experienceHeader}>
                                    <span className={styles.companyName}>{edu.institution}</span>
                                    <span className={styles.locationDate}>{edu.date}</span>
                                </div>
                                <div className={styles.jobTitle}>{edu.degree}</div>
                                {edu.details && (
                                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{edu.details}</p>
                                )}
                            </div>
                        ))}
                    </section>
                );
            }

            // Default list rendering
            let listClass = styles.awardList;
            if (section.title === 'DATA SCIENCE CERTIFICATES') listClass = styles.certificateList;
            if (section.title === 'PUBLICATIONS') listClass = styles.publicationList;
            if (section.title === 'TALKS') listClass = styles.talkList;

            return (
                <section key={idx} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <ul className={listClass}>
                        {section.items.map((item, lIdx) => (
                            <li key={lIdx} dangerouslySetInnerHTML={{ __html: marked.parseInline(item) }} />
                        ))}
                    </ul>
                </section>
            );
        });
    };

    return (
        <div className={styles.cvContainer}>
            <CVClient />
            
            <header className={styles.cvHeader}>
                <h1>{data.name}</h1>
                <div className={styles.contactInfo}>
                    <p>
                        <a href={data.linkedin.url} target="_blank" rel="noopener noreferrer">{data.linkedin.label}</a>
                    </p>
                </div>
                <div className={styles.summary}>
                    {data.summary}
                </div>
            </header>

            {renderSections()}

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link href="/about-me" className="btn btn-primary">
                    Back to About Me
                </Link>
            </div>
        </div>
    );
}
