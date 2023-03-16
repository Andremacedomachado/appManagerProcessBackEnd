import { z } from "zod";
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";

export interface ICreateActivityRequestDTO extends IActivityProps {

}

export const CreateActivityRequestSchema = z.object({
    title: z.string(),
    description: z.string().optional().transform(stringOrUndefined => stringOrUndefined ? stringOrUndefined : undefined),
    responsible_id: z.string().uuid(),
    due_date: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    start_date: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : undefined),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]).optional()
        .transform(status => status ? status : STATUSACTIVITY.DO_TO),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).optional()
        .transform(node => node ? node : undefined),
    created_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
    updated_at: z.date().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
})

export const CreateActivityResponseSchema = z.object({
    id: z.string().uuid()
})

export type test = z.output<typeof CreateActivityRequestSchema>