import { Router } from "express";
import forumsService from "./forums.service";

const forumsController = Router();

forumsController.get("/", forumsService.getForums);
forumsController.get("/posts", forumsService.getPostsFromEachForumByPage);

export default forumsController;
