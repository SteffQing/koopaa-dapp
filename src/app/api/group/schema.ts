import { createAjoGroupSchema } from "@/app/(mobile-ui)/savings/create-ajo/schema";
import { z } from "zod";

export const createdAjoGroupSchema = createAjoGroupSchema
  .omit({
    contribution_amount: true,
    contribution_interval: true,
    max_participants: true,
    payout_interval: true,
  })
  .extend({
    pda: z.string().min(1, "Ajo Group needs a PDA identifier"),
    signature: z
      .string()
      .min(1, "Transaction hash with which Group was created"),
  });

export const joinAjoGroupSchema = createdAjoGroupSchema.omit({
  description: true,
  group_cover_photo: true,
  tag: true,
});

export const approvalJoinAjoGroupSchema = joinAjoGroupSchema.extend({
  approval: z.boolean(),
  participant: z.string().min(1, "Participant address is required"),
});

export const gridApproveJoinAjoSchema = z.object({
  participant: z.string(),
  pda: z.string(),
  approved: z.boolean(),
});

export type CreatedAjoGroup = z.infer<typeof createdAjoGroupSchema>;
export type JoinAjoGroup = z.infer<typeof joinAjoGroupSchema>;
export type ApprovalJoinAjoGroup = z.infer<typeof approvalJoinAjoGroupSchema>;
export type GridApproveJoinAjo = z.infer<typeof gridApproveJoinAjoSchema>;
