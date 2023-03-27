import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const UpdateManyUserRequestSchema = z.object({
    ids: z.array(z.string().uuid()).nonempty(),
    name: z.string().optional(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]).optional(),
    organization_sector_id: z.union([z.string().uuid(), z.null()]).optional(),
    created_at: z.string().datetime({ precision: 3 }).optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    updated_at: z.string().datetime({ precision: 3 }).optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
})

export const UpdateUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()]),
    created_at: z.date(),
    updated_at: z.date(),
})
export type UpdateUserResponseDTO = z.input<typeof UpdateUserResponseSchema>

export const UpdateManyUserResponseSchema = z.array(UpdateUserResponseSchema);