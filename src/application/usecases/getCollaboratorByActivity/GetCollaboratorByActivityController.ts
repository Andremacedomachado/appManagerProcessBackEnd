import { Request, Response } from "express";
import { GetCollaboratorByActivityUseCase } from "./GetCollaboratorByActivityUseCase";
import { GetCollaboratorsByActivityRequestSchema, GetCollaboratorsByActivityResponseSchema } from "./GetCollaboratorByActivityDTO";
import { ZodError } from "zod";

export class GetCollaboratorByActivityController {
    constructor(private getCollaboratorByActivityIdUseCase: GetCollaboratorByActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId } = GetCollaboratorsByActivityRequestSchema.parse(request.body);
            const recordsCollaboratorOrError = await this.getCollaboratorByActivityIdUseCase.execute(activityId);
            if (recordsCollaboratorOrError instanceof Error) {
                return response.status(400).json({ error: recordsCollaboratorOrError.message });
            }
            const responseInFormat = GetCollaboratorsByActivityResponseSchema.parse(recordsCollaboratorOrError);
            return response.status(200).json(responseInFormat);

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}