/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import UserService from './service';
import { logger } from '@/core/utils/logger';

class AuthController {
    private userService = new UserService();

    public async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const user = await this.userService.findUser(userId);
            res.json({ data: user, message: 'success' }).status(200);
        } catch (error) {
            next(error);
        }
    }

    public async findUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userService.findUsers();
            res.json({ data: user, message: 'success' }).status(200);
        } catch (error) {
            next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name } = req.body;
            const newUser = await this.userService.createUser(name, email, password);
            logger.info("create user endpoint")
            res.status(201).json({ data: newUser, message: 'User created' });
        } catch (error) {
            next(error);
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.userService.loginUser(email, password);
            res.status(200).json({ data: { token, user }, message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    }


    public async verifyUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            //logger.info(token)
            const user = await this.userService.verifyUser(token);
            res.status(200).json({ data: user, message: 'Account verified successfully' });
        } catch (error) {
            next(error);
        }
    }

    public async sendResetPasswordEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            logger.info(email)
            await this.userService.sendResetPasswordEmail(email);
            res.status(200).json({ message: 'Password reset email sent' });
        } catch (error) {
            next(error);
        }
    }

    public async verifyResetToken(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token } = req.body;
            await this.userService.verifyResetToken(email, token);
            res.status(200).json({ message: 'Token verified' });
        } catch (error) {
            next(error);
        }
    }


    public async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, token, newPassword } = req.body;
            await this.userService.resetPassword(email, token, newPassword);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
