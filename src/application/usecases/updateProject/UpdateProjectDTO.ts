import { Project } from "@prisma/client";
import { z } from "zod";
import { IProjectPropsPrimitive } from "../../../domain/entities/QueryHelp";

export const UpdateProjectRequestSchema = z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().nullable().optional(),
}).transform((data, ctx) => {
    if (!data.title && !data.description) {
        ctx.addIssue({
            code: 'custom',
            message: 'at least 1 of the fields is required',
            params: [data.title, data.description],
            path: ['title', 'description']
        })
    }

    return data;
})

export type UpdateProjectRequestData = z.infer<typeof UpdateProjectRequestSchema>

export const UpdateProjectResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
})

export type UpdateProjectResponseData = z.infer<typeof UpdateProjectResponseSchema>