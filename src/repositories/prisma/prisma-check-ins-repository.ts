import { prisma } from "../../lib/prisma";
import { CheckInsRepository } from "../../repositories/check-ins-repository";
import { CheckIn } from "../../entities/check-in";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  private toEntity(checkIn: any): CheckIn {
    return {
      id: checkIn.id,
      userId: checkIn.user_id,
      gymId: checkIn.gym_id,
      createdAt: checkIn.created_at,
      validatedAt: checkIn.validated_at,
    };
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } });
    if (!checkIn) return null;
    return this.toEntity(checkIn);
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    if (!checkIn) return null;
    return this.toEntity(checkIn);
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * 20,
      take: 20,
    });

    return checkIns.map((checkIn) => this.toEntity(checkIn));
  }

  async countByUserId(userId: string): Promise<number> {
    return prisma.checkIn.count({ where: { user_id: userId } });
  }

  async create(checkIn: CheckIn): Promise<CheckIn> {
    await prisma.checkIn.create({
      data: {
        id: checkIn.id,
        user_id: checkIn.userId,
        gym_id: checkIn.gymId,
        created_at: checkIn.createdAt,
        validated_at: checkIn.validatedAt,
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn): Promise<CheckIn> {
    const updated = await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: { validated_at: checkIn.validatedAt },
    });

    return this.toEntity(updated);
  }
}
