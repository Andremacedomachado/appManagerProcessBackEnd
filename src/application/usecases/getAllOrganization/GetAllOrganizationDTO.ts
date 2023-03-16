import { z } from "zod";

export type OrganizationResponseDTO = {
    id: string,
    name: string,
    created_at: Date,
    updated_at: Date,
    employeesAllocated: number,
}

export const OrganizationResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
});

export const GetAllOrganizationResponseSchema = z.array(OrganizationResponseSchema);