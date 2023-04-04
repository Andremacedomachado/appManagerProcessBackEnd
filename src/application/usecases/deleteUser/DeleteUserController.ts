import { Request, Response } from "express";
import { ZodError } from "zod";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { DeleteUserRequestSchema, DeleteUserResponseDTO, DeleteUserResponseSchema } from "./DeleteUserDTO";

export class DeleteUserController {
    constructor(private deleteUserUseCase: DeleteUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = DeleteUserRequestSchema.parse(request.body);
            const userDeletedOrError = await this.deleteUserUseCase.execute(userId);
            if (userDeletedOrError instanceof Error) {
                return response.status(500).json({ error: userDeletedOrError.message })
            }
            const responseInformat = DeleteUserResponseSchema.parse({ ...userDeletedOrError.props, id: userDeletedOrError.id } as DeleteUserResponseDTO);
            return response.status(200).json(responseInformat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues)
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}