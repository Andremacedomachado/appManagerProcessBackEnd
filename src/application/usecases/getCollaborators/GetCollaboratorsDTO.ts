import { z } from "zod"
import { KeysCollaboratorField } from "../../repositories/ICollaboratorReposytory"


const arrayFieldFilterCollaborator: KeysCollaboratorField = ["activity_id", "user_id"]


export const GetCollaboratorsFieldSchema = z.array(z.enum([arrayFieldFilterCollaborator[0], ...arrayFieldFilterCollaborator.slice(1)])).optional()

export const GetCollaboratorsSchema = z.object({
    keys: GetCollaboratorsFieldSchema,
    value: z.string().optional()
})

export type GetCollaboratorsData = z.infer<typeof GetCollaboratorsSchema>