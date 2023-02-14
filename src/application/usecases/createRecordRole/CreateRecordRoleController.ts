import { Request, Response } from "express";

import { CreateRecordRoleUseCase } from "./CreateRecordRoleUseCase";
import { IRecordRolesRequestDTO } from "./CreateRecordRoleDTO";


export class CreateRecordRoleController {
    constructor(private createRecordRoleUsecase: CreateRecordRoleUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { userId, rolesIds, adjusterId }: IRecordRolesRequestDTO = request.body;
        try {
            const errorExist = await this.createRecordRoleUsecase.execute({ userId, rolesIds, adjusterId });
            if (errorExist instanceof Error) {
                return response.status(400).json({ error: errorExist.message });
            }
            return response.status(200).json({});
        } catch (error) {
            return response.status(500).json({ errorMenssage: "Error Unexpected", error });
        }

    }
}