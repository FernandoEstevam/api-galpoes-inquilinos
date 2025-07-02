import RentalContractController from "@/controllers/RentalContractController";
import { rentalContractInputParamsId, rentalContractInputSchema, rentalContractInputUpdate, rentalContractListOutput, rentalContractOutputSchema, rentalContractResponse } from "@/schemas/rentalContract.schema";
import { FastifyInstance } from "fastify";

export const RentalContractRoutes = (app: FastifyInstance) => {

  const rentalContract: RentalContractController = new RentalContractController(app)

  app.get('/', {
    schema: {
      tags: ['rental contract'],
      description: "Get all rental contracts",
      response: {
        200: rentalContractListOutput
      }
    }
  }, async (req, rep) => {
    return rentalContract.findAll(req, rep)
  })

  app.get('/search', {
    schema: {
      tags: ['rental contract'],
      description: "Find by id or code rental contracts",
      querystring: rentalContractInputParamsId,
      response: {
        200: rentalContractOutputSchema
      }
    }
  }, async (req, rep) => {
    return rentalContract.findById(req, rep)
  })

  app.post('/', {
    schema: {
      tags: ['rental contract'],
      description: "Create new rental contract",
      body: rentalContractInputSchema,
      response: {
        201: rentalContractResponse
      }
    }
  }, async (req, rep) => {
    return rentalContract.create(req, rep)
  })

  app.patch('/:id', {
    schema: {
      tags: ['rental contract'],
      description: "Update tenant",
      params: rentalContractInputParamsId,
      body: rentalContractInputUpdate,
      response: {
        200: rentalContractOutputSchema
      }
    }
  }, async (req, rep) => {
    return rentalContract.update(req, rep)
  })

  app.delete('/:id', {
    schema: {
      tags: ['rental contract'],
      description: "Delete tenant",
      params: rentalContractInputParamsId,
      response: {
        204: rentalContractResponse
      }
    }
  }, async (req, rep) => {
    return rentalContract.delete(req, rep)
  })
}