import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const GetAllUserBySectorRequestSchema = z.object({
    sectorId: z.string().uuid()
})

export const UserBySectorResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.string().uuid(),
})

export type UserBySectorResponseDTO = z.input<typeof UserBySectorResponseSchema>

export const GetAllUserBySectorResponseSchema = z.array(UserBySectorResponseSchema)

