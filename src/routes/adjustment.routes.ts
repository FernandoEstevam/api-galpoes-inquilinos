import AdjustmentController from "@/controllers/AdjustmentController";
import { AdjustmentCreateInput, adjustmentCreateInput, adjustmentResponseCreate } from "@/schemas/adjustment.schema";
import { FastifyInstance, FastifyRequest } from "fastify";

export const AdjustmentRoutes = (app: FastifyInstance) => {

  const adjustment: AdjustmentController = new AdjustmentController(app)

  // app.get('/', {
  //   schema: {
  //     tags: ['Adjustment'],
  //     description: "Get all rental contracts",
  //     response: {
  //       200: rentalContractListOutput
  //     }
  //   }
  // }, async (req, rep) => {
  //   return rentalContract.findAll(req, rep)
  // })

  // app.get('/search', {
  //   schema: {
  //     tags: ['Adjustment'],
  //     description: "Find by id rental contracts",
  //     querystring: rentalContractInputParamsId,
  //     response: {
  //       200: rentalContractOutputSchema
  //     }
  //   }
  // }, async (req, rep) => {
  //   return rentalContract.findById(req, rep)
  // })

  app.post('/', {
    schema: {
      tags: ['Adjustment'],
      description: "Create new Adjustment",
      body: adjustmentCreateInput,
      response: {
        201: adjustmentResponseCreate
      }
    }
  }, async (req: FastifyRequest<{Body: AdjustmentCreateInput}>, rep) => {
    return adjustment.create(req, rep)
  })

  // app.patch('/:id', {
  //   schema: {
  //     tags: ['Adjustment'],
  //     description: "Update tenant",
  //     params: rentalContractInputParamsId,
  //     body: rentalContractInputUpdate,
  //     response: {
  //       200: rentalContractOutputSchema
  //     }
  //   }
  // }, async (req, rep) => {
  //   return rentalContract.update(req, rep)
  // })

  // app.delete('/:id', {
  //   schema: {
  //     tags: ['Adjustment'],
  //     description: "Delete tenant",
  //     params: rentalContractInputParamsId,
  //     response: {
  //       204: rentalContractResponse
  //     }
  //   }
  // }, async (req, rep) => {
  //   return rentalContract.delete(req, rep)
  // })
}