import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteAllCollboratorByUserUseCase } from "./DeleteAllCollaboratorByUserUseCase";
import { DeleteAllCollabotatorByUserRequestSchema, DeleteAllCollabotatorByUserResponseSchema } from "./DeleteAllCollabotatorByUserDTO";

export class DeleteAllCollabotatorByUserController {
    constructor(private deleteAllCollboratorByUserUseCase: DeleteAllCollboratorByUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const userId = DeleteAllCollabotatorByUserRequestSchema.parse(request.body);
            const collectionRecordDeletedOrError = await this.deleteAllCollboratorByUserUseCase.execute(userId);
            if (collectionRecordDeletedOrError instanceof Error) {
                return response.status(500).json({ error: collectionRecordDeletedOrError.message })
            }
            const responseInformat = DeleteAllCollabotatorByUserResponseSchema.parse(collectionRecordDeletedOrError);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}