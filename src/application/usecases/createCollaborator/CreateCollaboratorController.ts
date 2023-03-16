import { Request, Response } from "express";
import { CreateCollaboratorUseCase } from "./CreateCollaboratorUseCase";
import { CreateCollaboratorRequestSchema, ICreateCollaboratorRequestDTO } from "./CreateCollaboratorDTO";
import { ZodError } from "zod";

export class CreateCollaboratorController {
    constructor(private createCollaboratorUseCase: CreateCollaboratorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { activityId, userIds } = CreateCollaboratorRequestSchema.parse(request.body);
            const resultOperationOrError = await this.createCollaboratorUseCase.execute({ userIds, activityId } as ICreateCollaboratorRequestDTO);
            if (resultOperationOrError instanceof Error) {
                return response.status(400).json({ error: resultOperationOrError.message });
            }
            return response.status(200).json();

        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}