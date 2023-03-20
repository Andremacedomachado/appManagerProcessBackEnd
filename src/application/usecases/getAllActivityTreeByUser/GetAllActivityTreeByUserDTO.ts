import { z } from "zod";
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";

export const GetAllActivityTreeByUserRequestSchema = z.object({
    userId: z.string().uuid()
})

export const ActivityTreeByUserResponseSchema = z.object({
    activities: z.array(z.object({
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
    })),
    collaborators: z.array(z.object({
        user_id: z.string().uuid(),
        activity_id: z.string().uuid()
    }))
})

export const GetALlActivityTreeByUserResponseSchema = z.object({
    collectionsActivityTree: z.array(ActivityTreeByUserResponseSchema)
})
export type ActivityTreeByUserResponseDTO = z.input<typeof ActivityTreeByUserResponseSchema>

export type GetALlActivityTreeByUserResponseDTO = z.input<typeof GetALlActivityTreeByUserResponseSchema>