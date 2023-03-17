import { Request, Response } from "express";
import { GetMessageByUserIdUseCase } from "./GetMessageByUserIdUseCase";
import { GetMessageByUserRequestSchema, GetMessageByUserResponseSchema } from "./GetMessageByUserIdDTO";
import { ZodError } from "zod";

export class GetMessageByUserIdController {
    constructor(private getMessageByUserIdUseCase: GetMessageByUserIdUseCase) { }

    async handle(request: Request, response: Response) {
        try {
            const { userId } = GetMessageByUserRequestSchema.parse(request.body);
            const collectionMessageOrError = await this.getMessageByUserIdUseCase.execute(userId);
            if (collectionMessageOrError instanceof Error) {
                return response.status(400).json({ error: collectionMessageOrError.message });
            }
            const responseInFormat = GetMessageByUserResponseSchema.parse(collectionMessageOrError);
            return response.status(200).json(responseInFormat);
        } catch (errors) {
            if (errors instanceof ZodError) {
                return response.status(500).json(errors.issues);
            }
            return response.status(500).json({ error: 'Unexpected Error', typeErrors: errors });
        }
    }
}