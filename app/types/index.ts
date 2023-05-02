import { User, Listing, Reservation } from "@prisma/client"

export type SafeListing = Omit<
    Listing,
    "createdAt"
> & {
    createdAt: string;
}

export type SafeReservation = Omit<
    Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
}

// Modifies the type of the fields so that they are safe to use with Typescript.
export type SafeUser = Omit<
    User,
    'createdAt' | 'updateAt' | 'emailVerified'
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};