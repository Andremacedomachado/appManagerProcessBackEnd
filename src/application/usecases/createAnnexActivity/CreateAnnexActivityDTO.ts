import { z } from "zod";
import { IAnnexActivityProps } from "../../../domain/entities/AnnexActivity";

export interface ICreateAnnexActivityRequestDTO extends IAnnexActivityProps {
}

export const CreateAnnexActivityRequestSchema = z.object({
    original_name: z.string().min(3),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string().optional().transform(url => url ? url : ''),
    publication_date: z.string().datetime().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date())
})

export const CreateAnnexActivityResponseSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    publication_date: z.date()
});

export type CreateAnnexActivityRequestDTO = z.input<typeof CreateAnnexActivityRequestSchema>