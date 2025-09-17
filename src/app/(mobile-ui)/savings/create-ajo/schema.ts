import { z } from "zod";

export const createAjoGroupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Group name must be at least 3 characters" })
    .max(50, { message: "Group name must be less than 50 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),
  max_participants: z
    .number({ invalid_type_error: "Maximum participants is required" })
    .min(3, { message: "At least 3 participants are required" })
    .max(20, { message: "Maximum 20 participants allowed" }),
  contribution_amount: z
    .number({ invalid_type_error: "Contribution amount is required" })
    .min(1, { message: "Contribution amount must be at least 1 USDC" }),
  contribution_interval: z.enum(["1", "7", "30"], {
    invalid_type_error: "Please select a contribution interval",
  }),
  payout_interval: z.enum(["7", "14", "30"], {
    invalid_type_error: "Please select a payout interval",
  }),
  tag: z.enum(["real_estate", "birthday", "finance", "lifestyle", "education", "travel"], {
    invalid_type_error: "Please select a tag",
  }),
  group_cover_photo: z
    .number()
    .min(1, { message: "Please select a cover photo" })
    .max(4, { message: "Please select a cover photo" }),
});

export type CreateAjoGroupFormValues = z.infer<typeof createAjoGroupSchema>;
