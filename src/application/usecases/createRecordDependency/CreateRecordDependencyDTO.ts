import { z } from "zod"

export const CreateRecordDependencyRequestSchema = z.object({
    children_id: z.string().uuid(),
    parent_id: z.string().uuid(),
    dependency_linked_date: z.string().datetime().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date())
})

export const CreateRecordDependencyResponseSchema = z.object({
    children_id: z.string().uuid(),
    parent_id: z.string().uuid(),
    dependency_linked_date: z.date()
})

export type CreateRecordDependencyResponseDTO = z.input<typeof CreateRecordDependencyResponseSchema>