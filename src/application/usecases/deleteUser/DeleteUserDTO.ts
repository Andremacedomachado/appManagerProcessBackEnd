import { z } from "zod"
import { UserIsActive } from "../../../domain/entities/User"

export const DeleteUserRequestSchema = z.object({
    userId: z.string().uuid()
})

export const DeleteUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()])
})

export type DeleteUserResponseDTO = z.input<typeof DeleteUserResponseSchema>