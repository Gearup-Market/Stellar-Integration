/* eslint-disable prettier/prettier */
import { Router } from "express";
import AuthController from "../controller";
import { Routes } from "@/types";
import validate from '@/lib/middlewares/validation.middleware';
import { userSignUpSchema, userSignInSchema, resetPasswordRequestSchema, resetPasswordVerifySchema, resetPasswordSchema } from "../validations";

class AuthRoute implements Routes {
    public path = "/users";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}/all`,
            this.authController.findUsers.bind(this.authController)
        );
        this.router.get(
            `${this.path}/:userId`,
            this.authController.findUser.bind(this.authController)
        );
        this.router.post(`${this.path}/create`, validate(userSignUpSchema), this.authController.createUser.bind(this.authController));
        this.router.post(`${this.path}/login`, validate(userSignInSchema), this.authController.loginUser.bind(this.authController));
        this.router.get(`${this.path}/verify/:token`, this.authController.verifyUser.bind(this.authController));
        this.router.post(`${this.path}/reset-password/request`, validate(resetPasswordRequestSchema), this.authController.sendResetPasswordEmail.bind(this.authController));
        this.router.post(`${this.path}/reset-password/verify`, validate(resetPasswordVerifySchema), this.authController.verifyResetToken.bind(this.authController));
        this.router.post(`${this.path}/reset-password/reset`, validate(resetPasswordSchema), this.authController.resetPassword.bind(this.authController));

    }
}

export default AuthRoute;
