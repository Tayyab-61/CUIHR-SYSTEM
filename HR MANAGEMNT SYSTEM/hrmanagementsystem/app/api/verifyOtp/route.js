import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const otpStore = {};

export async function POST(req) {
    const { otp } = await req.json();
    const email = 'tayyab.xpert61@gmail.com';

    if (otpStore[email] !== otp) {
        return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
    }

    delete otpStore[email];

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const cookieOptions = `HttpOnly; Path=/; Max-Age=1800;`;

    return NextResponse.json(
        { message: 'OTP verified' },
        { headers: { 'Set-Cookie': `token=${token}; ${cookieOptions}` } }
    );
}
