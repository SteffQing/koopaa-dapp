import { z } from "zod";

export const ActivityTypeEnum = z.enum([
  "create",
  "credit",
  "debit",
  "transfer",
]);

export const addActivitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().int().positive().optional(), // optional, but must be positive if present
  type: ActivityTypeEnum,
  sig: z.string().optional(), // optional signature
  group_pda: z.string().optional(), // optional signature
});

export const addActivitySchemaForPayout = addActivitySchema.extend({
  recipient: z.string(),
});

export type AddActivityData = z.infer<typeof addActivitySchema>;
export type AddActivityDataForPayout = z.infer<
  typeof addActivitySchemaForPayout
>;
