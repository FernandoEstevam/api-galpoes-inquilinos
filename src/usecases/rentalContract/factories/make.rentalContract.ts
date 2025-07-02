import { PrismaRentalContractRepository } from "@/repositories/prisma/rentalContract-prisma-repository"
import { FastifyInstance } from "fastify"
import { CrateRentalContractUseCase } from "@/usecases/rentalContract/rentalContract.create"
import { FindAllRentalContractUseCase } from "@/usecases/rentalContract/rentalContract.findAll"
import { UpdateRentalContractUseCase } from "@/usecases/rentalContract/rentalContract.update"
import { DeleteRentalContractUseCase } from "@/usecases/rentalContract/rentalContract.delete"
import { FindByIdRentalContractUseCase } from "@/usecases/rentalContract/rentalContract.findById"

export class MakeRentalContract {
  private prismaRentalContractRepository: PrismaRentalContractRepository
  constructor(private app: FastifyInstance) {
    this.prismaRentalContractRepository = new PrismaRentalContractRepository(this.app)
  }

  create() {
    return new CrateRentalContractUseCase(this.prismaRentalContractRepository)
  }

  list() {
    return new FindAllRentalContractUseCase(this.prismaRentalContractRepository)
  }

  findById() {
    return new FindByIdRentalContractUseCase(this.prismaRentalContractRepository)
  }

  update() {
    return new UpdateRentalContractUseCase(this.prismaRentalContractRepository)
  }

  delete() {
    return new DeleteRentalContractUseCase(this.prismaRentalContractRepository)
  }
}

