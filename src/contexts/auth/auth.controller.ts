import { Router } from "express";
import authService from "./auth.service";

const authController = Router();

authController.post("/sign-up", authService.signUp);
authController.post("/sign-in", authService.signIn);

export default authController;
