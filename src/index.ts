import { Hono } from 'hono'
import { cors } from "hono/cors";
import 'dotenv/config';
import { auth } from './auth';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono x Better Auth!')
})

app.use(
	"/api/auth/**", // or replace with "*" to enable cors for all routes
	cors({
		origin: (origin, _) => {
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      return undefined;
    },
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

export default {
  port: 8558,
  fetch: app.fetch,
}
