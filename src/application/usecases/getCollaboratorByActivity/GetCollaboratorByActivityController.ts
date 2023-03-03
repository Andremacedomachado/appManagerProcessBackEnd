import { Request, Response } from "express";
import { GetCollaboratorByActivityUseCase } from "./GetCollaboratorByActivityUseCase";

export class GetCollaboratorByActivityController {
    constructor(private getCollaboratorByActivityIdUseCase: GetCollaboratorByActivityUseCase) { }

    async handle(request: Request, response: Response) {
        const { activityId } = request.body;
        try {
            const recordsCollaboratorOrError = await this.getCollaboratorByActivityIdUseCase.execute(activityId);
            if (recordsCollaboratorOrError instanceof Error) {
                return response.status(400).json({ error: recordsCollaboratorOrError.message });
            }
            return response.status(200).json(recordsCollaboratorOrError);

        } catch (errors) {
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}