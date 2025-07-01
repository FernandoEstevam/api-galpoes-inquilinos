import { RentalContractInput, RentalContractInputParamsId, RentalContractInputUpdate, RentalContractOutput } from "@/schemas/rentalContract.schema"
import { RentalContract } from "@prisma/client"

export interface RentalContractRepository {
  findById({ id }: RentalContractInputParamsId): Promise<RentalContractOutput | null>
  create(data: RentalContractInput): Promise<void>
  findAll(): Promise<RentalContractOutput[]>
  delete({ id }: RentalContractInputParamsId): Promise<void>
  update({ id }: RentalContractInputParamsId, data: RentalContractInputUpdate): Promise<RentalContractOutput>
}