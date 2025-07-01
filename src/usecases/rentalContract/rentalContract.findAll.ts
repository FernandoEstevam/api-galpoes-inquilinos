import { RentalContractRepository } from "@/repositories/rentalContract-repository";
import { RentalContractOutput } from "@/schemas/rentalContract.schema";

export class FindAllRentalContractUseCase {
  constructor(private rentalContractRepository: RentalContractRepository) { }
  async execute(): Promise<RentalContractOutput[]> {
    return await this.rentalContractRepository.findAll()
  }
}