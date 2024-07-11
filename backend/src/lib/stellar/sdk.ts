import { StellarConfiguration, Wallet } from "@stellar/typescript-wallet-sdk";
import { isProduction } from "@/core/utils/environment";
import { Horizon } from "@stellar/stellar-sdk";

export const wallet = new Wallet({
	stellarConfiguration: isProduction()
		? StellarConfiguration.MainNet()
		: StellarConfiguration.TestNet(),
});

const horizonUrl = isProduction ? "https://horizon-mainnet.stellar.org" : "https://horizon-testnet.stellar.org";

export const server = new Horizon.Server(horizonUrl);

export const stellar = wallet.stellar();

export * from "@stellar/stellar-sdk"