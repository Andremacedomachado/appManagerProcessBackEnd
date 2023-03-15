import { Request, Response } from "express";

import { CreateRecordRoleUseCase } from "./CreateRecordRoleUseCase";
import { CreateRecordRoleRequestSchema, IRecordRolesRequestDTO } from "./CreateRecordRoleDTO";
import { ZodError } from "zod";


export class CreateRecordRoleController {
    constructor(private createRecordRoleUsecase: CreateRecordRoleUseCase) {
    }

    async handle(request: Request, response: Response) {
        try {
            const { userId, rolesIds, adjusterId } = CreateRecordRoleRequestSchema.parse(request.body);
            const errorExist = await this.createRecordRoleUsecase.execute({ userId, rolesIds, adjusterId });
            if (errorExist instanceof Error) {
                return response.status(400).json({ error: errorExist.message });
            }
            return response.status(200).json();
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors);
            }
            return response.status(500).json({ errorMenssage: "Error Unexpected", typeErrors: errors });
        }

    }
}