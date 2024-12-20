import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export const CreateMessageActivityRequestSchema = z.object({
    content: z.string(),
    publication_date: z.coerce.date().optional(),
    type_message: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    updated_at: z.coerce.date().optional()
})

export type ICreateMessageActivityRequestDTO = z.infer<typeof CreateMessageActivityRequestSchema>;
export const CreateMessageActivityResponseSchema = z.object({
    user_id: z.string().uuid(),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
})