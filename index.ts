import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import { auth } from "./src/auth.js";
import { secureHeaders } from "hono/secure-headers";
import { usersRoute } from "./src/Api/Utilisateur/router.js";
import { csrf } from "hono/csrf";
import { serve } from "@hono/node-server";

//const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

const app = new Hono();
app.use(secureHeaders());
app.use("/api/*", cors());

app.use(csrf());
app.get("/", (c) => {
  console.log("object");
  return c.body("Hello Hono!");
});

app.use(
  "/api/auth/**", // or replace with "*" to enable cors for all routes
  cors()
);
//app.on(["GET"], "/api/auth-providers", (c: Context) => {
//  return c.json(Object.keys(configuredProviders));
//});
app.route("/api/utilisateur", usersRoute);

//app.on(["POST", "GET"], "/api/auth/**", (c) => {
//  return auth.handler(c.req.raw);
//});

const server = {
  port: 5000,
  host: process.env.APP_HOST || "localhost",
  fetch: app.fetch,
};
console.log(`Server is running on http://${server.host}:${server.port}`);
serve(server);
