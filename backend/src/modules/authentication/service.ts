/* eslint-disable prettier/prettier */
import { generateToken, isTokenExpired, sanitize } from '@/shared/utils';
/* eslint-disable prettier/prettier */
import { User, UserId } from './types';
import { HttpException } from '@/core/exceptions/HttpException';
import userModel from './models/users';
import { isEmpty } from '@/core/utils/isEmpty';
import { MissingResourceError } from '@/core/exceptions';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendRestPasswordEmail, sendVerificationEmail } from '@/core/utils/email';
import { logger } from '@/core/utils/logger';
import { SECRET_KEY } from '@/core/config';

class AuthService {
    private user = userModel;

    public async findUser(userId: UserId): Promise<User> {
        try {
            if (isEmpty(userId)) throw new HttpException(400, 'UserId is required!');
            const user = await this.user.findOne({ userId });
            if (!user) throw new MissingResourceError(`Missing Resource Error: ${userId} does not exist`);
            return user;
        } catch (error) {
            throw new HttpException(500, error?.message);
        }
    }

    public async findUsers(): Promise<User[]> {
        try {
            const users = await this.user.find();
            return users;
        } catch (error) {
            throw new HttpException(500, error?.message);
        }
    }

    public async createUser(name: string, email: string, password: string): Promise<User> {
        if (isEmpty(name) || isEmpty(email) || isEmpty(password)) {
            throw new HttpException(400, 'All fields are required');
        }
        const sanitizedEmail = sanitize(email)

        const existingUser = await this.user.findOne({ email: sanitizedEmail });
        if (existingUser) {
            throw new HttpException(409, `User with email ${email} already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const { token: verificationToken, expiry: verificationTokenExpiry } = generateToken();
        const newUser = await this.user.create({
            userId: new Types.ObjectId().toString(),
            name: name,
            email: sanitizedEmail,
            password: hashedPassword,
            isVerified: false,
            verificationToken: verificationToken,
            verificationTokenExpiry: verificationTokenExpiry,

        });

        await sendVerificationEmail(email, verificationToken);

        return newUser
    }

    public async loginUser(email: string, password: string): Promise<{ token: string; user: User }> {
        if (isEmpty(email) || isEmpty(password)) {
            throw new HttpException(400, 'Email and password are required');
        }
        const sanitizedEmail = sanitize(email)

        const user = await this.user.findOne({ email: sanitizedEmail });
        if (!user) {
            throw new HttpException(401, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, 'Invalid email or password');
        }

        // if (!user.isVerified) {
        //     throw new HttpException(403, 'Please verify your email before logging in');
        // }

        const token = jwt.sign({ userId: user.userId }, SECRET_KEY, { expiresIn: '1h' });

        return { token, user };
    }


    public async verifyUser(token: string): Promise<User> {
        if (isEmpty(token)) {
            throw new HttpException(400, 'Verification token is required');
        }

        const user = await this.user.findOne({ verificationToken: token });
        if (!user) {
            throw new HttpException(400, 'Invalid verification token');
        }

        user.isVerified = true;
        user.verificationToken = undefined; // Remove the token after verification
        await user.save();

        return user;
    }


    public async sendResetPasswordEmail(email: string): Promise<void> {
        if (isEmpty(email)) {
            throw new HttpException(400, 'Email is required');
        }

        const sanitizedEmail = sanitize(email)

        const user = await this.user.findOne({ emai: sanitizedEmail });
        if (!user) {
            throw new HttpException(404, `User with email ${email} does not exist`);
        }

        const { token: resetToken, expiry: resetTokenExpiry } = generateToken();
        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiry = resetTokenExpiry;
        user.save()
        await sendRestPasswordEmail(email, resetToken);
        logger.info(user.resetPasswordToken)

    }

    public async verifyResetToken(email: string, token: string): Promise<void> {
        if (isEmpty(email) || isEmpty(token)) {
            throw new HttpException(400, 'Email and token are required');
        }
        const sanitizedEmail = sanitize(email)


        const user = await this.user.findOne({ email: sanitizedEmail });

        if (!user) {
            throw new HttpException(404, `User with email ${email} does not exist`);
        }
        logger.info(user.resetPasswordToken, token)

        if (user.resetPasswordToken !== token) {
            throw new HttpException(400, 'Invalid token');
        }

        if (isTokenExpired(user.resetPasswordTokenExpiry)) {
            throw new HttpException(400, 'Token has expired');
        }

    }


    public async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
        await this.verifyResetToken(email, token);
        const sanitizedEmail = sanitize(email)

        const user = await this.user.findOne({ email: sanitizedEmail });

        if (!user) {
            throw new HttpException(404, `User with email ${email} does not exist`);
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiry = undefined;

        await user.save();
    }

}

export default AuthService;
