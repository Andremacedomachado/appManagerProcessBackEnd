import { z } from "zod";


export interface ISessionLoginRequestDTO {
    email: string,
    password: string,
}

export const SessionLogingRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const SessionLogingResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    access_token: z.string(),
})
export type SessionLogingResponseDTO = z.input<typeof SessionLogingResponseSchema>;