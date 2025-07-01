import { NotFoundError } from "@/errors/not-found.error"
import { RentalContractRepository } from "@/repositories/rentalContract-repository"
import { RentalContractInputParamsId, RentalContractInputUpdate, RentalContractOutput } from "@/schemas/rentalContract.schema"

export class UpdateRentalContractUseCase {
  constructor(private rentalContractRepository: RentalContractRepository) { }

  async execute({ id }: RentalContractInputParamsId, data: RentalContractInputUpdate): Promise<RentalContractOutput> {
    const rentalContractExists = await this.rentalContractRepository.findById({ id })
    if (!rentalContractExists) throw new NotFoundError('Rental Contract')

    return await this.rentalContractRepository.update({ id }, data)
  }
}