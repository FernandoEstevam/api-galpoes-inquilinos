import { Tenant } from "@prisma/client";
import { TenantRepository } from "../../repositories/tenant-repository";

export class FindAllTenantUseCase {
  constructor(private tenantRepository: TenantRepository ){}
   async execute(): Promise<Tenant[]> {
    return await this.tenantRepository.findAll()
  }
}