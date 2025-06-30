import { tenantInputIdSchema, tenantInputParamsSchema, tenantInputSchema, TenantOutputCreateSchema, TenantOutputListSchema, TenantOutputSchema } from "../schemas/tenant.schema";
import {FastifyRequest, FastifyReply, FastifyInstance} from 'fastify'
import { makeCreateTenantUseCase, makeDeleteTenantUseCase, makefindByDocumentTenantUseCase, makeListTenantUseCase, makeUpdateTenantUseCase } from "@/usecases/tenant/factories/make.tenant";

class TenantController {

  constructor(private app: FastifyInstance) {}

  async create(req: FastifyRequest, rep: FastifyReply): Promise<TenantOutputCreateSchema | void> {
    
    const {name,document,phone,address,email} = tenantInputSchema.parse(req.body)

    const tenantCreateExecute = makeCreateTenantUseCase(this.app)

    await tenantCreateExecute.execute({name,document,phone,address,email})

    return rep.status(201).send({ message: 'Tenant created' })
  }

  async findAll(req: FastifyRequest, rep: FastifyReply): Promise<TenantOutputListSchema> {
    const getAll = await makeListTenantUseCase(this.app).execute() 
    return rep.status(200).send(getAll)
  }

  
  async findByIdOrDocument(req: FastifyRequest, rep: FastifyReply): Promise<TenantOutputSchema> {
    
    const { id, document } = tenantInputParamsSchema.parse(req.query) as { id?: string; document?: string }

    const tenant = await makefindByDocumentTenantUseCase(this.app).execute({id, document})
    
    return rep.status(200).send(tenant) 
  }

  async update(req: FastifyRequest, rep: FastifyReply): Promise<TenantOutputSchema> {
    const { id } = tenantInputIdSchema.parse(req.params)
    const data = tenantInputSchema.parse(req.body)
    
    const tenant = await makeUpdateTenantUseCase(this.app).execute({id}, data)

    return rep.status(200).send(tenant)
  }

  async delete(req: FastifyRequest, rep: FastifyReply): Promise<void> {
    
    const { id } = tenantInputIdSchema.parse(req.params)
    
    await makeDeleteTenantUseCase(this.app).execute({id})

    return rep.status(204).send()
  }

}

export default TenantController