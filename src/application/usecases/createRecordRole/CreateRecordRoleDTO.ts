import { array, string, z } from "zod"


export interface IRecordRolesRequestDTO {
    userId: string,
    adjusterId: string,
    rolesIds: string[]
}

export const CreateRecordRoleRequestSchema = z.object({
    userId: z.string(),
    adjusterId: z.string(),
    rolesIds: z.array(z.string())
        .refine(array => array.length >= 0, "Not information rolesIds in request")
})

