export class FindAllRentalContractUseCase {
  constructor(private warehouseRepository: WarehouseRepository ){}
   async execute(): Promise<Warehouse[]> {
    return await this.warehouseRepository.findAll()
  }
}