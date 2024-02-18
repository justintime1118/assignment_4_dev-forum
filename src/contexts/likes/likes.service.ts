import { Request, Response } from "express";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { APIResponse } from "../types/apiResponse.type";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";
import likesRepository from "./likes.repository";

class LikesService {
  async like(req: Request, res: Response) {
    const userId = Number(req.user?.id);
    const postId = Number(req.params.postId);
    let response: APIResponse;

    try {
      const newLike = await likesRepository.createLike(userId, postId);
      response = createSuccessResponse(newLike);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async unlike(req: Request, res: Response) {
    const userId = Number(req.user?.id);
    const postId = Number(req.params.postId);
    let response: APIResponse;

    try {
      const deletedLike = await likesRepository.deleteLike(userId, postId);
      response = createSuccessResponse(deletedLike);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }
}

const likesService = new LikesService();

export default likesService;
