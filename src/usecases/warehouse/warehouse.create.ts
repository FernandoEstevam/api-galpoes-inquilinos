import { WarehouseInput } from "@/schemas/warehouse.schema";
import { WarehouseRepository } from "@/repositories/rentalContract-repository";
import { WarehouseAlreadyExistsError } from "@/erros/warehouse/warehouse.alreadyExists";

export class CrateWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

   async execute(data: WarehouseInput): Promise<void> {
      const tenantExists = await this.warehouseRepository.findByIdOrCode({code: data.code})
    if (tenantExists) throw new WarehouseAlreadyExistsError()

    await this.warehouseRepository.create({
      name: data.name,
      code: data.code,
      address: data.address,
      areaM2: data.areaM2,
      description: data.description
    })
  }
}