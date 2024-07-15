import { Types } from 'mongoose';

export type User = {
    _id: Types.ObjectId;
    userId: string;
    name?: string;
    email: string;
    password: string;
    avatar?: string;
    isVerified?: boolean;
    token?: string;
    resetPasswordToken?: string;
    resetPasswordTokenExpiry?: Date;
    verificationToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type Session = {
    _id: Types.ObjectId;
    sessionId: string;
    userId: string;
    sessionCount: number;
    lastActivity: Date;
    createdAt?: Date;
    updatedAt?: Date;
};

export type UserId = string;