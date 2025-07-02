import { cuid, nullable, z } from 'zod/v4'

export const baseRentalContractInputSchema = z.object({
  tenantId: z.uuid(),
  warehouseId: z.cuid(),
  startDate: z.date(),
  endDate: z.date(),
  initialValue: z.union([z.number(), z.string()]).transform(Number),
  currentValue: z.union([z.number(), z.string()]).transform(Number),
  lastAdjustmentAt: z.date().nullable().optional(),
  notes: z.string().nullable().optional(),
  renewedFromId: z.cuid().nullable().optional(),
  isActive: z.boolean().optional(),
})

export const rentalContractInputParamsId = z.object({
  id: cuid()
})

export const rentalContractResponse = z.object({
  message: z.string(),
})

export const rentalContractInputUpdate = z.object({
  tenantId: z.uuid().optional(),
  warehouseId: z.cuid().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  initialValue: z.union([z.number(), z.string()]).transform(Number).optional(),
  currentValue: z.union([z.number(), z.string()]).transform(Number).optional(),
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

export const rentalContractListOutput = z.array(z.object({
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
}))

export type RentalContractInput = z.infer<typeof rentalContractInputSchema>
export type RentalContractInputUpdate = z.infer<typeof rentalContractInputUpdate>
export type RentalContractOutput = z.infer<typeof rentalContractOutputSchema>
export type RentalContractListOutput = z.infer<typeof rentalContractListOutput>
export type RentalContractInputParamsId = z.infer<typeof rentalContractInputParamsId>