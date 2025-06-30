import { warehouseBaseSchema, warehouseInputIdSchema, warehouseInputParamsSchema, warehouseInputUpdateSchema, WarehouseListOutput, WarehouseOutput } from '@/schemas/warehouse.schema'
import { MakeWarehouse } from '@/usecases/warehouse/factories/make.warehouse'
import {FastifyRequest, FastifyReply, FastifyInstance} from 'fastify'


class WarehouseController {

  private makeWarehouse: MakeWarehouse

  constructor(private app: FastifyInstance) {
    this.makeWarehouse = new MakeWarehouse(this.app)
  }

  async create(req: FastifyRequest, rep: FastifyReply): Promise<WarehouseOutput | void> {
    
    const {name,code,address,areaM2,description} = warehouseBaseSchema.parse(req.body)

    const warehouseCreateExecute = this.makeWarehouse.create()

    await warehouseCreateExecute.execute({name,code,address,areaM2,description})

    return rep.status(201).send({ message: 'Warehouse created' })
  }

  async findAll(req: FastifyRequest, rep: FastifyReply): Promise<WarehouseListOutput> {
    const getAll = await this.makeWarehouse.list().execute() 
    return rep.status(200).send(getAll)
  }

  
  async findByIdOrCode(req: FastifyRequest, rep: FastifyReply): Promise<WarehouseOutput> {
    
    const { id, code } = warehouseInputParamsSchema.parse(req.query) as { id?: string; code?: string }

    const warehouse = await this.makeWarehouse.findByIdOrCode().execute({id, code})
    
    return rep.status(200).send(warehouse) 
  }

  async update(req: FastifyRequest, rep: FastifyReply): Promise<WarehouseOutput> {
    const { id } = warehouseInputIdSchema.parse(req.params)
    const data = warehouseInputUpdateSchema.parse(req.body)
    
    const warehouse = await this.makeWarehouse.update().execute({id}, data)

    return rep.status(200).send(warehouse)
  }

  async delete(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    
    const { id } = warehouseInputIdSchema.parse(req.params)
    
    await this.makeWarehouse.delete().execute({id})

    return rep.status(204).send()
  }

}

export default WarehouseController