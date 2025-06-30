import { TenantAlreadyExistsError } from "../../erros/tenant/tenant.alreadyExists";
import { TenantRepository } from "../../repositories/tenant-repository";
import { TenantInput } from "../../schemas/tenant.schema";

export class CrateTenantUseCase {
  constructor(private tenantRepository: TenantRepository ){}

   async execute(data: TenantInput): Promise<void> {
      const tenantExists = await this.tenantRepository.findByIdOrDocument({document: data.document})
    if (tenantExists) throw new TenantAlreadyExistsError()

    await this.tenantRepository.create({
      name: data.name,
      document: data.document,
      phone: data.phone,
      address: data.address,
      email: data.email
    })
  }
}