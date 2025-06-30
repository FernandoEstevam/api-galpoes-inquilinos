import { FastifyInstance } from "fastify"

export class MakeRentalContract {
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

