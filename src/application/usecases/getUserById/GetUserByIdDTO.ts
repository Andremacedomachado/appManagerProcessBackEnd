import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";
import { IUserFullInfo, roleInfo, organizationInfo } from "../../repositories/IUserIntegrationRepository";

export const UserIdRequestSchema = z.object({
    userId: z.string().uuid()
})

export const SectorResponseSchema = z.object({
    dateLinkSector: z.date(),
    organizationId: z.string().uuid(),
    organizationName: z.string(),
})
export const RoleResponseSchema = z.object({
    roleName: z.string(),
    roleId: z.string().uuid(),
    adjusterId: z.string().uuid(),
    dateLinkRole: z.date()
})

export const UserFullInfoResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_linked: SectorResponseSchema,
    roles: z.array(RoleResponseSchema).optional()
});