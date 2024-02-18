import { Comments } from "@prisma/client";
import { Request, Response } from "express";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";
import { APIResponse } from "./../types/apiResponse.type";
import commentsRepository from "./comments.repository";

class CommentsService {
  async createComment(req: Request, res: Response) {
    const { content, authorId, postId } = req.body as Comments;
    let response: APIResponse;

    try {
      const newComments = await commentsRepository.insertComment(
        content,
        authorId,
        postId
      );
      response = createSuccessResponse(newComments);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async getComments(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    let response: APIResponse;

    try {
      const comments = await commentsRepository.findAllCommentsByPostId(postId);
      response = createSuccessResponse(comments);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }

  async updateComment(req: Request, res: Response) {
    const commentId = Number(req.params.commentId);
    const { content, authorId, postId } = req.body as Comments;
    let response: APIResponse;
    try {
      const updatedComments = await commentsRepository.updateComment(
        commentId,
        content,
        authorId,
        postId
      );
      response = createSuccessResponse(updatedComments);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }

  async deleteComment(req: Request, res: Response) {
    const commentId = Number(req.params.commentId);
    let response: APIResponse;

    try {
      const post = await commentsRepository.deleteComment(commentId);
      response = createSuccessResponse(post);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }
}

const commentsService = new CommentsService();

export default commentsService;
