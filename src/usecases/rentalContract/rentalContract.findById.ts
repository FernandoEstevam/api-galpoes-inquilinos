import { NotFoundError } from "@/errors/not-found.error"
import { RentalContractRepository } from "@/repositories/rentalContract-repository"
import { RentalContractInputParamsId, RentalContractOutput } from "@/schemas/rentalContract.schema"

export class FindByIdRentalContractUseCase {
  constructor(private rentalContractRepository: RentalContractRepository) { }

  async execute(id: RentalContractInputParamsId): Promise<RentalContractOutput> {

    const rentalContractExists = await this.rentalContractRepository.findById(id)

    if (!rentalContractExists) throw new NotFoundError('Rental Contract')

    return rentalContractExists
  }
}