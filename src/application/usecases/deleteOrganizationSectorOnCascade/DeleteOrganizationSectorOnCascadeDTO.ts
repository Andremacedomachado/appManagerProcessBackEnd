import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const DeleteOrganizationSectorOnCascadeRequestSchema = z.object({
    sectorId: z.string().uuid()
})

export const SectorUnlinkUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()])
})
export type SectorUnlinkUserResponseDTO = z.input<typeof SectorUnlinkUserResponseSchema>

export const InfoSectorDeletedCascadeResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.union([z.string().uuid(), z.null()])
})
export type InfoSectorDeletedCascadeResponseDTO = z.input<typeof InfoSectorDeletedCascadeResponseSchema>

export const SectorDeletedCascadedResponseSchema = z.object({
    collectionOfAffectedUsers: z.array(SectorUnlinkUserResponseSchema),
    infoSectorDeleted: InfoSectorDeletedCascadeResponseSchema
});
export type SectorDeletedCascadeResponseDTO = z.input<typeof SectorDeletedCascadedResponseSchema>
