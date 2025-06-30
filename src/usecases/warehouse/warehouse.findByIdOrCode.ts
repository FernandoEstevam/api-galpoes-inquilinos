import { WarehouseNotFoundError } from "@/erros/warehouse/warehouse.notfound"
import { WarehouseRepository } from "@/repositories/rentalContract-repository"
import { WarehouseInputParamsSchema, WarehouseOutput } from "@/schemas/warehouse.schema"

export class FindByIdOrCodeWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

   async execute(where: WarehouseInputParamsSchema): Promise<WarehouseOutput> {
    
    const warehouseExists = await this.warehouseRepository.findByIdOrCode(where)
    
    if (!warehouseExists) throw new WarehouseNotFoundError()
    
    return warehouseExists
  }
}