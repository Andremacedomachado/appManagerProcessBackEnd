import { z } from "zod";

export const GetAllRolesResponseDTO = z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    created_at: z.date(),
    updated_at: z.date(),
}))
export type GetAllRolesResponseSchema = z.infer<typeof GetAllRolesResponseDTO>