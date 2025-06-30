
export interface RentalContractRepository {
  findById({id}: WarehouseInputParamsSchema): Promise<Warehouse | null>
  create(data: WarehouseInput): Promise<void>
  findAll(): Promise<Warehouse[]>
  findById({id}: WarehouseInputIdSchema): Promise<Warehouse | null>
  delete({id}:WarehouseInputIdSchema): Promise<void>
  update({id}:WarehouseInputIdSchema, data: WarehouseInputUpdate):Promise<Warehouse> 
}