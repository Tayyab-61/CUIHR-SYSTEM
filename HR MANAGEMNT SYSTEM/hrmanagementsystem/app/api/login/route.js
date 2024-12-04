import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const staticUser = {
    username: 'staticuser',
    password: bcrypt.hashSync('password123', 10),
    email: 'tayyab.xpert61@gmail.com'
};

export async function POST(req) {
    const { username, password } = await req.json();

    if (username !== staticUser.username) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, staticUser.password);
    if (!isMatch) {
        return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Login successful' });
}
