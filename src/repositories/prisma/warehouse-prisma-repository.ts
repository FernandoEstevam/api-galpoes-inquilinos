import { FastifyInstance } from "fastify";
import { Warehouse } from "@prisma/client";
import { WarehouseInput, WarehouseInputIdSchema, WarehouseInputParamsSchema, WarehouseInputUpdate } from "@/schemas/warehouse.schema";
import { WarehouseRepository } from "@/repositories/warehouse-repository copy";

export class PrismaWarehouseRepository implements WarehouseRepository {
  
  constructor(private app: FastifyInstance){}
  async findById({id}:WarehouseInputIdSchema): Promise<Warehouse | null> {
    return await this.app.prisma.warehouse.findUnique({ where: { id } })
  }

  async delete({id}:WarehouseInputIdSchema): Promise<void> {
    await this.app.prisma.warehouse.delete({ where: { id } })
  }

  async update({id}: WarehouseInputIdSchema, data: WarehouseInputUpdate): Promise<Warehouse> {
    return await this.app.prisma.warehouse.update({ where: {id}, data })
  }

  async findByIdOrCode(where: WarehouseInputParamsSchema):Promise<Warehouse | null> {
    return await this.app.prisma.warehouse.findFirst({ where })
  }

  async create(data: WarehouseInput) {
    await this.app.prisma.warehouse.create({ data })
  }

  async findAll(): Promise<Warehouse[]> {
    return await this.app.prisma.warehouse.findMany() 
  }
}