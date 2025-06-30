import { Tenant } from "@prisma/client";
import { TenantNotFoundError } from "../../erros/tenant/tenant.notfound";
import { TenantRepository } from "../../repositories/tenant-repository";
import { TenantInput, TenantInputParamsSchema } from "../../schemas/tenant.schema";

export class FindByIdOrDocumentTenantUseCase {
  constructor(private tenantRepository: TenantRepository ){}

   async execute(where: TenantInputParamsSchema): Promise<Tenant> {
    
    const tenantExists = await this.tenantRepository.findByIdOrDocument(where)
    
    if (!tenantExists) throw new TenantNotFoundError()
    
    return tenantExists
  }
}