/* eslint-disable prettier/prettier */
import App from "@/core/app";
import validateEnv from "@/core/utils/validateEnv";
import { AuthenticationModule, StellarWalletModule, ListingModule } from "./modules";

validateEnv();

const app = new App([new AuthenticationModule(), new ListingModule(), new StellarWalletModule()]);

const server = app.listen();

export { app, server };
