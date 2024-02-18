import prismaClient from "../../prisma/client.prisma";

class UsersRepository {
  async insertUser(email: string, encryptedPassword: string) {
    const newUser = await prismaClient.users.create({
      data: { email, encryptedPassword },
      select: { id: true, email: true, createdAt: true },
    });
    return newUser;
  }

  async findUserByEmail(email: string) {
    const newUser = await prismaClient.users.findUnique({
      where: { email: email },
    });
    return newUser;
  }

  async findAllUsers() {
    const users = await prismaClient.users.findMany();
    return users;
  }

  async findAllLikedPostsByUserId(userId: number) {
    const likedPosts = await prismaClient.likes.findMany({
      where: {
        userId: userId,
      },
      select: {
        posts: {},
      },
    });

    console.log(likedPosts);
    return likedPosts;
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
