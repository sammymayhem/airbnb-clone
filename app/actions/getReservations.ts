import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
) {

    try {
        const { listingId, userId, authorId } = params;

        const query: any = {};

        // Find all reservations for a specifif listing
        if (listingId) {
            query.listingId = listingId;
        }

        // Find all trips for a specific user
        if (userId) {
            query.userId = userId;
        }

        // Find all reservations that other users made for your listing
        if (authorId) {
            query.listing = { userId: authorId };
        }
        
        // Find all reservations based on the query given
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Adjusted dates syntax, to not error out
        const safeReservations = reservations.map(
            (reservation) => ({
                ...reservation,
                createdAt: reservation.createdAt.toISOString(),
                startDate: reservation.startDate.toISOString(),
                endDate: reservation.endDate.toISOString(),
                listing: {
                    ...reservation.listing,
                    createdAt: reservation.listing.createdAt.toISOString()
                }
            })
        );
        return safeReservations;
    } catch (error: any) {
        throw new Error(error);
    }
}