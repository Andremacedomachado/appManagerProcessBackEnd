import { z } from "zod"

export const DeleteRecordDependencyByCorrelationRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const RecordDependencyByCorrelationResponseSchema = z.object({
    children_id: z.string().uuid(),
    parent_id: z.string().uuid(),
    dependency_linked_date: z.date()
})

export type RecordDependencyByCorrelationResponseDTO = z.input<typeof RecordDependencyByCorrelationResponseSchema>

export const DeleteRecordDependencyByCorrelationResponseSchema = z.array(RecordDependencyByCorrelationResponseSchema)