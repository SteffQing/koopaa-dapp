import { z } from 'zod'

export const createAjoGroupSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Group name must be at least 3 characters' })
    .max(50, { message: 'Group name must be less than 50 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters' })
    .max(500, { message: 'Description must be less than 500 characters' }),
  security_deposit: z
    .number({ invalid_type_error: 'Security deposit is required' })
    .min(1, { message: 'Security deposit must be at least 1 USDC' }),
  max_participants: z
    .number({ invalid_type_error: 'Maximum participants is required' })
    .min(3, { message: 'At least 3 participants are required' })
    .max(20, { message: 'Maximum 20 participants allowed' }),
  contribution_amount: z
    .number({ invalid_type_error: 'Contribution amount is required' })
    .min(1, { message: 'Contribution amount must be at least 1 USDC' }),
  contribution_interval: z.enum(['daily', 'weekly', 'monthly'], {
    invalid_type_error: 'Please select a contribution interval',
  }),
  payout_interval: z.enum(['weekly', 'biweekly', 'monthly'], {
    invalid_type_error: 'Please select a payout interval',
  }),
  tag: z.enum(['real estate', 'birthday', 'finance', 'lifestyle', 'education', 'travel'], {
    invalid_type_error: 'Please select a tag',
  }),
  group_cover_photo: z.number(),
})

export type CreateAjoGroupFormValues = z.infer<typeof createAjoGroupSchema>
