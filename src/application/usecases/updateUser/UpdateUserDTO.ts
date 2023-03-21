import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const UpdateUserRequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string().optional(),
    email: z.string().min(3).email().optional(),
    password: z.union([
        z.string().max(8)
            .refine(passwordString =>
                /^(?=[a-zA-Z0-9]{4,}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*/.test(passwordString),
                'Passowrod Format Invald - enter a password with letters and numbers, and with a maximum of 8 digits')
        ,
        z.undefined()]),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]).optional(),
    updated_at: z.string().datetime({ precision: 3 }).optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
})

export type UpdateUserRequestDTO = z.infer<typeof UpdateUserRequestSchema>

export const UpdateUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.string().uuid(),
    created_at: z.date(),
    updated_at: z.date(),
})

export type UpdateUserResponseDTO = z.input<typeof UpdateUserResponseSchema>