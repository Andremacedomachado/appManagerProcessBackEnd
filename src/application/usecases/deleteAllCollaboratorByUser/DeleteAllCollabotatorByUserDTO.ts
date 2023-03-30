import { z } from "zod"

export const DeleteAllCollabotatorByUserRequestSchema = z.object({
    user_id: z.string().uuid()
})

export const CollabotatorByUserResponseSchema = z.object({
    activity_id: z.string().uuid(),
    user_id: z.string().uuid()
})

export type CollabotatorByUserResponseDTO = z.input<typeof CollabotatorByUserResponseSchema>

export const DeleteAllCollabotatorByUserResponseSchema = z.array(CollabotatorByUserResponseSchema)