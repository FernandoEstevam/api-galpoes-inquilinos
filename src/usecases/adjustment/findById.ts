import { adjustmentId, AdjustmentId, AdjustmentOutput } from "@/schemas/adjustment.schema";
import { BaseUseCase } from "../base.usecase";
import { FastifyInstance } from "fastify/types/instance";
import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";
import { NotFoundError } from "@/errors/not-found.error";

export class AdjustmentFindById extends BaseUseCase<AdjustmentId, AdjustmentOutput> {
  private repository: PrismaAdjustmentRepository

  constructor(private app: FastifyInstance) {
    super()
    this.repository = new PrismaAdjustmentRepository(this.app)
  }

  async execute(id: AdjustmentId): Promise<AdjustmentOutput> {
    this.process(id)

    const adjustment = await this.repository.findById(id)

    if (!adjustment) throw new NotFoundError('Adjustment não encontrado!')

    return adjustment

  }

  protected process(id: AdjustmentId): void {
    adjustmentId.parse(id)
  }
}