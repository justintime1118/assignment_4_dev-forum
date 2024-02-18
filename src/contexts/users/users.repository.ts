import prismaCient from "../../prisma/client.prisma";

class UsersRepository {
  async insertUser(email: string, encryptedPassword: string) {
    try {
      const newUser = await prismaCient.users.create({
        data: { email, encryptedPassword },
        select: { id: true, email: true, createdAt: true },
      });
      return newUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findUserByEmail(email: string) {
    try {
      const newUser = await prismaCient.users.findUnique({
        where: { email: email },
      });
      return newUser;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findAllUsers() {
    try {
      const users = await prismaCient.users.findMany();
      return users;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async updateUser() {}

  async deleteUser() {}
}

const usersRepository = new UsersRepository();

export default usersRepository;
