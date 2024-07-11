import { NextFunction, Request, Response } from "express";
import StellarWalletService from "./service";

class StellarWalletController {
	private stellarWalletService = new StellarWalletService();

	public async createWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId, password } = req.body;
			const wallet = await this.stellarWalletService.createWallet(userId, password);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}

	public async findWallet(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params;
			const wallet = await this.stellarWalletService.findWallet(userId);
			res.json({ data: wallet, message: "success" }).status(200);
		} catch (error) {
			next(error);
		}
	}
}

export default StellarWalletController;
