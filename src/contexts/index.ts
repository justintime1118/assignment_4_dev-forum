import { Router } from "express";
import authController from "./auth/auth.controller";
import usersController from "./users/users.controller";

export const controllers = Router();

controllers.use("/auth", authController);
controllers.use("/users", usersController);
