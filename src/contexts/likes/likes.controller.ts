import { Router } from "express";
import likesService from "./likes.service";

const likesController = Router({ mergeParams: true });

likesController.post("/", likesService.like);
likesController.delete("/", likesService.unlike);

export default likesController;
