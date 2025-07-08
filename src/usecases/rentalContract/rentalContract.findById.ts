import { BaseUseCase } from "../base.usecase"
import { FastifyInstance } from "fastify"
import { PrismaRentalContractRepository } from "@/repositories/prisma/rentalContract-prisma-repository"
import { RentalContractInputParamsId, RentalContractOutput } from "@/schemas/rentalContract.schema";
import { ConflictError } from "@/errors/conflict.error";

export class RentalContractFindById extends BaseUseCase<RentalContractInputParamsId, RentalContractOutput | null> {

  private readonly repository: PrismaRentalContractRepository
  constructor(
    private app: FastifyInstance
  ) {
    super()
    this.repository = new PrismaRentalContractRepository(this.app)
  }

  async execute(input: RentalContractInputParamsId): Promise<RentalContractOutput | null> {

    this.process(input)

    const rentalContract = await this.repository.findById(input)

    if (!rentalContract) return null

    return rentalContract

  }

  protected process({ id }: RentalContractInputParamsId): void {

    if (typeof id !== "string") {
      throw new ConflictError('Id Rental Contract não é válido!')
    }

  }


}