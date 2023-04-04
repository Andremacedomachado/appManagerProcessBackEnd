import { z } from "zod"
import { ActivityDeletedDataResponseType } from "../../repositories/IDeleteRecordIntegrationRepository"
import { STATUSACTIVITY, TYPENODE } from "../../../domain/entities/Activity"
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const DeleteActivityOnCascadeRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const ActivityInfoDeleteActivityOnCascadeResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3),
    description: z.string().optional().transform(description => description ? description : null),
    responsible_id: z.string().uuid(),
    start_date: z.date().optional().transform(date => date ? date : null),
    due_date: z.date().optional().transform(date => date ? date : null),
    progress_status: z.enum([STATUSACTIVITY.DO_TO, STATUSACTIVITY.CLOSED]),
    type_node: z.enum([TYPENODE.INITIAL, TYPENODE.FINALLY]).nullable(),
    created_at: z.date(),
    updated_at: z.date()
});
export type ActivityInfoDeleteActivityOnCascadeResponseDTO = z.input<typeof ActivityInfoDeleteActivityOnCascadeResponseSchema>

export const DependencyDeleteActivityOnCascadeResponseSchema = z.object({
    parent_id: z.string().uuid(),
    children_id: z.string().uuid(),
    dependency_linked_date: z.date()
})
export type DependencyDeleteActivityOnCascadeResponseDTO = z.input<typeof DependencyDeleteActivityOnCascadeResponseSchema>

export const CollaboratorDeleteActivityOnCascadeResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid()
})
export type CollaboratorDeleteActivityOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteActivityOnCascadeResponseSchema>

export const AnnexDeleteActivityOnCascadeResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})
export type AnnexDeleteActivityOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteActivityOnCascadeResponseSchema>

export const MessageDeleteActivityOnCascadeResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})
export type MessageDeleteActivityOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteActivityOnCascadeResponseSchema>

export const DeleteActivityOnCascadeResponseSchema = z.object({
    infoActivity: ActivityInfoDeleteActivityOnCascadeResponseSchema,
    dependencies: z.array(DependencyDeleteActivityOnCascadeResponseSchema),
    collaborators: z.array(CollaboratorDeleteActivityOnCascadeResponseSchema),
    annexsInActivity: z.array(AnnexDeleteActivityOnCascadeResponseSchema),
    messagesInActivity: z.array(MessageDeleteActivityOnCascadeResponseSchema),
})

export type DeleteActivityOnCascadeResponseDTO = z.input<typeof DeleteActivityOnCascadeResponseSchema>