import { Request, Response } from "express";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { APIResponse } from "../types/apiResponse.type";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";
import usersRepository from "./users.repository";

class UsersService {
  async getUsers(req: Request, res: Response) {
    let response: APIResponse;

    try {
      const users = await usersRepository.findAllUsers();
      response = createSuccessResponse(users);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async getLikedPostsByUser(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    let response: APIResponse;

    try {
      const likes = await usersRepository.findAllLikedPostsByUserId(userId);

      response = createSuccessResponse(likes);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }
}

const usersService = new UsersService();

export default usersService;
