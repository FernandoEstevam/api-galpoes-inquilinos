import { RentalContractInput, RentalContractInputParamsId, RentalContractInputUpdate } from "@/schemas/rentalContract.schema"
import { RentalContract } from "@prisma/client"

export interface RentalContractRepository {
  findById({id}: RentalContractInputParamsId): Promise<RentalContract | null>
  create(data: RentalContractInput): Promise<void>
  findAll(): Promise<RentalContract[]>
  delete({id}:RentalContractInputParamsId): Promise<void>
  update({id}:RentalContractInputParamsId, data: RentalContractInputUpdate):Promise<RentalContract> 
}