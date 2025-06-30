import {z} from 'zod'

export const baseAdjustmentInputSchema = z.object({
  rentalContractId: z.string().uuid(),
  date: z.string().datetime(),
  oldValue: z.union([z.number(), z.string()]).transform(Number),
  newValue: z.union([z.number(), z.string()]).transform(Number),
  reason: z.string().optional(),
})

export const adjustmentInputSchema = baseAdjustmentInputSchema.refine(
  data => data.newValue > 0 && data.oldValue > 0, {
  message: 'Valores devem ser maiores que zero',
})

export const adjustmentOutputSchema = baseAdjustmentInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
})

export type AdjustmentInput = z.infer<typeof adjustmentInputSchema>
export type AdjustmentOutput = z.infer<typeof adjustmentOutputSchema>
