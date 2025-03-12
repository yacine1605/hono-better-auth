import { Hono } from "hono";
import {
  Get_All_Utilisateur,
  Delete_Utilisateur,
  Update_Utilisateur,
  Add_Utilisateur,
  Get_Utilisateur,
} from "./controller.js";

export const usersRoute = new Hono();
export const protectedRoute = new Hono();

// Get all users

usersRoute.get("/all", Get_All_Utilisateur);
// Get  a specific user
usersRoute.get("/account/:id", Get_Utilisateur);

//Delete a specific user
usersRoute.delete("/:id", Delete_Utilisateur);
// Get a user by id, be sure to note the conversion of
// the id from string back to a number
usersRoute.patch("/:id", Update_Utilisateur);

// Create a user
usersRoute.post("/", Add_Utilisateur);
