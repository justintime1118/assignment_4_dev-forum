import { Router } from "express";
import commentsService from "./comments.service";

const commentsController = Router({ mergeParams: true });

commentsController.post("/", commentsService.createComment);
commentsController.get("/", commentsService.getComments);
commentsController.put("/:commentId", commentsService.updateComment);
commentsController.delete("/:commentId", commentsService.deleteComment);

export default commentsController;
