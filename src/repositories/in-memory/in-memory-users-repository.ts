import { User } from "../../entities/user";
import { UsersRepository } from "../users-repository";

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);
    if (!user) return null;
    return user;
  }

  async create(user: User) {
    this.items.push(user);
    return user;
  }
}
