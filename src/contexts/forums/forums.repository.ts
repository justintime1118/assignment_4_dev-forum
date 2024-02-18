import prismaClient from "../../prisma/client.prisma";

class ForumsRepository {
  async findAllForums() {
    const forums = await prismaClient.forums.findMany();
    return forums;
  }

  async findPostsFromEachForumByPage(page: number) {
    const pageSize = 10;

    const allPosts = await prismaClient.forums.findMany({
      include: {
        posts: {
          orderBy: {
            updatedAt: "desc",
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        },
      },
    });

    // 결과를 Forum 별로 정리
    const postsByForum = allPosts.map((forum) => {
      return {
        forumName: forum.name,
        posts: forum.posts,
      };
    });
    console.log(postsByForum);
    return postsByForum;
  }
}

const forumsRepository = new ForumsRepository();

export default forumsRepository;
