import { UsersRepository } from "../users-repository";
import { prisma } from "../../lib/prisma";
import { User } from "../../entities/user";
import { Role } from "../../entities/role";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password_hash,
      role: user.role as Role,
      createdAt: user.created_at,
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password_hash,
      role: user.role as Role,
      createdAt: user.created_at,
    };
  }

  async create(user: User): Promise<User> {
    await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        password_hash: user.passwordHash,
        role: user.role,
        created_at: user.createdAt,
      },
    });

    return user;
  }
}
