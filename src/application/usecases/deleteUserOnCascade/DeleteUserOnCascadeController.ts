import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteUserOnCascadeUseCase } from "./DeleteUserOnCascadeUseCase";
import { DeleteUserOnCascadeRequestSchema, DeleteUserOnCascadeResponseDTO, DeleteUserOnCascadeResponseSchema } from "./DeleteUserOnCascadeDTO";

export class DeleteUserOnCascadeController {
    constructor(private deleteUserOnCascadeUseCase: DeleteUserOnCascadeUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = DeleteUserOnCascadeRequestSchema.parse(request.body);
            const userDeletedDataOrError = await this.deleteUserOnCascadeUseCase.execute(userId);
            if (userDeletedDataOrError instanceof Error) {
                return response.status(500).json({ error: userDeletedDataOrError.message })
            }
            const responseInformat = DeleteUserOnCascadeResponseSchema.parse({
                infoUser: {
                    ...userDeletedDataOrError.infoUser.props,
                    id: userDeletedDataOrError.infoUser.id
                },
                roles: userDeletedDataOrError.roles,
                collaborators: userDeletedDataOrError.collaborators,
                messages: userDeletedDataOrError.messagesInActivity,
                annexs: userDeletedDataOrError.annexsInActivity
            } as DeleteUserOnCascadeResponseDTO);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}