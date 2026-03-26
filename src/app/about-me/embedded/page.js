import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import styles from '../AboutMe.module.css';
import Link from 'next/link';

export default async function Embedded() {
    const filePath = path.join(process.cwd(), 'public/study/embedded/notes.md');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Split content into header and body for better styling
    const lines = fileContent.split('\n');
    const title = lines[0].replace('# ', '');
    const subtitle = lines[1].replace('## ', '');
    const bodyContent = lines.slice(2).join('\n');
    
    const htmlContent = marked.parse(bodyContent);

    return (
        <div className={styles.aboutContainer}>
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1>{title}</h1>
                        <p>{subtitle}</p>
                    </div>
                </div>
            </section>

            <section className="container mt-xl">
                <Link href="/about-me" className="btn btn-secondary mb-xl">
                    &larr; Back to Portfolio
                </Link>
                
                <div className={styles.professionalContent}>
                    <div 
                        className={styles.markdownContent}
                        dangerouslySetInnerHTML={{ __html: htmlContent }} 
                    />
                </div>
            </section>
        </div>
    );
}
