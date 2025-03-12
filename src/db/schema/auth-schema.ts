import { SQL, sql } from "drizzle-orm";
import {
  integer,
  pgPolicy,
  pgRole,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
export const admin_role = pgRole("admin_role");
export const web_insert = pgRole("web_insert");

export const UtilisateurTable = pgTable(
  "utilisateur",
  {
    id: integer().generatedAlwaysAsIdentity().notNull(),
    nom: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).unique().notNull(),
    commune: varchar({ length: 255 }).notNull(),
    ilot: varchar({ length: 255 }).notNull(),
    phone: varchar({ length: 10 }).unique().notNull(),
    adresse: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    code_client: varchar({ length: 9 }).primaryKey().notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [
    // uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
    uniqueIndex("emailUniqueIndex").on(lower(table.email)),
    pgPolicy("policy", {
      as: "permissive",
      to: web_insert,
      for: "insert",
    }),
  ]
).enableRLS();

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
export const AdminTable = pgTable("admin", {
  id: integer().generatedAlwaysAsIdentity().notNull(),
  email: varchar({ length: 255 }).primaryKey(),
  password: varchar({ length: 255 }).notNull(),
});
export const sessions = pgTable("sessions", {
  userId: varchar("code_client")
    .notNull()
    .references(() => UtilisateurTable.code_client, { onDelete: "cascade" }),

  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("Utilisateur_code")
    .notNull()
    .references(() => UtilisateurTable.code_client, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
export type User = typeof UtilisateurTable.$inferSelect;
export type InsertUser = typeof UtilisateurTable.$inferInsert;
