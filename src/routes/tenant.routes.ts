import { FastifyInstance } from "fastify";
import TenantController from "../controllers/TenantController";
import { tenantInputIdSchema, tenantInputParamsSchema, tenantInputSchema, tenantOutputCreateSchema, tenantOutputDeleteSchema, tenantOutputListSchema, tenantOutputSchema } from "../schemas/tenant.schema";

export const TenantRoutes = (app: FastifyInstance) => {

  const tenant: TenantController = new TenantController(app)

   app.get('/',{
    schema: {
      tags: ['tenant'],
      description: "Get all tenants",
      response: {
        200: tenantOutputListSchema
      }
    }
  }, async (req, rep) => {
    return tenant.findAll(req, rep)
  })

  app.get('/search',{
    schema: {
      tags: ['tenant'],
      description: "Find by id or document tenants",
      querystring: tenantInputParamsSchema,
      response: {
        200: tenantOutputSchema
      }
    }
  }, async (req, rep) => {
    return tenant.findByIdOrDocument(req, rep)
  })

  app.post('/',{
    schema: {
      tags: ['tenant'],
      description: "Create new tenant",
      body: tenantInputSchema,
      response: {
        201: tenantOutputCreateSchema
      }
    }
  }, async (req, rep) => {
    return tenant.create(req, rep)
  })

  app.patch('/:id',{
    schema: {
      tags: ['tenant'],
      description: "Update tenant",
      params: tenantInputIdSchema,
      body: tenantInputSchema,
      response: {
        200: tenantOutputSchema
      }
    }
  }, async (req, rep) => {
    return tenant.update(req, rep)
  })
  
  app.delete('/:id',{
    schema: {
      tags: ['tenant'],
      description: "Delete tenant",
      params: tenantInputIdSchema,
      response: {
        204: tenantOutputDeleteSchema
      }
    }
  }, async (req, rep) => {
    return tenant.delete(req, rep)
  })
}