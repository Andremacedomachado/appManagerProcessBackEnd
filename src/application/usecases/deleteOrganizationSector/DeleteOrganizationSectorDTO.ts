import { z } from "zod";


export const DeleteOrganizationSectorRequestSchema = z.object({
    sectorId: z.string().uuid()
})

export const DeleteOrganizationSectorResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.union([z.string().uuid(), z.null()])
});

export type DeleteOrganizationSectorResponseDTO = z.input<typeof DeleteOrganizationSectorResponseSchema>