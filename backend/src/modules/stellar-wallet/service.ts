import { HttpException } from "@/core/exceptions/HttpException";
import stellarWalletModel from "./models/stellarWallet";
import { isEmpty } from "@/core/utils/isEmpty";
import { UserId } from "@/modules/authentication/types";
import { createStellarAccount } from "@/lib/stellar/wallet";
import { IWeb3Wallet } from "./types";
import { encrypt } from "@/lib/enc";

class StellarWalletService {
	private wallet = stellarWalletModel;

	public async createWallet(userId: UserId, password: string): Promise<any> {
		try {
			if (isEmpty(userId) || isEmpty(password)) throw new HttpException(400, "UserId is required!");
			const account = await this.wallet.findOne({ userId });
			if (account) return account;
			const { publicKey, secret } = createStellarAccount();
			const encryptedKey = encrypt(secret, password);

			return await this.wallet.create({
				userId,
				publicKey,
				encryptedKey,
			});
		} catch (error) {
			throw new HttpException(500, error?.message);
		}
	}

	public async findWallet(userId: UserId): Promise<IWeb3Wallet> {
		try {
			const wallet = await this.wallet.findOne({ userId });
			return wallet;
		} catch (error) {
			throw new HttpException(400, error?.message);
		}
	}
}

export default StellarWalletService;
