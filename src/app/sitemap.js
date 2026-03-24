export default function sitemap() {
    const baseUrl = 'https://laramiecommunityhub.com';
    const lastModified = new Date('2026-03-24');

    return [
        { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/programs`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/schedule`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/summer-camps`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/parks`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/birthday-party`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/forum`, lastModified, changeFrequency: 'daily', priority: 0.7 },
        { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
    ];
}
