import { Adjustment } from "@prisma/client";
import { BaseRepository } from "../base-repository";
import { AdjustmentCreateInput, AdjustmentId, AdjustmentOutputResponseCreate, AdjustmentUpdateInput } from "@/schemas/adjustment.schema";
import { FastifyInstance } from "fastify";

export class PrismaAdjustmentRepository extends BaseRepository<
  Adjustment,
  AdjustmentCreateInput,
  AdjustmentUpdateInput,
  AdjustmentId> {
  constructor(private app: FastifyInstance) {
    super()
  }

  async findById(id: AdjustmentId): Promise<Adjustment | null> {
    return await this.app.prisma.adjustment.findFirst({ where: id })
  }

  async findAll(): Promise<Adjustment[]> {
    return await this.app.prisma.adjustment.findMany();
  }

  async create(data: AdjustmentCreateInput): Promise<Adjustment> {
    return await this.app.prisma.adjustment.create({ data })
  }

  async update(id: AdjustmentId, data: AdjustmentUpdateInput): Promise<Adjustment> {
    return await this.app.prisma.adjustment.update({ where: id, data })
  }

  async delete(id: AdjustmentId): Promise<void> {
    await this.app.prisma.adjustment.delete({ where: id })
  }

}