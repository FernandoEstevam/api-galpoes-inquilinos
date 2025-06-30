import { FastifyInstance } from "fastify";
import { TenantRepository } from "../tenant-repository";
import { TenantInput, TenantInputIdSchema, TenantInputParamsSchema, TenantInputUpdate } from "../../schemas/tenant.schema";
import { Tenant } from "@prisma/client";

export class PrismaTenantRepository implements TenantRepository {
  
  constructor(private app: FastifyInstance){}
  async findById({id}: TenantInputIdSchema): Promise<Tenant | null> {
    return await this.app.prisma.tenant.findUnique({ where: { id } })
  }

  async delete({id}:TenantInputIdSchema): Promise<void> {
    await this.app.prisma.tenant.delete({ where: { id } })
  }

  async update({id}: TenantInputIdSchema, data: TenantInputUpdate): Promise<Tenant> {
    return await this.app.prisma.tenant.update({ where: {id}, data })
  }

  async findByIdOrDocument(where: TenantInputParamsSchema) {
    return await this.app.prisma.tenant.findFirst({ where })
  }

  async create(data: TenantInput) {
    await this.app.prisma.tenant.create({ data })
  }

  async findAll() {
    return await this.app.prisma.tenant.findMany() 
  }
}