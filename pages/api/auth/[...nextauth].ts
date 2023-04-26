import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';

// Creating the options for OAuth login with Google or GitHub
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {        // Check to make sure email and password are in the database
                    throw new Error('Invalid Credentials');
                }

                const user = await prisma.user.findUnique({                 // Search database for user matching email
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("Invalid credentials");
                }
                
                // Compares the password entered with the hashed password for authentication
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {                                   // Check to see if password matches
                    throw new Error('Invalide credentials')
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/',                    // If signin fails, goes back to homepage
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);