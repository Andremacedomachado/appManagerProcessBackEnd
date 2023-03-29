import { Request, Response } from "express";
import { DeleteAllMessageActivityByUserUseCase } from "./DeleteAllMessageActivityByUserUseCase";
import { DeleteAllMessageActivityByUserRequestSchema, DeleteAllMessageActivityByUserResponseSchema } from "./DeleteAllMessageActivityByUserDTO";
import { ZodError } from "zod";

export class DeleteAllMessageActivityByUserController {
    constructor(private DeleteAllMessageActivityByUserUseCase: DeleteAllMessageActivityByUserUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = DeleteAllMessageActivityByUserRequestSchema.parse(request.body);
            const messagesDeletedOrError = await this.DeleteAllMessageActivityByUserUseCase.execute(userId);
            if (messagesDeletedOrError instanceof Error) {
                return response.status(500).json({ error: messagesDeletedOrError.message })
            }
            const responseInFormat = DeleteAllMessageActivityByUserResponseSchema.parse(messagesDeletedOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}