import prismaCient from "../../prisma/client.prisma";

class UsersRepository {
  async insertUser(email: string, encryptedPassword: string) {
    const newUser = await prismaCient.users.create({
      data: { email, encryptedPassword },
      select: { id: true, email: true, createdAt: true },
    });
    return newUser;
  }

  async findUserByEmail(email: string) {
    const newUser = await prismaCient.users.findUnique({
      where: { email: email },
    });
    return newUser;
  }

  async findAllUsers() {
    const users = await prismaCient.users.findMany();
    return users;
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
