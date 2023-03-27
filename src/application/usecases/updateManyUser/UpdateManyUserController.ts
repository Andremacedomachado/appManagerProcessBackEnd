import { Request, Response } from "express";
import { UpdateManyUserUseCase } from "./UpdateManyUserUseCase";
import { ZodError } from "zod";
import { UpdateManyUserRequestSchema, UpdateManyUserResponseSchema, UpdateUserResponseDTO } from "./UpdateManyUserDTO";

export class UpdateManyUserController {
    constructor(private updateManyUserUseCase: UpdateManyUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataRequest = UpdateManyUserRequestSchema.parse(request.body);
            const usersUpdated = await this.updateManyUserUseCase.execute(dataRequest);
            const responseInFormat = UpdateManyUserResponseSchema.parse(usersUpdated.map(user => { return { id: user.id, ...user.props } as UpdateUserResponseDTO }));
            return response.status(200).json(responseInFormat)
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(400).json({ error: errors.issues })
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors })
        }
    }
}