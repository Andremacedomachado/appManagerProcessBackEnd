import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { ICreateUserRequestDTO } from "./CreateUserDTO";


export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { name, email, password, status, created_at, updated_at, organization_sector_id }: ICreateUserRequestDTO = request.body;

        try {
            const userIdOrError = await this.createUserUseCase.execute({
                name,
                email,
                password,
                status,
                created_at,
                updated_at,
                organization_sector_id
            });
            if (userIdOrError instanceof Error) {
                return response.status(500).json({ error: userIdOrError.message });
            }
            return response.status(200).json({ userId: userIdOrError.id });
        } catch (error) {
            return response.status(500).json({ error: 'Error Unexpected' })
        }
    }
};