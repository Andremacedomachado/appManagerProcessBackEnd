import { Request, Response } from "express";
import { GetCollaboratorByUserUseCase } from "./GetCollaboratorByUserUseCase";
import { GetCollaboratorsByUserRequestSchema, GetCollaboratorsByUserResponseSchema } from "./GetCollaboratorByUserDTO";
import { ZodError } from "zod";

export class GetCollaboratorByUserController {
    constructor(private getCollaboratorByUserUseCase: GetCollaboratorByUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = GetCollaboratorsByUserRequestSchema.parse(request.body);
            const recordsCollaboratorOrError = await this.getCollaboratorByUserUseCase.execute(userId);
            if (recordsCollaboratorOrError instanceof Error) {
                return response.status(400).json({ error: recordsCollaboratorOrError.message });
            }
            const responseInFormat = GetCollaboratorsByUserResponseSchema.parse(recordsCollaboratorOrError)
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}