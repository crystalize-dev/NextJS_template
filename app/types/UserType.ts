export type UserType = {
    id?: string;
    name?: string | null;
    email?: string | null;
    description?: string | null;
    image?: string | null;
    hashedPassword?: string;
    createdAt?: Date;
    updatedAt?: Date;
    resetToken?: string;
    resetTokenExpired?: Date;
};