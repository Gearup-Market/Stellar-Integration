import { Router } from 'express';
import { Routes } from '@/types';
import StellarWalletController from '../controller';
import { validationMiddleware } from '@/lib';
import { createStellarWalletSchema, getStellarWalletSchema } from '../validations';

class AuthRoute implements Routes {
  public path = '/stellar/wallet';
  public router = Router();
  public stellarWalletController = new StellarWalletController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:userId`, validationMiddleware(getStellarWalletSchema), this.stellarWalletController.findWallet.bind(this.stellarWalletController));
    this.router.post(`${this.path}/create`, validationMiddleware(createStellarWalletSchema), this.stellarWalletController.createWallet.bind(this.stellarWalletController));
  }
}

export default AuthRoute;
