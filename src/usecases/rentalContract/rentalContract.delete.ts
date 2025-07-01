import { NotFoundError } from "@/errors/not-found.error"
import { RentalContractRepository } from "@/repositories/rentalContract-repository"
import { RentalContractInputParamsId } from "@/schemas/rentalContract.schema"

export class DeleteRentalContractUseCase {
  constructor(private rentalContractRepository: RentalContractRepository) { }

  async execute({ id }: RentalContractInputParamsId): Promise<void> {
    const rentalContractExists = await this.rentalContractRepository.findById({ id })
    if (!rentalContractExists) throw new NotFoundError('RentaContract')

    await this.rentalContractRepository.delete({ id })
  }
}