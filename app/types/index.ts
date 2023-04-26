import { User } from "@prisma/client"

// Modifies the type of the fields so that they are safe to use with Typescript.
export type SafeUser = Omit<
    User,
    'createdAt' | 'updateAt' | 'emailVerified'
> & {
    createdAt: string;
    updateAt: string;
    emailVerified: string | null;
};