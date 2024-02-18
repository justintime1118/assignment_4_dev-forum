import prismaClient from "../../prisma/client.prisma";

class CommentsRepository {
  async insertComment(content: string, authorId: number, postId: number) {
    const newComment = await prismaClient.comments.create({
      data: { content, authorId, postId },
    });
    return newComment;
  }

  async findAllCommentsByPostId(postId: number) {
    const comments = await prismaClient.comments.findMany({
      where: { postId: postId },
    });
    return comments;
  }

  async findCommentByCommentsId(commentId: number) {
    const comments = await prismaClient.comments.findUnique({
      where: { id: commentId },
    });
    return comments;
  }

  async updateComment(
    commentId: number,
    content: string,
    authorId: number,
    postId: number
  ) {
    const comments = await prismaClient.comments.update({
      data: {
        content: content,
        authorId: authorId,
        postId: postId,
      },
      where: { id: commentId },
    });
    return comments;
  }

  async deleteComment(commentId: number) {
    const comments = await prismaClient.comments.delete({
      where: { id: commentId },
    });
    return comments;
  }
}

const commentsRepository = new CommentsRepository();

export default commentsRepository;
