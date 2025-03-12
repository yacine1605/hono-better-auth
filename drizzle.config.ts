import "dotenv/config";
import { defineConfig } from "drizzle-kit";

//const authToken = process.env.TURSO_DB_AUTH_TOKEN;

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "file:dev.db",
  },
});
