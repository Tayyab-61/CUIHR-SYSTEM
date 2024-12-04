import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const { name, subject, mobile, email, message } = await req.json();

        // Configure Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Replace with your Gmail
                pass: process.env.EMAIL_PASSWORD, // Replace with your App Password
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Send to the same Gmail
            subject: subject || 'Contact Form Submission',
            text: `
                Name: ${name}
                Mobile: ${mobile}
                Email: ${email}
                Message: ${message}
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(
            JSON.stringify({ success: false, message: 'Failed to send email', error }),
            { status: 500 }
        );
    }
}
