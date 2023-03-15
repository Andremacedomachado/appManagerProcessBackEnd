import { z } from "zod";
import { IRoleProps } from "../../../domain/entities/Role";


export interface IRoleRequestDTO extends IRoleProps {
}

export const CreateRoleRequestSchema = z.object({
    name: z.string(),
    description: z.string(),
    created_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
    updated_at: z.string().optional()
        .transform(dateString => dateString ? new Date(dateString) : new Date()),
})

export const RoleIdResponseSchema = z.object({
    id: z.string().uuid()
});