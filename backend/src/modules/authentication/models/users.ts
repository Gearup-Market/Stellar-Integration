import { model, Schema, Document } from "mongoose";
import { User } from "../types";

const userSchema: Schema = new Schema<User>({
	userId: { type: Schema.Types.String, required: true, unique: true, index: true },
	email: { type: Schema.Types.String, required: true, trim: true, index: true },
	password: { type: Schema.Types.String, required: true },
	avatar: { type: Schema.Types.String },
	verificationToken: { type: Schema.Types.String },
	isVerified: { type: Schema.Types.Boolean },
	token: { type: Schema.Types.String },
	createdAt: { type: Schema.Types.Date, default: Date.now() },
	updatedAt: { type: Schema.Types.Date },
});

const userModel = model<User & Document>("User", userSchema, "users");

export default userModel;
