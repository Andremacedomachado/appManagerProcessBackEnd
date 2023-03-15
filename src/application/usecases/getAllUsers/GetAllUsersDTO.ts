import { z } from "zod";
import { IUserProps, UserIsActive } from "../../../domain/entities/User";

export type TUserInfoResponseWithoutPassword = Omit<IUserProps, "password">;

export const UserInfoResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    created_at: z.date(),
    updated_at: z.date(),
    status: z.enum([UserIsActive.ACTIVE, UserIsActive.INACTIVE]),
    organization_sector_id: z.string().uuid()
})
export type UserInfoResponseType = z.infer<typeof UserInfoResponseSchema>

export const allUserReponseSchema = z.array(UserInfoResponseSchema)

export type formatresponse = z.input<typeof allUserReponseSchema>
