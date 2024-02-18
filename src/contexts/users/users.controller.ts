import { Router } from "express";
import usersService from "./users.service";

const usersController = Router();

usersController.get("/", usersService.getUsers);
usersController.get("/:userId/likes", usersService.getLikedPostsByUser);

export default usersController;
