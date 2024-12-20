import { z } from "zod"
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity"
import { UserIsActive } from "../../../domain/entities/User"

export const DeleteUserOnCascadeRequestSchema = z.object({
    userId: z.string().uuid()
})

export const InfoUserDeleteOnCascadeResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.union([z.string().uuid(), z.null()])
})

export type InfoUserDeleteOnCascadeResponseDTO = z.input<typeof InfoUserDeleteOnCascadeResponseSchema>

export const RoleDeleteOnCascadeResponseSchema = z.object({
    user_id: z.string().uuid(),
    role_id: z.string().uuid(),
    created_at: z.date(),
    adjuster_id: z.string().uuid(),
})

export type RoleDeleteOnCascadeResponseDTO = z.input<typeof RoleDeleteOnCascadeResponseSchema>

export const CollaboratorDeleteUserOnCascadeResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid()
})
export type CollaboratorDeleteUserOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteUserOnCascadeResponseSchema>

export const AnnexDeleteUserOnCascadeResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})
export type AnnexDeleteUserOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteUserOnCascadeResponseSchema>

export const MessageDeleteUserOnCascadeResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})
export type MessageDeleteUserOnCascadeResponseDTO = z.input<typeof CollaboratorDeleteUserOnCascadeResponseSchema>


export const DeleteUserOnCascadeResponseSchema = z.object({
    infoUser: InfoUserDeleteOnCascadeResponseSchema,
    roles: z.array(RoleDeleteOnCascadeResponseSchema),
    collaborators: z.array(CollaboratorDeleteUserOnCascadeResponseSchema),
    messages: z.array(MessageDeleteUserOnCascadeResponseSchema),
    annexs: z.array(AnnexDeleteUserOnCascadeResponseSchema)
})


export type DeleteUserOnCascadeResponseDTO = z.input<typeof DeleteUserOnCascadeResponseSchema>