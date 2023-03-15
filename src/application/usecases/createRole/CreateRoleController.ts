import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { CreateRoleRequestSchema, RoleIdResponseSchema } from "./CreateRoleDTO";
import { ZodError } from "zod";



export class CreateRoleController {
    constructor(private createRoleUseCase: CreateRoleUseCase) {
    }

    async handle(request: Request, response: Response) {

        try {
            const { name, description, created_at, updated_at } = CreateRoleRequestSchema.parse(request.body);
            const roleIdOrError = await this.createRoleUseCase.excute({ name, description, created_at, updated_at });
            if (roleIdOrError instanceof Error) {
                return response.status(500).json({ error: roleIdOrError.message });
            }
            const responseInFormat = RoleIdResponseSchema.parse(roleIdOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Error Unexpected ', typeErrors: errors });
        }

    }
}