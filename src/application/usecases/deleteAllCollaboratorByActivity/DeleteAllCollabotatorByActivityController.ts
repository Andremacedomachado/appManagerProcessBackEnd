import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteAllCollboratorByActivityUseCase } from "./DeleteAllCollaboratorByActivityUseCase";
import { DeleteAllCollabotatorByActivityRequestSchema, DeleteAllCollabotatorByActivityResponseSchema } from "./DeleteAllCollabotatorByActivityDTO";

export class DeleteAllCollabotatorByActivityController {
    constructor(private deleteAllCollboratorByActivityUseCase: DeleteAllCollboratorByActivityUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const userId = DeleteAllCollabotatorByActivityRequestSchema.parse(request.body);
            const collectionRecordDeletedOrError = await this.deleteAllCollboratorByActivityUseCase.execute(userId);
            if (collectionRecordDeletedOrError instanceof Error) {
                return response.status(500).json({ error: collectionRecordDeletedOrError.message })
            }
            const responseInformat = DeleteAllCollabotatorByActivityResponseSchema.parse(collectionRecordDeletedOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}