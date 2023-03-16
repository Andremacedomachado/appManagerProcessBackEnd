import { z } from "zod";

export const GetCollaboratorsByUserRequestSchema = z.object({
    userId: z.string().uuid()
});

export const CollaboratorResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
});

export const GetCollaboratorsByUserResponseSchema = z.array(CollaboratorResponseSchema);

export type CollaboratorResponseDTO = z.input<typeof CollaboratorResponseSchema>