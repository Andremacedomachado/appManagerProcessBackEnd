import { z } from "zod";

export const DeleteAllAnnexActivtyByUserRequestSchema = z.object({
    user_id: z.string().uuid(),

})
export type DeleteAllAnnexActivtyByUserRequestDTO = z.infer<typeof DeleteAllAnnexActivtyByUserRequestSchema>

export const AnnexActivtyByUserResponseSchema = z.object({
    original_name: z.string(),
    file_name: z.string(),
    user_id: z.string().uuid(),
    activity_id: z.string().uuid(),
    url: z.string(),
    publication_date: z.date()
})

export type AnnexActivtyByUserResponseDTO = z.input<typeof AnnexActivtyByUserResponseSchema>

export const DeleteAllAnnexActivtyByUserResponseSchema = z.array(AnnexActivtyByUserResponseSchema);