import { z } from "zod"
import { IAnnexActivityUnique } from "../../repositories/IAnnexActivityRepository"

export interface IGetAnnexActivityInfoRequestDTO extends IAnnexActivityUnique {
}

export const GetAnnexActivityInfoRequestSchema = z.object({
    original_name: z.string().min(3),
    publication_date: z.string().datetime({ precision: 3 })
        .transform(dateString => new Date(dateString))
})

export const GetAnnexActivityInfoResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})