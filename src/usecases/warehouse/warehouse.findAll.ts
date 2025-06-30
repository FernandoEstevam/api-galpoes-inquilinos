import { WarehouseRepository } from "@/repositories/rentalContract-repository";
import { Warehouse } from "@prisma/client";

export class FindAllWarehouseUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}
   async execute(): Promise<Warehouse[]> {
    return await this.warehouseRepository.findAll()
  }
}