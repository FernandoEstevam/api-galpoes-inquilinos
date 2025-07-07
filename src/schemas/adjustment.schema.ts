import { z } from 'zod/v4'

export const baseAdjustmentInputSchema = z.object({
  id: z.cuid().optional(),
  rentalContractId: z.uuid(),
  date: z.coerce.date(),
  oldValue: z.union([z.number(), z.string()]).transform(Number),
  newValue: z.union([z.number(), z.string()]).transform(Number),
  reason: z.string().optional(),
})

export const adjustmentUpdateInput = z.object({
  rentalContractId: z.uuid().optional(),
  oldValue: z.union([z.number(), z.string()]).transform(
    (value)=> {
      if(typeof value === "string") {
        return Math.round(parseFloat(value.replace(".", "").replace(",", "."))*100)
      }
      return value
    }
  ).optional(),
  newValue: z.union([z.number(), z.string()]).transform(
    (value)=> {
      if(typeof value === "string") {
        return Math.round(parseFloat(value.replace(".", "").replace(",", "."))*100)
      }
      return value
    }
  ).refine((value) => !isNaN(value), {
      message: "Valor inválido: não é número"
    }).optional(),
  reason: z.string().optional(),
})

export const adjustmentCreateInput = baseAdjustmentInputSchema.refine(
  data => data.newValue > 0 && data.oldValue > 0, {
  message: 'Valores devem ser maiores que zero',
})

export const adjustmentOutputSchema = baseAdjustmentInputSchema.extend({
  id: z.cuid(),
  createdAt: z.iso.datetime(),
})

export const adjustmentId = z.object({
  id: z.cuid(),
})

export const adjustmentResponseCreate = z.object({
   id: z.cuid(),
  createdAt: z.iso.datetime().transform((val) => new Date(val)),
})

export type AdjustmentCreateInput = z.infer<typeof adjustmentCreateInput>
export type AdjustmentUpdateInput = z.infer<typeof adjustmentUpdateInput>
export type AdjustmentId = z.infer<typeof adjustmentId>
export type AdjustmentOutput = z.infer<typeof adjustmentOutputSchema>
export type AdjustmentOutputResponseCreate = z.infer<typeof adjustmentResponseCreate>