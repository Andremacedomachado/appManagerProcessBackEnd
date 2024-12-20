import { z } from "zod";

export const DeleteProjectRequestSchema = z.object({
    id: z.string().uuid()
})

export type DeleteProjectRequestData = z.infer<typeof DeleteProjectRequestSchema>

export const DeleteProjectResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date()
})

export type DeleteProjectResponseData = z.infer<typeof DeleteProjectResponseSchema>