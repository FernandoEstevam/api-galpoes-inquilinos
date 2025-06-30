import { z } from 'zod/v4'

export const tenantInputSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  document: z.string().min(11).max(22).transform((value) => value?.replace(/\D/g, "")),
  phone: z.string().nullable().transform(value => value?.replace(/\D/g, "") ?? null),
  email: z.email().nullable(),
  address: z.string().nullable(),
})

export const tenantInputUpdate = z.object({
  name: z.string().min(1).optional(),
  document: z.string().min(11).max(22).transform((value) => value?.replace(/\D/g, "")).optional(),
  phone: z.string().transform(value => value?.replace(/\D/g, "") ?? null).optional(),
  email: z.email().optional(),
  address: z.string().optional(),
})

export const tenantInputParamsSchema = z.object({
  id: z.guid().optional(),
  document: z.string().min(11).max(22).optional().transform((value) => value?.replace(/\D/g, "")),
})

export const tenantInputIdSchema = z.object({
  id: z.guid(),
})

export const tenantBaseOutputSchema = z.object({
  name: z.string(),
  document: z.string().min(11).max(22).transform((value) => value?.replace(/\D/g, "")),
  phone: z.string().nullable().transform(value => value?.replace(/\D/g, "") ?? null),
  email: z.string().nullable(),
  address: z.string().nullable(),
})

export const tenantOutputCreateSchema =  z.object({
  message: z.literal('Tenant created'),
})

export const tenantOutputDeleteSchema =  z.object({
  message: z.never(),
})

export const tenantOutputSchema = tenantBaseOutputSchema.extend({
  id: z.string(),
  createdAt: z.date(),
})


export const tenantOutputListSchema = z.array(tenantOutputSchema)

export type TenantInput = z.infer<typeof tenantInputSchema>
export type TenantInputUpdate = z.infer<typeof tenantInputUpdate>
export type TenantInputParamsSchema = z.infer<typeof tenantInputParamsSchema>
export type TenantInputIdSchema = z.infer<typeof tenantInputIdSchema>
export type TenantOutputSchema = z.infer<typeof tenantOutputSchema>
export type TenantOutputCreateSchema = z.infer<typeof tenantOutputCreateSchema>
export type TenantOutputListSchema = z.infer<typeof tenantOutputListSchema>

