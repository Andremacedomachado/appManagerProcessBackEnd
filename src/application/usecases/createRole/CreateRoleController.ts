import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";
import { IRoleRequestDTO } from "./CreateRoleDTO";



export class CreateRoleController {
    constructor(private createRoleUseCase: CreateRoleUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { name, description, created_at, updated_at }: IRoleRequestDTO = request.body

        try {
            const roleIdOrError = await this.createRoleUseCase.excute({ name, description, created_at, updated_at });
            if (roleIdOrError instanceof Error) {
                return response.status(500).json({ error: roleIdOrError.message });
            }
            return response.status(200).json(roleIdOrError);
        } catch (error) {
            return response.status(500).json({ error: 'Error Unexpected ' });
        }

    }
}