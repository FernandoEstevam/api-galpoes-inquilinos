import { FastifyInstance } from "fastify";

export const RentalContractRoutes = (app: FastifyInstance) => {

  const warehouse: WarehouseController = new WarehouseController(app)

   app.get('/',{
    schema: {
      tags: ['warehouse'],
      description: "Get all warehouses",
      response: {
        200: warehouseOutputListSchema
      }
    }
  }, async (req, rep) => {
    return warehouse.findAll(req, rep)
  })

  app.get('/search',{
    schema: {
      tags: ['warehouse'],
      description: "Find by id or code warehouses",
      querystring: warehouseInputParamsSchema,
      response: {
        200: warehouseOutputSchema
      }
    }
  }, async (req, rep) => {
    return warehouse.findByIdOrCode(req, rep)
  })

  app.post('/',{
    schema: {
      tags: ['warehouse'],
      description: "Create new warehouse",
      body: warehouseBaseSchema,
      response: {
        201: warehouseOutputCreateSchema
      }
    }
  }, async (req, rep) => {
    return warehouse.create(req, rep)
  })

  app.patch('/:id',{
    schema: {
      tags: ['warehouse'],
      description: "Update tenant",
      params: warehouseInputIdSchema,
      body: warehouseInputUpdateSchema,
      response: {
        200: warehouseOutputSchema
      }
    }
  }, async (req, rep) => {
    return warehouse.update(req, rep)
  })
  
  app.delete('/:id',{
    schema: {
      tags: ['warehouse'],
      description: "Delete tenant",
      params: warehouseInputIdSchema,
      response: {
        204: warehouseOutputDeleteSchema
      }
    }
  }, async (req, rep) => {
    return warehouse.delete(req, rep)
  })
}