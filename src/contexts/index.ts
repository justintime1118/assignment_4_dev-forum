import { Router } from "express";
import authController from "./auth/auth.controller";
import commentsController from "./comments/comments.controller";
import forumsController from "./forums/forums.controller";
import likesController from "./likes/likes.controller";
import postsController from "./posts/posts.controller";
import usersController from "./users/users.controller";

export const controllers = Router();

controllers.use("/auth", authController);
controllers.use("/forums", forumsController);
controllers.use("/forums/:forumName/posts", postsController);
controllers.use("/forums/:forumName/posts/:postId/likes", likesController);
controllers.use(
  "/forums/:forumName/posts/:postId/comments",
  commentsController
);
controllers.use("/users/:userId/likes", usersController);
