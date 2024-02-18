import { Posts } from "@prisma/client";
import { Request, Response } from "express";
import { PRISMA_ERROR } from "../../messages/error.messages";
import { createErrorResponse, createSuccessResponse } from "../utils/utils";
import { APIResponse } from "./../types/apiResponse.type";
import postsRepository from "./posts.repository";

class PostsService {
  async createPost(req: Request, res: Response) {
    const { title, content, forumId, authorId } = req.body as Posts;
    let response: APIResponse;

    try {
      const newPost = await postsRepository.insertPost(
        title,
        content,
        forumId,
        authorId
      );
      response = createSuccessResponse(newPost);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    res.json(response);
  }

  async getPosts(req: Request, res: Response) {
    const forumId = Number(req.params.forumId);
    let response: APIResponse;

    try {
      const posts = await postsRepository.findAllPostsByForumIdOrderByUpdatedAt(
        forumId
      );
      response = createSuccessResponse(posts);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }

  async getPost(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    let response: APIResponse;

    try {
      const post = await postsRepository.findPostByPostId(postId);
      response = createSuccessResponse(post);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }

  async updatePost(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    const { title, content, forumId, authorId } = req.body as Posts;
    let response: APIResponse;
    try {
      const updatedPost = await postsRepository.updatePost(
        postId,
        title,
        content,
        forumId,
        authorId
      );
      response = createSuccessResponse(updatedPost);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }

  async deletePost(req: Request, res: Response) {
    const postId = Number(req.params.postId);
    let response: APIResponse;

    try {
      const post = await postsRepository.deletePost(postId);
      response = createSuccessResponse(post);
    } catch (e) {
      res.status(500);
      response = createErrorResponse(PRISMA_ERROR);
    }
    return res.json(response);
  }
}

const postsService = new PostsService();

export default postsService;
