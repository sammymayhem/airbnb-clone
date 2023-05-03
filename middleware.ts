export { default } from 'next-auth/middleware';

// This will protect these routes
export const config = {
    matcher: [
        '/trips',
        '/reservations',
        '/properties',
        '/favorites',
    ]
}