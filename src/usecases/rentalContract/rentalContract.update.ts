export class UpdateRentalContractUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

  async execute({id}:WarehouseInputIdSchema ,data: WarehouseInputUpdate): Promise<WarehouseOutput> {
    const warehouseExists = await this.warehouseRepository.findById({id})
    if (!warehouseExists) throw new WarehouseNotFoundError()

    return await this.warehouseRepository.update({id},data)
  }
}