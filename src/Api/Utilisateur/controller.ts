import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import bcrypt from "bcryptjs";

//const db = drizzle(process.env.DATABASE_URL!);
import { type Context } from "hono";
//import nodemailer from "nodemailer";
const db = drizzle(process.env.DATABASE_URL!);

import { fileURLToPath } from "url";
import path from "path";

import { UtilisateurTable } from "../../db/schema/auth-schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const Add_Utilisateur = async (c: Context) => {
  const { nom, email, commune, ilot, phone, adresse, code_client, password } =
    await c.req.json();
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const NvUtilisateurResp = await db.insert(UtilisateurTable).values({
      nom,
      email,
      commune,
      ilot,
      phone,
      adresse,
      password,
      code_client,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return c.json({
      message: "Utilisateur créé avec succès",
      data: { NvUtilisateurResp },
    });
  } catch (error) {
    console.log("error dans", error);
  }
};

export const Get_Utilisateur = async (c: Context) => {
  const id = c.req.param("id");
  //const { email, password } = await c.req.json();
  try {
    const user = await db
      .select()
      .from(UtilisateurTable)
      .where(eq(UtilisateurTable.id, parseInt(id))) // Convert id to integer
      .limit(1);

    // Compare passwords
    //const isPasswordValid = compare(password, user[0].password);
    if (user.length === 0) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({
      message: "Utilisateur trouvé",
      data: user[0],
    });
  } catch (error) {
    console.log("error dans", error);
  }
};

export const Update_Utilisateur = async (c: Context) => {};

export const Delete_Utilisateur = async (c: Context) => {};
export const Get_All_Utilisateur = async (c: Context) => {
  false;
  const allUsers = await db.select().from(UtilisateurTable);

  return c.json({
    message: "Utilisateur crée avec succées",
    data: allUsers,
  });
};
