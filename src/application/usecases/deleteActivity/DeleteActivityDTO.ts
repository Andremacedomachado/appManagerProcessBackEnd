import { z } from "zod"
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity"

export const DeleteActivityRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const DeleteActivityResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string(),
    responsible_id: z.string().uuid(),
    start_date: z.date().optional()
        .transform(date => !date ? null : date),
    due_date: z.date().optional()
        .transform(date => !date ? null : date),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).nullable(),
    created_at: z.date(),
    updated_at: z.date()
})

export type DeleteActivityResponseDTO = z.input<typeof DeleteActivityResponseSchema>