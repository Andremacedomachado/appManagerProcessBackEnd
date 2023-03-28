import { z } from "zod";


export const GetSectorsByOrganizationIdRequestSchema = z.object({
    organizationId: z.string().uuid()
})

export const SectorsByOrganizationIdResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.union([z.string().uuid(), z.null()])
})
export type SectorsByOrganizationIdResponseType = z.input<typeof SectorsByOrganizationIdResponseSchema>

export const GetSectorsByOrganizationIdResponseSchema = z.array(SectorsByOrganizationIdResponseSchema)