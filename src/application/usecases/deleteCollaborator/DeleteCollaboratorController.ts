import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteCollaboratorUseCase } from "./DeleteCollaboratorUseCase";
import { DeleteCollaboratorRequestSchema, DeleteCollaboratorResponseSchema } from "./DeleteCollaboratorDTO";

export class DeleteCollaboratorController {
    constructor(private deleteCollaboratorUseCase: DeleteCollaboratorUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const dataMatch = DeleteCollaboratorRequestSchema.parse(request.body);
            const collaboratorDeletedOrError = await this.deleteCollaboratorUseCase.execute(dataMatch);
            if (collaboratorDeletedOrError instanceof Error) {
                return response.status(400).json({ error: collaboratorDeletedOrError.message })
            }
            const responseInformat = DeleteCollaboratorResponseSchema.parse(collaboratorDeletedOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}