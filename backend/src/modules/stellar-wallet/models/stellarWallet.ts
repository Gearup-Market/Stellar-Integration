import { model, Schema, Document } from "mongoose";
import { IWeb3Wallet } from "../types";

const stellarWallet: Schema = new Schema<IWeb3Wallet>(
	{
		userId: { type: Schema.Types.String, required: true, unique: true, index: true },
		publicKey: { type: Schema.Types.String, required: true, trim: true, index: true },
		encryptedKey: { type: Schema.Types.String, required: true },
		isActive: { type: Schema.Types.Boolean },
	},
	{
		timestamps: true,
	}
);

const stellarWalletModel = model<IWeb3Wallet & Document>("IWeb3Wallet", stellarWallet, "stellarWallets");

export default stellarWalletModel;
