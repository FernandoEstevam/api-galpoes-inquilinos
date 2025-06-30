import {z} from 'zod/v4'

export const baseRentalContractInputSchema = z.object({
  tenantId: z.uuid(),
  warehouseId: z.cuid(),
  startDate: z.date(),
  endDate: z.date(),
  initialValue: z.union([z.number(), z.string()]).transform(Number),
  currentValue: z.union([z.number(), z.string()]).transform(Number),
  lastAdjustmentAt: z.date().optional(),
  notes: z.string().optional(),
  renewedFromId: z.cuid().optional(),
  isActive: z.boolean().optional(),
})


export const rentalContractInputSchema = baseRentalContractInputSchema.refine(
  data => new Date(data.endDate) > new Date(data.startDate), {
  message: 'A data de término deve ser após a data de início',
  path: ['endDate'],
})

export const rentalContractOutputSchema = baseRentalContractInputSchema.extend({
  id: z.cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type RentalContractInput = z.infer<typeof rentalContractInputSchema>
export type RentalContractOutput = z.infer<typeof rentalContractOutputSchema>
