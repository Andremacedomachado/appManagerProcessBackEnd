import { z } from "zod";
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";

export const ActivityResponseSchema = z.object({
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
});
export const GetAllActivityResponseSchema = z.array(ActivityResponseSchema);

export type ActivityResponseDTO = z.input<typeof ActivityResponseSchema>