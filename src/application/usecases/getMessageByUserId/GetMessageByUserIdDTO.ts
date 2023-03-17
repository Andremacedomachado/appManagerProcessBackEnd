import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const GetMessageByUserRequestSchema = z.object({
    userId: z.string().uuid()
})

export const MessageByUserResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})

export const GetMessageByUserResponseSchema = z.array(MessageByUserResponseSchema);

export type MessageByUserResponseDTO = z.input<typeof MessageByUserResponseSchema>