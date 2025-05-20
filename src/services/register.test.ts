import { beforeEach, describe, expect, it } from "vitest";
import { compare } from "bcryptjs";
import { RegisterService } from "./register";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUserRepository;
let sut: RegisterService;

describe("Register Service", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository();
    sut = new RegisterService(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPassordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPassordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const email = "johndoe@example.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
