import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const DeleteMessageActivityByActivityRequestSchema = z.object({
    activityId: z.string().uuid()
});

export const MessageActivityByActivityResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
});
export type DeleteMessageActivityByActivityResponseDTO = z.input<typeof MessageActivityByActivityResponseSchema>

export const DeleteMessageActivityByActivityResponseSchema = z.array(MessageActivityByActivityResponseSchema);
