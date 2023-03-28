import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const DeleteMessageActivityRequestSchema = z.object({
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    publication_date: z.string().datetime({ precision: 3 })
        .transform(dateString => new Date(dateString))
})

export const DeleteMessageActivityResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
});

export type DeleteMessageActivityResponseDTO = z.input<typeof DeleteMessageActivityResponseSchema>