import { RentalContractInput, RentalContractInputParamsId, RentalContractInputUpdate, RentalContractOutput } from "@/schemas/rentalContract.schema"


export interface RentalContractRepository {
  findById({ id }: RentalContractInputParamsId): Promise<RentalContractOutput | null>
  create(data: RentalContractInput): Promise<void>
  findAll(): Promise<RentalContractOutput[]>
  delete({ id }: RentalContractInputParamsId): Promise<void>
  update({ id }: RentalContractInputParamsId, data: RentalContractInputUpdate): Promise<RentalContractOutput>
}