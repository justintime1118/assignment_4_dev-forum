import prismaClient from "../../prisma/client.prisma";

class ForumsRepository {
  async findAllForums() {
    const forums = await prismaClient.forums.findMany();
    return forums;
  }
}

const forumsRepository = new ForumsRepository();

export default forumsRepository;
