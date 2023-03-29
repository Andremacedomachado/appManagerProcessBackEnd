import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const DeleteAllMessageActivityByUserRequestSchema = z.object({
    userId: z.string().uuid()
});

export const DeleteMessageActivityByUserResponseSchema = z.object({
    content: z.string(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
    user_id: z.string().uuid(),
    updated_at: z.date()
});
export type DeleteMessageActivityByUserResponseDTO = z.input<typeof DeleteMessageActivityByUserResponseSchema>

export const DeleteAllMessageActivityByUserResponseSchema = z.array(DeleteMessageActivityByUserResponseSchema);
