import { z } from "zod";
import { IMessageActivityUpdateProps } from "../../repositories/IMessageActivityRepository";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export interface IUpdateMessageActivityRequestDTO extends IMessageActivityUpdateProps {
}

export const UpdateMessageActivityRequestSchema = z.object({
    content: z.string().optional(),
    publication_date: z.string().datetime({ precision: 3 })
        .transform(dateString => new Date(dateString)),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]).optional(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    updated_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date())
})

export const UpdateMessageActivityResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})

export type UpdateMessageActivityResponseDTO = z.input<typeof UpdateMessageActivityResponseSchema>