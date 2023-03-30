import { z } from "zod"

export const DeleteAllCollabotatorByActivityRequestSchema = z.object({
    activity_id: z.string().uuid()
})

export const CollabotatorByActivityResponseSchema = z.object({
    activity_id: z.string().uuid(),
    user_id: z.string().uuid()
})

export type CollabotatorByActivityResponseDTO = z.input<typeof CollabotatorByActivityResponseSchema>

export const DeleteAllCollabotatorByActivityResponseSchema = z.array(CollabotatorByActivityResponseSchema)