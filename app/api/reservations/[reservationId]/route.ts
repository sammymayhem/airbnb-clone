import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId != 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },                 // Creator of the reservation (User can cancel their registration)
                { listing: { userId: currentUser.id } }     // Creator of the listing (Owner can cancel listing)
            ]
        }
    });

    return NextResponse.json(reservation);
}