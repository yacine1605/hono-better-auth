import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/auth-schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DB_URL || 'file:dev.db',
    authToken: process.env.TURSO_DB_AUTH_TOKEN,
  },
});