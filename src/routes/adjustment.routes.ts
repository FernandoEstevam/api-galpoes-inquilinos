import AdjustmentController from "@/controllers/AdjustmentController";
import { AdjustmentCreateInput, adjustmentCreateInput, adjustmentDelete, AdjustmentId, adjustmentId, adjustmentOutputAll, adjustmentOutputSchema, adjustmentResponseCreate, AdjustmentUpdateInput, adjustmentUpdateInput } from "@/schemas/adjustment.schema";
import { FastifyTypeInstance } from "@/types/fastify";
import { FastifyReply, FastifyRequest } from "fastify";

export const AdjustmentRoutes = (app: FastifyTypeInstance) => {

  const adjustment: AdjustmentController = new AdjustmentController(app)

  app.get('/', {
    schema: {
      description: "Get All Adjustment",
      tags: ['Adjustment'],
      response: {
        200: adjustmentOutputAll
      }
    }
  }, async (req: FastifyRequest, rep: FastifyReply) => {
    return adjustment.findAll(req, rep)
  })

  app.get('/:id', {
    schema: {
      tags: ['Adjustment'],
      description: "Find by id Adjustment",
      params: adjustmentId,
      response: {
        200: adjustmentOutputSchema
      }
    }
  }, async (req: FastifyRequest<{ Params: AdjustmentId, Body: AdjustmentUpdateInput }>, rep: FastifyReply) => {
    return adjustment.findById(req, rep)
  })

  app.post('/', {
    schema: {
      tags: ['Adjustment'],
      description: "Create new Adjustment",
      body: adjustmentCreateInput,
      response: {
        201: adjustmentResponseCreate
      }
    }
  }, async (req: FastifyRequest<{ Body: AdjustmentCreateInput }>, rep: FastifyReply) => {
    return adjustment.create(req, rep)
  })

  app.patch('/:id', {
    schema: {
      tags: ['Adjustment'],
      description: "Update tenant",
      params: adjustmentId,
      body: adjustmentUpdateInput,
      response: {
        200: adjustmentOutputSchema
      }
    }
  }, async (req: FastifyRequest<{ Params: AdjustmentId, Body: AdjustmentUpdateInput }>, rep: FastifyReply) => {
    return adjustment.update(req, rep)
  })

  app.delete('/:id', {
    schema: {
      tags: ['Adjustment'],
      description: "Delete tenant",
      params: adjustmentId,
      response: {
        204: adjustmentDelete
      }
    }
  }, async (req: FastifyRequest<{ Params: AdjustmentId }>, rep: FastifyReply) => {
    return adjustment.delete(req, rep)
  })
}