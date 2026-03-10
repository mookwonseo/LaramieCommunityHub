import nodemailer from 'nodemailer'

export async function POST(request) {
    try {
        const { name, message } = await request.json()

        if (!name || !message) {
            return Response.json({ error: 'Name and message are required.' }, { status: 400 })
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        })

        await transporter.sendMail({
            from: `"Laramie Community Hub" <${process.env.GMAIL_USER}>`,
            to: process.env.CONTACT_EMAIL,
            subject: `New message from ${name} — Laramie Community Hub`,
            text: `Name: ${name}\n\nMessage:\n${message}`,
            html: `
                <h2 style="color:#1a3a6b">New Contact Message</h2>
                <p><strong>From:</strong> ${name}</p>
                <hr/>
                <p>${message.replace(/\n/g, '<br/>')}</p>
                <hr/>
                <small style="color:#999">Sent from Laramie Community Hub contact form</small>
            `,
        })

        return Response.json({ success: true })
    } catch (err) {
        console.error('Email error:', err)
        return Response.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
    }
}
