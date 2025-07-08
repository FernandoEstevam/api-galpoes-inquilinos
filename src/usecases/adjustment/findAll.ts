import { AdjustmentOutput, AdjustmentOutputAll, AdjustmentUpdateInput } from "@/schemas/adjustment.schema";
import { BaseUseCase } from "../base.usecase";
import { FastifyInstance } from "fastify";
import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";

export class AdjustmentFindAll extends BaseUseCase<void, AdjustmentOutputAll> {

  private repository: PrismaAdjustmentRepository

  constructor(
    private readonly app: FastifyInstance
  ) {
    super()
    this.repository = new PrismaAdjustmentRepository(this.app)
  }

  async execute(): Promise<AdjustmentOutputAll> {
    this.process()

    const adjustments = await this.repository.findAll()

    return adjustments
  }

  protected process(): void { }
}