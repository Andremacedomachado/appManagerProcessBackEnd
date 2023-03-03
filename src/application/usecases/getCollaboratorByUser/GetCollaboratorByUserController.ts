import { Request, Response } from "express";
import { GetCollaboratorByUserUseCase } from "./GetCollaboratorByUserUseCase";

export class GetCollaboratorByUserController {
    constructor(private getCollaboratorByUserUseCase: GetCollaboratorByUserUseCase) { }

    async handle(request: Request, response: Response) {
        const { userId } = request.body;
        try {
            const recordsCollaboratorOrError = await this.getCollaboratorByUserUseCase.execute(userId);
            if (recordsCollaboratorOrError instanceof Error) {
                return response.status(400).json({ error: recordsCollaboratorOrError.message });
            }
            return response.status(200).json(recordsCollaboratorOrError);

        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });

        }
    }
}