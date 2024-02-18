import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { APIResponse } from "../types/apiResponse.type";
import usersRepository from "../users/users.repository";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";

class AuthService {
  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    let response: APIResponse;
    try {
      const newUser = await usersRepository.insertUser(
        email,
        encryptedPassword
      );
      if (!newUser) {
        res.status(404);
        response = createErrorResponse("given email might already be occupied");
      } else {
        response = createSuccessResponse(newUser);
      }
    } catch (e) {
      console.log(e);
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    let response: APIResponse;
    // 해당 이메일로 가입된 사용자가 있는지 확인
    try {
      const user = await usersRepository.findUserByEmail(email);
      if (!user) {
        response = createErrorResponse("email doesn't exit");
        res.status(404);
        return res.json(response);
      }

      // 비밀번호가 제대로 입력되었는지 확인
      const isValid = await bcrypt.compare(password, user.encryptedPassword);
      if (!isValid) {
        res.status(404);
        response = createErrorResponse("password is invalid");
        return res.json(response);
      }

      // 엑세스 토큰 발급해서 리턴
      const accessToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET_KEY as string,
        {
          subject: user.email,
        }
      );
      response = createSuccessResponse(accessToken);
      res.json(response);
    } catch (e) {
      response = createErrorResponse(PRISMA_ERROR);
      res.status(500);
      return res.json(response);
    }
  }
}

const authService = new AuthService();

export default authService;
