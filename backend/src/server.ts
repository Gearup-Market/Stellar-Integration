import App from "@/core/app";
import validateEnv from "@/core/utils/validateEnv";
import { AuthenticationModule, StellarWalletModule } from "./modules";

validateEnv();

const app = new App([new AuthenticationModule(), new StellarWalletModule()]);

const server = app.listen();

export { app, server };
