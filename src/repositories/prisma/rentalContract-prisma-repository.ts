import { FastifyInstance } from "fastify";
import { RentalContractRepository } from "../rentalContract-repository";
import { RentalContractInput, RentalContractInputParamsId, RentalContractInputUpdate, RentalContractOutput } from "@/schemas/rentalContract.schema";

export class PrismaRentalContractRepository implements RentalContractRepository {

  constructor(private app: FastifyInstance) { }

  async findById(id: RentalContractInputParamsId): Promise<RentalContractOutput | null> {
    return await this.app.prisma.rentalContract.findUnique({ where: id })
  }

  async delete({ id }: RentalContractInputParamsId): Promise<void> {
    await this.app.prisma.rentalContract.delete({ where: { id } })
  }

  async update({ id }: RentalContractInputParamsId, data: RentalContractInputUpdate): Promise<RentalContractOutput> {
    return await this.app.prisma.rentalContract.update({ where: { id }, data })
  }

  async create(data: RentalContractInput): Promise<void> {
    await this.app.prisma.rentalContract.create({ data })
  }

  async findAll(): Promise<RentalContractOutput[]> {
    return await this.app.prisma.rentalContract.findMany()
  }
}