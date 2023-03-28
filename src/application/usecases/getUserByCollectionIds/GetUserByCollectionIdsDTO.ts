import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const GetUserByColletionIdsRequestSchema = z.object({
    userIds: z.array(z.string().uuid()).nonempty()
});

export const UserInColletionResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()]),
    created_at: z.date(),
    updated_at: z.date(),
})
export type UserInColletionResponseDTO = z.input<typeof UserInColletionResponseSchema>;

export const inconsistenciesFoundResponseSchema = z.object({
    idsRequestDuplicate: z.array(z.string().uuid()),
    userNotExistsInRequest: z.array(z.string().uuid())
})
export const GetUserByColletionIdsResponseSchema = z.object({
    userInfoFound: z.array(UserInColletionResponseSchema),
    inconsistenciesFound: inconsistenciesFoundResponseSchema
});

export type GetUserByColletionIdsResponseDTO = z.input<typeof GetUserByColletionIdsResponseSchema>