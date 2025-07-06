import { PrismaAdjustmentRepository } from "@/repositories/prisma/adjustment-repository";
import { BaseUseCase } from "../base.usecase";
import { adjustmentCreateInput, AdjustmentCreateInput, AdjustmentOutputResponseCreate} from "@/schemas/adjustment.schema";
import { ConflictError } from "@/errors/conflict.error";
import { FastifyInstance } from "fastify";

export class AdjustmentCreate extends BaseUseCase<AdjustmentCreateInput, AdjustmentOutputResponseCreate> {
  
  private readonly repository: PrismaAdjustmentRepository
  constructor(
    private app: FastifyInstance
  ){
      super()
      this.repository = new PrismaAdjustmentRepository(this.app)
    }

  async execute(input: AdjustmentCreateInput): Promise<AdjustmentOutputResponseCreate > {
    
    this.process(input)
    
    const adjustment = await this.repository.create(input)
    
    return adjustment
  }

  protected process(input: AdjustmentCreateInput): void {
    
    const result = adjustmentCreateInput.parse(input)

    if (result.newValue <= result.oldValue) {
      throw new ConflictError( "O novo valor deve ser maior que o valor antigo");
    }

  }
}