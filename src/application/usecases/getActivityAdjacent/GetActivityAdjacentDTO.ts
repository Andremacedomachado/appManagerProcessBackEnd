import { z } from "zod";

export const GetActivityAdjacentRequestSchema = z.object({
    activityId: z.string().uuid()
})

export const GetActivityAdjacentResponseSchema = z.array(z.object({
    parent_id: z.string().uuid(),
    children_id: z.string().uuid(),
    dependency_linked_date: z.date(),
}))

export type GetActivityAdjacentResponseDTO = z.infer<typeof GetActivityAdjacentResponseSchema>