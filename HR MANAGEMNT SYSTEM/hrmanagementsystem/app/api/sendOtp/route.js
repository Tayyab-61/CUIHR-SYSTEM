import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const otpStore = {};

export async function POST(req) {
    const email = 'tayyab.xpert61@gmail.com';

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'The CUI HR PROTAL ',
        text: `Your OTP code is: ${otp}`
    });

    return NextResponse.json({ message: 'OTP sent successfully' });
}
