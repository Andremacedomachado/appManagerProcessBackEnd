import { z } from "zod";

export type OrganizationSectorResponseDTO = {
    id: string,
    name: string,
    created_at: Date,
    updated_at: Date,
    employeesAllocated: number,
    organization_id: string
}

export const OrganizationSectorResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.string().uuid()
})

export const GetAllOrganizationSectorResponseSchema = z.array(OrganizationSectorResponseSchema);