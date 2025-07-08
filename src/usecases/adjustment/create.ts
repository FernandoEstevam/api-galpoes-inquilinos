import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";
import { BaseUseCase } from "../base.usecase";
import { adjustmentCreateInput, AdjustmentCreateInput, AdjustmentOutputResponseCreate } from "@/schemas/adjustment.schema";
import { ConflictError } from "@/errors/conflict.error";
import { FastifyInstance } from "fastify";
import { RentalContractFindById } from "../rentalContract/rentalContract.findById";

export class AdjustmentCreate extends BaseUseCase<AdjustmentCreateInput, AdjustmentOutputResponseCreate> {

  private readonly repository: PrismaAdjustmentRepository
  private rentalContract: RentalContractFindById
  constructor(
    private app: FastifyInstance
  ) {
    super()
    this.repository = new PrismaAdjustmentRepository(this.app)
    this.rentalContract = new RentalContractFindById(this.app)
  }

  async execute(input: AdjustmentCreateInput): Promise<AdjustmentOutputResponseCreate> {

    await this.process(input)

    const adjustment = await this.repository.create(input)

    return adjustment
  }

  protected async process(input: AdjustmentCreateInput): Promise<void> {

    const result = adjustmentCreateInput.parse(input)

    const rentalContractExists = await this.rentalContract.execute({ id: result.rentalContractId })

    if (!rentalContractExists) {
      throw new ConflictError('ID Rental Contract não existe!')
    }

    if (result.newValue <= result.oldValue) {
      throw new ConflictError("O novo valor deve ser maior que o valor antigo");
    }

  }
}
