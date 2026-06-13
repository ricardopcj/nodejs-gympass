import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsService } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe("Ger User Metrics Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    await checkInsRepository.create({
      id: "check-in-01",
      gymId: "gym-01",
      userId: "user-01",
      createdAt: new Date(),
      validatedAt: null,
    });

    await checkInsRepository.create({
      id: "check-in-02",
      gymId: "gym-02",
      userId: "user-01",
      createdAt: new Date(),
      validatedAt: null,
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
