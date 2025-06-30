export class FindByIdRentalContractUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}

   async execute(where: WarehouseInputParamsSchema): Promise<WarehouseOutput> {
    
    const warehouseExists = await this.warehouseRepository.findByIdOrCode(where)
    
    if (!warehouseExists) throw new WarehouseNotFoundError()
    
    return warehouseExists
  }
}