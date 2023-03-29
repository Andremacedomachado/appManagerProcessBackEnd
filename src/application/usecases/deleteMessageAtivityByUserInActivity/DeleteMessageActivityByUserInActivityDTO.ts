import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const DeleteMessageActivityByUserInActivityRequestSchema = z.object({
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
});

export const MessageActivityByUserInActivityResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
})
export type MessageActivityByUserInActivityResponseDTO = z.input<typeof MessageActivityByUserInActivityResponseSchema>;

export const DeleteMessageActivityByUserInActivityResponseSchema = z.array(MessageActivityByUserInActivityResponseSchema)