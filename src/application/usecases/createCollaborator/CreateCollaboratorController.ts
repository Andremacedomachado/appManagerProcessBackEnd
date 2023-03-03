import { Request, Response } from "express";
import { CreateCollaboratorUseCase } from "./CreateCollaboratorUseCase";
import { ICreateCollaboratorRequestDTO } from "./CreateCollaboratorDTO";

export class CreateCollaboratorController {
    constructor(private createCollaboratorUseCase: CreateCollaboratorUseCase) { }

    async handle(request: Request, response: Response) {
        const { activityId, userIds } = request.body;
        try {
            const resultOperationOrError = await this.createCollaboratorUseCase.execute({ userIds, activityId } as ICreateCollaboratorRequestDTO);
            if (resultOperationOrError instanceof Error) {
                return response.status(400).json({ error: resultOperationOrError.message });
            }
            return response.status(200).json();

        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}