import { z } from "zod"

export const DeleteRecordDependencyRequestSchema = z.object({
    parent_id: z.string().uuid(),
    children_id: z.string().uuid()
})

export const DeleteRecordDependencyResponseSchema = z.object({
    children_id: z.string().uuid(),
    parent_id: z.string().uuid(),
    dependency_linked_date: z.date()
})

export type DeleteRecordDependencyResponseDTO = z.input<typeof DeleteRecordDependencyResponseSchema>