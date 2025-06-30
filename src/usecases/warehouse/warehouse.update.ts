import { WarehouseNotFoundError } from "@/erros/warehouse/warehouse.notfound"
import { WarehouseRepository } from "@/repositories/rentalContract-repository"
import { WarehouseInputIdSchema, WarehouseInputUpdate, WarehouseOutput } from "@/schemas/warehouse.schema"
import { cleanObject } from "@/utils/cleanObject"

export class UpdateWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

  async execute({id}:WarehouseInputIdSchema ,data: WarehouseInputUpdate): Promise<WarehouseOutput> {
    const warehouseExists = await this.warehouseRepository.findById({id})
    if (!warehouseExists) throw new WarehouseNotFoundError()

    return await this.warehouseRepository.update({id},data)
  }
}