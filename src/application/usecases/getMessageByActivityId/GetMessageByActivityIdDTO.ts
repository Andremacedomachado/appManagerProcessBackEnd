import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const GetMessageByActivityRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const MessageByActivityResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})

export const GetMessageByActivityResponseSchema = z.array(MessageByActivityResponseSchema);

export type MessageByActivityResponseDTO = z.input<typeof MessageByActivityResponseSchema>