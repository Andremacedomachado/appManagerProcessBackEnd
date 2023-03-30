import { z } from "zod";

export const DeleteAllAnnexActivityByUserRequestSchema = z.object({
    user_id: z.string().uuid(),

})
export type DeleteAllAnnexActivityByUserRequestDTO = z.infer<typeof DeleteAllAnnexActivityByUserRequestSchema>

export const AnnexActivityByUserResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})

export type AnnexActivityByUserResponseDTO = z.input<typeof AnnexActivityByUserResponseSchema>

export const DeleteAllAnnexActivityByUserResponseSchema = z.array(AnnexActivityByUserResponseSchema);