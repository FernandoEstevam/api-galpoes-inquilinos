import { AdjustmentCreateInput, AdjustmentOutput, AdjustmentOutputAll } from "@/schemas/adjustment.schema"
import { AdjustmentCreate } from "@/usecases/adjustment/create"
import { AdjustmentFindAll } from "@/usecases/adjustment/findAll";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

class AdjustmentController {

  private adjustmentCreate: AdjustmentCreate
  private adjustmentFindAll: AdjustmentFindAll

  constructor(
    private app: FastifyInstance
  ) {
    this.adjustmentCreate = new AdjustmentCreate(this.app)
    this.adjustmentFindAll = new AdjustmentFindAll(this.app)
  }

  async create(req: FastifyRequest<{ Body: AdjustmentCreateInput }>, rep: FastifyReply): Promise<AdjustmentOutput> {

    await this.adjustmentCreate.execute(req.body)

    return rep.status(201).send()
  }

  async findAll(req: FastifyRequest, rep: FastifyReply): Promise<AdjustmentOutputAll[]> {

    const getAll = await this.adjustmentFindAll.execute()

    return rep.status(200).send(getAll)
  }


  // async findById(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractOutput> {

  //   const { id } = rentalContractInputParamsId.parse(req.query)

  //   const warehouse = await this.makeRentalContract.findById().execute({ id })

  //   return rep.status(200).send(warehouse)
  // }

  // async update(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractOutput> {
  //   const { id } = rentalContractInputParamsId.parse(req.params)
  //   const data = rentalContractInputUpdate.parse(req.body)

  //   const warehouse = await this.makeRentalContract.update().execute({ id }, data)

  //   return rep.status(200).send(warehouse)
  // }

  // async delete(req: FastifyRequest, rep: FastifyReply): Promise<void> {

  //   const { id } = rentalContractInputParamsId.parse(req.params)

  //   await this.makeRentalContract.delete().execute({ id })

  //   return rep.status(204).send()
  // }

}

export default AdjustmentController