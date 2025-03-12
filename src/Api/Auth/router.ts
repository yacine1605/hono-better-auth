import { Hono } from "hono";
import { Login_Utilisateur, Logout_Utilisateur } from "./controller.js";

import { handle } from "hono/vercel";

//protectedRoute.use("*", sessionAuth);
export const authRoute = new Hono();
// Get  a specific user

authRoute.post("/auth/login", Login_Utilisateur);
//Delete a specific user

// Get a user by id, be sure to note the conversion of

// logout a user
authRoute.post("/auth/logout", Logout_Utilisateur);
export const GET = handle(authRoute);
export const POST = handle(authRoute);

//export type AppType = typeof authRoute;
