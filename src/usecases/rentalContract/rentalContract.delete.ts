export class DeleteRentalContractUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

   async execute({id}:WarehouseInputIdSchema): Promise<void> {
      const warehouseExists = await this.warehouseRepository.findById({id})
      if (!warehouseExists) throw new WarehouseNotFoundError()

      await this.warehouseRepository.delete({id})
  }
}