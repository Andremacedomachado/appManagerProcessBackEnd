import { z } from "zod";
import { TYPEMESSAGE } from "../../../domain/entities/MessageActivity";

export interface ICreateMessageActivityRequestDTO {
    content: string;
    publication_date?: Date;
    updated_at?: Date;
    typeMessage: string;
    userId: string;
    activityId: string;
}

export const CreateMessageActivityRequestSchema = z.object({
    content: z.string(),
    publication_date: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
    typeMessage: z.enum([TYPEMESSAGE.SYSTEM, TYPEMESSAGE.USER]),
    userId: z.string().uuid(),
    activityId: z.string().uuid(),
    updated_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date())
})

export const CreateMessageActivityResponseSchema = z.object({
    user_id: z.string().uuid(),
    publication_date: z.date(),
    activity_id: z.string().uuid(),
})