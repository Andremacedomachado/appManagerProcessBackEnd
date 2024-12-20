import { z } from "zod";
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";

export const UpdateActivityByIdRequestSchema = z.object({
    id: z.string().uuid(),
    title: z.string().optional(),
    description: z.string().optional().transform(stringOrUndefined => stringOrUndefined ? stringOrUndefined : undefined).optional(),
    responsible_id: z.string().uuid().optional(),

    start_date: z.coerce.date().optional(),
    due_date: z.coerce.date().nullable().optional(),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]).optional(),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).optional()
        .transform(node => node ? node : undefined).optional(),
    created_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    updated_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    conclusion_date: z.coerce.date().nullable().optional(),
    sector_id: z.string().uuid().nullable().optional(),
    project_id: z.string().uuid().optional(),
})

export type UpdateActivityByIdRequestDTO = z.infer<typeof UpdateActivityByIdRequestSchema>

export const UpdateActivityByIdResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string().optional(),
    responsible_id: z.string().uuid().optional(),
    due_date: z.coerce.date().nullable().optional(),
    start_date: z.date(),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    conclusion_date: z.coerce.date().nullable(),
    project_id: z.string().uuid(),
    sector_id: z.string().uuid()
})

export type UpdateActivityByIdResponseDTO = z.infer<typeof UpdateActivityByIdResponseSchema>
