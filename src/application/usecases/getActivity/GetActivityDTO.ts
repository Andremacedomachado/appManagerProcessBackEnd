import { z } from "zod"
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity"

export interface IGetActivityRequestDTO {
    title: string
}

export const GetActivityRequestSchema = z.object({
    title: z.string().min(3)
})

export const GetActivityResponseSchema = z.object({
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

export type ActivityReponseType = z.input<typeof GetActivityResponseSchema>