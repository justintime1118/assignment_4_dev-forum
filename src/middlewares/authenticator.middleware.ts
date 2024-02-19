import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APIResponse } from "../contexts/types/apiResponse.type";
import usersRepository from "../contexts/users/users.repository";
import { createErrorResponse } from "../contexts/utils/utils";

const openedRoutes = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/forums/posts",
  "/forums/:forumId/posts",
];

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 토큰 발급을 위해서 온거면 그냥 pass
  if (openedRoutes.includes(req.url)) {
    return next();
  }

  const accessToken = req.headers.authorization?.split("Bearer ")[1];

  let response: APIResponse;

  // 토큰이 없으면 block
  if (!accessToken) {
    res.status(401);
    response = createErrorResponse("no token");
    return res.json(response);
  }

  // 토큰이 있지만 유효하지 않다면 block
  try {
    const { sub: email } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY as string
    );
    const user = await usersRepository.findUserByEmail(email as string);
    if (!user) {
      res.status(401);
      response = createErrorResponse("user with given email doesn't exist");
      return res.json(response);
    }

    req.user = { id: user.id, email: user.email };
  } catch (e) {
    res.status(401);
    response = createErrorResponse("invalid token");
    return res.json(response);
  }
  next();
}
