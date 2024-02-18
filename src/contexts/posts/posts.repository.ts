import prismaClient from "../../prisma/client.prisma";

class PostsRepository {
  async insertPost(
    title: string,
    content: string,
    forumId: number,
    authorId: number
  ) {
    const newPost = await prismaClient.posts.create({
      data: { title, content, forumId, authorId },
    });
    return newPost;
  }

  async findAllPostsByForumIdOrderByUpdatedAt(forumId: number) {
    const posts = await prismaClient.posts.findMany({
      where: { forumId: forumId },
      orderBy: { updatedAt: "desc" },
    });
    return posts;
  }

  async findPostByPostId(postId: number) {
    const post = await prismaClient.posts.findUnique({
      where: { id: postId },
    });
    return post;
  }

  async updatePost(
    postId: number,
    title: string,
    content: string,
    forumId: number,
    authorId: number
  ) {
    const post = await prismaClient.posts.update({
      data: {
        title: title,
        content: content,
        forumId: forumId,
        authorId: authorId,
      },
      where: { id: postId },
    });
    return post;
  }

  async deletePost(postId: number) {
    const post = await prismaClient.posts.delete({
      where: { id: postId },
    });
    return post;
  }
}

const postsRepository = new PostsRepository();

export default postsRepository;
