import { z } from "zod";
import { UserIsActive } from "../../../domain/entities/User";

export const DeleteOrganizationOnCascadeRequestSchema = z.object({
    organizationId: z.string().uuid()
})

export const UnlinkUserResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()])
})
export type UnlinkUserResponseDTO = z.input<typeof UnlinkUserResponseSchema>

export const InfoSectorDeletedCascadeResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.union([z.string().uuid(), z.null()])
})
export type InfoSectorDeletedCascadeResponseDTO = z.input<typeof InfoSectorDeletedCascadeResponseSchema>

export const InfoOrganizationDeletedCascadeResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
})
export type InfoOrganizationDeletedCascadeResponseDTO = z.input<typeof InfoOrganizationDeletedCascadeResponseSchema>


const collectionSectorsDeletedCascadedResponseSchema = z.object({
    collectionOfAffectedUsers: z.array(UnlinkUserResponseSchema),
    infoSectorDeleted: InfoSectorDeletedCascadeResponseSchema
});
export type collectionSectorDeletedCascadeResponseDTO = z.input<typeof collectionSectorsDeletedCascadedResponseSchema>

export const DeleteOrganizationOnCascadeResponseSchema = z.object({
    collectionOfAffectedSectors: z.array(collectionSectorsDeletedCascadedResponseSchema),
    infoOrganizationDeleted: InfoOrganizationDeletedCascadeResponseSchema
})
export type DeleteOrganizationOnCascadeResponseDTO = z.input<typeof DeleteOrganizationOnCascadeResponseSchema>
