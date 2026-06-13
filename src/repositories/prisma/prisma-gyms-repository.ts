import { prisma } from "../../lib/prisma";
import { GymsRepository, FindManyNearbyParams } from "../gyms-repository";
import { Gym } from "../../entities/gym";

export class PrismaGymsRepository implements GymsRepository {
  private toEntity(gym: any): Gym {
    return {
      id: gym.id,
      title: gym.title,
      description: gym.description,
      phone: gym.phone,
      latitude: gym.latitude.toNumber(),
      longitude: gym.longitude.toNumber(),
    };
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({ where: { id } });
    if (!gym) return null;
    return this.toEntity(gym);
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE (
        6371 * acos(
          cos(radians(${latitude}))
          * cos(radians(latitude))
          * cos(radians(longitude) - radians(${longitude}))
          + sin(radians(${latitude}))
          * sin(radians(latitude))
        )
      ) <= 10
    `;
    return gyms;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: { title: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    });
    return gyms.map((gym) => this.toEntity(gym));
  }

  async create(gym: Gym): Promise<Gym> {
    await prisma.gym.create({ data: gym });
    return gym;
  }
}
