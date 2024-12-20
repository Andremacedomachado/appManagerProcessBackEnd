import { z } from "zod";


export const GetAnnexsInfoByActivityIdRequestSchema = z.object({
    activityId: z.string().uuid()
})

export type GetAnnexsInfoByActivityIdRequestDTO = z.infer<typeof GetAnnexsInfoByActivityIdRequestSchema>

export const GetAnnexsInfoByActivityIdResponseSchema = z.array(
    z.object({
        original_name: z.string(),
        file_name: z.string(),
        user_id: z.string().uuid(),
        activity_id: z.string().uuid(),
        url: z.string(),
        publication_date: z.date()
    })
)

export type GetAnnexActivityInfoResponseDTO = z.infer<typeof GetAnnexsInfoByActivityIdResponseSchema>
