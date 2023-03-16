import { z } from "zod";


export interface CreateOrganizationRequestDTO {
    name: string,
    employeesAllocated: number,
    created_at?: Date,
    updated_at?: Date,
}

export const CreateOrganizationRequestSchema = z.object({
    name: z.string(),
    employeesAllocated: z.number().nonnegative(),
    created_at: z.date().optional()
        .transform(date => date ? date : new Date()),
    updated_at: z.date().optional()
        .transform(date => date ? date : new Date()),
})

export const CreateOrganizationResponseSchema = z.object({
    id: z.string().uuid(),
})