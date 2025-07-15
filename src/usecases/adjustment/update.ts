import { adjustmentId, AdjustmentId, AdjustmentOutput, AdjustmentUpdateInput, adjustmentUpdateInput } from "@/schemas/adjustment.schema";
import { BaseUseCase } from "../base.usecase";
import { FastifyTypeInstance } from "@/types/fastify";
import { AdjustmentFindById } from "./findById";
import { id } from "zod/v4/locales";
import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";

export class AdjustmentUpdate extends BaseUseCase<{ id: AdjustmentId, data: AdjustmentUpdateInput }, AdjustmentOutput> {

  private adjustmentById: AdjustmentFindById
  private repository: PrismaAdjustmentRepository

  constructor(
    private app: FastifyTypeInstance
  ) {
    super()
    this.adjustmentById = new AdjustmentFindById(this.app)
    this.repository = new PrismaAdjustmentRepository(this.app)
  }


  async execute(input: { id: AdjustmentId; data: AdjustmentUpdateInput; }): Promise<AdjustmentOutput> {
    this.process({ id: input.id, data: input.data })

    const adjustment = await this.repository.update(input.id, input.data)

    return adjustment

  }

  protected async process(input: { id: AdjustmentId, data: AdjustmentUpdateInput }): Promise<void> {
    adjustmentId.parse(input.id)
    adjustmentUpdateInput.parse(input.data)

    await this.adjustmentById.execute(input.id)

  }
}