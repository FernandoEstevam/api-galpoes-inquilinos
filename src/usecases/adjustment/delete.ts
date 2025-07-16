import { adjustmentId, AdjustmentId } from "@/schemas/adjustment.schema";
import { BaseUseCase } from "../base.usecase";
import { FastifyTypeInstance } from "@/types/fastify";
import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";
import { AdjustmentFindById } from "./findById";

export class AdjustmentDelete extends BaseUseCase<AdjustmentId, void> {

  private repository: PrismaAdjustmentRepository
  private adjustmentById: AdjustmentFindById
  constructor(
    private app: FastifyTypeInstance
  ) {
    super()
    this.repository = new PrismaAdjustmentRepository(this.app)
    this.adjustmentById = new AdjustmentFindById(this.app)
  }

  async execute(input: AdjustmentId): Promise<void> {
    await this.process(input)

    await this.repository.delete(input)
  }

  protected async process(input: AdjustmentId): Promise<void> {
    const { id } = adjustmentId.parse(input)

    await this.adjustmentById.execute({ id })

  }
}