import { z } from 'zod/v4'

export const baseAdjustmentInputSchema = z.object({
  rentalContractId: z.uuid(),
  date: z.coerce.date(),
  oldValue: z.union([z.number(), z.string()]).transform(Number),
  newValue: z.union([z.number(), z.string()]).transform(Number),
  reason: z.string().optional(),
})

export const adjustmentInputUpdate = z.object({
  rentalContractId: z.uuid().optional(),
  date: z.coerce.date().optional(),
  oldValue: z.union([z.number(), z.string()]).transform(Number).optional(),
  newValue: z.union([z.number(), z.string()]).transform(Number).optional(),
  reason: z.string().optional(),
})

export const adjustmentInputSchema = baseAdjustmentInputSchema.refine(
  data => data.newValue > 0 && data.oldValue > 0, {
  message: 'Valores devem ser maiores que zero',
})

export const adjustmentOutputSchema = baseAdjustmentInputSchema.extend({
  id: z.uuid(),
  createdAt: z.iso.datetime(),
})

export const adjustmentParamsId = z.object({
  id: z.cuid(),
})

export type AdjustmentInput = z.infer<typeof adjustmentInputSchema>
export type AdjustmentInputUpdate = z.infer<typeof adjustmentInputUpdate>
export type AdjustmentParamsId = z.infer<typeof adjustmentParamsId>
export type AdjustmentOutput = z.infer<typeof adjustmentOutputSchema>
