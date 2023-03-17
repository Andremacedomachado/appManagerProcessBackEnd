import { z } from "zod";
import { IAnnexActivityIdProps } from "../../repositories/IAnnexActivityRepository";

export interface IDeleteAnnexActivityRequestDTO extends IAnnexActivityIdProps {
}

export const DeletAnnexActivityRequestSchema = z.object({
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    publication_date: z.string().datetime({ precision: 3 })
        .transform(dataString => new Date(dataString))
});