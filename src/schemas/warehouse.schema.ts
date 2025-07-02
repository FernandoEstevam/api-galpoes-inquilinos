import { z } from 'zod/v4'

export const warehouseBaseSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  address: z.string().min(1),
  areaM2: z.number().positive(),
  description: z.string().optional(),
})

export const warehouseInputUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  code: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  areaM2: z.number().positive().optional(),
  description: z.string().optional(),
})


export const warehouseOutputSchema = z.object({
  id: z.cuid(),
  name: z.string(),
  code: z.string(),
  address: z.string(),
  areaM2: z.number().nullable(),
  description: z.string().nullable(),
  createdAt: z.iso.datetime(),
})


export const warehouseInputParamsSchema = z.object({
  id: z.cuid().optional(),
  code: z.string().optional(),
})

export const warehouseInputIdSchema = z.object({
  id: z.cuid(),
})


export const warehouseOutputCreateSchema = z.object({
  message: z.literal('Warehouse created'),
})

export const warehouseOutputDeleteSchema = z.object({
  message: z.never(),
})



export const warehouseOutputListSchema = z.array(warehouseOutputSchema)


export type WarehouseInput = z.infer<typeof warehouseBaseSchema>
export type WarehouseInputUpdate = z.infer<typeof warehouseInputUpdateSchema>
export type WarehouseOutput = z.infer<typeof warehouseOutputSchema>
export type WarehouseListOutput = z.infer<typeof warehouseOutputListSchema>
export type WarehouseInputParamsSchema = z.infer<typeof warehouseInputParamsSchema>
export type WarehouseInputIdSchema = z.infer<typeof warehouseInputIdSchema>