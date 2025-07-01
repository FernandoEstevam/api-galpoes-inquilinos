import { RentalContractRepository } from "@/repositories/rentalContract-repository"
import { RentalContractInput } from "@/schemas/rentalContract.schema"

export class CrateRentalContractUseCase {
  constructor(private rentalContractRepository: RentalContractRepository) { }

  async execute(data: RentalContractInput): Promise<void> {
    await this.rentalContractRepository.create(data)
  }
}