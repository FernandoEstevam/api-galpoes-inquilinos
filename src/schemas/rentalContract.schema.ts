import { cuid, z } from 'zod/v4'

export const baseRentalContractInputSchema = z.object({
  tenantId: z.uuid(),
  warehouseId: z.cuid(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  initialValue: z.union([z.number(), z.string()]).transform(Number),
  currentValue: z.union([z.number(), z.string()]).transform(Number),
  lastAdjustmentAt: z.coerce.date().nullable().optional(),
  notes: z.string().nullable().optional(),
  renewedFromId: z.cuid().optional(),
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
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  initialValue: z.union([z.number(), z.string()]).transform(Number),
  currentValue: z.union([z.number(), z.string()]).transform(Number),
  lastAdjustmentAt: z.coerce.date().nullable().optional(),
  notes: z.string().nullable().optional(),
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
  renewedFromId: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const rentalContractListOutput = z.array(z.object({
  id: z.cuid(),
  tenantId: z.uuid(),
  warehouseId: z.cuid(),
  startDate: z.coerce.date().transform(val => new Date(val)),
  endDate: z.coerce.date().transform(val => new Date(val)),
  initialValue: z.union([z.number(), z.string()]).transform(Number),
  currentValue: z.union([z.number(), z.string()]).transform(Number),
  lastAdjustmentAt: z.date().transform(val => new Date(val)).optional(),
  notes: z.string().optional(),
  renewedFromId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
}))

export type RentalContractInput = z.infer<typeof rentalContractInputSchema>
export type RentalContractInputUpdate = z.infer<typeof rentalContractInputUpdate>
export type RentalContractOutput = z.infer<typeof rentalContractOutputSchema>
export type RentalContractListOutput = z.infer<typeof rentalContractListOutput>
export type RentalContractInputParamsId = z.infer<typeof rentalContractInputParamsId>