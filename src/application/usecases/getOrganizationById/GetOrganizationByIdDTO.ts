import { z } from "zod";

export const GetOrganizationIdRequestSchema = z.object({
    organizationId: z.string().uuid()
});

export const GetOrganizationResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
})
