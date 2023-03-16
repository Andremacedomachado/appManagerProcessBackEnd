import { TypeOf, z } from "zod";

export const GetOrganizationSectorRequestSchema = z.object({
    sectorId: z.string().uuid()
})

export const GetOrganizationSectorResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.string().uuid()
})

export type GetOrganizationSectorResponseDTO = z.input<typeof GetOrganizationSectorResponseSchema>
