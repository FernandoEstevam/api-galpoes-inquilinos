import { TenantNotFoundError } from "../../erros/tenant/tenant.notfound";
import { TenantRepository } from "../../repositories/tenant-repository";
import { TenantInputIdSchema } from "../../schemas/tenant.schema";

export class DeleteTenantUseCase {
  constructor(private tenantRepository: TenantRepository ){}

   async execute({id}:TenantInputIdSchema): Promise<void> {
      const tenantExists = await this.tenantRepository.findById({id})
      if (!tenantExists) throw new TenantNotFoundError()

      await this.tenantRepository.delete({id})
  }
}