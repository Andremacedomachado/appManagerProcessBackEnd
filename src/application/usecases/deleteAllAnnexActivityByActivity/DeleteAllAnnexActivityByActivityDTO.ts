import { z } from "zod";

export const DeleteAllAnnexActivityByActivityRequestSchema = z.object({
    activity_id: z.string().uuid(),

})
export type DeleteAllAnnexActivtyByActivtyRequestDTO = z.infer<typeof DeleteAllAnnexActivityByActivityRequestSchema>

export const AnnexActivityByActivtyResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})

export type AnnexActivityByActivtyResponseDTO = z.input<typeof AnnexActivityByActivtyResponseSchema>

export const DeleteAllAnnexActivityByActivtyResponseSchema = z.array(AnnexActivityByActivtyResponseSchema);