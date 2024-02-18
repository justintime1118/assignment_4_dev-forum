import { Request, Response } from "express";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { APIResponse } from "../types/apiResponse.type";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";
import forumsRepository from "./forums.repository";

class ForumsService {
  async getForums(req: Request, res: Response) {
    let response: APIResponse;
    try {
      const forums = await forumsRepository.findAllForums();
      response = createSuccessResponse(forums);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async getPostsFromEachForumByPage(req: Request, res: Response) {
    const page = Number(req.query.page);

    let response: APIResponse;
    try {
      const posts = await forumsRepository.findPostsFromEachForumByPage(page);
      response = createSuccessResponse(posts);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }
}

const forumsService = new ForumsService();

export default forumsService;
