import { FastifyInstance } from "fastify"
import { CrateWarehouseUseCase } from "@/usecases/warehouse/warehouse.create"
import { PrismaWarehouseRepository } from "@/repositories/prisma/warehouse-prisma-repository"
import { DeleteWarehouseUseCase } from "@/usecases/warehouse/warehouse.delete"
import { FindAllWarehouseUseCase } from "@/usecases/warehouse/warehouse.findAll"
import { FindByIdOrCodeWarehouseUseCase } from "@/usecases/warehouse/warehouse.findByIdOrCode"
import { UpdateWarehouseUseCase } from "@/usecases/warehouse/warehouse.update"


export class MakeWarehouse {
  private prismaWarehouseRepository: PrismaWarehouseRepository
  constructor(private app: FastifyInstance){
    this.prismaWarehouseRepository = new PrismaWarehouseRepository(this.app)
  }

  create() {
    return new CrateWarehouseUseCase(this.prismaWarehouseRepository)
  }

  list() {
    return new FindAllWarehouseUseCase(this.prismaWarehouseRepository)
  }

  findByIdOrCode() {
    return new FindByIdOrCodeWarehouseUseCase(this.prismaWarehouseRepository)
  }

  update() {
     return new UpdateWarehouseUseCase(this.prismaWarehouseRepository)
  }

  delete() {
    return new DeleteWarehouseUseCase(this.prismaWarehouseRepository)
  }
}

