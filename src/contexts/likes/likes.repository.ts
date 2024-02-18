import prismaClient from "../../prisma/client.prisma";

class LikesRepository {
  async createLike(userId: number, postId: number) {
    const newLike = await prismaClient.likes.create({
      data: { userId: userId, postId: postId },
    });
    return newLike;
  }

  async deleteLike(userId: number, postId: number) {
    const deletedLike = await prismaClient.likes.delete({
      where: { likeId: { userId: userId, postId: postId } },
    });
    return deletedLike;
  }
}

const likesRepository = new LikesRepository();

export default likesRepository;
