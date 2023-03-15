import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserInputSchema } from "./CreateUserDTO";
import { ZodError } from "zod";


export class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {
    }

    async handle(request: Request, response: Response) {

        try {
            const { name, email, password, status, created_at, updated_at, organization_sector_id } = CreateUserInputSchema.parse(request.body);
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
            if (error instanceof ZodError) {
                return response.status(400).json({ sucess: false, errors: error })
            }
            return response.status(500).json({ error: 'Error Unexpected' })
        }
    }
};