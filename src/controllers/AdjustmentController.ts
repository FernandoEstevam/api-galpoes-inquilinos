import { AdjustmentCreateInput, AdjustmentId, AdjustmentOutput, AdjustmentOutputAll, AdjustmentUpdateInput } from "@/schemas/adjustment.schema"
import { FastifyTypeInstance } from "@/types/fastify";
import { AdjustmentCreate } from "@/usecases/adjustment/create"
import { AdjustmentDelete } from "@/usecases/adjustment/delete";
import { AdjustmentFindAll } from "@/usecases/adjustment/findAll";
import { AdjustmentFindById } from "@/usecases/adjustment/findById";
import { AdjustmentUpdate } from "@/usecases/adjustment/update";
import { FastifyReply, FastifyRequest } from "fastify"

class AdjustmentController {

  private adjustmentCreate: AdjustmentCreate
  private adjustmentFindAll: AdjustmentFindAll
  private adjustmentFindById: AdjustmentFindById
  private adjustmentUpdate: AdjustmentUpdate
  private adjustmentDelete: AdjustmentDelete

  constructor(
    private app: FastifyTypeInstance
  ) {
    this.adjustmentCreate = new AdjustmentCreate(this.app)
    this.adjustmentFindAll = new AdjustmentFindAll(this.app)
    this.adjustmentFindById = new AdjustmentFindById(this.app)
    this.adjustmentUpdate = new AdjustmentUpdate(this.app)
    this.adjustmentDelete = new AdjustmentDelete(this.app)
  }

  async create(req: FastifyRequest<{ Body: AdjustmentCreateInput }>, rep: FastifyReply): Promise<AdjustmentOutput> {

    await this.adjustmentCreate.execute(req.body)

    return rep.status(201).send()
  }

  async findAll(req: FastifyRequest, rep: FastifyReply): Promise<AdjustmentOutputAll[]> {

    const getAll = await this.adjustmentFindAll.execute()

    return rep.status(200).send(getAll)
  }


  async findById(req: FastifyRequest<{ Params: AdjustmentId }>, rep: FastifyReply): Promise<AdjustmentOutput> {

    const warehouse = await this.adjustmentFindById.execute(req.params)

    return rep.status(200).send(warehouse)
  }

  async update(req: FastifyRequest<{ Params: AdjustmentId, Body: AdjustmentUpdateInput }>, rep: FastifyReply): Promise<AdjustmentOutput> {

    const adjustment = await this.adjustmentUpdate.execute({ id: req.params, data: req.body })

    return rep.status(200).send(adjustment)
  }

  async delete(req: FastifyRequest<{ Params: AdjustmentId }>, rep: FastifyReply): Promise<void> {

    await this.adjustmentDelete.execute(req.params)

    return rep.status(204).send()
  }

}

export default AdjustmentController