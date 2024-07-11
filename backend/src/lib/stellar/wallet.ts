import { HttpException } from "@/core/exceptions/HttpException";
import { StrKey, server, stellar } from "./sdk";

export const createStellarAccount = () => {
	const accountKeyPair = stellar.account().createKeypair();
	return {
		publicKey: accountKeyPair.keypair.publicKey,
		secret: accountKeyPair.secretKey,
	};
};

export const fundTestWallet = () => {};

export async function fetchAccount(publicKey: string) {
	if (!StrKey.isValidEd25519PublicKey(publicKey))
		throw new HttpException(400, "invalid public key");
	try {
		let account = await server.accounts().accountId(publicKey).call();
		return account;
	} catch (err) {
		if (err.response?.status === 404)
			throw new HttpException(404, "account not funded on network");
		throw new HttpException(
			err.response?.status ?? 400,
			`${err.response?.title} - ${err.response?.detail}`
		);
	}
}

export async function fetchAccountBalances(publicKey: string) {
	const { balances } = await fetchAccount(publicKey);
	return balances.map(balance => ({
		asset: balance.asset_type === "native" ? "XLM" : balance.asset_type,
		balance: balance.balance,
	}));
}

export async function fundWithFriendbot(publicKey: string) {
    console.log(`requesting funding for ${publicKey}`);
    await server.friendbot(publicKey).call();
}
