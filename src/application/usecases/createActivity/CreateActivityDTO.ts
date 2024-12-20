import { z } from "zod";
import { IActivityProps, STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity";
import { isBefore } from "date-fns";

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
    updated_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
    project_id: z.string().uuid()
}).transform((activity, ctx) => {

    if (activity.start_date && activity.due_date) {
        if (isBefore(activity.start_date, activity.due_date)) {
            const { start_date, due_date } = activity
            ctx.addIssue({
                code: 'custom',
                message: "the start date must be before the end date",
                path: ["start_date", "due_date"],
                params: {
                    start_date,
                    due_date
                }
            })
        }

        return activity
    }

    return activity
})

export type CreateActivityRequestData = z.infer<typeof CreateActivityRequestSchema>
export const CreateActivityResponseSchema = z.object({
    id: z.string().uuid()
})

export type test = z.output<typeof CreateActivityRequestSchema>