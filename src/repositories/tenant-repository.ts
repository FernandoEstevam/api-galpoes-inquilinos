import { Tenant } from "@prisma/client"
import { TenantInput, TenantInputIdSchema, TenantInputParamsSchema, TenantInputUpdate } from "../schemas/tenant.schema"

export interface TenantRepository {
  findByIdOrDocument(where: TenantInputParamsSchema): Promise<Tenant | null>
  create(data: TenantInput): Promise<void>
  findAll(): Promise<Tenant[]>
  findById({id}: TenantInputIdSchema): Promise<Tenant | null>
  delete({id}:TenantInputIdSchema): Promise<void>
  update({id}:TenantInputIdSchema, data: TenantInputUpdate):Promise<Tenant> 
}