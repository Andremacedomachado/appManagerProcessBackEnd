import { z } from "zod"

export const DeleteCollaboratorRequestSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid()
})

export const DeleteCollaboratorResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid()
})

export type DeleteCollaboratorResponseDTO = z.input<typeof DeleteCollaboratorResponseSchema>