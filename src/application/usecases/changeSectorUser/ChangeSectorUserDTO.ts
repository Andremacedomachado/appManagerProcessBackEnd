import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const ChangeSectorUserRequestSchema = z.object({
    userId: z.string().uuid(),
    organization_sector_id: z.string().uuid()
})

export type ChangeSectorUserRequestDTO = z.infer<typeof ChangeSectorUserRequestSchema>

export const ChangeSectorUserResponseSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    name: z.string(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.string().uuid(),
    created_at: z.date(),
    updated_at: z.date()
})

export type ChangeSectorUserResponseDTO = z.input<typeof ChangeSectorUserResponseSchema>