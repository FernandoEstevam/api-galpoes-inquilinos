import { WarehouseNotFoundError } from "@/erros/warehouse/warehouse.notfound"
import { WarehouseRepository } from "@/repositories/rentalContract-repository"
import { WarehouseInputIdSchema } from "@/schemas/warehouse.schema"

export class DeleteWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

   async execute({id}:WarehouseInputIdSchema): Promise<void> {
      const warehouseExists = await this.warehouseRepository.findById({id})
      if (!warehouseExists) throw new WarehouseNotFoundError()

      await this.warehouseRepository.delete({id})
  }
}