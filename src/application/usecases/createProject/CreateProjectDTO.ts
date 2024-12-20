import { z } from "zod";
import { QueryHelp, IProjectPropsPrimitive } from "../../../domain/entities/QueryHelp";


export const CreateProjectRequestSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    created_at: z.coerce.date().optional(),
    updated_at: z.coerce.date().optional()
}).transform(data => {
    if (!data.description) data.description = null;
    return data
})

export type CreateProjectRequestData = z.infer<typeof CreateProjectRequestSchema>

export const CreateProjectResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
})