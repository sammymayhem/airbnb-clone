import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb';

// Get session with authentication
export async function getSession() {
    return await getServerSession(authOptions);
}

// Function to get to current user from the database
export default async function getCurrentUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email ) {
            return null
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!currentUser) {
            return null;
        }

        // Modified the way these fields were exported. Using types/index.js
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updateAt: currentUser.updateAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null,
        };

    } catch (error: any) {
        return null;
    }
}