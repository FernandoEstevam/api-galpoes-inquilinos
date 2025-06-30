import { TenantNotFoundError } from "../../erros/tenant/tenant.notfound";
import { TenantRepository } from "../../repositories/tenant-repository";
import { TenantInput, TenantInputIdSchema, TenantInputParamsSchema, TenantInputUpdate, TenantOutputSchema } from "../../schemas/tenant.schema";

export class UpdateTenantUseCase {
  constructor(private tenantRepository: TenantRepository ){}

   async execute({id}:TenantInputIdSchema ,data: TenantInputUpdate): Promise<TenantOutputSchema> {
      const tenantExists = await this.tenantRepository.findById({id})
      if (!tenantExists) throw new TenantNotFoundError()

      return await this.tenantRepository.update({id},{
        name: data.name,
        document: data.document,
        phone: data.phone,
        address: data.address,
        email: data.email
      })
  }
}