import {z} from 'zod'

export const baseRentalPaymentInputSchema = z.object({
  rentalContractId: z.string().uuid(),
  month: z.string().datetime(),
  dueDate: z.string().datetime(),
  paidDate: z.string().datetime().optional(),
  amountDue: z.union([z.number(), z.string()]).transform(Number),
  amountPaid: z.union([z.number(), z.string()]).transform(Number),
  status: z.enum(['pending', 'paid', 'overdue', 'partial']),
  notes: z.string().optional(),
})

export const rentalPaymentInputSchema = baseRentalPaymentInputSchema.
refine(data => data.amountPaid >= 0 && data.amountDue > 0, {
  message: 'Valor devido deve ser maior que zero',
})

export const rentalPaymentOutputSchema = baseRentalPaymentInputSchema.extend({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
})

export type RentalPaymentInput = z.infer<typeof rentalPaymentInputSchema>
export type RentalPaymentOutput = z.infer<typeof rentalPaymentOutputSchema>
