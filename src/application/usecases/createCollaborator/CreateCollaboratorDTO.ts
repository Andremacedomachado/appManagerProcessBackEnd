import { z } from "zod"
export interface ICreateCollaboratorRequestDTO {
    userIds: string[],
    activityId: string
}

export const CreateCollaboratorRequestSchema = z.object({
    userIds: z.array(z.string().uuid()),
    activityId: z.string().uuid()
});