import { FastifyInstance } from "fastify"
import { CrateTenantUseCase } from "@/usecases/tenant/tenan.create"
import { PrismaTenantRepository } from "@/repositories/prisma/tenant-prisma-repository"
import { FindAllTenantUseCase } from "@/usecases/tenant/tenan.findAll"
import { FindByIdOrDocumentTenantUseCase } from "@/usecases/tenant/tenan.findByDocument"
import { DeleteTenantUseCase } from "@/usecases/tenant/tenant.delete"
import { UpdateTenantUseCase } from "@/usecases/tenant/tenan.update"

export function makeCreateTenantUseCase(app: FastifyInstance) {
  const tenantRepository = new PrismaTenantRepository(app)
  return new CrateTenantUseCase(tenantRepository)
}

export function makeListTenantUseCase(app: FastifyInstance) {
  const tenantRepository = new PrismaTenantRepository(app)
  return new FindAllTenantUseCase(tenantRepository)
}

export function makefindByDocumentTenantUseCase(app: FastifyInstance) {
  const tenantRepository = new PrismaTenantRepository(app)
  return new FindByIdOrDocumentTenantUseCase(tenantRepository)
}

export function makeDeleteTenantUseCase(app: FastifyInstance) {
  const tenantRepository = new PrismaTenantRepository(app)
  return new DeleteTenantUseCase(tenantRepository)
}


export function makeUpdateTenantUseCase(app: FastifyInstance) {
  const tenantRepository = new PrismaTenantRepository(app)
  return new UpdateTenantUseCase(tenantRepository)
}
