import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";


// POST request to create a reservation
export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    // Extract reservation details
    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;

    // If any of these are not found, throw an error
    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    // Update database with new reservation
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}

