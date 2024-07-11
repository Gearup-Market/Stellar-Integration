import { Router } from 'express';
import AuthController from '../controller';
import { Routes } from '@/types';

class AuthRoute implements Routes {
  public path = '/users';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.authController.findUsers.bind(this.authController));
    this.router.get(`${this.path}/:userId`, this.authController.findUser.bind(this.authController));
  }
}

export default AuthRoute;
