import { z } from "zod";

export const DeleteOrganizationRequestSchema = z.object({
    organizationId: z.string().uuid()
})

export const DeleteOrganizationResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    employeesAllocated: z.number().nonnegative(),
})

export type DeleteOrganizationResponseDTO = z.input<typeof DeleteOrganizationResponseSchema>