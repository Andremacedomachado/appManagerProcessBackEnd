import { z } from "zod";

export const GetCollaboratorsByActivityRequestSchema = z.object({
    activityId: z.string().uuid()
});

export const CollaboratorByActivityResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
});

export const GetCollaboratorsByActivityResponseSchema = z.array(CollaboratorByActivityResponseSchema);

export type CollaboratorByAActivityResponseDTO = z.input<typeof CollaboratorByActivityResponseSchema>