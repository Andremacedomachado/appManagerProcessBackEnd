import { z } from "zod"

export interface IOrganizationSectorRequestDTO {
    name: string
    created_at?: Date,
    updated_at?: Date,
    employeesAllocated: number
    organization_id: string
}

export const CreateOrganizationSectorRequestSchema = z.object({
    name: z.string(),
    created_at: z.date().optional()
        .transform(date => date ? date : new Date()),
    updated_at: z.date().optional()
        .transform(date => date ? date : new Date()),
    employeesAllocated: z.number().nonnegative(),
    organization_id: z.string().uuid()
})

export const CreateOrganizationSectorResponseSchema = z.object({
    id: z.string().uuid()
})