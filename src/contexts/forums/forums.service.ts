import { Request, Response } from "express";
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
      response = createErrorResponse("Prisma error");
    }
    res.json(response);
  }
}

const forumsService = new ForumsService();

export default forumsService;
