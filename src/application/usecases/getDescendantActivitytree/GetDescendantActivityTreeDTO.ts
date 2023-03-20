import { z } from "zod";
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";

export const GetDescendantActivityTreeRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const GetDescendantActivityResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string(),
    responsible_id: z.string().uuid(),
    start_date: z.date().optional()
        .transform(date => date ? date : null),
    due_date: z.date().optional()
        .transform(date => date ? date : null),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).nullable(),
    created_at: z.date(),
    updated_at: z.date()
});

export const GetDescendantActivityTreeResponseSchema = z.array(GetDescendantActivityResponseSchema)

export type GetDescendantActivityResponseDTO = z.input<typeof GetDescendantActivityResponseSchema>