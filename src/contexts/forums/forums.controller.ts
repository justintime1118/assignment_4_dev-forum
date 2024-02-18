import { Router } from "express";
import forumsService from "./forums.service";

const forumsController = Router();

forumsController.get("/", forumsService.getForums);

export default forumsController;
