import { auth } from "../../auth.js";
import type { Context } from "hono";
export const Login_Utilisateur = async (c: Context) => {
  //.post("/auth/signin", async (c) => {
  const { email, password } = await c.req.json();
  await auth.api.signInEmail({
    headers: c.req.raw.headers,
    body: {
      email,
      password,
    },
  });
  return c.json({ success: true });
};
export const Logout_Utilisateur = async (c: Context) => {
  // .post("/auth/signout", async (c) => {
  await auth.api.signOut({
    headers: c.req.raw.headers,
  });
  return c.json({ success: true });
};
