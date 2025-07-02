import { rentalContractInputParamsId, rentalContractInputSchema, rentalContractInputUpdate, RentalContractListOutput, RentalContractOutput } from "@/schemas/rentalContract.schema"
import { MakeRentalContract } from "@/usecases/rentalContract/factories/make.rentalContract"
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

class RentalContractController {
  private makeRentalContract: MakeRentalContract
  constructor(private app: FastifyInstance,) {
    this.makeRentalContract = new MakeRentalContract(this.app)
  }

  async create(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractOutput | void> {

    const data = rentalContractInputSchema.parse(req.body)

    const warehouseCreateExecute = this.makeRentalContract.create()

    await warehouseCreateExecute.execute(data)

    return rep.status(201).send()
  }

  async findAll(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractListOutput> {
    const getAll = await this.makeRentalContract.list().execute()
    return rep.status(200).send(getAll)
  }


  async findById(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractOutput> {

    const { id } = rentalContractInputParamsId.parse(req.query)

    const warehouse = await this.makeRentalContract.findById().execute({ id })

    return rep.status(200).send(warehouse)
  }

  async update(req: FastifyRequest, rep: FastifyReply): Promise<RentalContractOutput> {
    const { id } = rentalContractInputParamsId.parse(req.params)
    const data = rentalContractInputUpdate.parse(req.body)

    const warehouse = await this.makeRentalContract.update().execute({ id }, data)

    return rep.status(200).send(warehouse)
  }

  async delete(req: FastifyRequest, rep: FastifyReply): Promise<void> {

    const { id } = rentalContractInputParamsId.parse(req.params)

    await this.makeRentalContract.delete().execute({ id })

    return rep.status(204).send()
  }

}

export default RentalContractController