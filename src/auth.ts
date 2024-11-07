import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import * as authSchema from "./db/auth-schema";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL!,
    secret: process.env.BETTER_AUTH_SECRET!,
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
    trustedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || [],
    database: drizzleAdapter(db, {
        provider: "sqlite", // or "mysql", "sqlite"
        schema: authSchema,
    })
});