import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

// POST route for creating a new user and hashing password
export async function POST(
    request: Request
) {
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body

    const hashedPassword = await bcrypt.hash(password, 12);

    // Creating user profile with hashed password
    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}