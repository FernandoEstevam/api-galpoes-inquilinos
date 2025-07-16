import { z } from 'zod/v4'

export const baseAdjustmentInputSchema = z.object({
  id: z.cuid().optional(),
  rentalContractId: z.cuid(),
  date: z.coerce.date(),
  oldValue: z.union([z.number(), z.string()]).transform(
    (value) => {
      if (typeof value === "string") {
        return Math.round(parseFloat(value.replace(/\./g, "").replace(",", ".").trim()) * 100)
      }
      return value
    }
  ).refine((value) => !isNaN(value), {
    message: "Valor inválido: não é número"
  }),
  newValue: z.union([z.number(), z.string()]).transform(
    (value) => {
      if (typeof value === "string") {
        return Math.round(parseFloat(value.replace(/\./g, "").replace(",", ".").trim()) * 100)
      }
      return value
    }
  ).refine((value) => !isNaN(value), {
    message: "Valor inválido: não é número"
  }),
  reason: z.string().optional(),
})

export const adjustmentUpdateInput = z.object({
  rentalContractId: z.cuid().optional(),
  date: z.coerce.date().refine((d) => !isNaN(d.getTime()), {
    message: "Data inválida",
  }).optional(),
  oldValue: z.union([z.number(), z.string()]).transform(
    (value) => {
      if (typeof value === "string") {
        return Math.round(parseFloat(value.replace(/\./g, "").replace(",", ".").trim()) * 100)
      }
      return value
    }
  ).optional(),
  newValue: z.union([z.number(), z.string()]).transform(
    (value) => {
      if (typeof value === "string") {
        return Math.round(parseFloat(value.replace(/\./g, "").replace(",", ".").trim()) * 100)
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
  date: z.coerce.date(),
  reason: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export const adjustmentOutputAll = z.array(adjustmentOutputSchema)

export const adjustmentId = z.object({
  id: z.cuid(),
})

export const adjustmentResponseCreate = z.object({
  id: z.cuid(),
  createdAt: z.date().transform((val) => new Date(val)),
})

export const adjustmentDelete = z.void()

export type AdjustmentCreateInput = z.infer<typeof adjustmentCreateInput>
export type AdjustmentUpdateInput = z.infer<typeof adjustmentUpdateInput>
export type AdjustmentId = z.infer<typeof adjustmentId>
export type AdjustmentOutput = z.infer<typeof adjustmentOutputSchema>
export type AdjustmentOutputAll = z.infer<typeof adjustmentOutputAll>
export type AdjustmentOutputResponseCreate = z.infer<typeof adjustmentResponseCreate>